import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminStoresPage() {
  const MOCK_STORES = [
    { id: "1", name: "Amazon", commission: "5%", status: "Active" },
    { id: "2", name: "Flipkart", commission: "8%", status: "Active" },
    { id: "3", name: "Myntra", commission: "10%", status: "Active" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Manage Stores</h1>
          <p className="text-slate-500 mt-1">Configure global affiliate stores and their default commission rates.</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Add New Store
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Store Name</th>
                <th className="px-6 py-4">Commission Rate</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STORES.map((store) => (
                <tr key={store.id} className="border-b last:border-0 hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">{store.name}</td>
                  <td className="px-6 py-4 font-medium text-blue-600">Up to {store.commission}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 flex items-center justify-center gap-1 w-max mx-auto rounded-full text-xs font-bold">
                      <CheckCircle2 size={14} /> {store.status}
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
