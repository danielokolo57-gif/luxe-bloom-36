import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/store";
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

const CATEGORIES = ["All", "Skincare", "Makeup", "Serum", "Fragrance"];

interface ProductsSectionProps {
  apiProducts: Product[];
  currency: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductsSection({ apiProducts, currency, onAddToCart }: ProductsSectionProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const displayProducts = useMemo(() => {
    if (apiProducts.length >= 7) return apiProducts;
    return [...DEMO_PRODUCTS, ...apiProducts];
  }, [apiProducts]);

  const filtered = useMemo(() => {
    let result = displayProducts;
    if (activeCategory !== "All") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [displayProducts, search, activeCategory]);

  return (
    <section id="products" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 opacity-0-init animate-fade-up">
        <p className="section-eyebrow">Our Collection</p>
        <h2 className="section-title">Curated Beauty Essentials</h2>
        <div className="gold-divider" />
        <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed mt-4">
          Handpicked formulations that celebrate every skin tone, every story
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center opacity-0-init animate-fade-up delay-200">
        <div className="relative flex-1 max-w-md w-full">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "hsl(var(--muted-foreground))" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-10 pr-10 py-3 text-sm bg-card border focus:outline-none"
            style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-xs px-4 py-2 tracking-widest uppercase transition-all duration-200 font-medium"
              style={{
                background: activeCategory === cat ? "hsl(var(--gold))" : "transparent",
                color: activeCategory === cat ? "white" : "hsl(var(--muted-foreground))",
                border: `1px solid ${activeCategory === cat ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl mb-2" style={{ color: "hsl(var(--charcoal))" }}>
            No products found
          </p>
          <p className="text-sm text-muted-foreground">Try a different search or category</p>
          <button className="btn-outline-gold mt-6 text-xs" onClick={() => { setSearch(""); setActiveCategory("All"); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="opacity-0-init animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ProductCard product={product} currency={currency} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
