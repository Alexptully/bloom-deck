"use client";
import { content } from "@/content/content";
import { CountUp, Frame, Heading } from "../primitives";
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
        </div>
        <GrowthPlate stages={p.stages} grown={step >= 2} />
      </div>
    </Frame>
  );
}
