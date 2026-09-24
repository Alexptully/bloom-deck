"use client";
import { motion } from "motion/react";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";

// A botanical-plate drawing of Hall's friendship thresholds. Plants sit on a real hour scale:
// x = 90 + hours * 4.4, so 0 h, 50 h, 90 h and 200 h land where the data says they should.
const GROUND = 470;
const hourX = (hours: number) => 90 + hours * 4.4;

export type Stage = { hours: number; label: string; time: string };

const ink = "var(--color-ink)";
const leafFill = "var(--color-leaf-soft)";

function useDraw(show: boolean, delay: number) {
  const final = useFinal();
  const on = show || final;
  return {
    initial: final ? false : { pathLength: 0, opacity: 0 },
    animate: on ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: { duration: final ? 0 : durations.slow, delay: final ? 0 : delay, ease },
  } as const;
}

function Leaf({ x, y, flip, show, delay }: { x: number; y: number; flip: boolean; show: boolean; delay: number }) {
  const s = flip ? -1 : 1;
  const draw = useDraw(show, delay);
  const outline = `M ${x} ${y} C ${x + 18 * s} ${y - 26}, ${x + 52 * s} ${y - 22}, ${x + 62 * s} ${y - 6} C ${x + 44 * s} ${y + 8}, ${x + 16 * s} ${y + 8}, ${x} ${y} Z`;
  const vein = `M ${x} ${y} Q ${x + 30 * s} ${y - 8}, ${x + 58 * s} ${y - 6}`;
  return (
    <g>
      <motion.path d={outline} fill={leafFill} fillOpacity={0.55} stroke={ink} strokeWidth={2} {...draw} />
      <motion.path d={vein} fill="none" stroke={ink} strokeWidth={1.2} {...draw} />
    </g>
  );
}

function Stem({ x, height, show, delay }: { x: number; height: number; show: boolean; delay: number }) {
  const draw = useDraw(show, delay);
  const d = `M ${x} ${GROUND} C ${x - 10} ${GROUND - height * 0.35}, ${x + 12} ${GROUND - height * 0.7}, ${x + 2} ${GROUND - height}`;
  return <motion.path d={d} fill="none" stroke={ink} strokeWidth={2.4} strokeLinecap="round" {...draw} />;
}

function Seed({ x, show }: { x: number; show: boolean }) {
  const draw = useDraw(show, 0);
  return (
    <g>
      <motion.ellipse cx={x} cy={GROUND + 26} rx={13} ry={9} transform={`rotate(-20 ${x} ${GROUND + 26})`} fill="var(--color-paper-deep)" stroke={ink} strokeWidth={2} {...draw} />
      <motion.path d={`M ${x + 3} ${GROUND + 18} q 4 -10 1 -18`} fill="none" stroke={ink} strokeWidth={1.6} strokeLinecap="round" {...draw} />
    </g>
  );
}

function Bud({ x, y, show, delay }: { x: number; y: number; show: boolean; delay: number }) {
  const draw = useDraw(show, delay);
  const d = `M ${x} ${y} C ${x - 16} ${y - 10}, ${x - 10} ${y - 38}, ${x} ${y - 46} C ${x + 10} ${y - 38}, ${x + 16} ${y - 10}, ${x} ${y} Z`;
  return <motion.path d={d} fill="var(--color-accent-soft)" stroke={ink} strokeWidth={2} {...draw} />;
}

/** Eight petals, the same eight as the bracelet's lights. */
function Flower({ x, y, show, delay }: { x: number; y: number; show: boolean; delay: number }) {
  const draw = useDraw(show, delay);
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g>
      {petals.map((angle) => (
        <motion.ellipse key={angle} cx={x} cy={y - 30} rx={13} ry={30} transform={`rotate(${angle} ${x} ${y})`} fill="var(--color-accent)" fillOpacity={0.85} stroke={ink} strokeWidth={1.8} {...draw} />
      ))}
      <motion.circle cx={x} cy={y} r={13} fill="var(--color-leaf)" stroke={ink} strokeWidth={1.8} {...draw} />
    </g>
  );
}

function Sprout({ show }: { show: boolean }) {
  const x = hourX(50);
  return (
    <g>
      <Stem x={x} height={80} show={show} delay={0.1} />
      <Leaf x={x - 3} y={GROUND - 72} flip={false} show={show} delay={0.5} />
      <Leaf x={x - 3} y={GROUND - 72} flip show={show} delay={0.55} />
    </g>
  );
}

function Budding({ show }: { show: boolean }) {
  const x = hourX(90);
  return (
    <g>
      <Stem x={x} height={180} show={show} delay={0.3} />
      <Leaf x={x - 2} y={GROUND - 70} flip show={show} delay={0.7} />
      <Leaf x={x + 4} y={GROUND - 120} flip={false} show={show} delay={0.8} />
      <Bud x={x + 2} y={GROUND - 178} show={show} delay={1.0} />
    </g>
  );
}

function FullBloom({ show }: { show: boolean }) {
  const x = hourX(200);
  return (
    <g>
      <Stem x={x} height={290} show={show} delay={0.5} />
      <Leaf x={x - 3} y={GROUND - 80} flip show={show} delay={0.9} />
      <Leaf x={x + 4} y={GROUND - 150} flip={false} show={show} delay={1.0} />
      <Leaf x={x + 2} y={GROUND - 215} flip show={show} delay={1.1} />
      <Flower x={x + 2} y={GROUND - 330} show={show} delay={1.3} />
    </g>
  );
}

function Ground() {
  return (
    <g>
      <path d={`M 40 ${GROUND} C 300 ${GROUND - 4}, 600 ${GROUND + 5}, 1040 ${GROUND - 2}`} fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" />
      {Array.from({ length: 42 }, (_, i) => (
        <circle key={i} cx={50 + ((i * 97) % 990)} cy={GROUND + 12 + ((i * 53) % 40)} r={1.6 + (i % 3) * 0.6} fill="var(--color-ink-muted)" opacity={0.45} />
      ))}
    </g>
  );
}

function Label({ stage, show }: { stage: Stage; show: boolean }) {
  const final = useFinal();
  const x = hourX(stage.hours);
  return (
    <motion.g initial={false} animate={{ opacity: show || final ? 1 : 0 }} transition={{ duration: final ? 0 : durations.base, ease }}>
      <line x1={x} y1={GROUND + 58} x2={x} y2={GROUND + 72} stroke={ink} strokeWidth={1.2} />
      <text x={x} y={GROUND + 104} textAnchor="middle" className="fill-ink text-2xl">{stage.label}</text>
      <text x={x} y={GROUND + 138} textAnchor="middle" className="fill-ink-muted text-xl">{stage.time}</text>
    </motion.g>
  );
}

/** Seed, sprout, bud and bloom placed on an hours scale. The seed shows first; the rest grow at `grown`. */
export function GrowthPlate({ stages, grown }: { stages: readonly Stage[]; grown: boolean }) {
  return (
    <svg viewBox="0 0 1080 640" width={1080} height={640} role="img" aria-label="Botanical drawing on an hours scale: a seed at the first conversation, a sprout at about 50 hours for a casual friend, a bud at about 90 hours for a friend, and a flower in full bloom past 200 hours for a close friend">
      <Ground />
      <Seed x={hourX(0)} show />
      <Sprout show={grown} />
      <Budding show={grown} />
      <FullBloom show={grown} />
      {stages.map((stage, i) => (
        <Label key={stage.label} stage={stage} show={i === 0 || grown} />
      ))}
    </svg>
  );
}
