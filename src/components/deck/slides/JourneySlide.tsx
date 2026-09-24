"use client";
import { content } from "@/content/content";
import { Frame, Heading, LightRing, Reveal } from "../primitives";
import { GardenWall, Phone } from "../Phone";
import type { SlideProps } from "../slides";

const visuals = [
  () => <LightRing lit={0} size={240} />,
  () => <LightRing lit={1} newest size={240} />,
  () => <GardenWall full size={300} />,
  () => <Phone screen="bloom" height={300} />,
];

export function JourneySlide({ step }: SlideProps) {
  const j = content.journey;
  return (
    <Frame className="flex flex-col">
      <Heading>{j.heading}</Heading>
      <div className="mt-16 grid flex-1 grid-cols-4 gap-10">
        {j.beats.map((b, i) => {
          const Visual = visuals[i];
          return (
            <Reveal key={b.label} show={step >= i + 1} className="flex flex-col">
              <div className="flex h-[340px] items-center justify-center rounded-card bg-paper-raised shadow-card">
                <Visual />
              </div>
              <p className="mt-8 text-2xl text-ink-muted">{b.time}</p>
              <p className="mt-1 text-4xl">{b.label}</p>
              <p className="mt-3 text-2xl leading-snug text-ink-muted">{b.detail}</p>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}
