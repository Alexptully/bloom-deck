"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, Reveal, type BloomState } from "../primitives";
import type { SlideProps } from "../slides";

// One petal state per rule: consent (seed), indicator (breathing sprout), mute (amber sprout), no audio (seed), fallback (bloom)
const marks: { state: BloomState; petal?: string; muted?: boolean; breathe?: boolean }[] = [
  { state: "seed" },
  { state: "sprout", breathe: true },
  { state: "sprout", petal: "var(--color-accent)" },
  { state: "seed", muted: true },
  { state: "bloom" },
];

export function PrivacySlide({ step }: SlideProps) {
  const p = content.privacy;
  return (
    <Frame className="flex flex-col">
      <Heading>{p.heading}</Heading>
      <ul className="mt-14 flex flex-1 flex-col justify-start gap-3">
        {p.rules.map((r, i) => (
          <Reveal key={r.label} show={step >= i + 1} className="flex items-center gap-10">
            <Bloom {...marks[i]} size={110} petal={marks[i].petal ?? "var(--color-leaf-soft)"} />
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
