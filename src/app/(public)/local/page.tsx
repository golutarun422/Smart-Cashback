import { MapPin, Phone, CheckCircle, Percent } from "lucide-react";
import Link from "next/link";
import { createClient } from '@/lib/supabase/server';

export const revalidate = 0; // Dynamic component

export default async function LocalShopsPage() {
  const supabase = createClient();
  
  // Public fetch requires RLS bypass or Public Viewable policy
  // Local Shops have `create policy "Local Shops are viewable by everyone."`
  const { data: shops } = await supabase
    .from('local_shops')
    .select('*')
    .eq('is_verified', true)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-bold">
          <MapPin size={18} /> Verified Offline Partners
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Cashback at your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Local Stores</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Shop at your favorite local supermarkets and kirana stores. Just tell them your registered phone number, and instant cashback will be credited to your wallet!
        </p>
      </div>

      {/* Dynamic Grid from Supabase Database */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops?.map((shop) => (
          <div key={shop.id} className="bg-card border border-border hover:border-emerald-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <h3 className="text-xl font-extrabold text-foreground group-hover:text-emerald-600 transition-colors">{shop.shop_name}</h3>
                   <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin size={14} /> {shop.city}
                   </p>
                </div>
                <div className="bg-emerald-50 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
                    <Percent size={24} />
                </div>
             </div>
             
             <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg px-3 py-2">
                   <span className="flex-1">Offline Cashback</span>
                   <span className="font-extrabold text-lg">{shop.commission_rate}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                   <CheckCircle size={14} /> Verified Partner
                </div>
             </div>

             <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                   <p className="text-xs text-muted-foreground">Owner</p>
                   <p className="font-bold text-sm">{shop.owner_name}</p>
                </div>
                <Link href={`/local/${shop.slug}`} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all">
                   View Deals
                </Link>
             </div>
          </div>
        ))}
        {shops?.length === 0 && (
           <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl">
              <MapPin className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">No Local Shops Yet</h3>
              <p className="text-slate-500">Be the first to ask your local shopkeeper to sign up!</p>
           </div>
        )}
      </div>
    </div>
  );
}
