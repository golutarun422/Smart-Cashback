import { Wallet, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface WalletCardProps {
  balance: number;
  pendingBalance: number;
}

export default function WalletCard({ balance, pendingBalance }: WalletCardProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-primary/20 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-emerald-500/20 blur-2xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-slate-300 mb-2">
            <Wallet size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">Available Balance</span>
          </div>
          <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            ₹{balance.toFixed(2)}
          </div>
          <div className="text-sm text-slate-400 mt-1">Confirmed & ready to withdraw</div>
        </div>

        <div className="w-full md:w-px h-px md:h-20 bg-slate-700/50"></div>

        <div className="flex flex-col gap-1 w-full md:w-auto">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Clock size={18} />
            <span className="text-sm font-medium uppercase tracking-wider">Pending Cashback</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-amber-50">
            ₹{pendingBalance.toFixed(2)}
          </div>
          <div className="text-sm text-slate-400 mt-1">Awaiting merchant confirmation</div>
        </div>

        <div className="w-full md:w-auto mt-4 md:mt-0 flex self-end md:self-center">
          <Link 
            href="/dashboard/withdraw" 
            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
          >
            Withdraw <ArrowUpRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
}
