"use client";
import { content } from "@/content/content";
import { Bloom, CountUp, Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

export function ProblemSlide({ step }: SlideProps) {
  const p = content.problem;
  // Five students, three of them lonely (60 percent) until step 3, when every one has met someone.
  const students = [0, 1, 2, 3, 4];
  const isLonely = (i: number) => step < 3 && i < 3;
  return (
    <Frame className="flex flex-col">
      <Heading>{p.heading}</Heading>
      <div className="mt-16 flex flex-1 items-center gap-24">
        <div className="w-[880px]">
          <p className="font-display text-hero text-accent">
            <CountUp to={p.stat.value} suffix={p.stat.suffix} show={step >= 1} />
          </p>
          <p className="mt-2 text-4xl leading-tight">{p.stat.label}</p>
          <Reveal show={step >= 2} delay={0.1}>
            <p className="mt-8 text-3xl text-ink-muted">{p.detail}</p>
          </Reveal>
          <Reveal show={step >= 3} delay={0.1}>
            <p className="mt-8 max-w-[760px] text-3xl text-accent">{p.rate}</p>
          </Reveal>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-6">
          {students.map((i) => (
            <Bloom key={i} state={isLonely(i) ? "seed" : "bloom"} size={180} muted={isLonely(i)} delay={0.08 * i} />
          ))}
        </div>
      </div>
    </Frame>
  );
}
