"use client";
import { content } from "@/content/content";
import { Bloom, Reveal, type BloomState } from "../primitives";
import type { SlideProps } from "../slides";

const states: BloomState[] = ["seed", "sprout", "bloom"];

export function TitleSlide({ step }: SlideProps) {
  const t = content.title;
  return (
    <div className="absolute inset-0 flex items-center px-32">
      <div className="flex-1">
        <h1 className="font-display text-display text-ink">{t.name}</h1>
        <Reveal show={step >= 2} delay={0.2}>
          <p className="mt-10 max-w-[760px] text-5xl leading-[1.15] text-ink">{t.tagline}</p>
        </Reveal>
        <Reveal show={step >= 3} delay={0.4}>
          <p className="mt-12 text-2xl text-ink-muted">{t.byline}</p>
        </Reveal>
      </div>
      <div className="flex w-[760px] items-center justify-center">
        <Bloom state={states[Math.min(step, 3) - 1]} size={640} breathe={step === 1} />
      </div>
    </div>
  );
}
