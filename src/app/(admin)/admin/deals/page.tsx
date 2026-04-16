import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminDealsPage() {
  const MOCK_DEALS = [
    { id: "1", title: "Apple iPad Air (5th Gen)", store: "Amazon", category: "Electronics", cashback: "₹2500", status: "Active" },
    { id: "2", title: "Nike Air Max", store: "Myntra", category: "Fashion", cashback: "₹500", status: "Active" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Deals</h1>
          <p className="text-slate-500 mt-1">Add, edit, or remove affiliate deals globally.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add New Deal
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Store</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Cashback</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DEALS.map((deal) => (
                <tr key={deal.id} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{deal.title}</td>
                  <td className="px-6 py-4">{deal.store}</td>
                  <td className="px-6 py-4">{deal.category}</td>
                  <td className="px-6 py-4 font-bold text-center text-amber-600">{deal.cashback}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold">
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-2">
                       <Edit2 size={16} />
                    </button>
                    <button className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                       <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
