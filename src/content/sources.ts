export const sources = {
  amberDeck: {
    cite: "Amber Intelligence deck, 2026",
    title: "Amber Intelligence investor deck, slides 'Your network has a churn problem' and 'Our Product'",
    url: "",
  },
  trellis: {
    cite: "Trellis Strategies, Student Financial Wellness Survey, n = 43,519",
    title: "Invisible on Campus: The Student Loneliness Crisis, research brief, February 2026",
    url: "https://www.trellisstrategies.org/wp-content/uploads/2026/02/Research-Brief_TSFEB26_Loneliness.pdf",
  },
  likingGap: {
    cite: "Boothby et al., Psychological Science, 2018",
    title: "The Liking Gap in Conversations: Do People Like Us More Than We Think? (Study 5: 102 first-year suitemates, Sep to May)",
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
  deepgram: {
    cite: "deepgram.com/pricing, checked Sep 22 2026",
    title: "Deepgram pricing, Nova-3 streaming pay as you go",
    url: "https://deepgram.com/pricing",
  },
  taskSheet: {
    cite: "Bloom Task Sheet F26, team plan",
    title: "Bloom week-by-week task sheet, Terra Labs template, 70 tasks",
    url: "",
  },
  espressif: {
    cite: "Espressif ESP-IDF docs",
    title: "ESP-IDF Wi-Fi Security guide (WPA2-Enterprise support on ESP32-S3)",
    url: "https://docs.espressif.com/projects/esp-idf/en/latest/esp32s3/api-guides/wifi-security.html",
  },
} as const;

export type SourceKey = keyof typeof sources;
