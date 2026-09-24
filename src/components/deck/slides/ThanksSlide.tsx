"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { content } from "@/content/content";
import { useFinal } from "@/lib/final";
import { GardenWall } from "../Phone";
import { LightRing, Reveal } from "../primitives";

// Lights the ring one LED at a time, the way a guest's bracelet fills over the night.
function useLightsFilling(total: number) {
  const final = useFinal();
  const [lit, setLit] = useState(final ? total : 0);
  useEffect(() => {
    if (final) return;
    const id = window.setInterval(() => setLit((n) => (n < total ? n + 1 : n)), 320);
    return () => window.clearInterval(id);
  }, [final, total]);
  return lit;
}

// Slow ambient fireflies over the garden, positioned in the wall's own pixel space.
const DRIFT = Array.from({ length: 8 }, (_, i) => ({ x: 60 + ((i * 97) % 440), y: 80 + ((i * 151) % 460), d: 5 + (i % 3) * 1.5 }));

function Fireflies() {
  const final = useFinal();
  if (final) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {DRIFT.map((f, i) => (
        <motion.span
          key={i}
          className="absolute block h-4 w-4 rounded-full bg-accent shadow-[0_0_24px_10px_var(--color-accent)]"
          style={{ left: f.x, top: f.y }}
          animate={{ x: [0, 18, -12, 0], y: [0, -22, 10, 0], opacity: [0.2, 1, 0.5, 0.2] }}
          transition={{ duration: f.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export function ThanksSlide() {
  const t = content.thanks;
  const lit = useLightsFilling(8);
  return (
    <div className="absolute inset-0 flex items-center gap-20 px-32 pb-24">
      <div className="flex-1">
        <h2 className="font-display text-display text-ink">{t.heading}</h2>
        <Reveal show delay={0.5}>
          <p className="mt-10 max-w-[760px] text-5xl leading-[1.15] text-ink">{t.line}</p>
        </Reveal>
        <Reveal show delay={0.9} className="mt-14 flex items-center gap-6">
          <LightRing lit={lit} size={120} newest={lit < 8} />
          <p className="text-3xl text-ink-muted">{t.byline}</p>
        </Reveal>
      </div>
      <div className="relative">
        <GardenWall full size={600} />
        <Fireflies />
      </div>
    </div>
  );
}
