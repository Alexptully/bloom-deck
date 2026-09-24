"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

function Person({ name, step, flip }: { name: string; step: number; flip?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${flip ? "" : ""}`}>
      <Reveal show={step >= 1} delay={flip ? 0.5 : 0.1}>
        <p className="rounded-card bg-paper-raised px-8 py-4 text-3xl shadow-card">{name}</p>
      </Reveal>
      <div className="mt-6 h-[220px] w-[220px] rounded-full bg-paper-deep" aria-hidden />
      <Bloom state={step >= 2 ? "bloom" : "seed"} size={200} className="-mt-16" delay={flip ? 0.25 : 0} />
    </div>
  );
}

export function IdeaSlide({ step }: SlideProps) {
  const t = content.idea;
  return (
    <Frame className="flex flex-col">
      <Heading>{t.heading}</Heading>
      <div className="mt-12 flex flex-1 items-center gap-24">
        <div className="w-[820px] space-y-8">
          <p className="text-5xl leading-tight">{t.line1}</p>
          <Reveal show={step >= 2}>
            <p className="text-5xl leading-tight text-accent">{t.line2}</p>
          </Reveal>
          <Reveal show={step >= 3}>
            <p className="text-3xl text-ink-muted">{t.afterward}</p>
          </Reveal>
        </div>
        <div className="flex flex-1 items-end justify-center gap-24">
          <Person name="I'm Alex." step={step} />
          <Person name="I'm Maya." step={step} flip />
        </div>
      </div>
    </Frame>
  );
}
