// Placeholders a teammate fills in. Each comment says where the value appears.
export const config = {
  // Title slide and end slide. Rename here if the narrative team picks a new name.
  projectName: "Bloom",
  // Title slide byline and end slide.
  presenter: "Alex Tully",
  // Title slide.
  club: "Terra Labs, USC",
  // Timeline slide. Change if Terra Labs announces a different demo date.
  demoDate: "Fri Dec 4, 2026",
  mvpDate: "Fri Oct 30, 2026",
  // End slide. Leave empty until the Garden site is deployed.
  gardenUrl: "",
  // Team slide. Replace role placeholders with names once the team is picked.
  team: [
    { role: "PM and systems", name: "Alex Tully" },
    { role: "Hardware and electrical", name: "" },
    { role: "Firmware", name: "" },
    { role: "Backend and Amber integration", name: "" },
    { role: "Web and projection", name: "" },
    { role: "Industrial design", name: "" },
    { role: "Narrative and visual design", name: "" },
  ],
} as const;
