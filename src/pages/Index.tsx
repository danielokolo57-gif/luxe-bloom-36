import React, { useRef } from "react";
import { useStoreData } from "@/hooks/useStoreData";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import Footer from "@/components/Footer";

export default function Index() {
  const { settings, products, loading, error } = useStoreData();
  const { cart, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  const productsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const navigateTo = (section: string) => {
    setCurrentSection(section);
    const map: Record<string, React.RefObject<HTMLDivElement>> = {
      home: topRef,
      products: productsRef,
      about: aboutRef,
      contact: contactRef,
    };
    const ref = map[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* Navbar */}
      <Navbar
        settings={settings}
        cartCount={totalItems}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        currentSection={currentSection}
        onNavigate={navigateTo}
      />

      {/* API error banner */}
      {error && (
        <div
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 px-4 py-3 text-sm flex items-center gap-2"
          style={{ background: "hsl(var(--charcoal))", color: "white" }}
        >
          <span className="text-xs">{error}</span>
        </div>
      )}

      {/* Hero */}
      <div ref={topRef}>
        <HeroSection
          storeName={settings.website_name}
          onShopNow={() => navigateTo("products")}
        />
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-1 min-w-0 space-y-3">
                <div className="aspect-[3/4] animate-pulse" style={{ background: "hsl(var(--muted))" }} />
                <div className="h-4 w-3/4 animate-pulse" style={{ background: "hsl(var(--muted))" }} />
                <div className="h-3 w-1/2 animate-pulse" style={{ background: "hsl(var(--muted))" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div ref={productsRef}>
        {!loading && (
          <ProductsSection
            apiProducts={products}
            currency={settings.currency}
            onAddToCart={addToCart}
          />
        )}
      </div>

      {/* About */}
      <div ref={aboutRef}>
        <AboutSection settings={settings} />
      </div>

      {/* Contact */}
      <div ref={contactRef}>
        <ContactSection settings={settings} />
      </div>

      {/* Footer */}
      <Footer settings={settings} onNavigate={navigateTo} />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        settings={settings}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Search Overlay */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        apiProducts={products}
        currency={settings.currency}
        onAddToCart={addToCart}
      />
    </div>
  );
}
