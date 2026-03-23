import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { StoreSettings } from "@/lib/store";

interface ContactSectionProps {
  settings: StoreSettings;
}

export default function ContactSection({ settings }: ContactSectionProps) {
  const handleWhatsApp = () => {
    if (!settings.phone_number) return;
    const number = settings.phone_number.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20products.`, "_blank");
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-8" style={{ background: "hsl(var(--charcoal))" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 opacity-0-init animate-fade-up">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "hsl(var(--gold-light))" }}>
            Get In Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4 text-white">
            We'd Love to Hear From You
          </h2>
          <div className="w-12 h-px mx-auto" style={{ background: "hsl(var(--gold))" }} />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-8 opacity-0-init animate-fade-up delay-200">
            {settings.email && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                  <Mail size={18} style={{ color: "hsl(var(--gold-light))" }} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(var(--gold-light))" }}>Email</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-white/80 text-sm hover:text-white transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>
            )}
            {settings.phone_number && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                  <Phone size={18} style={{ color: "hsl(var(--gold-light))" }} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(var(--gold-light))" }}>WhatsApp</p>
                  <button
                    onClick={handleWhatsApp}
                    className="text-white/80 text-sm hover:text-white transition-colors text-left"
                  >
                    {settings.phone_number}
                  </button>
                </div>
              </div>
            )}
            {settings.location && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ background: "hsl(var(--gold) / 0.15)" }}>
                  <MapPin size={18} style={{ color: "hsl(var(--gold-light))" }} />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "hsl(var(--gold-light))" }}>Location</p>
                  <p className="text-white/80 text-sm">{settings.location}, {settings.country}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleWhatsApp}
              className="btn-gold w-full md:w-auto mt-4 flex items-center gap-2"
              disabled={!settings.phone_number}
            >
              <Send size={16} />
              Chat on WhatsApp
            </button>
          </div>

          {/* Simple contact note */}
          <div
            className="p-8 opacity-0-init animate-fade-up delay-300"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h3 className="font-serif text-2xl text-white mb-4">Store Hours</h3>
            <div className="space-y-3">
              {[
                ["Monday – Friday", "9:00 AM – 6:00 PM"],
                ["Saturday", "10:00 AM – 4:00 PM"],
                ["Sunday", "Closed"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                  <span className="text-white/60 text-sm">{day}</span>
                  <span className="text-white text-sm">{hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-xs leading-6">
                We typically respond to WhatsApp messages within 30 minutes during business hours.
                For urgent inquiries, please call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
