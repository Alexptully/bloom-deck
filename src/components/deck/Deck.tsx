"use client";
import { AnimatePresence, motion } from "motion/react";
import { slides } from "./slides";
import { useDeckNavigation } from "./useDeckNavigation";
import { usePresenterKeys, useStageScale } from "./usePresenterKeys";
import { SlideFooter } from "./SlideFooter";
import { NotesPanel } from "./NotesPanel";
import { Grain } from "./Grain";
import { ease, durations } from "@/lib/timing";

const stepCounts = slides.map((s) => s.steps);

export function Deck() {
  const { pos, next, onTouchStart, onTouchEnd } = useDeckNavigation(stepCounts);
  const { notesOpen, idle } = usePresenterKeys();
  const scale = useStageScale();
  const slide = slides[pos.slide];
  const Content = slide.Content;

  return (
    <main
      className={`fixed inset-0 flex items-center justify-center bg-paper ${idle ? "cursor-none" : ""}`}
      onClick={next}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="stage" style={{ transform: `scale(${scale})`, transformOrigin: "center" }} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.section
            key={pos.slide}
            className="absolute inset-0"
            aria-label={slide.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: durations.fast, ease }}
          >
            <Content step={pos.step} />
            <SlideFooter section={slide.section} sourceKeys={slide.sourcesByStep?.[pos.step] ?? slide.sources} />
          </motion.section>
        </AnimatePresence>
        <Grain />
      </div>
      <NotesPanel open={notesOpen} title={slide.name} notes={slide.notes} position={pos} />
    </main>
  );
}
