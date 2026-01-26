/**
 * @file format-diagrams.js
 * @description
 * Repository-level formatter for embedded Mermaid diagrams.
 *
 * This script locates Mermaid diagram template literals
 * within the project and rewrites them using the canonical
 * formatting rules defined in `format-mermaid.js`.
 *
 * Characteristics:
 * - Performs in-place file modification
 * - Project-specific (not reusable)
 * - Safe to run repeatedly (idempotent)
 *
 * Intended usage:
 * - Manual developer tooling
 * - Pre-commit formatting
 * - CI formatting enforcement
 *
 * Pipeline position:
 *   normalize → format → lint → render → build assets
 *
 * IMPORTANT:
 * - This script mutates source files
 * - It should not be run on arbitrary input
 */

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
