"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

export function AmberSlide({ step }: SlideProps) {
  const a = content.amber;
  return (
    <Frame className="flex flex-col">
      <Heading>{a.heading}</Heading>
      <div className="mt-14 flex flex-1 gap-24">
        <ul className="flex w-[1000px] flex-col gap-9">
          {a.points.map((p, i) => (
            <Reveal key={p.label} show={step >= i + 1}>
              <p className="text-4xl">{p.label}</p>
              <p className="mt-2 text-2xl leading-snug text-ink-muted">{p.detail}</p>
            </Reveal>
          ))}
        </ul>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="rounded-card bg-paper-raised px-10 py-8 text-center shadow-card">
            <p className="text-3xl">Amber</p>
            <p className="mt-1 text-2xl text-ink-muted">speech in, people out</p>
          </div>
          <div className="my-6 h-24 w-[3px] bg-paper-deep" aria-hidden />
          <div className="flex items-center gap-8 rounded-card bg-paper-raised px-10 py-8 shadow-card">
            <Bloom state={step >= 4 ? "bloom" : "sprout"} size={120} />
            <div>
              <p className="text-3xl">Bloom</p>
              <p className="mt-1 text-2xl text-ink-muted">bracelet, pairing, garden</p>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
