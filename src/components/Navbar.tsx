import Link from "next/link";
import { Wallet, Store, Tag, MapPin, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/(auth)/actions";

export default async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('name, avatar_url')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
               <Tag size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent tracking-tight">
              Smart Cashback
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold text-muted-foreground/80">
            <Link href="/deals" className="hover:text-primary flex items-center gap-1.5 transition-colors">
              <Tag size={16} /> Deals
            </Link>
            <Link href="/stores" className="hover:text-primary flex items-center gap-1.5 transition-colors">
              <Store size={16} /> Stores
            </Link>
            <Link href="/local" className="hover:text-emerald-500 flex items-center gap-1.5 transition-colors">
              <MapPin size={16} /> Local Shops
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-2 hidden md:flex bg-slate-50 px-3 py-2 rounded-xl border border-border">
                <Wallet size={18} className="text-emerald-600" /> Wallet
              </Link>
              
              <div className="h-6 w-px bg-border hidden md:block mx-1"></div>

              {/* User Dropdown / Profile Link */}
              <div className="flex items-center gap-4">
                <Link href="/dashboard/profile" className="flex items-center gap-2 group">
                   <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                      <User size={18} />
                   </div>
                   <div className="hidden lg:block text-left">
                      <p className="text-xs text-muted-foreground font-medium">Account</p>
                      <p className="text-sm font-bold truncate max-w-[100px]">{profile?.name || 'My Profile'}</p>
                   </div>
                </Link>

                <form action={logout}>
                   <button type="submit" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Logout">
                      <LogOut size={20} />
                   </button>
                </form>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-bold hover:text-primary transition-colors px-4 py-2 rounded-xl">
                Log in
              </Link>
              <Link href="/signup" className="text-sm font-bold bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20 scale-100 hover:scale-105 active:scale-95">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
