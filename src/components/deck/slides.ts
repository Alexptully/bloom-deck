import type { ComponentType } from "react";
import type { SourceKey } from "@/content/sources";
import type { Accent, Arrival } from "./Transition";
import { content } from "@/content/content";
import { TitleSlide } from "./slides/TitleSlide";
import { ProblemSlide } from "./slides/ProblemSlide";
import { GardenSlide } from "./slides/GardenSlide";
import { IdeaSlide } from "./slides/IdeaSlide";
import { ThanksSlide } from "./slides/ThanksSlide";
import { ForestSlide } from "./slides/ForestSlide";
import { HowSlide } from "./slides/HowSlide";
import { PrivacySlide } from "./slides/PrivacySlide";
import { HardwareSlide } from "./slides/HardwareSlide";
import { TimelineSlide } from "./slides/TimelineSlide";
import { TimeSlide } from "./slides/TimeSlide";
import { TeamSlide } from "./slides/TeamSlide";
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
  /** How the slide arrives, and an optional light effect as it does. See Transition.tsx. */
  arrival?: Arrival;
  accent?: Accent;
  Content: ComponentType<SlideProps>;
};

export const slides: SlideEntry[] = [
  // The 2 minute talk: title to thank you.
  { name: "Title", steps: 3, printSteps: [3], notes: content.title.notes, Content: TitleSlide },
  { name: "The problem", section: "Concept and story", steps: 3, sourcesByStep: { 1: ["epley"], 2: ["epley"], 3: ["epley", "eventbrite"] }, notes: content.problem.notes, arrival: "drift", Content: ProblemSlide },
  { name: "Terra's Garden", section: "Concept and story", steps: 5, sources: ["gardenDeck"], notes: content.garden.notes, arrival: "fade", Content: GardenSlide },
  { name: "The idea", section: "Concept and story", steps: 3, notes: content.idea.notes, arrival: "settle", accent: "glow", Content: IdeaSlide },
  { name: "In the Magical Forest", section: "Concept and story", steps: 3, printSteps: [1, 3], sources: ["gardenDeck"], notes: content.forest.notes, arrival: "fade", accent: "fireflies", Content: ForestSlide },
  { name: "Who we need", section: "Roles needed on the team", steps: 2, sources: ["taskSheet"], arrival: "fade", notes: content.team.notes, Content: TeamSlide },
  { name: "Time commitment", section: "Average time commitment per week", steps: 2, sources: ["taskSheet"], arrival: "rise", notes: content.time.notes, Content: TimeSlide },
  { name: "Thank you", steps: 1, notes: content.thanks.notes, arrival: "bloom", accent: "glow", Content: ThanksSlide },
  // Backup for questions, after the talk ends. Not presented unless someone asks.
  { name: "How it works", section: "How it works", steps: 5, notes: content.how.notes, arrival: "drift", Content: HowSlide },
  { name: "Privacy", section: "Risks and privacy", steps: 5, notes: content.privacy.notes, arrival: "fade", Content: PrivacySlide },
  { name: "Hardware and BOM", section: "Bill of materials", steps: 2, sourcesByStep: { 1: ["seeed", "adafruit"], 2: ["bom", "seeed", "adafruit"] }, notes: content.hardware.notes, arrival: "settle", Content: HardwareSlide },
  { name: "Timeline", section: "Week-by-week timeline", steps: 4, sources: ["taskSheet"], notes: content.timeline.notes, arrival: "drift", Content: TimelineSlide },
  { name: "The ask", steps: 5, sources: ["bom", "taskSheet"], notes: content.ask.notes, arrival: "settle", Content: AskSlide },
  { name: "Sources", steps: 1, notes: ["Every number in the deck traces to one of these."], arrival: "fade", Content: SourcesSlide },
];
