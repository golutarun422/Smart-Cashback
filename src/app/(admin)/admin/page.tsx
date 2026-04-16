import { Users, IndianRupee, Store as StoreIcon, Tags } from "lucide-react";

export default function AdminOverview() {
  const MOCK_STATS = [
    { title: "Total Users", value: "2,543", icon: Users, color: "bg-blue-500 text-white" },
    { title: "Cashback Paid out", value: "₹45,230", icon: IndianRupee, color: "bg-emerald-500 text-white" },
    { title: "Active Stores", value: "48", icon: StoreIcon, color: "bg-amber-500 text-white" },
    { title: "Active Deals", value: "312", icon: Tags, color: "bg-purple-500 text-white" }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Admin Overview</h1>
        <p className="text-slate-500 mt-1">Real-time statistics of your platform operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {MOCK_STATS.map((stat) => (
          <div key={stat.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">Pending Withdrawals</h3>
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border-dashed border">
               No pending withdrawal requests.
            </div>
         </div>
         
         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4 text-emerald-700">Recent Local Shop Signups</h3>
            <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border-dashed border">
               No new shop verifications needed.
            </div>
         </div>
      </div>
    </div>
  );
}
