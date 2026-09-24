// Fails when a U+2014 em dash appears in the deck's source or docs.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src", "README.md", "CLAUDE.md", "brief.md"];
const skip = new Set(["node_modules", ".next", "out"]);
const hits = [];

function scanFile(path) {
  const lines = readFileSync(path, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.includes("—")) hits.push(`${path}:${i + 1}`);
  });
}

function walk(path) {
  const stat = statSync(path, { throwIfNoEntry: false });
  if (!stat) return;
  if (stat.isFile()) return scanFile(path);
  for (const name of readdirSync(path)) {
    if (!skip.has(name)) walk(join(path, name));
  }
}

roots.forEach(walk);
if (hits.length) {
  console.error("Em dashes found:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("No em dashes.");
