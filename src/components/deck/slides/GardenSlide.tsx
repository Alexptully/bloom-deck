"use client";
import { content } from "@/content/content";
import { Frame, Heading, Reveal } from "../primitives";
import { GardenWall, Phone, type GardenScreen } from "../Phone";
import type { SlideProps } from "../slides";

// Which real screen the phone shows at each build step; step 5 repeats the last one.
const screenForStep: GardenScreen[] = ["plant", "connect", "budding", "bloom", "bloom"];

export function GardenSlide({ step }: SlideProps) {
  const g = content.garden;
  const broken = step >= 5;
  return (
    <Frame className="flex flex-col">
      <div className="flex items-baseline justify-between">
        <Heading>{g.heading}</Heading>
        <p className="text-2xl text-ink-muted">{g.built}</p>
      </div>
      <div className="mt-12 flex flex-1 items-center gap-16">
        <ol className="flex w-[620px] flex-col gap-7">
          {g.steps.map((s, i) => {
            const danger = broken && i === 1;
            return (
              <Reveal key={s.label} show={step >= i + 1} className={`rounded-card px-8 py-5 ${danger ? "bg-danger text-paper" : ""}`}>
                <p className="text-4xl">{s.label}</p>
                <p className={`mt-1 text-2xl leading-snug ${danger ? "text-paper" : "text-ink-muted"}`}>{s.detail}</p>
              </Reveal>
            );
          })}
          <Reveal show={broken}>
            <p className="px-8 text-3xl text-danger">{g.broken}</p>
          </Reveal>
        </ol>
        <Phone screen={screenForStep[Math.min(step, 5) - 1]} height={700} />
        <Reveal show={step >= 4} className="flex-1">
          <GardenWall full={step >= 4} size={560} className="mx-auto" />
        </Reveal>
      </div>
    </Frame>
  );
}
