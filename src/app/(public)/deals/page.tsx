import DealCard from "@/components/DealCard";
import { Search } from "lucide-react";

export default function DealsPage() {
  // Mock Data
  const MOCK_DEALS = [
    { id: "1", title: "Apple iPad Air (5th Gen) 64GB", originalPrice: 59900, offerPrice: 54900, cashbackAmount: 2500, storeName: "Amazon", imageUrl: null },
    { id: "2", title: "Sony WH-1000XM5 Headphones", originalPrice: 29990, offerPrice: 24990, cashbackAmount: 1200, storeName: "Flipkart", imageUrl: null },
    { id: "3", title: "Nike Air Max Pulse Mens Shoes", originalPrice: 13995, offerPrice: 9797, cashbackAmount: 500, storeName: "Myntra", imageUrl: null },
    { id: "4", title: "OnePlus Nord CE 3 Lite 5G", originalPrice: 19999, offerPrice: 17499, cashbackAmount: 850, storeName: "Amazon", imageUrl: null },
    { id: "5", title: "Samsung Galaxy Watch 6", originalPrice: 29999, offerPrice: 23999, cashbackAmount: 1500, storeName: "Samsung", imageUrl: null },
    { id: "6", title: "Levi's Men Regular Fit Jeans", originalPrice: 2599, offerPrice: 1299, cashbackAmount: 150, storeName: "Ajio", imageUrl: null },
  ];

  return (
    <div className="container px-4 mx-auto py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">All Deals</h1>
          <p className="text-muted-foreground mt-1">Find the best cashback rates across the internet.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search deals..." 
            className="w-full pl-9 pr-4 py-2 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar (Mock) */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {['Electronics', 'Fashion', 'Beauty', 'Home & Kitchen', 'Travel'].map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {MOCK_DEALS.map((deal) => (
              <DealCard key={deal.id} {...deal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
