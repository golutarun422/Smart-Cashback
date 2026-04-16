import StoreCard from "@/components/StoreCard";
import { Search } from "lucide-react";

export default function StoresPage() {
  const MOCK_STORES = [
    { slug: "amazon", name: "Amazon", logoUrl: null, commissionRate: 5 },
    { slug: "flipkart", name: "Flipkart", logoUrl: null, commissionRate: 8 },
    { slug: "myntra", name: "Myntra", logoUrl: null, commissionRate: 10 },
    { slug: "ajio", name: "Ajio", logoUrl: null, commissionRate: 12 },
    { slug: "makemytrip", name: "MakeMyTrip", logoUrl: null, commissionRate: 3 },
    { slug: "swiggy", name: "Swiggy", logoUrl: null, commissionRate: 2 },
  ];

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">All Stores</h1>
          <p className="text-muted-foreground mt-1">Shop from your favorite retailers and earn cashback.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search stores..." 
            className="w-full pl-9 pr-4 py-2 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {MOCK_STORES.map((store) => (
          <StoreCard key={store.slug} {...store} />
        ))}
      </div>
    </div>
  );
}
