"use client";
import { FinalContext } from "@/lib/final";
import { slides } from "./slides";
import { SlideFooter } from "./SlideFooter";
import { Grain } from "./Grain";

/** Every slide's print steps, one 1920 by 1080 page each, with animations finished. */
export function PrintDeck() {
  return (
    <FinalContext.Provider value={true}>
      <div className="flex flex-col items-start bg-white">
        {slides.flatMap((slide, i) =>
          (slide.printSteps ?? [slide.steps]).map((step) => (
            <div key={`${i}-${step}`} className="print-page stage">
              <slide.Content step={step} />
              <SlideFooter section={slide.section} sourceKeys={slide.sourcesByStep?.[step] ?? slide.sources} />
              <Grain />
            </div>
          )),
        )}
      </div>
    </FinalContext.Provider>
  );
}
