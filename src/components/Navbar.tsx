import React, { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { StoreSettings } from "@/lib/store";

interface NavbarProps {
  settings: StoreSettings;
  cartCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
  currentSection: string;
  onNavigate: (section: string) => void;
}

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "products", label: "Shop" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ settings, cartCount, onCartOpen, onSearchOpen, currentSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(255,252,248,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="font-serif text-xl md:text-2xl font-light tracking-wider"
            style={{ color: scrolled ? "hsl(var(--charcoal))" : "white" }}
          >
            {settings.website_name || "Lumière"}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="nav-link"
                style={{ color: scrolled ? "hsl(var(--charcoal))" : "rgba(255,255,255,0.9)" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onSearchOpen}
              className="p-2 transition-opacity hover:opacity-70"
              style={{ color: scrolled ? "hsl(var(--charcoal))" : "white" }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={onCartOpen}
              className="relative p-2 transition-opacity hover:opacity-70"
              style={{ color: scrolled ? "hsl(var(--charcoal))" : "white" }}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount > 9 ? "9+" : cartCount}</span>
              )}
            </button>
            {/* Mobile menu */}
            <button
              className="md:hidden p-2"
              style={{ color: scrolled ? "hsl(var(--charcoal))" : "white" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 pb-10 px-8 animate-fade-in"
          style={{ background: "rgba(255,252,248,0.98)", backdropFilter: "blur(16px)" }}
        >
          <nav className="flex flex-col gap-6 mt-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left font-serif text-3xl font-light"
                style={{ color: "hsl(var(--charcoal))" }}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto">
            {settings.phone_number && (
              <a
                href={`https://wa.me/${settings.phone_number}`}
                className="text-sm tracking-widest uppercase"
                style={{ color: "hsl(var(--gold))" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
