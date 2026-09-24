import { sources } from "@/content/sources";
import { Frame, Heading } from "../primitives";

export function SourcesSlide() {
  return (
    <Frame className="flex flex-col">
      <Heading>Sources</Heading>
      <ul className="mt-12 grid grid-cols-2 gap-x-16 gap-y-6">
        {Object.values(sources).map((s) => (
          <li key={s.cite}>
            <p className="text-2xl">{s.cite}</p>
            <p className="text-xl text-ink-muted">{s.title}</p>
            {s.url ? <p className="text-xl text-leaf">{s.url}</p> : null}
          </li>
        ))}
      </ul>
    </Frame>
  );
}
