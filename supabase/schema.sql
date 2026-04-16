-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  referral_code text unique,
  referred_by uuid references public.profiles(id),
  avatar_url text,
  admin_role boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  icon_url text
);

-- 3. Stores Table
create table public.stores (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  logo_url text,
  description text,
  commission_rate numeric,
  website_url text,
  is_active boolean default true
);

-- 4. Deals Table
create table public.deals (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  original_price numeric,
  offer_price numeric,
  cashback_amount numeric,
  affiliate_link text,
  image_url text,
  store_id uuid references public.stores(id),
  category_id uuid references public.categories(id),
  is_active boolean default true,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Clicks Table
create table public.clicks (
  id uuid default uuid_generate_v4() primary key,
  deal_id uuid references public.deals(id),
  user_id uuid references public.profiles(id),
  ip_address text,
  clicked_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Cashback Transactions
create type transaction_status as enum ('pending', 'confirmed', 'rejected');

create table public.cashback_transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  deal_id uuid references public.deals(id),
  amount numeric not null,
  status transaction_status default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Wallet Table
create table public.wallet (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid unique references public.profiles(id) not null,
  balance numeric default 0,
  pending_balance numeric default 0
);

-- 8. Withdrawals Table
create type withdrawal_status as enum ('pending', 'approved', 'rejected');

create table public.withdrawals (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  amount numeric not null,
  upi_id text not null,
  status withdrawal_status default 'pending',
  requested_at timestamp with time zone default timezone('utc'::text, now()) not null,
  processed_at timestamp with time zone
);

-- 9. Referral Earnings
create table public.referral_earnings (
  id uuid default uuid_generate_v4() primary key,
  referrer_id uuid references public.profiles(id) not null,
  referee_id uuid references public.profiles(id) not null,
  amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Local Shops (Local Shopkeeper Feature)
create table public.local_shops (
  id uuid default uuid_generate_v4() primary key,
  owner_name text,
  shop_name text not null,
  slug text unique not null,
  category text,
  city text not null,
  address text,
  phone text,
  logo_url text,
  commission_rate numeric,
  is_verified boolean default false,
  added_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Local Deals
create table public.local_deals (
  id uuid default uuid_generate_v4() primary key,
  shop_id uuid references public.local_shops(id) not null,
  title text not null,
  description text,
  original_price numeric,
  offer_price numeric,
  cashback_amount numeric,
  product_image_url text,
  is_active boolean default true,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. Local Deal Clicks
create table public.local_deal_clicks (
  id uuid default uuid_generate_v4() primary key,
  local_deal_id uuid references public.local_deals(id),
  user_id uuid references public.profiles(id),
  clicked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  contact_shared boolean default false
);

----------------------------------------------------------------------------------
-- TRIGGERS & FUNCTIONS
----------------------------------------------------------------------------------

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, referral_code)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', substring(md5(new.email) from 1 for 8));
  
  -- Create empty wallet
  insert into public.wallet (user_id, balance, pending_balance)
  values (new.id, 0, 0);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call handle_new_user on auth.users insert
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to handle cashback status change
create or replace function public.handle_cashback_status_change()
returns trigger as $$
begin
  -- If transitioning from pending to confirmed
  if old.status = 'pending' and new.status = 'confirmed' then
    update public.wallet
    set pending_balance = pending_balance - new.amount,
        balance = balance + new.amount
    where user_id = new.user_id;
  end if;

  -- If transitioning from pending to rejected
  if old.status = 'pending' and new.status = 'rejected' then
    update public.wallet
    set pending_balance = pending_balance - new.amount
    where user_id = new.user_id;
  end if;
  
  -- If a new pending transaction is inserted
  if TG_OP = 'INSERT' and new.status = 'pending' then
    update public.wallet
    set pending_balance = pending_balance + new.amount
    where user_id = new.user_id;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger on_cashback_transaction_change
  after insert or update of status on public.cashback_transactions
  for each row execute procedure public.handle_cashback_status_change();


----------------------------------------------------------------------------------
-- ROW LEVEL SECURITY POLICIES
----------------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.stores enable row level security;
alter table public.deals enable row level security;
alter table public.clicks enable row level security;
alter table public.cashback_transactions enable row level security;
alter table public.wallet enable row level security;
alter table public.withdrawals enable row level security;
alter table public.referral_earnings enable row level security;
alter table public.local_shops enable row level security;
alter table public.local_deals enable row level security;
alter table public.local_deal_clicks enable row level security;

-- PROFILES
create policy "Public profiles are viewable by everyone."
  on profiles for select using ( true );
create policy "Users can insert their own profile."
  on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile."
  on profiles for update using ( auth.uid() = id );

-- WALLET (Users can only see their own wallet)
create policy "Users can see their own wallet."
  on wallet for select using ( auth.uid() = user_id );

-- WITHDRAWALS (Users can see and insert their own withdrawals)
create policy "Users can view own withdrawals."
  on withdrawals for select using ( auth.uid() = user_id );
create policy "Users can insert own withdrawals."
  on withdrawals for insert with check ( auth.uid() = user_id );

-- CASHBACK TRANSACTIONS (Users can only see their own)
create policy "Users can view own transactions."
  on cashback_transactions for select using ( auth.uid() = user_id );

-- PUBLIC TABLES (Categories, Stores, Deals, Local Shops, Local Deals)
create policy "Categories are viewable by everyone." on categories for select using ( true );
create policy "Stores are viewable by everyone." on stores for select using ( true );
create policy "Deals are viewable by everyone." on deals for select using ( true );
create policy "Local Shops are viewable by everyone." on local_shops for select using ( true );
create policy "Local Deals are viewable by everyone." on local_deals for select using ( true );

-- CLICKS (Allow insert by anyone, including anon)
create policy "Anyone can insert clicks." on clicks for insert with check ( true );
create policy "Anyone can insert local deal clicks." on local_deal_clicks for insert with check ( true );

-- ADMIN POLICIES (Bypassing for simplicity, assume admins will interact via Service Role Key or custom claims)
-- If using Service Role Key, RLS is bypassed.

