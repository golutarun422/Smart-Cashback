import { User, Gift } from "lucide-react";
import { createAdminClient } from '@/lib/supabase/admin';
import { awardManualCashback } from './actions';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const supabase = createAdminClient();
  
  // Fetch profiles joined with their single wallet
  const { data: users } = await supabase
    .from('profiles')
    .select('*, wallet(balance, pending_balance)')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Users Directory</h1>
          <p className="text-slate-500 mt-1">View users, their wallets, and actively distribute Offline Cashback.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto pb-48"> {/* Extra padding for absolute dropdowns if any */}
          <table className="w-full text-sm text-left relative">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-center">Wallet Balances</th>
                <th className="px-6 py-4 text-center bg-emerald-50/50">Manual Credit (Offline Reward)</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                // Supabase joins 1-to-1 relations as an object or array. It's usually an array unless specified.
                const wallet = Array.isArray(user.wallet) ? user.wallet[0] : user.wallet;
                
                return (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-slate-50/50">
                    <td className="px-6 py-5">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                           <User size={20} />
                         </div>
                         <div>
                           <p className="font-bold text-slate-900">{user.name || 'Anonymous'}</p>
                           <p className="text-xs text-slate-500 font-mono mt-0.5" title="User ID">{user.id.substring(0, 8)}...</p>
                         </div>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <p className="text-sm font-medium text-slate-700">{user.email}</p>
                       <p className="text-xs text-slate-500 mt-1">Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="inline-flex flex-col items-end">
                         <p className="font-extrabold text-emerald-600 text-lg">₹{(wallet?.balance || 0).toFixed(2)}</p>
                         {wallet?.pending_balance > 0 && (
                           <p className="text-xs font-bold text-amber-600">Pending: ₹{wallet.pending_balance.toFixed(2)}</p>
                         )}
                       </div>
                    </td>
                    <td className="px-6 py-4 bg-emerald-50/30">
                        <form action={awardManualCashback} className="flex items-center justify-center gap-2">
                           <input type="hidden" name="user_id" value={user.id} />
                           <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                               <span className="text-slate-400 font-bold">₹</span>
                             </div>
                             <input 
                               name="amount" 
                               type="number" 
                               placeholder="0.00" 
                               required 
                               className="w-24 pl-7 pr-2 py-2 border rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" 
                             />
                           </div>
                           <button type="submit" title="Send Cashback Directly to Wallet" className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors shadow-sm">
                              <Gift size={18} />
                           </button>
                        </form>
                    </td>
                  </tr>
                )
              })}
              {users?.length === 0 && (
                <tr>
                   <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                     No users registered yet.
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
