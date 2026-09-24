"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, LightRing, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

// Each guest arrives having met three people; the introduction lights their fourth.
function Person({ name, step, delay }: { name: string; step: number; delay: number }) {
  return (
    <div className="flex flex-col items-center">
      <Reveal show={step >= 1} delay={delay}>
        <p className="rounded-card bg-paper-raised px-8 py-4 text-3xl shadow-card">{name}</p>
      </Reveal>
      <LightRing lit={step >= 2 ? 4 : 3} newest={step >= 2} size={250} className="mt-4" />
      <Reveal show={step >= 3} className="-mt-2 flex flex-col items-center">
        <Bloom state="sprout" size={130} />
      </Reveal>
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
        <div className="flex flex-1 items-start justify-center gap-24">
          <Person name="I'm Alex." step={step} delay={0.1} />
          <Person name="I'm Maya." step={step} delay={0.5} />
        </div>
      </div>
    </Frame>
  );
}
