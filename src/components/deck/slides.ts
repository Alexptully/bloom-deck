import type { ComponentType } from "react";
import type { SourceKey } from "@/content/sources";
import { content } from "@/content/content";
import { TitleSlide } from "./slides/TitleSlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { GardenSlide } from "./slides/GardenSlide";
import { IdeaSlide } from "./slides/IdeaSlide";
import { HowSlide } from "./slides/HowSlide";
import { PrivacySlide } from "./slides/PrivacySlide";
import { JourneySlide } from "./slides/JourneySlide";
import { AmberSlide } from "./slides/AmberSlide";
import { HardwareSlide } from "./slides/HardwareSlide";
import { TimelineSlide } from "./slides/TimelineSlide";
import { TeamSlide } from "./slides/TeamSlide";
import { RisksSlide } from "./slides/RisksSlide";
import { AskSlide } from "./slides/AskSlide";
import { SourcesSlide } from "./slides/SourcesSlide";

export type SlideProps = { step: number };

export type SlideEntry = {
  name: string;
  section?: string;
  steps: number;
  printSteps?: number[];
  sources?: readonly SourceKey[];
  sourcesByStep?: Record<number, readonly SourceKey[]>;
  notes: readonly string[];
  Content: ComponentType<SlideProps>;
};

export const slides: SlideEntry[] = [
  { name: "Title", steps: 3, printSteps: [3], notes: content.title.notes, Content: TitleSlide },
  { name: "The problem", section: "Concept and story", steps: 3, sources: ["amberDeck"], notes: content.problem.notes, Content: ProblemSlide },
  { name: "Terra's Garden", section: "Concept and story", steps: 5, sources: ["gardenDeck"], notes: content.garden.notes, Content: GardenSlide },
  { name: "The idea", section: "Concept and story", steps: 3, notes: content.idea.notes, Content: IdeaSlide },
  { name: "How it works", section: "How it works", steps: 5, sources: ["espressif"], notes: content.how.notes, Content: HowSlide },
  { name: "Privacy", section: "Risks and privacy", steps: 5, notes: content.privacy.notes, Content: PrivacySlide },
  { name: "One guest's night", section: "Concept and story", steps: 4, sources: ["gardenDeck"], notes: content.journey.notes, Content: JourneySlide },
  { name: "Built on Amber", section: "How it works", steps: 4, sources: ["amberDeck"], notes: content.amber.notes, Content: AmberSlide },
  { name: "Hardware and BOM", section: "Bill of materials", steps: 3, printSteps: [1, 3], sourcesByStep: { 1: ["seeed", "adafruit"], 2: ["bom", "seeed", "adafruit"], 3: ["bom", "seeed", "adafruit", "deepgram"] }, notes: content.hardware.notes, Content: HardwareSlide },
  { name: "Timeline", section: "Week-by-week timeline", steps: 4, sources: ["taskSheet"], notes: content.timeline.notes, Content: TimelineSlide },
  { name: "Team and time", section: "Roles and time commitment", steps: 2, sources: ["taskSheet"], notes: content.team.notes, Content: TeamSlide },
  { name: "Risks", section: "Risks and privacy", steps: 5, notes: content.risks.notes, Content: RisksSlide },
  { name: "The ask", steps: 5, sources: ["bom", "taskSheet"], notes: content.ask.notes, Content: AskSlide },
  { name: "Sources", steps: 1, notes: ["Every number in the deck traces to one of these."], Content: SourcesSlide },
];
