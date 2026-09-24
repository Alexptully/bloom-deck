import { sources, type SourceKey } from "@/content/sources";

export function SlideFooter({ section, sourceKeys = [] }: { section?: string; sourceKeys?: readonly SourceKey[] }) {
  const cites = sourceKeys.map((k) => sources[k].cite);
  return (
    <footer className="absolute inset-x-32 bottom-14 flex items-end justify-between text-lg text-ink-muted">
      <p className="max-w-[1200px]">{cites.length ? `Sources: ${cites.join("; ")}` : ""}</p>
      {section ? <p>{section}</p> : null}
    </footer>
  );
}
