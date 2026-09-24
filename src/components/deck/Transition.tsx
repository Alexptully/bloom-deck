"use client";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

/**
 * How a slide arrives. Each slide picks one in `slides.ts`, so moves through the deck vary:
 * fade (soft focus), drift (slides in slightly from the direction of travel), rise (grows up
 * from the ground), bloom (opens from the centre like a flower) and settle (eases back from a
 * touch closer). All of them are short and move only a few pixels.
 */
export type Arrival = "fade" | "drift" | "rise" | "bloom" | "settle";

/** Optional light effect over the stage while a slide arrives. */
export type Accent = "none" | "glow" | "fireflies";

export type TransitionCustom = { dir: number; arrival: Arrival };

const easeOut = [0.22, 1, 0.36, 1] as const;
const arriveTransition = { duration: 0.7, delay: 0.18, ease: easeOut };

const arrivals: Record<Arrival, (dir: number) => Record<string, string | number>> = {
  fade: () => ({ opacity: 0, filter: "blur(6px)" }),
  drift: (dir) => ({ opacity: 0, x: 28 * dir, filter: "blur(4px)" }),
  rise: () => ({ opacity: 0, y: 26, filter: "blur(4px)" }),
  bloom: () => ({ opacity: 0, clipPath: "circle(18% at 50% 50%)", filter: "blur(4px)" }),
  settle: () => ({ opacity: 0, scale: 1.025, filter: "blur(5px)" }),
};

export const slideVariants: Variants = {
  enter: ({ dir, arrival }: TransitionCustom) => arrivals[arrival](dir),
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    clipPath: "circle(100% at 50% 50%)",
    transition: arriveTransition,
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

/** One soft amber glow in the middle of the stage, like a bracelet light coming on. */
function Glow() {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-[160px]"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [0, 0.16, 0], scale: [0.6, 1, 1.1] }}
      transition={{ duration: 1.6, ease: "easeInOut" }}
    />
  );
}

const FIREFLIES = [
  { x: 380, y: 620, dx: 120, dy: -140 },
  { x: 900, y: 760, dx: -80, dy: -180 },
  { x: 1340, y: 540, dx: 140, dy: -120 },
  { x: 1620, y: 780, dx: -60, dy: -160 },
];

/** Four fireflies that rise slowly and fade, as if the room just lit up. */
function Fireflies() {
  return (
    <>
      {FIREFLIES.map((f, i) => (
        <motion.span
          key={i}
          className="absolute block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_20px_8px_var(--color-accent)]"
          style={{ left: f.x, top: f.y }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0.8, 0], x: f.dx, y: f.dy }}
          transition={{ duration: 2.2, delay: 0.15 * i, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

/** Plays a slide's accent once. Re-keyed per slide so it runs on arrival only. */
export function TransitionAccent({ accent }: { accent: Accent }) {
  if (accent === "none") return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden>
      {accent === "glow" ? <Glow /> : <Fireflies />}
    </div>
  );
}
