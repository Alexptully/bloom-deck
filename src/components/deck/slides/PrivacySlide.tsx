"use client";
import { content } from "@/content/content";
import { Frame, Heading, LightRing, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

// The bracelet's state for each rule: consent (dark), listening (lights pulse), muted (dim amber), nothing stored (dark), fallback (a light comes on).
const marks: { lit: number; muted?: boolean; newest?: boolean }[] = [
  { lit: 0 },
  { lit: 3, newest: true },
  { lit: 3, muted: true },
  { lit: 0 },
  { lit: 4, newest: true },
];

export function PrivacySlide({ step }: SlideProps) {
  const p = content.privacy;
  return (
    <Frame className="flex flex-col">
      <Heading>{p.heading}</Heading>
      <ul className="mt-14 flex flex-1 flex-col justify-start gap-3">
        {p.rules.map((r, i) => (
          <Reveal key={r.label} show={step >= i + 1} className="flex items-center gap-10">
            <LightRing {...marks[i]} size={110} />
            <div className="flex flex-1 items-baseline gap-8">
              <p className="w-[520px] text-4xl">{r.label}</p>
              <p className="text-2xl text-ink-muted">{r.detail}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Frame>
  );
}
