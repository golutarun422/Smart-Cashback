import { MapPin, CheckCircle, XCircle } from "lucide-react";
import { createAdminClient } from '@/lib/supabase/admin';
import { addLocalShop, verifyLocalShop } from './actions';

export const revalidate = 0; // Force dynamic to always reflect latest DB state

export default async function AdminLocalShopsPage() {
  const supabase = createAdminClient();
  const { data: shops } = await supabase
    .from('local_shops')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-bold mb-2">
             <MapPin size={16} /> Local Shopkeeper Feature
           </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Local Shops</h1>
          <p className="text-slate-500 mt-1">Verify new local shopkeepers and set their offline cashback rates.</p>
        </div>
      </div>

      {/* ADD NEW SHOP FORM */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <h2 className="text-lg font-bold text-slate-900 mb-4">Register New Shop</h2>
         <form action={addLocalShop} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input name="shop_name" placeholder="Shop Name" required className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input name="owner_name" placeholder="Owner Name" required className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input name="phone" placeholder="Phone Number" required className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input name="city" placeholder="City" required className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            <input name="address" placeholder="Full Address" className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none lg:col-span-2" />
            <input name="category" placeholder="Category (e.g., Groceries)" className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            
            <div className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm bg-slate-50">
               <span className="text-slate-600 font-medium whitespace-nowrap mr-2">Commission %:</span>
               <input name="commission_rate" type="number" step="0.1" defaultValue="5.0" required className="w-16 bg-transparent text-right font-bold focus:outline-none" />
            </div>

            <div className="lg:col-span-4 flex items-center justify-between mt-2 pt-4 border-t">
               <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                 <input type="checkbox" name="is_verified" defaultChecked className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500" />
                 Auto-verify Application
               </label>
               <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-lg transition-colors">
                  Submit Shop
               </button>
            </div>
         </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Shop Name & Owner</th>
                <th className="px-6 py-4">Contact & City</th>
                <th className="px-6 py-4 text-center">Commission</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shops?.map((shop) => (
                <tr key={shop.id} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                     <p className="font-bold text-slate-900">{shop.shop_name}</p>
                     <p className="text-xs text-slate-500 mt-0.5">{shop.owner_name}</p>
                  </td>
                  <td className="px-6 py-4">
                     <p className="font-medium text-slate-700">{shop.phone}</p>
                     <p className="text-xs text-slate-500 mt-0.5">{shop.city}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-center text-amber-600">{shop.commission_rate}%</td>
                  <td className="px-6 py-4 text-center">
                    {shop.is_verified ? (
                        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                          <CheckCircle size={14}/> Verified
                        </span>
                    ) : (
                        <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
                          <XCircle size={14}/> Pending
                        </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!shop.is_verified && (
                        <form action={verifyLocalShop.bind(null, shop.id)} className="inline">
                          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors">
                              Verify Now
                          </button>
                        </form>
                    )}
                  </td>
                </tr>
              ))}
              {shops?.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                     No local shops currently found in the database.
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
