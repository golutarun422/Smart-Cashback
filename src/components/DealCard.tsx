import Link from "next/link";
import Image from "next/image";
import { BadgePercent, MapPin } from "lucide-react";

interface DealCardProps {
  id: string;
  title: string;
  originalPrice: number;
  offerPrice: number;
  cashbackAmount: number;
  imageUrl: string | null;
  storeName?: string;
  isLocalDeal?: boolean;
  city?: string;
}

export default function DealCard({
  id,
  title,
  originalPrice,
  offerPrice,
  cashbackAmount,
  imageUrl,
  storeName,
  isLocalDeal,
  city
}: DealCardProps) {
  return (
    <div className="group flex flex-col bg-card rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="relative aspect-square w-full bg-white p-4 flex items-center justify-center">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-contain p-4" />
        ) : (
          <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
        
        {isLocalDeal && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <MapPin size={10} /> Local Shop
          </div>
        )}

        <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
          ₹{cashbackAmount} Cashback
        </div>
      </div>

      <div className="flex flex-col p-4 flex-grow border-t">
        {storeName && (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            {storeName}
          </span>
        )}
        
        <h3 className="font-medium text-foreground line-clamp-2 leading-tight mb-3 flex-grow group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">₹{offerPrice}</span>
              {originalPrice > offerPrice && (
                <span className="text-xs text-muted-foreground line-through">₹{originalPrice}</span>
              )}
            </div>
            {isLocalDeal && city && (
              <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin size={12} /> {city}
              </span>
            )}
          </div>
          
          <Link 
            href={isLocalDeal ? `/local/deals/${id}` : `/deals/${id}`}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Get Deal
          </Link>
        </div>
      </div>
    </div>
  );
}
