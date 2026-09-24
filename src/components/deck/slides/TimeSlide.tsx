"use client";
import { motion } from "motion/react";
import { content } from "@/content/content";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";
import { Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

// Hours per week drawn as a row of stems on a real scale. Crunch weeks flower.
const W = 1100;
const H = 560;
const GROUND = 460;
const PX_PER_HOUR = 22;
const colX = (i: number) => 60 + i * 96;
const top = (hours: number) => GROUND - hours * PX_PER_HOUR;

function Stem({ week, hours, label }: { week: number; hours: number; label?: string }) {
  const final = useFinal();
  const x = colX(week);
  const y = top(hours);
  const draw = { initial: final ? false : { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: final ? 0 : durations.slow, delay: final ? 0 : 0.3 + week * 0.06, ease } } as const;
  return (
    <g>
      <motion.path d={`M ${x} ${GROUND} C ${x - 6} ${GROUND - (GROUND - y) * 0.4}, ${x + 6} ${GROUND - (GROUND - y) * 0.7}, ${x} ${y}`} fill="none" stroke="var(--color-ink)" strokeWidth={label ? 3 : 2} strokeLinecap="round" {...draw} />
      <motion.path d={`M ${x} ${GROUND - 40} c -10 -14 -26 -12 -30 -2 c 10 8 22 8 30 2 Z`} fill="var(--color-leaf-soft)" fillOpacity={0.6} stroke="var(--color-ink)" strokeWidth={1.4} {...draw} />
      {label ? <Flower x={x} y={y} delay={0.9 + week * 0.06} /> : <circle cx={x} cy={y} r={5} fill="var(--color-leaf)" />}
      {label ? <text x={x} y={y - 42} textAnchor="middle" className="fill-ink text-2xl">{label}</text> : null}
      <text x={x} y={GROUND + 40} textAnchor="middle" className="fill-ink-muted text-xl">{week}</text>
      <text x={x} y={y + (label ? 0 : -14)} dx={label ? 30 : 0} textAnchor={label ? "start" : "middle"} className="fill-ink-muted text-lg">{hours}</text>
    </g>
  );
}

function Flower({ x, y, delay }: { x: number; y: number; delay: number }) {
  const final = useFinal();
  return (
    <motion.g initial={final ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: final ? 0 : durations.base, delay: final ? 0 : delay, ease }} style={{ transformOrigin: `${x}px ${y}px` }}>
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx={x} cy={y - 12} rx={6} ry={12} transform={`rotate(${i * 45} ${x} ${y})`} fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth={1.2} />
      ))}
      <circle cx={x} cy={y} r={6} fill="var(--color-leaf)" stroke="var(--color-ink)" strokeWidth={1.2} />
    </motion.g>
  );
}

function HoursChart() {
  const t = content.time;
  const avgY = top(t.average);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`Hours per person for weeks 0 to 10: ${t.weeks.join(", ")}. Average ${t.average}.`}>
      <line x1={20} x2={W - 20} y1={avgY} y2={avgY} stroke="var(--color-accent)" strokeWidth={2} strokeDasharray="8 10" />
      <text x={20} y={avgY - 12} className="fill-ink text-xl">{t.average} h average</text>
      <path d={`M 20 ${GROUND} H ${W - 20}`} stroke="var(--color-ink)" strokeWidth={2} />
      {t.weeks.map((hours, week) => (
        <Stem key={week} week={week} hours={hours} label={t.crunch[week]} />
      ))}
      <text x={W / 2} y={GROUND + 80} textAnchor="middle" className="fill-ink-muted text-xl">Week</text>
    </svg>
  );
}

export function TimeSlide({ step }: SlideProps) {
  const t = content.time;
  return (
    <Frame className="flex flex-col">
      <Heading>{t.heading}</Heading>
      <div className="mt-6 flex flex-1 items-center gap-16">
        <HoursChart />
        <Reveal show={step >= 2} className="flex flex-1 flex-col gap-8">
          {t.rhythm.map((r) => (
            <div key={r.label}>
              <p className="text-4xl">{r.label}</p>
              <p className="mt-1 text-2xl text-ink-muted">{r.detail}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </Frame>
  );
}
