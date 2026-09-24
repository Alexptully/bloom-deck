"use client";
import type { DeckPosition } from "./useDeckNavigation";

export function NotesPanel({
  open,
  title,
  notes,
  position,
}: {
  open: boolean;
  title: string;
  notes: readonly string[];
  position: DeckPosition;
}) {
  if (!open) return null;
  return (
    <aside
      className="no-print fixed right-6 top-6 bottom-6 w-[420px] overflow-y-auto rounded-card bg-paper-raised p-8 shadow-card"
      onClick={(e) => e.stopPropagation()}
      aria-label="Speaker notes"
    >
      <h3 className="font-display text-3xl">{title}</h3>
      <p className="mt-1 text-base text-ink-muted">
        Slide {position.slide + 1}, step {position.step}. Press N to hide, F for full screen, P to print.
      </p>
      <div className="mt-6 space-y-4 text-lg leading-relaxed">
        {notes.map((n) => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </aside>
  );
}
