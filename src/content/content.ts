import { config } from "./config";

// Raw inputs. Derived figures are computed below so a teammate changes one number.
const bomLean = { bracelets: 32, total: 944 };
const bomMid = { bracelets: 66, total: 2197 };
// The task sheet plans 564 team hours across weeks 0 to 10 for six people. The pitch asks for five,
// so each person's weekly hours scale by 6/5 and the average is the same total split five ways.
const plan = { weeks: 10, tasks: 70, sheetTeamSize: 6, teamSize: 5, teamHours: 564 };
const sheetHoursPerPerson = [6, 7, 7, 7, 7, 12, 8, 12, 10, 3, 15];
const hoursPerPerson = sheetHoursPerPerson.map((h) => Math.round((h * plan.sheetTeamSize) / plan.teamSize));
const averageHours = Math.round(plan.teamHours / plan.teamSize / sheetHoursPerPerson.length);

const perBracelet = (tier: { bracelets: number; total: number }) =>
  Math.round(tier.total / tier.bracelets);

export const content = {
  title: {
    name: config.projectName,
    tagline: "A bracelet that lights up when two people meet",
    byline: `${config.presenter}, ${config.club}`,
    notes: [
      "About 15 seconds. I'm Alex. This is Bloom, a bracelet for the Magical Forest that lights up when two people actually meet.",
      "If the prototype is ready, wear it dark, swap names with a teammate and let one light come on while the title builds.",
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
      "About 25 seconds. Researchers asked Chicago commuters to talk to a stranger. They guessed fewer than half would want to, and of everyone who reported back, nobody was turned down. The ones who talked had a happier ride.",
      "And people want that from events: 89 percent of 18 to 35 year-olds want events that connect them to their community. Bloom gives everyone a reason to start that first conversation.",
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
      "About 30 seconds. At the hackathon we built Terra's Garden in five hours. You check in and get planted as a seed, someone taps your bracelet with their phone, your bracelet glows brighter, and your flower joins a projected garden.",
      "It worked, except for one step. Tapping meant pulling out a phone, and the moment you both look down, the conversation is over.",
    ],
  },

  idea: {
    heading: "The forest listens for one thing",
    line1: "Two people tell each other their names.",
    line2: "Only then does one more light come on, on both wrists.",
    afterward: "On the Garden site your flower grows, and everyone you met is saved for the next morning.",
    notes: [
      "About 25 seconds. So for the Magical Forest, the forest does the noticing. It listens for one thing: two people telling each other their names.",
      "Only then does one more light come on, on both wrists at the same time. On the Garden site your flower grows, and everyone you met is saved for the next morning.",
    ],
  },

  forest: {
    heading: "Bloom in the Magical Forest",
    entrance: { label: "The planting station", detail: "Guests check in and are given a dark bracelet, a seed" },
    wander: { label: "The forest floor", detail: "Every introduction lights one more LED on two wrists" },
    clearing: { label: "The clearing", detail: "The projected garden, one flower per guest" },
    caption: "From across the room, the lit bracelets drift through the trees like fireflies.",
    notes: [
      "About 25 seconds. By the door is the planting station, where guests check in and get a dark bracelet, their seed. Out on the forest floor, every introduction lights one more LED on two wrists, so the bracelets glow like fireflies. At the far end, the clearing on the wall grows one flower per guest.",
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
      "About 30 seconds. Bracelets notice when another one is within arm's reach, and only then does the mic stream to our laptop over campus Wi-Fi.",
      "Amber, a relationship-memory app that already turns speech into people, checks for names on the guest list. When each person hears the other's name, both bracelets light up and the meeting is saved. We build the bracelet and the garden, not the AI.",
    ],
  },

  privacy: {
    heading: "A listening forest has to earn trust",
    rules: ["Opt in at check-in", "Lights show when it listens", "Hold to mute", "No audio saved", "Press together as a backup"],
    notes: [
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
      "About 20 seconds. With five people, each of us averages about ten hours a week: one team sync, one build block together, the rest on your own time.",
      "The MVP, assembly and demo weeks run heavier, up to about 18 hours in demo week, and Thanksgiving week is light.",
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
      "About 25 seconds. Five seats, each with something clear to own. You don't need to have done it before: the middle column is what helps, and the right column is what you'll walk away knowing.",
      "The narrative seat is a real role from week one. That person shapes how Bloom lives inside the Magical Forest.",
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
      "About 15 seconds. We're asking for five people, one of the two budgets, a narrative partner and a spot in the forest: the door and one wall.",
      "Close: let the forest bloom when people meet.",
    ],
  },

  thanks: {
    heading: "Thank you",
    line: "Any questions?",
    byline: `${config.presenter}, ${config.club}`,
    notes: [
      "About 10 seconds. Thank you. Any questions?",
    ],
  },
} as const;
