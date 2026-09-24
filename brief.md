# Bloom deck brief

Pitch deck for Terra Labs (USC) Fall 2026 project selection. Presenter: Alex Tully. Audience: Terra Labs leads and the narrative design team choosing projects for the end-of-year Magical Forest demo. Length: 8 to 10 minutes live, with speaker notes.

## What it pitches

Bloom: a wearable bracelet with a microphone that listens for one thing only, two people telling each other their names, and blooms (lights up) only after a real introduction. Each confirmed meeting is added to a shared Garden website and a projected communal garden. No phone is needed. It evolves Terra's Garden, the NFC bracelet built at the September hackathon, whose weakness was that guests had to pull out a phone to tap.

## Required sections (Terra Labs asked for these; each slide's footer tag names one)

1. Concept and story connection to the Magical Forest theme
2. How it works (technical)
3. Week-by-week timeline (MVP Oct 30, demo Dec 4)
4. Roles needed on the team
5. Bill of materials, two budget tiers
6. Average time commitment per week
7. Risks and privacy

## Statistics that may appear on slides, with sources

- 80% of new professional contacts go dormant, context lost within 48 hours. Source: Amber Intelligence deck, 2026 (slide "Your network has a churn problem").
- High-density networkers add 20 to 40 new connections a month. Source: Amber deck, 2026.
- Amber software is live in TestFlight; first wearable prototype targeted December 2026. Source: Amber deck, 2026.
- Terra's Garden was built in a 5 hour hackathon; 7 connections to full bloom. Source: Terra's Garden deck (Team Steve, Sep 2026) and Alex's account.
- Lean BOM: $944 for 32 bracelets, about $30 each all in ($22 for the bracelet parts alone). Mid BOM: $2,197 for 66 bracelets, about $33 each all in ($27 parts alone). Source: Bloom BOM F26, team estimates, key prices checked Sep 22 2026.
- XIAO ESP32-S3 $7.49. Source: seeedstudio.com, checked Sep 22 2026.
- Adafruit 500 mAh LiPo $7.16 at 10 to 99 qty. Source: adafruit.com, checked Sep 22 2026.
- Deepgram Nova-3 streaming $0.0048 per minute, $200 free credit. Source: deepgram.com/pricing, checked Sep 22 2026.
- Plan: 10 weeks, 70 tasks, about 8.5 hours per person per week, about 564 team hours for six people. Source: Bloom Task Sheet F26, team plan.
- ESP32-S3 supports WPA2-Enterprise Wi-Fi. Source: Espressif ESP-IDF docs.

No other numbers go on slides. Anything estimated is labelled "team estimate".

## Placeholders the team fills in (config.ts)

- Team member names (currently roles only)
- Demo date if Terra Labs changes it (planned Fri Dec 4, 2026)
- Garden site URL once deployed
- Project name if the narrative team renames Bloom

## Imagery

The phone screens in `public/renders/garden-*.png` are crops of the real Terra's Garden website taken from the hackathon demo recording (check-in form, seed, connection card, budding, full bloom). `garden-empty.jpg` and `garden-full.jpg` are the projected garden illustration from the same deck. They are our own material and may be used on any slide.

## Magical Forest framing

Every slide should read as part of the Magical Forest demo. The door of the demo room is the edge of the forest. The check-in table is the planting station, where each guest is planted as a seed and given a dark bracelet. The room is the forest floor, where lit bracelets move at wrist height like fireflies. The projection wall is the clearing, where the garden fills with one flower per guest. The forest "listens for your name" is the story framing of the microphone, always given alongside the plain explanation. A treeline along the foot of every slide grows denser as the deck goes on.

## Motif

Eight, drawn two ways. On the wrist, Bloom is a ring of eight LEDs, and each new person you meet lights one more; all eight lit is full bloom. On the Garden site and the projected wall, the same meetings grow a flower from seed to full bloom. Slides about the physical bracelet draw the light ring (`LightRing`); slides about the site, the wall and the story draw the flower (`Bloom`). Never show a flower on the wrist.

## Tone

Warm, plain, concrete. Storybook rather than techwear. Say what happens to a guest before saying what the electronics do.
