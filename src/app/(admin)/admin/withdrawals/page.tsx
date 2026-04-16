import { Check, X, RefreshCw } from "lucide-react";
import { createAdminClient } from '@/lib/supabase/admin';
import { processWithdrawal } from './actions';

export const revalidate = 0;

export default async function AdminWithdrawalsPage() {
  const supabase = createAdminClient();
  
  const { data: withdrawals } = await supabase
    .from('withdrawals')
    .select('*, profile:profiles(name, email)')
    .order('requested_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Withdrawal Requests</h1>
          <p className="text-slate-500 mt-1">Review and process UPI withdrawal requests from users.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Request ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4 text-center">Amount</th>
                <th className="px-6 py-4 font-mono">UPI Destination</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals?.map((w) => (
                <tr key={w.id} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                     {w.id.substring(0, 13)}
                     <p className="text-slate-400 mt-1">{new Date(w.requested_at).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4">
                     <p className="font-bold text-slate-900">{w.profile?.name || 'Anonymous'}</p>
                     <p className="text-xs text-slate-500">{w.profile?.email}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-center text-slate-900 text-lg text-emerald-600">
                     ₹{w.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                     <span className="font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                        {w.upi_id}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center justify-center min-w-[90px] ${
                      w.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      w.status === 'pending' ? 'bg-amber-100 text-amber-700 animate-pulse' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {w.status === 'pending' && <RefreshCw size={12} className="mr-1 inline animate-spin" />}
                      {w.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {w.status === 'pending' && (
                       <div className="flex justify-end gap-2">
                           <form action={processWithdrawal.bind(null, w.id, 'approved')}>
                              <button className="bg-emerald-100 border border-emerald-200 hover:bg-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg transition-colors flex items-center font-bold text-xs shadow-sm" title="Approve & Mark Paid">
                                <Check size={16} className="mr-1" /> Pay Assured
                              </button>
                           </form>
                           <form action={processWithdrawal.bind(null, w.id, 'rejected')}>
                              <button className="bg-red-100 border border-red-200 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg transition-colors flex items-center font-bold text-xs shadow-sm" title="Reject & Refund Wallet">
                                <X size={16} className="mr-1" /> Reject
                              </button>
                           </form>
                       </div>
                    )}
                  </td>
                </tr>
              ))}
              {withdrawals?.length === 0 && (
                <tr>
                   <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                     No withdrawal requests found.
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
