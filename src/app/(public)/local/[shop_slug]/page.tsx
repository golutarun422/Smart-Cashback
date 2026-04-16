import { MapPin, Phone, Percent, Gift, CheckCircle, Store } from "lucide-react";
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { claimLocalDeal } from './actions';

export const revalidate = 0;

export default async function LocalShopDetailsPage({
  params,
  searchParams
}: {
  params: { shop_slug: string },
  searchParams: { claimed?: string }
}) {
  const supabase = createClient();
  
  // 1. Fetch Shop Details
  const { data: shop } = await supabase
    .from('local_shops')
    .select('*')
    .eq('slug', params.shop_slug)
    .single();

  if (!shop) {
    notFound();
  }

  // 2. Fetch Active Deals for this shop
  const { data: deals } = await supabase
    .from('local_deals')
    .select('*')
    .eq('shop_id', shop.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Shop Header Profile */}
      <div className="bg-card border border-border rounded-3xl p-8 mb-12 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="w-24 h-24 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner">
           <Store size={48} />
        </div>
        <div className="flex-1 space-y-3">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
             <CheckCircle size={14} /> Official Verified Partner
           </div>
           <h1 className="text-4xl font-extrabold text-foreground">{shop.shop_name}</h1>
           <p className="text-muted-foreground flex items-center gap-2">
              <MapPin size={16} /> {shop.address ? `${shop.address}, ` : ''}{shop.city}
           </p>
           <p className="text-sm font-medium text-slate-500">
             Owned by: <span className="text-slate-800">{shop.owner_name}</span>
           </p>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100 shrink-0 min-w-[200px]">
           <p className="text-emerald-800 font-medium text-sm mb-1">Standard Cashback</p>
           <p className="text-3xl font-extrabold text-emerald-600">{shop.commission_rate}%</p>
           <p className="text-xs text-emerald-600/70 mt-2">On all physical purchases!</p>
        </div>
      </div>

      {/* Deals Listing */}
      <div className="mb-8">
         <h2 className="text-2xl font-bold flex items-center gap-2">
           <Gift className="text-primary" /> Active Offers at {shop.shop_name}
         </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals?.map(deal => {
          const isClaimed = searchParams?.claimed === deal.id;

          return (
            <div key={deal.id} className={`border rounded-2xl p-6 transition-all ${
              isClaimed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-card border-border hover:shadow-md'
            }`}>
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-bold text-foreground max-w-[70%]">{deal.title}</h3>
                 <div className="text-right">
                    <p className="text-xs text-muted-foreground line-through">₹{deal.original_price}</p>
                    <p className="text-lg font-extrabold text-primary">₹{deal.offer_price}</p>
                 </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{deal.description}</p>
              
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                      <Percent size={20} />
                   </div>
                   <div>
                     <p className="text-xs font-semibold text-amber-800">Flat Cashback</p>
                     <p className="text-sm font-extrabold text-amber-600">₹{deal.cashback_amount}</p>
                   </div>
                 </div>
              </div>

              {isClaimed ? (
                <div className="bg-emerald-600 text-white p-4 rounded-xl text-center space-y-2 shadow-lg shadow-emerald-600/20">
                  <p className="font-bold text-sm">Deal Activated Successfully!</p>
                  <p className="text-xs opacity-90">Visit the store and show them this number:</p>
                  <div className="bg-white/20 rounded-lg py-2 mt-2 flex items-center justify-center gap-2">
                    <Phone size={16} />
                    <span className="font-mono text-lg font-bold tracking-widest">{shop.phone}</span>
                  </div>
                </div>
              ) : (
                <form action={claimLocalDeal}>
                  <input type="hidden" name="deal_id" value={deal.id} />
                  <input type="hidden" name="shop_slug" value={params.shop_slug} />
                  <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all shadow-md">
                     Claim Deal & Reveal Contact
                  </button>
                </form>
              )}
            </div>
          )
        })}

        {deals?.length === 0 && (
           <div className="col-span-full py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <Gift className="mx-auto h-10 w-10 text-slate-300 mb-3" />
              <h3 className="text-slate-900 font-bold">No specific deals posted yet.</h3>
              <p className="text-slate-500 text-sm mt-1">Visit the store to earn the standard {shop.commission_rate}% cashback.</p>
           </div>
        )}
      </div>

    </div>
  )
}
