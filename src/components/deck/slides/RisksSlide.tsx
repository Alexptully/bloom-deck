"use client";
import { content } from "@/content/content";
import { Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

export function RisksSlide({ step }: SlideProps) {
  const r = content.risks;
  return (
    <Frame className="flex flex-col">
      <Heading>{r.heading}</Heading>
      <div className="mt-14 flex flex-1 flex-col divide-y divide-paper-deep">
        {r.items.map((it, i) => (
          <Reveal key={it.risk} show={step >= i + 1} className="grid grid-cols-2 gap-16 py-6">
            <p className="text-3xl">{it.risk}</p>
            <p className="text-3xl text-leaf">{it.answer}</p>
          </Reveal>
        ))}
      </div>
    </Frame>
  );
}
