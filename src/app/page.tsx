import Link from "next/link";
import { ArrowRight, Zap, Store, Tag } from "lucide-react";
import DealCard from "@/components/DealCard";
import StoreCard from "@/components/StoreCard";

// Mock Data
const MOCK_DEALS = [
  { id: "1", title: "Apple iPad Air (5th Gen) 64GB", originalPrice: 59900, offerPrice: 54900, cashbackAmount: 2500, storeName: "Amazon", imageUrl: null },
  { id: "2", title: "Sony WH-1000XM5 Headphones", originalPrice: 29990, offerPrice: 24990, cashbackAmount: 1200, storeName: "Flipkart", imageUrl: null },
  { id: "3", title: "Nike Air Max Pulse Mens Shoes", originalPrice: 13995, offerPrice: 9797, cashbackAmount: 500, storeName: "Myntra", imageUrl: null },
  { id: "101", title: "Fresh Vegetables Combo (2kg)", originalPrice: 350, offerPrice: 280, cashbackAmount: 20, storeName: "Pandey Kirana", imageUrl: null, isLocalDeal: true, city: "Korba, CG" },
  { id: "102", title: "Men's Cotton Shirt (Combo of 2)", originalPrice: 1200, offerPrice: 850, cashbackAmount: 50, storeName: "Fashion Hub", imageUrl: null, isLocalDeal: true, city: "Raipur, CG" },
  { id: "4", title: "OnePlus Nord CE 3 Lite 5G", originalPrice: 19999, offerPrice: 17499, cashbackAmount: 850, storeName: "Amazon", imageUrl: null },
];

const MOCK_STORES = [
  { slug: "amazon", name: "Amazon", logoUrl: null, commissionRate: 5 },
  { slug: "flipkart", name: "Flipkart", logoUrl: null, commissionRate: 8 },
  { slug: "myntra", name: "Myntra", logoUrl: null, commissionRate: 10 },
  { slug: "ajio", name: "Ajio", logoUrl: null, commissionRate: 12 },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-50 blur-xl"></div>
        
        <div className="container px-4 mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              <Zap size={14} className="text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">Extra Cashback on Every Purchase</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Get the best <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-400">Deals</span> from anywhere you shop.
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Earn real cash back on top online stores, travel sites, and even your nearby local shops. Withdraw directly to your UPI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/signup" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]">
                Join Free & Start Earning
              </Link>
              <Link href="/deals" className="w-full sm:w-auto bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 font-bold px-8 py-3 rounded-xl transition-colors">
                Browse Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Store className="text-primary" /> Top Stores
          </h2>
          <Link href="/stores" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_STORES.map((store) => (
            <StoreCard key={store.slug} {...store} />
          ))}
        </div>
      </section>

      {/* Trending Deals */}
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="text-primary" /> Trending Deals
          </h2>
          <Link href="/deals" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            View All Deals <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {MOCK_DEALS.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 mx-auto mt-8">
        <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 lg:p-12 text-center flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">Refer a friend, both get ₹50</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Invite your friends to join using your referral code. Once they earn their first confirmed cashback, you both get a flat ₹50 bonus.
          </p>
          <Link href="/signup" className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            Get Your Invite Code
          </Link>
        </div>
      </section>

    </div>
  );
}
