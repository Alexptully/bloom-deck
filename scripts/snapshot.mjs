// Dev-only: serves `out`, clicks through every build step, saves a screenshot per step
// and exports /print to PDF. Run after `npm run build`. Not part of `npm run check`.
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { chromium } from "playwright";

const root = join(process.cwd(), "out");
const outDir = join(process.cwd(), "snapshots");
mkdirSync(outDir, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".txt": "text/plain", ".svg": "image/svg+xml" };

function resolve(url) {
  let path = join(root, decodeURIComponent(url.split("?")[0].split("#")[0]));
  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  return existsSync(path) ? path : join(root, "404.html");
}

const server = createServer((req, res) => {
  const file = resolve(req.url);
  res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  res.end(readFileSync(file));
}).listen(4173);

const steps = JSON.parse(process.env.DECK_STEPS ?? "[]");
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("http://localhost:4173/#1");
await page.waitForTimeout(800);

let shot = 0;
for (let s = 0; s < steps.length; s++) {
  for (let k = 1; k <= steps[s]; k++) {
    await page.waitForTimeout(k === 1 ? 900 : 1300);
    await page.screenshot({ path: join(outDir, `${String(++shot).padStart(2, "0")}-s${s + 1}-k${k}.png`) });
    await page.keyboard.press("ArrowRight");
  }
}

await page.emulateMedia({ media: "print" });
  await page.goto("http://localhost:4173/print/");
await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 20000 });
await page.waitForTimeout(500);
await page.pdf({ path: join(outDir, "deck.pdf"), width: "1920px", height: "1080px", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
server.close();
console.log(`saved ${shot} screenshots and deck.pdf to snapshots/`);
