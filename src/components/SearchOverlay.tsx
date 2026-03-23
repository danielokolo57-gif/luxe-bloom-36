import React, { useState, useEffect } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { Product, formatPrice } from "@/lib/store";
import product1 from "@/assets/product1.jpg";
import product2 from "@/assets/product2.jpg";
import product3 from "@/assets/product3.jpg";
import product4 from "@/assets/product4.jpg";
import product5 from "@/assets/product5.jpg";

const DEMO_PRODUCTS: Product[] = [
  { id: "demo-1", name: "Luminous Glow Cream", price: 12500, image: product1, category: "Skincare", isDemo: true },
  { id: "demo-2", name: "Vitamin C Brightening Serum", price: 18000, image: product2, category: "Serum", isDemo: true },
  { id: "demo-3", name: "Velvet Matte Lipstick", price: 7500, image: product3, category: "Makeup", isDemo: true },
  { id: "demo-4", name: "HD Foundation SPF 30", price: 15000, image: product4, category: "Makeup", isDemo: true },
  { id: "demo-5", name: "Revive Eye Cream", price: 22000, image: product5, category: "Skincare", isDemo: true },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  apiProducts: Product[];
  currency: string;
  onAddToCart: (product: Product) => void;
}

export default function SearchOverlay({ isOpen, onClose, apiProducts, currency, onAddToCart }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const allProducts = apiProducts.length >= 7 ? apiProducts : [...DEMO_PRODUCTS, ...apiProducts];

  const results = query.trim().length > 1
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.category ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 animate-fade-in"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl animate-scale-in"
        style={{ background: "hsl(var(--background))", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}
      >
        {/* Input */}
        <div className="flex items-center px-5 py-4 border-b" style={{ borderColor: "hsl(var(--border))" }}>
          <SearchIcon size={18} style={{ color: "hsl(var(--gold))" }} className="mr-3 flex-shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories…"
            className="flex-1 text-base bg-transparent focus:outline-none"
            style={{ color: "hsl(var(--foreground))" }}
          />
          <button onClick={onClose} className="ml-3 p-1" style={{ color: "hsl(var(--muted-foreground))" }}>
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim().length > 1 && results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-lg mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>No results for "{query}"</p>
              <p className="text-xs text-muted-foreground">Try different keywords</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="px-5 py-2 text-xs tracking-widest uppercase" style={{ color: "hsl(var(--gold))", background: "hsl(var(--cream))" }}>
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              {results.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 px-5 py-3 border-b hover:bg-muted/50 transition-colors cursor-pointer"
                  style={{ borderColor: "hsl(var(--border))" }}
                  onClick={() => { onAddToCart(p); onClose(); }}
                >
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden" style={{ background: "hsl(var(--cream))" }}>
                    {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm truncate" style={{ color: "hsl(var(--charcoal))" }}>{p.name}</p>
                    <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{p.category}</p>
                  </div>
                  <span className="text-sm font-medium flex-shrink-0" style={{ color: "hsl(var(--gold-dark))" }}>
                    {formatPrice(p.price, currency)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">Start typing to search products…</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
