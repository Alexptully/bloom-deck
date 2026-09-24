"use client";
import { motion } from "motion/react";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";

type Tree = { x: number; h: number; kind: "pine" | "round"; order: number };

// A fixed, hand-tuned scatter so the treeline looks natural but never changes between renders.
const TREES: Tree[] = Array.from({ length: 34 }, (_, i) => {
  const x = ((i * 577) % 1960) - 20;
  const h = 60 + ((i * 131) % 70);
  const kind = i % 3 === 0 ? "round" : "pine";
  return { x, h, kind, order: (i * 7) % 34 };
});

function Pine({ x, h }: { x: number; h: number }) {
  const w = h * 0.55;
  return <polygon points={`${x},${180 - h} ${x - w / 2},180 ${x + w / 2},180`} />;
}

function Round({ x, h }: { x: number; h: number }) {
  const r = h * 0.32;
  return (
    <g>
      <rect x={x - 4} y={180 - h * 0.45} width={8} height={h * 0.45} />
      <circle cx={x} cy={180 - h * 0.45 - r * 0.7} r={r} />
    </g>
  );
}

/**
 * The Magical Forest along the foot of every slide. `growth` runs 0 to 1 across the deck,
 * so the forest thickens as the talk goes on, the same way the garden fills over the night.
 */
export function ForestEdge({ growth }: { growth: number }) {
  const final = useFinal();
  const shown = Math.round(10 + growth * (TREES.length - 10));
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0"
      width={1920}
      height={180}
      viewBox="0 0 1920 180"
      aria-hidden
    >
      <g fill="var(--color-leaf)">
        {TREES.map((t, i) => (
          <motion.g
            key={i}
            initial={false}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            animate={{ opacity: t.order < shown ? 0.1 : 0, scaleY: t.order < shown ? 1 : 0.2 }}
            transition={{ duration: final ? 0 : durations.slow * 1.4, delay: final ? 0 : 0.4 + (t.order % 6) * 0.08, ease }}
          >
            {t.kind === "pine" ? <Pine x={t.x} h={t.h} /> : <Round x={t.x} h={t.h} />}
          </motion.g>
        ))}
      </g>
    </svg>
  );
}
