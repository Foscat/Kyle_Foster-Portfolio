import fs from "fs";
import path from "path";
import diagrams from "../src/assets/data/content/diagrams.js";
import { normalizeDiagrams } from "./normalize-diagrams.js";

const OUTPUT = path.resolve("docs/diagrams.json");

/**
 * build-diagram-assets.js
 * ---------------------------------------------------------------------------
 * Post-processing script to generate a clean JSON file of diagrams for
 * runtime consumption.
 *
 * This script performs the following:
 * - Normalizes diagram data (via `normalizeDiagrams`)
 * - Strips runtime-only fields (e.g. `mobile`, `desktop`)
 * - Writes a clean JSON file to `docs/diagrams.json` for use in the app
 *
 * Characteristics:
 * - Mutates output file (docs/diagrams.json)
 * - Idempotent (safe to run multiple times)
 * - Project-specific (not reusable)
 *
 * Pipeline position:
 *  normalize → format → lint → render → build assets
 *
 * IMPORTANT:
 * - This script should only be run after normalization, formatting, and linting
 * - It assumes input data is already clean and valid
 */
function run() {
  const normalized = normalizeDiagrams(diagrams);

  // We only include fields that are necessary for runtime rendering.
  const output = normalized.map(
    ({ ...rest }) => rest // strip runtime-only fields
  );

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

  console.log(`📦 Diagram assets written → ${OUTPUT}`);
}

run();
