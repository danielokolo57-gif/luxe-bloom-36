import React from "react";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/lib/store";
import { formatPrice } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  currency: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, currency, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-cream">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='400' fill='%23f5f0eb'%3E%3Crect width='300' height='400'/%3E%3C/svg%3E";
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "hsl(var(--cream))" }}
          >
            <ShoppingBag size={40} style={{ color: "hsl(var(--gold-light))" }} />
          </div>
        )}
        {product.isDemo && (
          <span
            className="absolute top-3 left-3 text-xs tracking-widest uppercase px-2 py-1"
            style={{ background: "hsl(var(--gold))", color: "white" }}
          >
            Featured
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full py-3 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2"
            style={{ background: "hsl(var(--charcoal))", color: "white" }}
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(var(--gold))" }}>
            {product.category}
          </p>
        )}
        <h3 className="font-serif text-base mb-2 leading-snug" style={{ color: "hsl(var(--charcoal))" }}>
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm" style={{ color: "hsl(var(--gold-dark))" }}>
            {formatPrice(product.price, currency)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 transition-all hover:scale-110"
            style={{ color: "hsl(var(--charcoal))" }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
