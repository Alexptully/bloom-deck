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
    heading: "Every friendship starts as a seed",
    stat: { value: 50, suffix: " hours", label: "to turn someone new into a casual friend" },
    stages: [
      { hours: 0, label: "First hello", time: "day one" },
      { hours: 50, label: "Casual friend", time: "50 hours" },
      { hours: 90, label: "Friend", time: "90 hours" },
      { hours: 200, label: "Close friend", time: "200+ hours" },
    ],
    notes: [
      "About 30 seconds. A University of Kansas study followed 112 freshmen through their first nine weeks. It took about 50 hours together to turn someone new into a casual friend, and more than 200 to become close friends.",
      "We can't give anyone 200 hours. We can start the first one, and make sure you can find that person again the next day.",
    ],
  },

  garden: {
    heading: "Terra's Garden worked, except for one step",
    built: "Built in a 5 hour hackathon",
    steps: ["Check in", "Tap bracelets", "Grow", "Garden"],
    broken: "Tapping meant pulling out a phone",
    notes: [
      "About 25 seconds. At the hackathon we built Terra's Garden. You check in, tap someone's bracelet, and your flower grows on a projected garden.",
      "It worked, except for one step. Tapping meant pulling out your phone, and the moment you look down, the conversation is over.",
    ],
  },

  forest: {
    heading: "The forest listens for one thing",
    entrance: "Get a dark bracelet",
    wander: "Swap names, both light up",
    clearing: "Your flower grows on the wall",
    notes: [
      "About 35 seconds. So in the Magical Forest, the forest does the noticing. At the planting station by the door you get a bracelet with eight dark lights.",
      "Out on the forest floor, when you and someone tell each other your names, one light comes on at each wrist. From across the room the bracelets look like fireflies.",
      "At the far end, the clearing on the wall grows a flower for every guest. The next morning, everyone you met is waiting on the Garden site.",
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
