import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";

export default function DealDetailPage({ params }: { params: { id: string } }) {
  // Mock Single Deal
  const deal = {
    id: params.id,
    title: "Sony WH-1000XM5 Industry Leading Wireless Noise Cancelling Headphones",
    description: "The best noise cancelling headphones from Sony with 30-hour battery life and multi-mode ANC.",
    originalPrice: 29990,
    offerPrice: 24990,
    cashbackAmount: 1200,
    storeName: "Flipkart",
    imageUrl: null,
    expiresAt: "2026-12-31"
  };

  return (
    <div className="container px-4 mx-auto py-8 max-w-4xl">
      <Link href="/deals" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to deals
      </Link>

      <div className="bg-card border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start shadow-sm hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="w-full md:w-1/3 aspect-square bg-white rounded-xl border flex items-center justify-center p-4 relative">
          {deal.imageUrl ? (
            <Image src={deal.imageUrl} alt={deal.title} fill className="object-contain" />
          ) : (
            <Tag size={64} className="text-slate-200" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded">
              {deal.storeName}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4 leading-snug">
            {deal.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-extrabold text-foreground">₹{deal.offerPrice}</span>
            {deal.originalPrice > deal.offerPrice && (
              <span className="text-lg text-muted-foreground line-through">₹{deal.originalPrice}</span>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-center gap-4">
            <div className="bg-amber-500 text-white p-3 rounded-full">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-semibold text-amber-900 leading-tight">₹{deal.cashbackAmount} Flat Cashback</p>
              <p className="text-sm text-amber-700/80 mt-0.5">Tracks within 24 hours. Gets confirmed in 30 days.</p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            {deal.description}
          </p>

          <Link href={`/go/${deal.id}`} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
            Get Deal <ExternalLink size={20} />
          </Link>
          <p className="text-center text-xs text-muted-foreground mt-3">
            You will be redirected to {deal.storeName}.
          </p>
        </div>
      </div>
    </div>
  );
}
