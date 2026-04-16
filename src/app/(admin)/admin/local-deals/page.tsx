import { Plus, Check, MapPin, Store } from "lucide-react";
import { createAdminClient } from '@/lib/supabase/admin';
import { addLocalDeal } from '../local-shops/actions';

export const revalidate = 0;

export default async function AdminLocalDealsPage() {
  const supabase = createAdminClient();
  
  // Fetch active deals and the shop they belong to
  const { data: deals } = await supabase
    .from('local_deals')
    .select('*, shop:local_shops(shop_name, city)')
    .order('created_at', { ascending: false });

  // Fetch verified shops for the dropdown
  const { data: verifiedShops } = await supabase
    .from('local_shops')
    .select('id, shop_name, city')
    .eq('is_verified', true);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Local Deals</h1>
          <p className="text-slate-500 mt-1">Post specific product offers for verified shopkeepers.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><Plus size={20} className="text-emerald-600"/> Post New Local Deal</h2>
         <form action={addLocalDeal} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="lg:col-span-2">
                <select name="shop_id" required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none appearance-none bg-slate-50">
                    <option value="">Select Verified Shop...</option>
                    {verifiedShops?.map(shop => (
                       <option key={shop.id} value={shop.id}>{shop.shop_name} ({shop.city})</option>
                    ))}
                </select>
            </div>
            
            <input name="title" placeholder="Deal Title (e.g. 5kg Atta)" required className="lg:col-span-2 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />

            <input name="original_price" type="number" placeholder="Original Price (₹)" className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input name="offer_price" type="number" placeholder="Offer Price (₹)" required className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input name="cashback_amount" type="number" placeholder="Flat Cashback (₹)" required className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            <div className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-slate-50">
               <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                 <input type="checkbox" name="is_active" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                 Active Deal
               </label>
            </div>

            <input name="description" placeholder="Deal Description / Terms" className="lg:col-span-3 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg transition-colors">
               Post Deal
            </button>
         </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Title & Description</th>
                <th className="px-6 py-4">Linked Shop</th>
                <th className="px-6 py-4 text-center">Value</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {deals?.map((deal) => (
                <tr key={deal.id} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                     <p className="font-bold text-slate-900">{deal.title}</p>
                     <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{deal.description}</p>
                  </td>
                  <td className="px-6 py-4">
                     <p className="font-bold text-slate-700 flex items-center gap-1.5"><Store size={14}/> {deal.shop?.shop_name}</p>
                     <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1"><MapPin size={12}/> {deal.shop?.city}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="font-bold text-emerald-600">₹{deal.offer_price}</p>
                    <p className="text-xs font-bold text-amber-600 mt-0.5">+ ₹{deal.cashback_amount} CB</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                       <Check size={14}/> Active
                    </span>
                  </td>
                </tr>
              ))}
              {deals?.length === 0 && (
                <tr>
                   <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                     No active local deals found.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
