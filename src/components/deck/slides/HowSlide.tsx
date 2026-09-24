"use client";
import { content } from "@/content/content";
import { Frame, Heading, LightRing, Reveal } from "../primitives";
import type { SlideProps } from "../slides";

export function HowSlide({ step }: SlideProps) {
  const h = content.how;
  return (
    <Frame className="flex flex-col">
      <Heading>{h.heading}</Heading>
      <div className="relative mt-56 flex flex-1 items-start">
        <div className="absolute left-0 right-0 top-[60px] h-[3px] bg-paper-deep" aria-hidden />
        {h.nodes.map((n, i) => {
          const shown = step >= i + 1;
          const last = i === h.nodes.length - 1;
          return (
            <Reveal key={n.id} show={shown} className="relative flex w-1/5 flex-col items-start pr-8">
              <div className="flex h-[120px] items-center">
                {last ? (
                  <LightRing lit={shown ? 1 : 0} newest={shown} size={120} className="-ml-4" />
                ) : (
                  <div className={`ml-5 h-8 w-8 rounded-full ${shown ? "bg-leaf" : "bg-paper-deep"}`} />
                )}
              </div>
              <p className="mt-6 text-4xl leading-tight">{n.label}</p>
            </Reveal>
          );
        })}
      </div>
    </Frame>
  );
}
