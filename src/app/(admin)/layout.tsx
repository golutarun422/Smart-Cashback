import Link from "next/link";
import { LayoutDashboard, ShoppingCart, Store, Users, DollarSign, MapPin, Search } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row mt-[-64px] pt-16">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 md:min-h-[calc(100vh-64px)] overflow-y-auto h-auto shrink-0 flex flex-col border-r border-slate-800">
        <div className="p-6">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Admin Hub</h2>
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
              <LayoutDashboard size={18} /> Overview
            </Link>
            <Link href="/admin/deals" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
              <ShoppingCart size={18} /> Global Deals
            </Link>
            <Link href="/admin/stores" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
              <Store size={18} /> Stores
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
              <Users size={18} /> Users
            </Link>
            <Link href="/admin/withdrawals" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
               <DollarSign size={18} /> Withdrawals
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 mb-6">
           <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 text-emerald-400/80">Local Shopkeeper</h2>
           <nav className="space-y-1">
            <Link href="/admin/local-shops" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
              <MapPin size={18} className="text-emerald-500" /> Verify Shops
            </Link>
            <Link href="/admin/local-deals" className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-lg transition-colors font-medium">
              <Search size={18} className="text-emerald-500" /> Local Deals
            </Link>
          </nav>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
         {children}
      </main>
    </div>
  );
}
