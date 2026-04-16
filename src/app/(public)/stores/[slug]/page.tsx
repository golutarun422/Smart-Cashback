import DealCard from "@/components/DealCard";
import Image from "next/image";
import { ArrowLeft, Store as StoreIcon, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function StoreDetailPage({ params }: { params: { slug: string } }) {
  // Mock Store
  const store = {
    slug: params.slug,
    name: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
    logoUrl: null,
    commissionRate: 8,
    description: "Shop from a vast selection of electronics, fashion, and home goods with the fastest delivery."
  };

  const MOCK_DEALS = [
    { id: "2", title: "Sony WH-1000XM5 Headphones", originalPrice: 29990, offerPrice: 24990, cashbackAmount: 1200, storeName: store.name, imageUrl: null },
    { id: "4", title: "OnePlus Nord CE 3 Lite 5G", originalPrice: 19999, offerPrice: 17499, cashbackAmount: 850, storeName: store.name, imageUrl: null },
  ];

  return (
    <div className="container px-4 mx-auto py-8">
      <Link href="/stores" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to stores
      </Link>

      <div className="bg-card border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm mb-12">
        <div className="w-24 h-24 bg-white border rounded-full flex items-center justify-center p-3">
          {store.logoUrl ? (
             <Image src={store.logoUrl} alt={store.name} width={64} height={64} className="object-contain" />
          ) : (
            <StoreIcon size={40} className="text-muted-foreground opacity-50" />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
          <p className="text-muted-foreground max-w-2xl">{store.description}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col items-center justify-center min-w-[150px]">
          <ShieldCheck size={28} className="text-amber-500 mb-2" />
          <span className="text-xs font-semibold text-amber-700 uppercase">Up to</span>
          <span className="text-2xl font-bold text-amber-600">{store.commissionRate}%</span>
          <span className="text-xs text-amber-700 font-medium">Cashback</span>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
         <h2 className="text-2xl font-bold">Active Deals on {store.name}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_DEALS.map((deal) => (
          <DealCard key={deal.id} {...deal} />
        ))}
      </div>
      
      {MOCK_DEALS.length === 0 && (
         <div className="text-center py-12 text-muted-foreground bg-slate-50 rounded-xl border border-dashed">
            No active deals for this store at the moment.
         </div>
      )}
    </div>
  );
}
