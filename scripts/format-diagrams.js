import fs from "fs";
import path from "path";
import { formatMermaid } from "./format-mermaid.js";

const DIAGRAMS_FILE = path.resolve("src/assets/data/diagrams.js");

let source = fs.readFileSync(DIAGRAMS_FILE, "utf8");

/**
 * Regex finds:
 * diagram: `...`
 */
const DIAGRAM_BLOCK_RE = /diagram:\s*`([\s\S]*?)`/g;

let changed = false;

source = source.replace(DIAGRAM_BLOCK_RE, (match, body) => {
  const formatted = formatMermaid(body);
  changed = changed || formatted !== body;
  return `diagram: \`${formatted}\``;
});

if (changed) {
  fs.writeFileSync(DIAGRAMS_FILE, source, "utf8");
  console.log("✨ Mermaid diagrams formatted");
} else {
  console.log("✓ Mermaid diagrams already formatted");
}
