import { config } from "./config";

// Raw inputs. Derived figures are computed below so a teammate changes one number.
const bomLean = { bracelets: 32, total: 944 };
const bomMid = { bracelets: 66, total: 2197 };
// teamHours is the summed estimate from the task sheet (six people), not a formula.
const plan = { weeks: 10, tasks: 70, hoursPerPersonPerWeek: 8.5, teamSize: 6, teamHours: 564 };

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
      "About 30 seconds. Researchers at the University of Chicago asked commuters to start a conversation with a stranger on the train or bus. Beforehand, people guessed fewer than half of strangers would want to talk.",
      "Of everyone who reported back, not one was turned down, and the people who talked had a happier ride than the ones who sat quietly.",
      "And that is what people want from events. In Eventbrite's 2025 survey of about 4,000 people aged 18 to 35, 89 percent said they want events that connect them to their community. Meeting someone new is what makes a night feel like more than a show.",
      "Bloom gives everyone in the forest a reason to start that first conversation, and it lights both wrists at the same moment, so you know the other person wanted to meet you too.",
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
      "About 30 seconds. Here is how that fits the room. By the door is the planting station, where guests check in and get a dark bracelet, their seed.",
      "The rest of the room is the forest floor. Every introduction lights one more LED on two wrists, so from across the room the lit bracelets drift through the trees like fireflies.",
      "At the far end is the clearing, the projected garden, with one flower per guest that grows every time its owner meets someone.",
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

  ask: {
    heading: "What we are asking for",
    asks: [
      { label: "A team", detail: `5 to 7 people, about ${plan.hoursPerPersonPerWeek} hours a week` },
      { label: "A budget", detail: "Lean $944 or Mid $2,197" },
      { label: "A narrative partner", detail: "To shape the forest's story" },
      { label: "A place in the forest", detail: "The door and one wall" },
    ],
    close: "Let the forest bloom when people meet.",
    notes: [
      "About 20 seconds. We're looking for five to seven people at about eight hours a week, one of the two budgets, a narrative partner to shape the story, and a spot by the door and a wall for the clearing.",
      "Close: let the forest bloom when people meet.",
    ],
  },
} as const;
