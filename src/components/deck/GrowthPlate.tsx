"use client";
import type React from "react";
import { motion } from "motion/react";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";

// A botanical-plate drawing of the liking gap study (Boothby et al. 2018, Study 5). Plants sit on a
// month scale from September (0) to May (8) at the five times the suitemates were surveyed.
const GROUND = 430;
const monthX = (month: number) => 110 + month * 108;

export type Plant = "seed" | "sprout" | "leafy" | "bud" | "bloom";
export type Survey = { month: number; label: string; plant: Plant };

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

function Sprout({ x, show }: { x: number; show: boolean }) {
  return (
    <g>
      <Stem x={x} height={70} show={show} delay={0.1} />
      <Leaf x={x - 3} y={GROUND - 62} flip={false} show={show} delay={0.4} />
      <Leaf x={x - 3} y={GROUND - 62} flip show={show} delay={0.45} />
    </g>
  );
}

function Leafy({ x, show }: { x: number; show: boolean }) {
  return (
    <g>
      <Stem x={x} height={130} show={show} delay={0.2} />
      <Leaf x={x - 2} y={GROUND - 60} flip show={show} delay={0.5} />
      <Leaf x={x + 3} y={GROUND - 100} flip={false} show={show} delay={0.6} />
      <Leaf x={x + 2} y={GROUND - 128} flip show={show} delay={0.7} />
    </g>
  );
}

function Budding({ x, show }: { x: number; show: boolean }) {
  return (
    <g>
      <Stem x={x} height={190} show={show} delay={0.3} />
      <Leaf x={x - 2} y={GROUND - 70} flip show={show} delay={0.7} />
      <Leaf x={x + 4} y={GROUND - 125} flip={false} show={show} delay={0.8} />
      <Bud x={x + 2} y={GROUND - 188} show={show} delay={1.0} />
    </g>
  );
}

function FullBloom({ x, show }: { x: number; show: boolean }) {
  return (
    <g>
      <Stem x={x} height={280} show={show} delay={0.5} />
      <Leaf x={x - 3} y={GROUND - 80} flip show={show} delay={0.9} />
      <Leaf x={x + 4} y={GROUND - 150} flip={false} show={show} delay={1.0} />
      <Leaf x={x + 2} y={GROUND - 210} flip show={show} delay={1.1} />
      <Flower x={x + 2} y={GROUND - 320} show={show} delay={1.3} />
    </g>
  );
}

const plants: Record<Plant, (props: { x: number; show: boolean }) => React.ReactElement> = {
  seed: Seed,
  sprout: Sprout,
  leafy: Leafy,
  bud: Budding,
  bloom: FullBloom,
};

function Ground() {
  return (
    <g>
      <path d={`M 40 ${GROUND} C 300 ${GROUND - 4}, 600 ${GROUND + 5}, 1040 ${GROUND - 2}`} fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" />
      {Array.from({ length: 42 }, (_, i) => (
        <circle key={i} cx={50 + ((i * 97) % 990)} cy={GROUND + 10 + ((i * 53) % 30)} r={1.6 + (i % 3) * 0.6} fill="var(--color-ink-muted)" opacity={0.45} />
      ))}
    </g>
  );
}

function Fade({ show, children }: { show: boolean; children: React.ReactNode }) {
  const final = useFinal();
  return (
    <motion.g initial={false} animate={{ opacity: show || final ? 1 : 0 }} transition={{ duration: final ? 0 : durations.base, ease }}>
      {children}
    </motion.g>
  );
}

/** The bracket under the months where the gap was measured, and the note where it closed. */
function GapBracket({ from, to, closedAt, gap, closed, show }: { from: number; to: number; closedAt: number; gap: string; closed: string; show: boolean }) {
  const y = GROUND + 110;
  return (
    <Fade show={show}>
      <path d={`M ${monthX(from)} ${y - 12} V ${y} H ${monthX(to)} V ${y - 12}`} fill="none" stroke="var(--color-accent)" strokeWidth={3} strokeLinecap="round" />
      <text x={(monthX(from) + monthX(to)) / 2} y={y + 42} textAnchor="middle" className="fill-ink text-2xl">{gap}</text>
      <text x={monthX(closedAt)} y={y + 42} textAnchor="middle" className="fill-leaf text-2xl">{closed}</text>
    </Fade>
  );
}

/** Five survey months drawn as one plant growing. The seed shows first; the rest grow at `grown`. */
export function GrowthPlate({ surveys, gap, closed, grown }: { surveys: readonly Survey[]; gap: string; closed: string; grown: boolean }) {
  const gapped = surveys.slice(0, -1);
  const last = surveys[surveys.length - 1];
  return (
    <svg viewBox="0 0 1080 640" width={1080} height={640} role="img" aria-label="A plant drawn growing from a seed in September to a flower in May. Under September to February, a bracket reads still underestimating; at May the gap has closed">
      <Ground />
      {surveys.map((s, i) => {
        const Draw = plants[s.plant];
        const show = i === 0 || grown;
        return (
          <g key={s.label}>
            <Draw x={monthX(s.month)} show={show} />
            <Fade show={show}>
              <text x={monthX(s.month)} y={GROUND + 70} textAnchor="middle" className="fill-ink-muted text-2xl">{s.label}</text>
            </Fade>
          </g>
        );
      })}
      <GapBracket from={gapped[0].month} to={gapped[gapped.length - 1].month} closedAt={last.month} gap={gap} closed={closed} show={grown} />
    </svg>
  );
}
