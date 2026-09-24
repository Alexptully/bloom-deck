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
    tagline: "A bracelet that lights up when two people truly meet",
    byline: `${config.presenter}, ${config.club}, Fall 2026`,
    notes: [
      "Open with the bracelet dark on your wrist. Say your name, have a teammate say theirs, and let one light come on as the title animates. If the prototype is not ready, the title animation does the same job.",
      "Set up the one distinction the whole deck relies on. On the wrist, Bloom is a ring of eight lights, and each new person you meet turns one more on. On the Garden site and the projected wall, those same meetings grow a flower. Eight lights on the wrist is a flower in full bloom on the wall.",
      "One sentence framing: at the hackathon we built a garden that grew when people met. This is the version where nobody has to touch a phone for the garden to notice.",
    ],
  },

  problem: {
    heading: "You meet more people than you can keep",
    stat: { value: 80, suffix: "%", label: "of new professional contacts go dormant" },
    detail: "The context that made them valuable is lost within 48 hours",
    rate: "20 to 40 new connections a month for students, founders and community builders",
    notes: [
      "The Amber team measured this for their own product: four out of five new contacts go quiet, and the details that made them worth knowing are gone within two days. A club demo night is exactly this problem in miniature. You meet thirty people and remember four.",
      "The fix most people reach for is a phone: a LinkedIn scan, a contact card, a note. The phone is the thing that ends the conversation.",
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
      "Walk through the four steps quickly. People loved the garden on the wall and the glow on the wrist. The problem was step two. The instant someone reaches for a phone, both people look down, and the thing we were celebrating is over.",
      "So the question for this semester is: how does the bracelet know you met someone without a phone in the loop?",
    ],
  },

  idea: {
    heading: "The bracelet listens for one thing",
    line1: "Two people tell each other their names.",
    line2: "Only then does one more light come on, on both wrists.",
    afterward: "On the Garden site your flower grows, and everyone you met is saved for the next morning.",
    notes: [
      "This is the whole idea. A microphone on the bracelet listens for an introduction and nothing else. When you say your name and the person across from you says theirs, one more of the eight lights on each bracelet comes on, and both of your flowers grow a stage on the wall and the Garden site.",
      "The bracelet itself never shows a flower. It is a band with eight LEDs: meet one person and one light is on, meet eight and the ring is full, which is full bloom. The flower is how the site and the wall draw the same progress.",
      "The next morning you open the Garden site and every person you lit a light with is there, with a face, a name and the one fun fact they gave at check-in. Not a stack of cards, the people you actually talked to.",
    ],
  },

  how: {
    heading: "How a light comes on",
    nodes: [
      { id: "near", label: "Bracelets sense each other", detail: "BLE tells each bracelet who is within arm's reach" },
      { id: "listen", label: "Audio streams only then", detail: "16 kHz over campus Wi-Fi to our own laptop" },
      { id: "names", label: "Names are matched", detail: "Amber's voice pipeline, checked against the guest list only" },
      { id: "both", label: "Both directions confirmed", detail: "A hears B's name and B hears A's within 90 seconds" },
      { id: "bloom", label: "One more light", detail: "Each wrist lights its next LED, both flowers grow on the wall, the meeting is saved" },
    ],
    footnote: "ESP32-S3 joins WPA2-Enterprise campus Wi-Fi; phone hotspots are the fallback",
    notes: [
      "Five steps, and each one narrows the previous. Bluetooth proximity means a bracelet only streams audio when another bracelet is within about a metre and someone is talking. That keeps battery and bandwidth low and means the bracelet is not recording the room.",
      "The server passes audio to Amber's voice pipeline, which already turns speech into people, and we constrain the answer to names on the guest list. We are not transcribing conversations; we are asking whether one of sixty known names was said.",
      "Both directions are required. That is what turns 'someone said Alex nearby' into 'Alex and Maya introduced themselves to each other'. Then each bracelet turns on its next light, both flowers grow a stage, and the encounter is written down once.",
      "No router and no extra computer: the ESP32-S3 can join USC's WPA2-Enterprise network, and the Garden backend runs on a laptop we already own, with a second laptop as a hot spare.",
    ],
  },

  privacy: {
    heading: "A device that listens has to earn it",
    rules: [
      { label: "Consent at check-in", detail: "You choose to wear it, and you can opt out of saving anything" },
      { label: "A visible indicator", detail: "The lights breathe softly while the microphone is live" },
      { label: "Hold to mute", detail: "The ring dims to amber and the microphone is off" },
      { label: "No audio is ever stored", detail: "Only 'Alex met Maya at 7:12' is written down" },
      { label: "A two-person fallback", detail: "Both press the button within 3 seconds and the light comes on anyway" },
    ],
    notes: [
      "This is the slide the room will be waiting for, so say it before anyone asks. The bracelet is opt-in, it shows when it is listening, you can silence it with your thumb, and nothing it hears is kept. The server stores who met whom and when, nothing else, and anyone can ask us to delete their night.",
      "The button fallback matters for the story too. If the room is too loud, or someone would rather not be heard at all, two people pressing together still counts as meeting. Nobody leaves with a dark bracelet.",
      "We want the narrative team's help making this feel like the forest listening for your name, which is welcoming, rather than a device recording a party, which is not.",
    ],
  },

  journey: {
    heading: "One guest's night",
    beats: [
      { time: "7:00", label: "Planted", detail: "Name, photo, one fun fact. A bracelet with eight dark lights goes on your wrist." },
      { time: "7:12", label: "First light", detail: "You and Maya swap names. A light comes on at each wrist, and two seeds sprout on the wall." },
      { time: "8:30", label: "The garden fills", detail: "Eight people met means all eight lights on and a flower in full bloom." },
      { time: "Next morning", label: "Everyone you met", detail: "The Garden site lists each person, with their face and fun fact." },
    ],
    notes: [
      "Tell this as a story, in the second person. You arrive, you get a seed instead of a name tag, you go talk to someone, and the first time it works one light comes on at your wrist before you see your seed sprout on the wall.",
      "The wall is the shared payoff: over the evening an empty clearing fills with flowers, one per guest, and each flower grows a stage every time its owner's bracelet lights another LED. By the end, the garden is a picture of the room.",
      "The morning after is what makes it more than a party trick. The people you met are waiting for you, and for guests who opt in, they are also in their Amber memory to search later.",
    ],
  },

  amber: {
    heading: "We are not building the brains",
    points: [
      { label: "Amber is live", detail: "A relationship memory app in TestFlight that turns speech into a people graph" },
      { label: "It has an API", detail: "We call the pipeline that already exists instead of writing one" },
      { label: "Its wearable is on the roadmap", detail: "First prototype targeted December 2026, the month of our demo" },
      { label: "It is a partner, not a dependency", detail: "Every Amber call has a Deepgram and own-database fallback" },
    ],
    notes: [
      "Amber is a startup with a shipping product: you talk for thirty seconds after meeting someone and it pulls out the people, the event and the follow-ups. Its COO already runs on-campus testing at USC. We use it as the backbone for speech-to-people, so our team spends its time on the bracelet, the two-person pairing and the garden.",
      "We keep a plain path working from week three: Deepgram for speech, our own name matcher, our own database. If Amber's roadmap moves, the garden still blooms; guests just get a CSV instead of a living memory.",
    ],
  },

  hardware: {
    heading: "What is on the wrist",
    parts: [
      { label: "XIAO ESP32-S3", detail: "Wi-Fi, Bluetooth, I2S audio, battery charger", price: 7.49 },
      { label: "I2S MEMS microphone", detail: "Digital, omnidirectional" },
      { label: "8 addressable LEDs", detail: "One more lights for each person you meet; WS2812B, as at the hackathon" },
      { label: "500 or 800 mAh LiPo", detail: "3 to 5 hours with proximity-gated streaming", price: 7.16 },
      { label: "One button", detail: "Hold to mute, press together to handshake" },
      { label: "Printed PETG body and light diffusers", detail: "Elastic strap, under 40 g" },
    ],
    tiers: [
      { name: "Lean", bracelets: bomLean.bracelets, total: bomLean.total, each: perBracelet(bomLean), how: "Off-the-shelf boards, hand-wired" },
      { name: "Mid", bracelets: bomMid.bracelets, total: bomMid.total, each: perBracelet(bomMid), how: "Custom carrier PCB assembled by JLCPCB, plus haptics" },
    ],
    noRouter: "No router and no extra PC: campus Wi-Fi and our own laptop",
    notes: [
      "Everything on the bracelet is a part we can buy today. The XIAO ESP32-S3 is the same footprint as the C3 we used at the hackathon, so the wiring carries over, and it has the battery charger built in.",
      "Two tiers so Terra Labs can pick. Lean is thirty-two bracelets on dev boards for under a thousand dollars. Mid is sixty-six bracelets on a custom board that JLC assembles for us, so the team is not hand-soldering five hundred LEDs, and it adds a haptic buzz each time a light comes on. Every line in the BOM links to the exact product page.",
      "Speech-to-text costs nothing at our scale: Deepgram's free credit covers the whole event and the rehearsals.",
    ],
  },

  timeline: {
    heading: `${plan.weeks} weeks to demo day`,
    mvp: config.mvpDate,
    demo: config.demoDate,
    weeks: [
      { week: 1, label: "Speech spike", detail: "Prove name detection in a loud room before buying anything" },
      { week: 2, label: "Streaming and proximity", detail: "Audio to server, BLE neighbours, CAD v1, LED diffusion study" },
      { week: 3, label: "First end-to-end light", detail: "Two bracelets on a table, one light each" },
      { week: 4, label: "Bulk order", detail: "PCB Rev A, strap decision, light and flower animation design" },
      { week: 5, label: "MVP", detail: "Four wearable bracelets, live site and projection" },
      { week: 6, label: "Rev B and battery", detail: "Enclosure files locked, printing starts, signage v1" },
      { week: 7, label: "Assembly run", detail: "Every bracelet built and flashed" },
      { week: 8, label: "Dress rehearsal", detail: "20 members wear them for 45 minutes" },
      { week: 9, label: "Buffer", detail: "Thanksgiving week, nothing new" },
      { week: 10, label: "Demo day", detail: "Second rehearsal in the real room, then the night" },
    ],
    notes: [
      "The plan front-loads the one real technical risk. Week one is a speech spike: two people introduce themselves in a dining hall and we measure how often the names come through. If that fails, we know before we have spent anything.",
      "The MVP at the end of October is deliberately small: four wearable bracelets that light up live and grow flowers on the site and the projection. Everything after that is scaling and polish, and week nine is an honest buffer over Thanksgiving.",
      "Seventy tasks are written out in the Terra Labs task sheet with owners and dates, and the industrial design and narrative roles have work in every single week, not just at the end.",
    ],
  },

  team: {
    heading: "Who we need",
    roles: config.team,
    hours: plan.hoursPerPersonPerWeek,
    hoursRange: "6 to 10 hours a week, 12 to 15 in the MVP, assembly and demo weeks",
    teamHours: plan.teamHours,
    notes: [
      "Seven roles, and the plan works with as few as four people if some double up: PM with industrial design, hardware with firmware, backend with web, narrative with projection visuals.",
      "About eight and a half hours a week each, which is one team sync, one shared build block and a few hours of solo work. Three crunch weeks run higher: the MVP, the assembly party and demo week.",
      "The narrative role is a real seat at the table, not a favour we ask at the end. Species, palette, signage, the consent copy and the run of show all sit with that person and the Terra Labs narrative team.",
    ],
  },

  risks: {
    heading: "What could go wrong",
    items: [
      { risk: "Names are missed in a loud room", answer: "Week 1 spike, roster-constrained matching, button fallback" },
      { risk: "Three people in a circle confuse it", answer: "Proximity ranking and both directions required; tuned at rehearsal" },
      { risk: "Campus Wi-Fi blocks 60 devices", answer: "Tested in the demo room in week 7, phone hotspots ready" },
      { risk: "Amber is not available when we need it", answer: "Deepgram plus our own database works from week 3" },
      { risk: "Our laptop dies on the night", answer: "Second laptop with the same image; the button works with no server" },
    ],
    notes: [
      "Every one of these has a fallback already in the plan, and the biggest one, speech in a loud room, is tested in week one before any money moves.",
      "The handshake button is the safety net under everything: even with no Wi-Fi, no Amber and no laptop, two people pressing together still turns a light on.",
    ],
  },

  ask: {
    heading: "What we are asking for",
    asks: [
      { label: "A team", detail: "Five to seven people, about 8 hours a week" },
      { label: "A budget tier", detail: "Lean at $944 or Mid at $2,197" },
      { label: "A narrative partner", detail: "To make the forest listen kindly" },
      { label: "A wall", detail: "One projection surface and a check-in table by the door" },
    ],
    close: "Let the forest bloom when people meet.",
    notes: [
      "End on the garden. As you list the asks, the wall behind you fills with flowers. The name Bloom is a placeholder, and we would love the narrative team to name it.",
      "Take questions on privacy first if they come; the answer is on the earlier slide and in the PRD.",
    ],
  },
} as const;
