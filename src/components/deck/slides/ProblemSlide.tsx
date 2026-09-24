"use client";
import { content } from "@/content/content";
import { CountUp, Frame, Heading, Reveal } from "../primitives";
import { GrowthPlate } from "../GrowthPlate";
import type { SlideProps } from "../slides";

export function ProblemSlide({ step }: SlideProps) {
  const p = content.problem;
  return (
    <Frame className="flex flex-col">
      <Heading>{p.heading}</Heading>
      <div className="mt-6 flex flex-1 items-center gap-12">
        <div className="w-[600px] shrink-0">
          <p className="font-display text-hero text-ink">
            <CountUp to={p.stat.value} suffix={p.stat.suffix} show={step >= 1} />
          </p>
          <p className="mt-4 text-3xl leading-snug">{p.stat.label}</p>
          <Reveal show={step >= 2} delay={0.2}>
            <p className="mt-8 text-xl leading-snug text-ink-muted">{p.study}</p>
          </Reveal>
          <Reveal show={step >= 3} delay={0.1}>
            <p className="mt-10 text-3xl leading-snug text-leaf">{p.role}</p>
          </Reveal>
        </div>
        <GrowthPlate stages={p.stages} grown={step >= 2} />
      </div>
    </Frame>
  );
}
