import WalletCard from "@/components/WalletCard";
import { ArrowRight, Copy, History, ListCheck, Download } from "lucide-react";
import Link from "next/link";
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = createClient();
  
  // Verify User Session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch actual profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch actual wallet
  const { data: wallet } = await supabase
    .from('wallet')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Fetch recent transactions (limit 5)
  const { data: recentTransactions } = await supabase
    .from('cashback_transactions')
    .select('*, deal:deals(title)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="container px-4 mx-auto py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.name || 'Shopper'}</h1>
          <p className="text-muted-foreground">Here is a summary of your cashback earnings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Wallet & Transactions) */}
        <div className="lg:col-span-2 space-y-8">
          <WalletCard 
             balance={wallet?.balance || 0} 
             pendingBalance={wallet?.pending_balance || 0} 
          />
          
          <div className="bg-card border rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2"><History className="text-primary"/> Recent Transactions</h2>
              <Link href="/dashboard/transactions" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Source</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-center rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions?.map((tx) => (
                    <tr key={tx.id} className="border-b last:border-0 hover:bg-slate-50/50">
                      <td className="px-4 py-4 font-bold text-foreground">
                        {tx.deal ? tx.deal.title : 'Manual Offline Cashback'}
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-emerald-600">
                        +₹{tx.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                          tx.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          tx.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentTransactions?.length === 0 && (
                     <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground border-2 border-dashed border-slate-100 rounded-xl">
                           No transactions yet. Go shop at a verified partner!
                        </td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (Actions & Referrals) */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/dashboard/withdraw" className="w-full border shadow-sm hover:border-primary/50 hover:bg-slate-50 transition-colors flex items-center gap-3 p-4 rounded-xl font-medium">
                <div className="bg-primary/10 text-primary p-2 rounded-lg"><Download size={20} /></div>
                Withdraw to UPI
              </Link>
              <Link href="/dashboard/transactions" className="w-full border shadow-sm hover:border-primary/50 hover:bg-slate-50 transition-colors flex items-center gap-3 p-4 rounded-xl font-medium">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg"><ListCheck size={20} /></div>
                All Transactions
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-2xl p-6 text-white text-center relative overflow-hidden shadow-lg border border-indigo-700">
             <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
            <h3 className="text-xl font-bold mb-2 relative z-10">Invite & Earn ₹50</h3>
            <p className="text-indigo-200 text-sm mb-6 relative z-10">Get ₹50 for every friend who joins & earns their first cashback.</p>
            
            <div className="bg-white/10 border border-white/20 p-3 rounded-lg flex items-center justify-between relative z-10">
              <code className="text-indigo-100 font-mono font-bold tracking-wider">{profile?.referral_code || 'N/A'}</code>
              <button title="Feature coming soon" className="text-white hover:text-indigo-200 transition-colors p-1 bg-white/10 rounded">
                <Copy size={16} />
              </button>
            </div>
            <button title="Feature coming soon" className="w-full mt-4 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 rounded-xl transition-colors relative z-10">
              Share Link
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
