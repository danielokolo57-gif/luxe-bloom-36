import React from "react";
import { Sparkles, Shield, Leaf, Star } from "lucide-react";
import { StoreSettings } from "@/lib/store";
import hero3 from "@/assets/hero3.jpg";

interface AboutSectionProps {
  settings: StoreSettings;
}

const VALUES = [
  { icon: Sparkles, title: "Premium Quality", desc: "Every formula is crafted with the finest ingredients sourced globally." },
  { icon: Shield, title: "Dermatologist Tested", desc: "Safe for all skin types, clinically verified for purity and efficacy." },
  { icon: Leaf, title: "Clean Beauty", desc: "Free from harsh chemicals — gentle on skin, kind to the earth." },
  { icon: Star, title: "Award-Winning", desc: "Recognized by beauty editors and loved by thousands of customers." },
];

export default function AboutSection({ settings }: AboutSectionProps) {
  const name = settings.website_name || "Lumière Beauty";

  return (
    <section id="about" className="py-20 md:py-28 overflow-hidden" style={{ background: "hsl(var(--cream))" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-20">
          {/* Image */}
          <div className="relative opacity-0-init animate-fade-up">
            <div
              className="absolute -top-4 -left-4 w-full h-full border"
              style={{ borderColor: "hsl(var(--gold-light))" }}
            />
            <img
              src={hero3}
              alt="About our brand"
              className="relative w-full object-cover aspect-[4/5]"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="opacity-0-init animate-fade-up delay-200">
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-title">The Art of Beauty</h2>
            <div className="gold-divider ml-0" />
            <div
              className="w-12 h-px mt-0 mb-6"
              style={{ background: "hsl(var(--gold))" }}
            />
            <p className="text-sm leading-7 mb-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              At <strong style={{ color: "hsl(var(--charcoal))" }}>{name}</strong>, we are dedicated to providing
              premium cosmetic products that enhance natural beauty. Founded on the belief that every person
              deserves access to luxurious, effective skincare and makeup, we source only the finest ingredients
              from around the world.
            </p>
            <p className="text-sm leading-7 mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
              Our philosophy is simple: beauty should feel effortless and transformative. Every product in the{" "}
              <strong style={{ color: "hsl(var(--charcoal))" }}>{name}</strong> collection is meticulously
              formulated to deliver visible results while celebrating your unique beauty.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {["500+ Products", "50K+ Customers", "12 Years Experience", "100% Cruelty-Free"].map((stat) => (
                <div key={stat} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--gold))" }} />
                  <span className="text-xs tracking-wide" style={{ color: "hsl(var(--charcoal))" }}>{stat}</span>
                </div>
              ))}
            </div>

            {settings.location && (
              <p className="text-xs tracking-widest uppercase" style={{ color: "hsl(var(--gold))" }}>
                📍 {settings.location}, {settings.country}
              </p>
            )}
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="text-center p-6 opacity-0-init animate-fade-up"
              style={{
                background: "hsl(var(--card))",
                animationDelay: `${i * 100}ms`,
                boxShadow: "0 2px 12px hsl(var(--gold) / 0.07)",
              }}
            >
              <div
                className="w-12 h-12 mx-auto mb-4 flex items-center justify-center"
                style={{ background: "hsl(var(--rose-light))" }}
              >
                <v.icon size={22} style={{ color: "hsl(var(--gold))" }} />
              </div>
              <h3 className="font-serif text-sm mb-2" style={{ color: "hsl(var(--charcoal))" }}>
                {v.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
