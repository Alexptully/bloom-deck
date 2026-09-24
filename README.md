# Bloom deck

The Terra Labs pitch for Bloom, built as a small website so it can be presented from any browser, rehearsed one section at a time, and exported to PDF. You do not need to know how to code to present it or change the words.

## Present it (no setup)

`deck.pdf` in this folder is the latest export. Open it in any PDF viewer and use the arrow keys.

## Run the live version

1. Install Node.js (LTS) from nodejs.org. Restart your terminal afterwards.
2. Download this folder (GitHub: Code, then Download ZIP) or clone it.
3. In a terminal, inside the folder:

```
npm install
npm run dev
```

4. Open http://localhost:3000 in Chrome. Press F for full screen.

## Keys while presenting

| Key | What it does |
| --- | --- |
| Right arrow, space, click, swipe left | Next build step or slide |
| Left arrow, swipe right | Previous |
| Home, End | First or last slide |
| N | Show or hide speaker notes |
| F | Full screen |
| P | Open the print version |

The address bar follows the slide (`/#5` is slide 5), so you can reload straight into one section to rehearse it.

## Export a PDF

1. Press P (or open http://localhost:3000/print/).
2. Chrome: File, Print. Destination: Save as PDF. Margins: None. Turn on Background graphics. Paper size does not matter; the pages are already 1920 by 1080.
3. Save. One page per slide or build step.

## Change the words

Everything a guest reads is in two files:

- `src/content/content.ts` holds every slide's text, numbers and speaker notes. Edit the strings in quotes. Notes are the `notes` list on each slide.
- `src/content/config.ts` holds the placeholders: team member names, the demo date, the project name if the narrative team renames Bloom, and the Garden site URL.
- `src/content/sources.ts` lists every source cited in slide footers. If you add a number to a slide, add its source here and to that slide's entry in `src/components/deck/slides.ts`.

Save the file and the browser updates on its own.

## Before you share a change

```
npm run check
```

This runs the type checker, the linter and a scan for em dashes. If it prints errors, fix them before opening a pull request. Work on a branch (`git checkout -b my-change`), push it, and open a pull request; never push straight to `main`.

## Files

- `brief.md` is the content brief: what the deck argues, the required sections, the statistics and their sources.
- `CLAUDE.md` holds the design and writing rules. Claude Code reads it automatically; people should too.
- `scripts/snapshot.mjs` is a developer tool: after `npm run build` it clicks through every step, saves a screenshot of each to `snapshots/` and exports `snapshots/deck.pdf`. It needs the Playwright Chromium (`npx playwright install chromium`, or set `CHROMIUM_PATH`).

## Hosting on GitHub Pages

The repo already contains the deploy workflow (`.github/workflows/deploy.yml`). To put the deck online:

1. Create an empty repository on GitHub (for example `bloom-deck`). Do not add a README or license there.
2. In this folder:

```
git remote add origin https://github.com/YOUR-USERNAME/bloom-deck.git
git push -u origin main
```

3. On GitHub, open Settings, then Pages, and set Source to GitHub Actions.
4. The Actions tab shows the build. When it finishes, the deck is live at `https://YOUR-USERNAME.github.io/bloom-deck/`.

Every later push to `main` runs `npm run check`, rebuilds and redeploys. The workflow sets `DECK_BASE_PATH` to the repository name so images and links work under the `/bloom-deck/` path. If you rename the repository, nothing else needs to change.

## Where the pictures come from

`public/renders/` holds crops of the real Terra's Garden website (check-in form, seed, connection card, budding, full bloom) and the projected garden illustration, taken from the hackathon demo recording. Replace them with new screenshots as the Garden site changes; keep the same file names and the slides pick them up.
