"use client";
import { content } from "@/content/content";
import { Bloom, CountUp, Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

export function ProblemSlide({ step }: SlideProps) {
  const p = content.problem;
  const contacts = [0, 1, 2, 3, 4];
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
            <p className="mt-8 max-w-[760px] text-2xl text-ink-muted">{p.rate}</p>
          </Reveal>
        </div>
        <div className="flex flex-1 flex-wrap items-center justify-center gap-6">
          {contacts.map((i) => (
            <Bloom key={i} state="bloom" size={180} muted={step >= 2 && i > 0} delay={0.08 * i} />
          ))}
        </div>
      </div>
    </Frame>
  );
}
