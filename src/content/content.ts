import { config } from "./config";

// Raw inputs. Derived figures are computed below so a teammate changes one number.
const bomLean = { bracelets: 32, total: 944 };
const bomMid = { bracelets: 66, total: 2197 };
// The task sheet planned 564 team hours for six people. The pitch asks for five people at about
// nine hours each, so the plan is trimmed to about 495 team hours (team estimate): each week below is
// the task sheet's five-person figure scaled down by about 11 percent.
const plan = { weeks: 10, tasks: 70, teamSize: 5 };
const hoursPerPerson = [6, 7, 7, 7, 7, 12, 9, 12, 11, 4, 16];
const averageHours = Math.round(hoursPerPerson.reduce((a, b) => a + b, 0) / hoursPerPerson.length);

const perBracelet = (tier: { bracelets: number; total: number }) =>
  Math.round(tier.total / tier.bracelets);

export const content = {
  title: {
    name: config.projectName,
    tagline: "A bracelet that lights up when two people meet",
    byline: `${config.presenter}, ${config.club}`,
    notes: [
      "About 5 seconds. I'm Alex, and this is Bloom, a bracelet for the Magical Forest that lights up when two people actually meet.",
    ],
  },

  problem: {
    heading: "Nobody said no",
    stat: { value: "0", label: "strangers turned them down" },
    detail: "Commuters guessed fewer than half would want to talk. Every one did.",
    guessRow: { title: "What they guessed", detail: "Under half would want to talk" },
    actualRow: { title: "What happened", detail: "Every stranger talked back" },
    sprouted: 9,
    events: { value: "89%", label: "of 18 to 35 year-olds want events that connect them to their community" },
    notes: [
      "About 15 seconds. When researchers asked commuters to talk to a stranger, they guessed fewer than half would want to. Nobody turned them down. And 89 percent of young adults want events that connect them to people.",
    ],
  },

  garden: {
    heading: "Terra's Garden worked, except for one step",
    built: "Built in a 5 hour hackathon",
    steps: [
      { label: "Check in", detail: "Guest creates a profile and is planted as a seed" },
      { label: "Meet someone", detail: "They tap your bracelet's NFC tag with their phone" },
      { label: "Grow", detail: "Your bracelet glows brighter; 7 connections reach full bloom" },
      { label: "Garden", detail: "Every flower joins a projected communal garden" },
    ],
    broken: "Pulling out a phone breaks the moment",
    notes: [
      "About 15 seconds. At the hackathon we built Terra's Garden: tap bracelets and your flower grows on a projected garden. It worked, except tapping meant pulling out a phone, and that ends the conversation.",
    ],
  },

  idea: {
    heading: "The forest listens for one thing",
    line1: "Two people tell each other their names.",
    line2: "Only then does one more light come on, on both wrists.",
    afterward: "On the Garden site your flower grows, and everyone you met is saved for the next morning.",
    notes: [
      "About 15 seconds. So the forest listens for one thing: two people telling each other their names. Then one more light comes on, on both wrists, and the next morning everyone you met is on the Garden site.",
    ],
  },

  forest: {
    heading: "Bloom in the Magical Forest",
    entrance: { label: "The planting station", detail: "Guests check in and are given a dark bracelet, a seed" },
    wander: { label: "The forest floor", detail: "Every introduction lights one more LED on two wrists" },
    clearing: { label: "The clearing", detail: "The projected garden, one flower per guest" },
    caption: "From across the room, the lit bracelets drift through the trees like fireflies.",
    notes: [
      "About 15 seconds. You get a dark bracelet at the planting station, the lit bracelets drift through the room like fireflies, and the clearing on the wall grows a flower for every guest.",
    ],
  },

  how: {
    heading: "How a light comes on",
    nodes: [
      { id: "near", label: "Bracelets sense each other" },
      { id: "listen", label: "The mic turns on" },
      { id: "names", label: "Amber matches names" },
      { id: "both", label: "Both names heard" },
      { id: "bloom", label: "One more light" },
    ],
    notes: [
      "Backup slide for questions. Not part of the 2 minute talk.",
      "About 30 seconds. Bracelets notice when another one is within arm's reach, and only then does the mic stream to our laptop over campus Wi-Fi.",
      "Amber, a relationship-memory app that already turns speech into people, checks for names on the guest list. When each person hears the other's name, both bracelets light up and the meeting is saved. We build the bracelet and the garden, not the AI.",
    ],
  },

  privacy: {
    heading: "A listening forest has to earn trust",
    rules: ["Opt in at check-in", "Lights show when it listens", "Hold to mute", "No audio saved", "Press together as a backup"],
    notes: [
      "Backup slide for questions. Not part of the 2 minute talk.",
      "About 20 seconds. You choose to wear it, the lights breathe while it's listening, and holding the button mutes it. No audio is ever saved, only who met whom.",
      "If the room is too loud, two people pressing their buttons together still counts.",
    ],
  },

  hardware: {
    heading: "What is on the wrist",
    parts: [
      { label: "ESP32-S3", price: 7.49 },
      { label: "Microphone" },
      { label: "8 LEDs" },
      { label: "Battery", price: 7.16 },
      { label: "One button" },
      { label: "Printed band" },
    ],
    tiers: [
      { name: "Lean", bracelets: bomLean.bracelets, total: bomLean.total, each: perBracelet(bomLean) },
      { name: "Mid", bracelets: bomMid.bracelets, total: bomMid.total, each: perBracelet(bomMid) },
    ],
    notes: [
      "Backup slide for questions. Not part of the 2 minute talk.",
      "About 25 seconds. It's an ESP32, a mic, eight LEDs, a battery and one button in a printed band, all parts we can buy today.",
      "Lean is 32 bracelets for $944. Mid is 66 bracelets on a custom board for $2,197. There's no router and no extra PC: campus Wi-Fi and a laptop we already own.",
    ],
  },

  timeline: {
    heading: `${plan.weeks} weeks to the Magical Forest`,
    mvp: config.mvpDate,
    demo: config.demoDate,
    weeks: [
      { week: 1, label: "Speech test" },
      { week: 2, label: "Streaming" },
      { week: 3, label: "First light" },
      { week: 4, label: "Order parts" },
      { week: 5, label: "MVP" },
      { week: 6, label: "Rev B" },
      { week: 7, label: "Assembly" },
      { week: 8, label: "Rehearsal" },
      { week: 9, label: "Buffer" },
      { week: 10, label: "Demo day" },
    ],
    notes: [
      "Backup slide for questions. Not part of the 2 minute talk.",
      "About 20 seconds. Week one proves name detection in a loud room before we buy anything. The MVP is four working bracelets by October 30. Then we build the rest, rehearse with twenty members, and keep Thanksgiving week as a buffer.",
    ],
  },

  time: {
    heading: `About ${averageHours} hours a week`,
    weeks: hoursPerPerson,
    crunch: { 5: "MVP", 7: "Assembly", 10: "Demo day" } as Record<number, string>,
    average: averageHours,
    rhythm: [
      { label: "One team sync", detail: "An hour a week, same time every week" },
      { label: "One shared build block", detail: "Two to three hours together in the lab" },
      { label: "Solo work", detail: "The rest on your own schedule" },
    ],
    notes: [
      "About 15 seconds. It's about nine hours a week each over ten weeks: one team sync, one build block together, the rest on your own. MVP, assembly and demo weeks run heavier, 12 to 16 hours.",
    ],
  },

  team: {
    heading: "Who we need",
    columns: { owns: "You'd own", helps: "Helpful to have", learn: "You'll learn" },
    roles: [
      { role: "PM and systems", owns: "Schedule, integration, the Amber partnership", helps: "Organizing people, any engineering", learn: "Running a hardware build end to end" },
      { role: "Hardware and firmware", owns: "Circuit, battery, PCB, ESP32 code, LEDs", helps: "Soldering, C, C++ or Arduino", learn: "PCB design, embedded audio, Bluetooth" },
      { role: "Software", owns: "Server, name matching, Garden site, projected wall", helps: "Python, JavaScript or React", learn: "Speech APIs and live, data-driven visuals" },
      { role: "Industrial design", owns: "Bracelet body, strap, light diffusion, assembly", helps: "CAD, 3D printing", learn: "Designing a wearable for 60 people" },
      { role: "Narrative design", owns: "Forest story, planting station, signage", helps: "Storytelling, illustration, set design", learn: "Designing an interactive experience" },
    ],
    doubleUp: "Nobody needs every skill. You pick the seat that fits and learn the rest with the team.",
    notes: [
      "About 20 seconds. We need five people, each owning one piece: systems, hardware and firmware, software, industrial design and narrative. You don't need experience in all of it. The middle column is what helps, the right column is what you'll learn.",
    ],
  },

  ask: {
    heading: "What we are asking for",
    asks: [
      { label: "A team", detail: `${plan.teamSize} people, about ${averageHours} hours a week` },
      { label: "A budget", detail: "Lean $944 or Mid $2,197" },
      { label: "A narrative partner", detail: "To shape the forest's story" },
      { label: "A place in the forest", detail: "The door and one wall" },
    ],
    close: "Let the forest bloom when people meet.",
    notes: [
      "Backup slide for questions. Not part of the 2 minute talk.",
      "About 15 seconds. We're asking for five people, one of the two budgets, a narrative partner and a spot in the forest: the door and one wall.",
      "Close: let the forest bloom when people meet.",
    ],
  },

  thanks: {
    heading: "Thank you",
    line: "Any questions?",
    byline: `${config.presenter}, ${config.club}`,
    notes: [
      "About 5 seconds. Thank you. Any questions?",
    ],
  },
} as const;
