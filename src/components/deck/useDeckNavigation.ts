"use client";
import { useCallback, useEffect, useRef, useState } from "react";

export type DeckPosition = { slide: number; step: number };

function readHash(count: number): number {
  if (typeof window === "undefined") return 0;
  const n = Number.parseInt(window.location.hash.replace("#", ""), 10);
  if (Number.isNaN(n)) return 0;
  return Math.min(Math.max(n - 1, 0), count - 1);
}

/**
 * Slide and build-step state with keyboard, click, swipe and hash navigation.
 * `steps[i]` is how many presses slide i needs before the deck advances.
 */
export function useDeckNavigation(steps: readonly number[]) {
  const count = steps.length;
  const [pos, setPos] = useState<DeckPosition>({ slide: 0, step: 1 });
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    setPos({ slide: readHash(count), step: 1 });
  }, [count]);

  useEffect(() => {
    const hash = `#${pos.slide + 1}`;
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash);
  }, [pos.slide]);

  const next = useCallback(() => {
    setPos((p) => {
      if (p.step < steps[p.slide]) return { slide: p.slide, step: p.step + 1 };
      if (p.slide < count - 1) return { slide: p.slide + 1, step: 1 };
      return p;
    });
  }, [steps, count]);

  const prev = useCallback(() => {
    setPos((p) => {
      if (p.step > 1) return { slide: p.slide, step: p.step - 1 };
      if (p.slide > 0) return { slide: p.slide - 1, step: steps[p.slide - 1] };
      return p;
    });
  }, [steps]);

  const jump = useCallback(
    (slide: number) => setPos({ slide: Math.min(Math.max(slide, 0), count - 1), step: 1 }),
    [count],
  );

  useEffect(() => {
    const forward = new Set(["ArrowRight", "ArrowDown", " ", "PageDown", "Enter"]);
    const back = new Set(["ArrowLeft", "ArrowUp", "PageUp", "Backspace"]);
    const onKey = (e: KeyboardEvent) => {
      if (forward.has(e.key)) return void (e.preventDefault(), next());
      if (back.has(e.key)) return void (e.preventDefault(), prev());
      if (e.key === "Home") return jump(0);
      if (e.key === "End") return jump(count - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, jump, count]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStart.current;
      touchStart.current = null;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) next();
      else prev();
    },
    [next, prev],
  );

  return { pos, next, prev, jump, onTouchStart, onTouchEnd };
}
