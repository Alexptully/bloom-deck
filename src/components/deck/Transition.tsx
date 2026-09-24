"use client";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

// Between slides, a drift of fireflies (glowing like the bracelet's lights) and a few leaves crosses the
// stage in the direction of travel while the old slide dissolves and the new one settles in.

const FIREFLIES = Array.from({ length: 12 }, (_, i) => ({
  y: 140 + ((i * 263) % 720),
  size: 12 + (i % 3) * 5,
  delay: i * 0.035,
  wave: 40 + (i % 4) * 25,
}));

const LEAVES = Array.from({ length: 5 }, (_, i) => ({
  y: 120 + ((i * 331) % 760),
  delay: 0.08 + i * 0.07,
  spin: 160 + i * 50,
  scale: 0.8 + (i % 3) * 0.25,
}));

const SWEEP = 1.4;

function pathX(dir: number) {
  return dir > 0 ? [-120, 2040] : [2040, -120];
}

function Firefly({ f, dir }: { f: (typeof FIREFLIES)[number]; dir: number }) {
  return (
    <motion.div
      className="absolute left-0 top-0"
      initial={{ x: pathX(dir)[0], y: f.y, opacity: 0 }}
      animate={{ x: pathX(dir), y: [f.y, f.y - f.wave, f.y + f.wave * 0.5, f.y - f.wave * 0.3], opacity: [0, 1, 1, 0] }}
      transition={{ duration: SWEEP, delay: f.delay, ease: [0.45, 0, 0.25, 1] }}
    >
      <span className="absolute -left-7 -top-7 block h-16 w-16 rounded-full bg-accent opacity-45 blur-lg" />
      <span className="block rounded-full bg-accent" style={{ width: f.size, height: f.size }} />
    </motion.div>
  );
}

function Leaf({ l, dir }: { l: (typeof LEAVES)[number]; dir: number }) {
  return (
    <motion.svg
      viewBox="0 0 60 30"
      width={60 * l.scale}
      height={30 * l.scale}
      className="absolute left-0 top-0"
      initial={{ x: pathX(dir)[0], y: l.y, rotate: 0, opacity: 0 }}
      animate={{ x: pathX(dir), y: [l.y, l.y + 60, l.y + 20], rotate: dir * l.spin, opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: SWEEP * 1.1, delay: l.delay, ease: [0.4, 0, 0.3, 1] }}
    >
      <path d="M2 15 C 14 2, 42 2, 58 15 C 42 28, 14 28, 2 15 Z" fill="var(--color-leaf-soft)" stroke="var(--color-ink)" strokeWidth={1.5} />
      <path d="M2 15 Q 30 12, 56 15" fill="none" stroke="var(--color-ink)" strokeWidth={1} />
    </motion.svg>
  );
}

/** One sweep of fireflies and leaves. Re-keyed on every slide change so it plays once per move. */
export function TransitionSweep({ dir }: { dir: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {FIREFLIES.map((f, i) => (
        <Firefly key={i} f={f} dir={dir} />
      ))}
      {LEAVES.map((l, i) => (
        <Leaf key={i} l={l} dir={dir} />
      ))}
    </div>
  );
}

/** The slide itself: dissolves with a soft blur and drifts against the direction of travel. */
export const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 60 * dir, filter: "blur(10px)", scale: 0.985 }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -60 * dir,
    filter: "blur(10px)",
    scale: 0.985,
    transition: { duration: 0.4, ease: [0.55, 0, 0.75, 0.3] },
  }),
};
