import React, { useState, useEffect, useRef } from "react";
import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";
import hero4 from "@/assets/hero4.jpg";
import hero5 from "@/assets/hero5.jpg";
import hero6 from "@/assets/hero6.jpg";

const SLIDES = [hero1, hero2, hero3, hero4, hero5, hero6];
const TYPING_LINES = [
  "Discover Beauty",
  "Glow With Confidence",
  "Premium Cosmetic Collection",
  "Radiance Redefined",
];

interface HeroSectionProps {
  storeName: string;
  onShopNow: () => void;
}

export default function HeroSection({ storeName, onShopNow }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef<ReturnType<typeof setTimeout>>();

  // Slide auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Typing effect
  useEffect(() => {
    const line = TYPING_LINES[lineIdx];
    if (!deleting) {
      if (charIdx < line.length) {
        typingRef.current = setTimeout(() => {
          setTypedText(line.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 65);
      } else {
        typingRef.current = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (charIdx > 0) {
        typingRef.current = setTimeout(() => {
          setTypedText(line.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 35);
      } else {
        setDeleting(false);
        setLineIdx((l) => (l + 1) % TYPING_LINES.length);
      }
    }
    return () => clearTimeout(typingRef.current);
  }, [charIdx, deleting, lineIdx]);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={src}
            alt={`Hero slide ${i + 1}`}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(15,10,5,0.55) 0%, rgba(15,10,5,0.4) 60%, rgba(15,10,5,0.65) 100%)" }} />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <p
          className="text-xs font-medium tracking-[0.4em] uppercase mb-5 opacity-0-init animate-fade-up"
          style={{ color: "hsl(var(--gold-light))" }}
        >
          {storeName}
        </p>

        {/* Typing text */}
        <div className="relative mb-6">
          <h1
            className="font-serif text-white"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              minHeight: "1.2em",
              letterSpacing: "-0.01em",
            }}
          >
            {typedText}
            <span
              className="inline-block w-0.5 h-[0.85em] ml-1 align-middle animate-blink"
              style={{ background: "hsl(var(--gold-light))", verticalAlign: "middle" }}
            />
          </h1>
        </div>

        <p
          className="text-white/75 text-base md:text-lg max-w-md mb-10 font-light tracking-wide opacity-0-init animate-fade-up delay-300"
        >
          Curated beauty essentials for every skin story
        </p>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0-init animate-fade-up delay-500">
          <button className="btn-gold text-sm" onClick={onShopNow}>
            Shop the Collection
          </button>
          <button
            className="btn-outline-gold text-sm"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
            onClick={onShopNow}
          >
            Explore Now
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="h-0.5 transition-all duration-300"
            style={{
              width: i === current ? "2.5rem" : "1rem",
              background: i === current ? "hsl(var(--gold-light))" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
