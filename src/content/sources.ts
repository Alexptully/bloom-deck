export const sources = {
  epley: {
    cite: "Epley and Schroeder, J. Experimental Psychology, 2014",
    title: "Mistakenly Seeking Solitude (Experiments 3a and 3b: commuters predicted fewer than 47% and 45% of strangers would talk; no participant reported being rebuffed)",
    url: "https://faculty.haas.berkeley.edu/jschroeder/Publications/Epley&Schroeder2014.pdf",
  },
  eventbrite: {
    cite: "Eventbrite Social Study, 2026",
    title: "Eventbrite Social Study report, 'Reset to Real': dcdx survey of 4,051 people aged 18 to 35, US and UK, July 2025",
    url: "https://www.businesswire.com/news/home/20260114088488/en/Eventbrites-Inaugural-Social-Study-Report-Reveals-the-Reset-to-Real-How-Gen-Z-and-Millennials-Are-Redefining-Live-Experiences-in-2026",
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
