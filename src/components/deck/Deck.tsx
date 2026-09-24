"use client";
import { AnimatePresence, motion } from "motion/react";
import { slides } from "./slides";
import { useDeckNavigation } from "./useDeckNavigation";
import { usePresenterKeys, useStageScale } from "./usePresenterKeys";
import { SlideFooter } from "./SlideFooter";
import { NotesPanel } from "./NotesPanel";
import { Grain } from "./Grain";
import { ForestEdge } from "./ForestEdge";
import { TransitionAccent, slideVariants } from "./Transition";
import { useSlideDirection } from "./useSlideDirection";

const stepCounts = slides.map((s) => s.steps);

export function Deck() {
  const { pos, next, onTouchStart, onTouchEnd } = useDeckNavigation(stepCounts);
  const { notesOpen, idle } = usePresenterKeys();
  const scale = useStageScale();
  const slide = slides[pos.slide];
  const Content = slide.Content;
  const { dir, moved } = useSlideDirection(pos.slide);
  const custom = { dir, arrival: slide.arrival ?? "fade" };

  return (
    <main
      className={`fixed inset-0 flex items-center justify-center bg-paper ${idle ? "cursor-none" : ""}`}
      onClick={next}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="stage shrink-0" style={{ transform: `scale(${scale})`, transformOrigin: "center" }} aria-live="polite">
        <ForestEdge growth={pos.slide / (slides.length - 1)} />
        <AnimatePresence initial={false} custom={custom}>
          <motion.section
            key={pos.slide}
            className="absolute inset-0"
            aria-label={slide.name}
            custom={custom}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <Content step={pos.step} />
            <SlideFooter section={slide.section} sourceKeys={slide.sourcesByStep?.[pos.step] ?? slide.sources} />
          </motion.section>
        </AnimatePresence>
        {moved ? <TransitionAccent key={pos.slide} accent={slide.accent ?? "none"} /> : null}
        <Grain />
      </div>
      <NotesPanel open={notesOpen} title={slide.name} notes={slide.notes} position={pos} />
    </main>
  );
}
