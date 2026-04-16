import Link from "next/link";
import Image from "next/image";
import { Store, Percent } from "lucide-react";

interface StoreCardProps {
  slug: string;
  name: string;
  logoUrl: string | null;
  commissionRate: number;
}

export default function StoreCard({
  slug,
  name,
  logoUrl,
  commissionRate,
}: StoreCardProps) {
  return (
    <Link href={`/stores/${slug}`} className="group block">
      <div className="bg-card rounded-xl border p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:shadow-md transition-all duration-200">
        <div className="w-20 h-20 relative bg-white rounded-full overflow-hidden flex items-center justify-center p-2 shadow-sm group-hover:scale-105 transition-transform duration-300">
          {logoUrl ? (
            <Image src={logoUrl} alt={name} fill className="object-contain p-2" />
          ) : (
            <Store size={32} className="text-muted-foreground opacity-50" />
          )}
        </div>
        
        <div className="text-center">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm text-amber-600 font-medium mt-1 bg-amber-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
            <Percent size={12} /> Up to {commissionRate}% Cashback
          </p>
        </div>
      </div>
    </Link>
  );
}
