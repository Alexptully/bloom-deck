"use client";
import { motion } from "motion/react";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";

// Two garden rows for Epley and Schroeder's commuter study, 20 plants each. The top row is the guess
// (about 45 percent expected strangers to talk, so 9 of 20 sprout); the bottom row is what happened
// (everyone who tried had a conversation, so all 20 bloom).
const COUNT = 20;
const X0 = 60;
const GAP = 50;
const ink = "var(--color-ink)";

function useDraw(show: boolean, delay: number) {
  const final = useFinal();
  const on = show || final;
  return {
    initial: final ? false : { pathLength: 0, opacity: 0 },
    animate: on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: final ? 0 : durations.slow, delay: final ? 0 : delay, ease },
  } as const;
}

function Seed({ x, ground, show, delay }: { x: number; ground: number; show: boolean; delay: number }) {
  const draw = useDraw(show, delay);
  return <motion.ellipse cx={x} cy={ground + 12} rx={8} ry={5.5} transform={`rotate(-20 ${x} ${ground + 12})`} fill="var(--color-paper-deep)" stroke={ink} strokeWidth={1.6} {...draw} />;
}

function Sprout({ x, ground, show, delay }: { x: number; ground: number; show: boolean; delay: number }) {
  const draw = useDraw(show, delay);
  const top = ground - 46;
  return (
    <g>
      <motion.path d={`M ${x} ${ground} C ${x - 5} ${ground - 18}, ${x + 5} ${ground - 32}, ${x} ${top}`} fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" {...draw} />
      <motion.path d={`M ${x} ${top} C ${x - 5} ${top - 10}, ${x - 15} ${top - 9}, ${x - 18} ${top - 2} C ${x - 12} ${top + 4}, ${x - 4} ${top + 3}, ${x} ${top} Z`} fill="var(--color-leaf-soft)" fillOpacity={0.6} stroke={ink} strokeWidth={1.5} {...draw} />
      <motion.path d={`M ${x} ${top} C ${x + 5} ${top - 10}, ${x + 15} ${top - 9}, ${x + 18} ${top - 2} C ${x + 12} ${top + 4}, ${x + 4} ${top + 3}, ${x} ${top} Z`} fill="var(--color-leaf-soft)" fillOpacity={0.6} stroke={ink} strokeWidth={1.5} {...draw} />
    </g>
  );
}

/** A small eight-petal flower, the same eight as the bracelet's lights. */
function Flower({ x, ground, show, delay }: { x: number; ground: number; show: boolean; delay: number }) {
  const draw = useDraw(show, delay);
  const head = ground - 96;
  return (
    <g>
      <motion.path d={`M ${x} ${ground} C ${x - 6} ${ground - 30}, ${x + 6} ${ground - 60}, ${x} ${head}`} fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" {...draw} />
      <motion.path d={`M ${x} ${ground - 36} C ${x - 8} ${ground - 50}, ${x - 22} ${ground - 48}, ${x - 24} ${ground - 40} C ${x - 16} ${ground - 33}, ${x - 6} ${ground - 33}, ${x} ${ground - 36} Z`} fill="var(--color-leaf-soft)" fillOpacity={0.6} stroke={ink} strokeWidth={1.4} {...draw} />
      {Array.from({ length: 8 }, (_, i) => (
        <motion.ellipse key={i} cx={x} cy={head - 11} rx={5} ry={11} transform={`rotate(${i * 45} ${x} ${head})`} fill="var(--color-accent)" fillOpacity={0.85} stroke={ink} strokeWidth={1.2} {...draw} />
      ))}
      <motion.circle cx={x} cy={head} r={5} fill="var(--color-leaf)" stroke={ink} strokeWidth={1.2} {...draw} />
    </g>
  );
}

function Soil({ ground }: { ground: number }) {
  return (
    <g>
      <path d={`M 20 ${ground} C 300 ${ground - 3}, 700 ${ground + 4}, 1060 ${ground - 1}`} fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" />
      {Array.from({ length: 30 }, (_, i) => (
        <circle key={i} cx={30 + ((i * 97) % 1020)} cy={ground + 8 + ((i * 53) % 22)} r={1.4 + (i % 3) * 0.5} fill="var(--color-ink-muted)" opacity={0.45} />
      ))}
    </g>
  );
}

function RowLabel({ y, title, detail, show }: { y: number; title: string; detail: string; show: boolean }) {
  const final = useFinal();
  return (
    <motion.g initial={false} animate={{ opacity: show || final ? 1 : 0 }} transition={{ duration: final ? 0 : durations.base, ease }}>
      <text x={20} y={y} className="fill-ink text-3xl">{title}</text>
      <text x={20} y={y + 36} className="fill-ink-muted text-2xl">{detail}</text>
    </motion.g>
  );
}

const xAt = (i: number) => X0 + i * GAP;

export type Row = { title: string; detail: string };

/** Top row shows at `guess`, bottom row blooms at `actual`. */
export function StrangerPlate({ guessRow, actualRow, sprouted, guess, actual }: { guessRow: Row; actualRow: Row; sprouted: number; guess: boolean; actual: boolean }) {
  const topGround = 250;
  const bottomGround = 560;
  return (
    <svg viewBox="0 0 1080 640" width={1080} height={640} role="img" aria-label="Two rows of 20 plants. In the top row, what commuters guessed, only 9 have sprouted. In the bottom row, what happened, all 20 are in bloom.">
      <RowLabel y={60} title={guessRow.title} detail={guessRow.detail} show={guess} />
      <Soil ground={topGround} />
      {Array.from({ length: COUNT }, (_, i) =>
        i < sprouted ? <Sprout key={i} x={xAt(i)} ground={topGround} show={guess} delay={0.05 * i} /> : <Seed key={i} x={xAt(i)} ground={topGround} show={guess} delay={0.05 * i} />,
      )}
      <RowLabel y={340} title={actualRow.title} detail={actualRow.detail} show={actual} />
      <Soil ground={bottomGround} />
      {Array.from({ length: COUNT }, (_, i) => (
        <Flower key={i} x={xAt(i)} ground={bottomGround} show={actual} delay={0.06 * i} />
      ))}
    </svg>
  );
}
