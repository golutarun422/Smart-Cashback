import { ArrowRightLeft } from "lucide-react";
import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function TransactionsPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: transactions } = await supabase
    .from('cashback_transactions')
    .select('*, deal:deals(title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
          <ArrowRightLeft size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <p className="text-muted-foreground text-sm">Track your offline and online cashback earnings.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-border">
               <tr>
                 <th className="px-6 py-4">Transaction ID</th>
                 <th className="px-6 py-4">Source Detail</th>
                 <th className="px-6 py-4 text-center">Amount</th>
                 <th className="px-6 py-4 text-center">Status</th>
                 <th className="px-6 py-4 text-right">Date</th>
               </tr>
            </thead>
            <tbody>
              {transactions?.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                    {t.id.substring(0, 13)}...
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground">
                    {t.deal ? t.deal.title : 'Manual Offline Cashback'}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-primary">
                    +₹{t.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      t.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      t.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                     {new Date(t.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {transactions?.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No transactions recorded yet. Go shop at a local partner!
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
