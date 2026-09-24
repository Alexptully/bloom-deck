"use client";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useFinal } from "@/lib/final";
import { ease, durations } from "@/lib/timing";

/** Fades and lifts children in once `show` is true. */
export function Reveal({
  show,
  delay = 0,
  children,
  className,
}: {
  show: boolean;
  delay?: number;
  children: ReactNode;
  className?: string;
}) {
  const final = useFinal();
  const visible = show || final;
  return (
    <motion.div
      className={className}
      initial={final ? false : { opacity: 0, y: 18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: final ? 0 : durations.base, delay: final ? 0 : delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Counts from 0 to `to` when `show` flips on. */
export function CountUp({ to, show, suffix = "" }: { to: number; show: boolean; suffix?: string }) {
  const final = useFinal();
  const value = useMotionValue(final ? to : 0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (!show || final) return;
    const controls = animate(value, to, { duration: durations.slow, ease });
    return () => controls.stop();
  }, [show, to, value, final]);
  return <motion.span>{text}</motion.span>;
}

export type BloomState = "seed" | "sprout" | "bloom";
const openness: Record<BloomState, number> = { seed: 0.12, sprout: 0.55, bloom: 1 };

type BloomProps = {
  state: BloomState;
  size?: number;
  petal?: string;
  core?: string;
  muted?: boolean;
  delay?: number;
  breathe?: boolean;
  className?: string;
};

function petalGeometry(open: number) {
  return {
    cy: 100 - 10 - 40 * open,
    rx: 8 + 20 * open,
    ry: 12 + 38 * open,
    opacity: 0.45 + 0.55 * open,
    coreRadius: 12 + 8 * open,
    glow: open > 0.9,
  };
}

function bloomColors(muted: boolean, petal: string, core: string) {
  if (muted) return { fill: "var(--color-muted)", core: "var(--color-ink-muted)" };
  return { fill: petal, core };
}

function withDefaults(p: BloomProps) {
  return {
    size: p.size ?? 200,
    muted: p.muted ?? false,
    delay: p.delay ?? 0,
    breathe: p.breathe ?? false,
    petal: p.petal ?? "var(--color-accent)",
    core: p.core ?? "var(--color-leaf)",
  };
}

/** Motion settings shared by every part of the flower; on the print route everything is instant. */
function useBloomMotion(delay: number) {
  const final = useFinal();
  const transition = { duration: final ? 0 : durations.slow, delay: final ? 0 : delay, ease };
  const initial = <T,>(value: T): T | false => (final ? false : value);
  return { final, transition, initial };
}

const breathAnimation = (on: boolean) => (on ? { scale: [1, 1.03, 1] } : { scale: 1 });

/**
 * The deck motif: an eight-petal flower that opens from a seed.
 * Drawn in a 200 by 200 box; the same ring is the LED layout on the bracelet.
 */
export function Bloom(props: BloomProps) {
  const o = withDefaults(props);
  const geo = petalGeometry(openness[props.state]);
  const colors = bloomColors(o.muted, o.petal, o.core);
  const m = useBloomMotion(o.delay);
  const glowOpacity = geo.glow && !o.muted ? 0.28 : 0;
  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={o.size}
      height={o.size}
      className={props.className}
      aria-hidden
      animate={breathAnimation(o.breathe && !m.final)}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.circle
        cx={100}
        cy={100}
        initial={m.initial({ r: 0, opacity: 0 })}
        animate={{ r: geo.glow ? 96 : 0, opacity: glowOpacity }}
        transition={m.transition}
        fill={colors.fill}
        style={{ filter: "blur(18px)" }}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45} 100 100)`}>
          <motion.ellipse
            cx={100}
            initial={m.initial({ cy: 92, rx: 6, ry: 10, opacity: 0.4 })}
            animate={{ cy: geo.cy, rx: geo.rx, ry: geo.ry, opacity: geo.opacity }}
            transition={m.transition}
            fill={colors.fill}
          />
        </g>
      ))}
      <motion.circle
        cx={100}
        cy={100}
        initial={m.initial({ r: 10 })}
        animate={{ r: geo.coreRadius }}
        transition={m.transition}
        fill={colors.core}
      />
    </motion.svg>
  );
}

/** A slide heading in the display face. */
export function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-display text-7xl leading-[1.05] text-ink ${className}`}>{children}</h2>;
}

/** Standard slide padding; every slide sits inside one. */
export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`absolute inset-0 px-32 pt-28 pb-40 ${className}`}>{children}</div>;
}
