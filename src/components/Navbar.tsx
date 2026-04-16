import Link from "next/link";
import { User, Wallet, Store, Tag, MapPin } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
              Smart Cashback
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="/deals" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Tag size={16} /> Deals
            </Link>
            <Link href="/stores" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Store size={16} /> Stores
            </Link>
            <Link href="/local" className="hover:text-emerald-500 flex items-center gap-1 transition-colors">
              <MapPin size={16} /> Local Shops
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 hidden md:flex">
            <Wallet size={18} /> Wallet
          </Link>
          <div className="h-4 w-px bg-border hidden md:block"></div>
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
