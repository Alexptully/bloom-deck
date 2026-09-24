"use client";
import { content } from "@/content/content";
import { Frame, Heading, LightRing, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function Tier({ t }: { t: (typeof content.hardware.tiers)[number] }) {
  return (
    <div className="flex-1 rounded-card bg-paper-raised p-8 shadow-card">
      <p className="text-3xl">{t.name}</p>
      <p className="mt-3 font-display text-6xl">{money(t.total)}</p>
      <p className="mt-2 text-2xl text-ink-muted">
        {t.bracelets} bracelets, about {money(t.each)} each all in
      </p>
      <p className="mt-4 text-2xl leading-snug">{t.how}</p>
    </div>
  );
}

export function HardwareSlide({ step }: SlideProps) {
  const h = content.hardware;
  return (
    <Frame className="flex flex-col">
      <Heading>{h.heading}</Heading>
      <div className="mt-10 flex flex-1 gap-20">
        <div className="flex w-[560px] flex-col items-center justify-center">
          <LightRing lit={5} newest size={460} />
          <p className="mt-2 text-center text-2xl text-ink-muted">Five people met, five lights on. Eight is full bloom.</p>
        </div>
        <div className="flex flex-1 flex-col">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-5">
            {h.parts.map((p, i) => (
              <Reveal key={p.label} show={step >= 1} delay={0.08 * i}>
                <p className="text-3xl">
                  {p.label}
                  {"price" in p ? <span className="ml-3 text-2xl text-ink-muted">{money(p.price)}</span> : null}
                </p>
                <p className="text-2xl leading-snug text-ink-muted">{p.detail}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal show={step >= 2} className="mt-10 flex gap-8">
            {h.tiers.map((t) => (
              <Tier key={t.name} t={t} />
            ))}
          </Reveal>
          <Reveal show={step >= 3}>
            <p className="mt-8 text-2xl text-ink-muted">{h.noRouter}</p>
          </Reveal>
        </div>
      </div>
    </Frame>
  );
}
