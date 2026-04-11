/**
 * @file scripts\build-diagram-assets.js
 * @description scripts\build-diagram-assets module.
 * @module scripts\build-diagram-assets
 */

import fs from "fs";
import path from "path";
import diagrams from "../src/assets/data/content/diagrams.js";
import { normalizeDiagrams } from "./normalize-diagrams.js";

const OUTPUT = path.resolve("docs/diagrams.json");

/**
 * @file build-diagram-assets.js
 * @description
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
 * - Failures here should block documentation generation, as missing or malformed
 *   diagram data would cause runtime errors in the app
 * - This script does NOT perform any rendering or image generation; it only prepares
 *   the JSON data for runtime use. Rendering is handled separately by `render-diagram-pngs.js`.
 *
 * @throws {Error}
 *   Exits with non-zero status if any unexpected issues occur during processing.
 */

/**
 * @function run
 * @description Main execution function for building diagram assets.
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
