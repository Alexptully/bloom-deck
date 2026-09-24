"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, Reveal, type BloomState } from "../primitives";
import type { SlideProps } from "../slides";

// Which step reveals each week: 1 shows weeks 1 to 4, 2 adds MVP, 3 adds 6 to 9, 4 adds demo day
const revealStep = (week: number) => (week <= 4 ? 1 : week === 5 ? 2 : week <= 9 ? 3 : 4);
const growth = (week: number): BloomState => (week < 3 ? "seed" : week < 5 ? "sprout" : "bloom");

export function TimelineSlide({ step }: SlideProps) {
  const t = content.timeline;
  return (
    <Frame className="flex flex-col">
      <div className="flex items-baseline justify-between">
        <Heading>{t.heading}</Heading>
        <p className="text-2xl text-ink-muted">
          MVP {t.mvp}. Demo {t.demo}.
        </p>
      </div>
      <div className="mt-14 grid flex-1 grid-cols-10 gap-3">
        {t.weeks.map((w) => {
          const milestone = w.week === 5 || w.week === 10;
          return (
            <Reveal key={w.week} show={step >= revealStep(w.week)} className="flex flex-col">
              <div className={`flex h-[230px] items-center justify-center rounded-card ${milestone ? "bg-accent-soft" : "bg-paper-raised"} shadow-card`}>
                <Bloom state={growth(w.week)} size={160} delay={0.05 * w.week} />
              </div>
              <p className="mt-5 text-2xl text-ink-muted">Week {w.week}</p>
              <p className="mt-1 text-3xl leading-tight">{w.label}</p>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}
