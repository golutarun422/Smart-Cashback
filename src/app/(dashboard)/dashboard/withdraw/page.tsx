import { IndianRupee, History, CheckCircle } from "lucide-react";
import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";
import { submitWithdrawal } from '../actions';

export const revalidate = 0;

export default async function WithdrawPage({
  searchParams,
}: {
  searchParams?: { success?: string }
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: wallet } = await supabase
    .from('wallet')
    .select('balance, pending_balance')
    .eq('user_id', user.id)
    .single();

  const { data: history } = await supabase
    .from('withdrawals')
    .select('*')
    .eq('user_id', user.id)
    .order('requested_at', { ascending: false });

  const currentBalance = wallet?.balance || 0;
  const HAS_MINIMUM = currentBalance >= 250;

  return (
    <div className="space-y-8">
      
      {searchParams?.success && (
         <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-4 rounded-xl flex items-center justify-center font-bold">
            Withdrawal Request Submitted Successfully! Admin will process this to your UPI soon.
         </div>
      )}

      {/* Main Request Form */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-8 items-start">
         <div className="flex-1 space-y-4 w-full">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <IndianRupee className="text-primary" /> Request UPI Payout
            </h2>
            <p className="text-muted-foreground text-sm">
               Transfer your confirmed cashback directly to your bank account via UPI. Minimum withdrawal is ₹250.
            </p>

            <form action={submitWithdrawal} className="space-y-4 pt-4">
               <div>
                 <label className="block text-sm font-bold text-foreground mb-1">Withdrawal Amount (₹)</label>
                 <input 
                   name="amount" 
                   type="number" 
                   required 
                   max={currentBalance}
                   min="250"
                   placeholder="Enter amount" 
                   className="w-full border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary outline-none font-bold text-lg" 
                 />
                 <p className="text-xs text-muted-foreground mt-2">Available to withdraw: <span className="font-bold text-emerald-600">₹{currentBalance.toFixed(2)}</span></p>
               </div>
               <div>
                 <label className="block text-sm font-bold text-foreground mb-1">UPI ID</label>
                 <input 
                   name="upi_id" 
                   type="text" 
                   required 
                   placeholder="yourname@okbank" 
                   className="w-full border rounded-xl px-4 py-3 bg-background focus:ring-2 focus:ring-primary outline-none font-mono" 
                 />
               </div>
               
               <button 
                 type="submit" 
                 disabled={!HAS_MINIMUM}
                 className="w-full bg-primary disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-xl transition-all shadow-md mt-4"
               >
                 {HAS_MINIMUM ? 'Submit Payout Request' : 'Minimum ₹250 Required'}
               </button>
            </form>
         </div>

         <div className="bg-slate-50 border rounded-2xl p-6 w-full md:w-72 shrink-0 text-center">
            <p className="text-slate-500 font-medium text-sm mb-1">Confirmed Balance</p>
            <p className="text-4xl font-extrabold text-foreground tracking-tight mb-6">₹{currentBalance.toFixed(2)}</p>
            
            <div className="h-px bg-border w-full mb-6 relative">
              <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-50 px-2 text-xs text-muted-foreground font-medium uppercase tracking-widest">Rules</span>
            </div>
            
            <ul className="text-sm text-left text-slate-600 space-y-3 font-medium">
               <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Minimum payout ₹250</li>
               <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> Processes under 24hrs</li>
               <li className="flex gap-2 items-start"><CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> No hidden transfer fees</li>
            </ul>
         </div>
      </div>

      {/* History */}
      <h3 className="text-lg font-bold flex items-center gap-2 pt-6">
         <History size={20} className="text-primary"/> Payout History
      </h3>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-border">
               <tr>
                 <th className="px-6 py-4">Request ID</th>
                 <th className="px-6 py-4">Amount</th>
                 <th className="px-6 py-4">UPI Destination</th>
                 <th className="px-6 py-4 text-center">Status</th>
                 <th className="px-6 py-4 text-right">Date</th>
               </tr>
            </thead>
            <tbody>
              {history?.map((w) => (
                <tr key={w.id} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {w.id.substring(0, 13)}
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">
                    ₹{w.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700">
                    {w.upi_id}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                      w.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      w.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {w.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                     {new Date(w.requested_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {history?.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No previous withdrawal requests found.
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
