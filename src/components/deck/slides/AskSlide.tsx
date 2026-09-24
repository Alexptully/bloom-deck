"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

const colors = ["var(--color-accent)", "var(--color-leaf-soft)", "var(--color-accent-soft)", "var(--color-leaf)"];

export function AskSlide({ step }: SlideProps) {
  const a = content.ask;
  const flowers = Math.min(step, 4) * 6;
  return (
    <Frame className="flex flex-col">
      <Heading>{a.heading}</Heading>
      <div className="mt-12 flex flex-1 gap-16">
        <ul className="flex w-[820px] flex-col gap-8">
          {a.asks.map((k, i) => (
            <Reveal key={k.label} show={step >= i + 1}>
              <p className="text-4xl">{k.label}</p>
              <p className="mt-1 text-2xl text-ink-muted">{k.detail}</p>
            </Reveal>
          ))}
          <Reveal show={step >= 5}>
            <p className="mt-6 font-display text-6xl text-accent">{a.close}</p>
          </Reveal>
        </ul>
        <div className="grid flex-1 grid-cols-6 content-center gap-2">
          {Array.from({ length: 24 }, (_, i) => (
            <Bloom key={i} state={i < flowers ? "bloom" : "seed"} size={120} delay={0.05 * (i % 6)} petal={colors[i % 4]} />
          ))}
        </div>
      </div>
    </Frame>
  );
}
