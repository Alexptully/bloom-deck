"use client";
import { content } from "@/content/content";
import { Frame, Heading, Reveal } from "../primitives";
import { StrangerPlate } from "../StrangerPlate";
import type { SlideProps } from "../slides";

export function ProblemSlide({ step }: SlideProps) {
  const p = content.problem;
  return (
    <Frame className="flex flex-col">
      <Heading>{p.heading}</Heading>
      <div className="mt-6 flex flex-1 items-center gap-12">
        <div className="w-[600px] shrink-0">
          <p className="font-display text-hero text-ink">{p.stat.value}</p>
          <p className="mt-4 text-3xl leading-snug">{p.stat.label}</p>
          <p className="mt-6 text-2xl leading-snug text-ink-muted">{p.detail}</p>
          <Reveal show={step >= 3} delay={0.1}>
            <div className="mt-12 flex items-baseline gap-5">
              <p className="font-display text-6xl text-leaf">{p.events.value}</p>
              <p className="text-2xl leading-snug">{p.events.label}</p>
            </div>
          </Reveal>
        </div>
        <StrangerPlate guessRow={p.guessRow} actualRow={p.actualRow} sprouted={p.sprouted} guess={step >= 1} actual={step >= 2} />
      </div>
    </Frame>
  );
}
