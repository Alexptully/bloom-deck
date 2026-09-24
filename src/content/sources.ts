export const sources = {
  likingGap: {
    cite: "Boothby et al., Psychological Science, 2018",
    title: "The Liking Gap in Conversations: Do People Like Us More Than We Think? (Study 5: 102 Yale first-year suitemates, surveyed Sep, Oct, Dec, Feb and May)",
    url: "https://journals.sagepub.com/doi/10.1177/0956797618783714",
  },
  gardenDeck: {
    cite: "Terra's Garden deck, Team Steve, Sep 2026",
    title: "The Terra-rium: Terra's Garden hackathon presentation (5 hour build)",
    url: "",
  },
  bom: {
    cite: "Bloom BOM F26, team estimates, prices checked Sep 22 2026",
    title: "Bloom bill of materials, Lean and Mid tiers, Terra Labs template",
    url: "",
  },
  seeed: {
    cite: "seeedstudio.com, checked Sep 22 2026",
    title: "Seeed Studio XIAO ESP32-S3 product page",
    url: "https://www.seeedstudio.com/XIAO-ESP32S3-p-5627.html",
  },
  adafruit: {
    cite: "adafruit.com, checked Sep 22 2026",
    title: "Adafruit Lithium Ion Polymer Battery 3.7 V 500 mAh, product 1578",
    url: "https://www.adafruit.com/product/1578",
  },
  taskSheet: {
    cite: "Bloom Task Sheet F26, team plan",
    title: "Bloom week-by-week task sheet, Terra Labs template, 70 tasks",
    url: "",
  },
} as const;

export type SourceKey = keyof typeof sources;
