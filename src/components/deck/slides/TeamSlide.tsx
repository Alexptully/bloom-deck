"use client";
import { content } from "@/content/content";
import { Bloom, Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

export function TeamSlide({ step }: SlideProps) {
  const t = content.team;
  return (
    <Frame className="flex flex-col">
      <Heading>{t.heading}</Heading>
      <div className="mt-14 flex flex-1 gap-20">
        <ul className="grid flex-1 grid-cols-2 content-start gap-x-12 gap-y-6">
          {t.roles.map((r, i) => (
            <Reveal key={r.role} show={step >= 1} delay={0.08 * i} className="flex items-center gap-6">
              <Bloom state={r.name ? "bloom" : "sprout"} size={88} muted={!r.name} />
              <div>
                <p className="text-3xl">{r.role}</p>
                <p className="text-2xl text-ink-muted">{r.name || "open seat"}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal show={step >= 2} className="w-[560px] self-center rounded-card bg-paper-raised p-10 shadow-card">
          <p className="font-display text-hero text-accent">{t.hours}</p>
          <p className="mt-1 text-3xl">hours a week, per person</p>
          <p className="mt-6 text-2xl leading-snug text-ink-muted">{t.hoursRange}</p>
          <p className="mt-4 text-2xl text-ink-muted">About {t.teamHours} team hours across the semester</p>
        </Reveal>
      </div>
    </Frame>
  );
}
