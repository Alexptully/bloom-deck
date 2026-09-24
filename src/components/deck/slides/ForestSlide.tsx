"use client";
import { motion } from "motion/react";
import { content } from "@/content/content";
import { useFinal } from "@/lib/final";
import { asset } from "@/lib/asset";
import { ease, durations } from "@/lib/timing";
import { Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

// Map coordinates: a 1100 by 720 top-down plan of the demo room.
const TREE_CLUSTERS = [
  [60, 90], [150, 40], [60, 250], [30, 420], [120, 560], [520, 40], [640, 90],
  [1040, 300], [1060, 470], [980, 640], [760, 690], [420, 690], [260, 640],
] as const;

// Guests as pairs of bracelets along the path; `lit` is how many lights each pair has.
const GUESTS = [
  { x: 330, y: 470, lit: 1 }, { x: 470, y: 390, lit: 3 }, { x: 560, y: 520, lit: 2 },
  { x: 650, y: 330, lit: 5 }, { x: 760, y: 450, lit: 4 }, { x: 420, y: 560, lit: 1 },
  { x: 840, y: 330, lit: 6 },
] as const;

function Trees() {
  return (
    <g>
      {TREE_CLUSTERS.map(([x, y], i) => (
        <g key={i} fill="var(--color-leaf)">
          <circle cx={x} cy={y} r={46} opacity={0.35} />
          <circle cx={x + 34} cy={y + 18} r={32} opacity={0.5} />
          <circle cx={x - 26} cy={y + 24} r={28} opacity={0.45} />
        </g>
      ))}
    </g>
  );
}

function Fireflies({ on }: { on: boolean }) {
  const final = useFinal();
  return (
    <g>
      {GUESTS.flatMap((g, i) =>
        [0, 1].map((k) => {
          const cx = g.x + k * 26;
          const brightness = on ? 0.35 + g.lit * 0.1 : 0;
          return (
            <g key={`${i}-${k}`}>
              <motion.circle
                cx={cx}
                cy={g.y}
                r={22}
                fill="var(--color-accent)"
                style={{ filter: "blur(8px)" }}
                initial={false}
                animate={{ opacity: brightness }}
                transition={{ duration: final ? 0 : durations.slow, delay: final ? 0 : 0.08 * i, ease }}
              />
              <circle cx={cx} cy={g.y} r={7} fill={on ? "var(--color-accent)" : "var(--color-ink-muted)"} />
            </g>
          );
        }),
      )}
    </g>
  );
}

function Clearing({ full }: { full: boolean }) {
  const final = useFinal();
  return (
    <g>
      <image href={asset("/renders/garden-empty.jpg")} x={800} y={40} width={200} height={212} preserveAspectRatio="xMidYMid slice" />
      <motion.image
        href={asset("/renders/garden-full.jpg")}
        x={800}
        y={40}
        width={200}
        height={212}
        preserveAspectRatio="xMidYMid slice"
        initial={false}
        animate={{ opacity: full ? 1 : 0 }}
        transition={{ duration: final ? 0 : durations.slow, ease }}
      />
    </g>
  );
}

export function ForestSlide({ step }: SlideProps) {
  const f = content.forest;
  return (
    <Frame className="flex flex-col">
      <Heading>{f.heading}</Heading>
      <div className="mt-8 flex flex-1 gap-14">
        <svg viewBox="0 0 1100 720" width={1100} height={720} className="shrink-0 rounded-card bg-paper-raised shadow-card" role="img" aria-label="Top-down map of the demo room as a forest: planting station at the entrance, guests with glowing bracelets on the forest floor, and the projected clearing at the far end">
          <ellipse cx={560} cy={380} rx={420} ry={270} fill="var(--color-paper-deep)" opacity={0.55} />
          <Trees />
          <path d="M 170 640 C 320 560, 380 420, 560 420 S 820 300, 900 260" fill="none" stroke="var(--color-ink-muted)" strokeWidth={3} strokeDasharray="10 12" opacity={0.6} />
          <rect x={120} y={600} width={120} height={70} rx={10} fill="var(--color-ink)" />
          <circle cx={180} cy={635} r={14} fill="var(--color-ink-muted)" />
          <Fireflies on={step >= 2} />
          <Clearing full={step >= 3} />
        </svg>
        <div className="flex flex-1 flex-col justify-center gap-10">
          <Reveal show={step >= 1}>
            <p className="text-4xl leading-tight">{f.entrance}</p>
          </Reveal>
          <Reveal show={step >= 2}>
            <p className="text-4xl leading-tight">{f.wander}</p>
          </Reveal>
          <Reveal show={step >= 3}>
            <p className="text-4xl leading-tight">{f.clearing}</p>
          </Reveal>
        </div>
      </div>
    </Frame>
  );
}
