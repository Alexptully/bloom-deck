"use client";
import { content } from "@/content/content";
import { Frame, Heading, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

const grid = "grid grid-cols-[300px_1fr_1fr_1fr] gap-x-10";

export function TeamSlide({ step }: SlideProps) {
  const t = content.team;
  const more = step >= 2;
  return (
    <Frame className="flex flex-col">
      <Heading>{t.heading}</Heading>
      <div className={`${grid} mt-12 pb-3 text-2xl text-ink-muted shadow-[0_2px_0_var(--color-paper-deep)]`}>
        <span />
        <span>{t.columns.owns}</span>
        <Reveal show={more}><span>{t.columns.helps}</span></Reveal>
        <Reveal show={more}><span>{t.columns.learn}</span></Reveal>
      </div>
      <div className="flex flex-col">
        {t.roles.map((r, i) => (
          <Reveal key={r.role} show delay={0.05 * i} className={`${grid} items-baseline py-3 shadow-[0_1px_0_var(--color-paper-deep)]`}>
            <p className="text-3xl">{r.role}</p>
            <p className="text-2xl leading-snug">{r.owns}</p>
            <Reveal show={more} delay={0.04 * i}><p className="text-2xl leading-snug text-ink-muted">{r.helps}</p></Reveal>
            <Reveal show={more} delay={0.04 * i}><p className="text-2xl leading-snug text-leaf">{r.learn}</p></Reveal>
          </Reveal>
        ))}
      </div>
      <Reveal show={more} delay={0.3}>
        <p className="mt-6 text-2xl text-ink-muted">{t.doubleUp}</p>
      </Reveal>
    </Frame>
  );
}
