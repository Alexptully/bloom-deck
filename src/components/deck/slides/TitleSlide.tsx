"use client";
import { content } from "@/content/content";
import { Bloom, LightRing, Reveal, type BloomState } from "../primitives";
import type { SlideProps } from "../slides";

// Wrist and wall grow together: 0, 1, then all 8 lights, beside the flower they drive.
const lights = [0, 1, 8];
const flower: BloomState[] = ["seed", "sprout", "bloom"];

export function TitleSlide({ step }: SlideProps) {
  const t = content.title;
  const i = Math.min(step, 3) - 1;
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
      <div className="flex w-[820px] items-center justify-center gap-4">
        <LightRing lit={lights[i]} size={440} newest={step === 2} />
        <Bloom state={flower[i]} size={340} />
      </div>
    </div>
  );
}
