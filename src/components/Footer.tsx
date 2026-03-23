import React from "react";
import { Instagram, Facebook, Twitter, Heart } from "lucide-react";
import { StoreSettings } from "@/lib/store";

interface FooterProps {
  settings: StoreSettings;
  onNavigate: (section: string) => void;
}

export default function Footer({ settings, onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const name = settings.website_name || "Lumière Beauty";

  return (
    <footer style={{ background: "hsl(20 15% 8%)" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl text-white mb-4 font-light tracking-wider">{name}</h3>
            <p className="text-white/50 text-sm leading-7 mb-6 max-w-xs">
              Premium cosmetics curated to celebrate your natural radiance. Beauty, elevated.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 flex items-center justify-center transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.07)", color: "hsl(var(--gold-light))" }}
                  aria-label="Social"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: "hsl(var(--gold-light))" }}>
              Quick Links
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { id: "home", label: "Home" },
                { id: "products", label: "Shop" },
                { id: "about", label: "About Us" },
                { id: "contact", label: "Contact" },
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => onNavigate(l.id)}
                  className="text-left text-sm text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: "hsl(var(--gold-light))" }}>
              Contact
            </p>
            <div className="space-y-3">
              {settings.email && (
                <a href={`mailto:${settings.email}`} className="block text-sm text-white/50 hover:text-white transition-colors">
                  {settings.email}
                </a>
              )}
              {settings.phone_number && (
                <a
                  href={`https://wa.me/${settings.phone_number.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-white/50 hover:text-white transition-colors"
                >
                  {settings.phone_number}
                </a>
              )}
              {settings.location && (
                <p className="text-sm text-white/50">{settings.location}, {settings.country}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {year} {name}. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart size={11} className="text-rose-400" /> for beauty lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
