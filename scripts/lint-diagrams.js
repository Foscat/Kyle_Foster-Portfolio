/**
 * @file lint-diagrams.js
 * @description
 * Structural linter for Mermaid diagram blocks.
 *
 * This script validates Mermaid diagrams before they are:
 * - Rendered into PNGs
 * - Embedded into documentation
 * - Parsed by downstream Mermaid tooling
 *
 * It enforces a strict set of invariants that prevent
 * hard-to-debug Mermaid parsing failures.
 *
 * This script is intended to be:
 * - Run locally by developers
 * - Executed in CI as a hard failure gate
 *
 * IMPORTANT:
 * - This script DOES NOT modify diagram sources
 * - It only validates and throws on failure
 *
 * Expected pipeline order:
 *   normalize → format → lint → render → build assets
 *
 * @throws {Error}
 *   Exits with non-zero status if any diagram violates lint rules.
 */

import { normalizeDiagrams } from "./normalize-diagrams.js";
import diagrams from "../src/assets/data/diagrams.js";
import { BlockType } from "../src/types/ui.types.js";

/**
 * Removes the Mermaid init block for structural validation only.
 *
 * This function MUST NOT be used to mutate diagram sources.
 * The init block is stripped solely to simplify downstream checks
 * such as diagram declaration validation.
 *
 * @param {string} source - Raw Mermaid diagram source.
 * @returns {string} Diagram source without the init block.
 */
function stripInit(source) {
  return source.replace(/^%%\{init:[\s\S]*?\}%%\s*/m, "");
}

/**
 * Extracts and validates the Mermaid source string from a diagram block.
 *
 * @param {Object} diagram - Normalized diagram block.
 * @returns {string} Mermaid source.
 * @throws {Error} If the diagram source is missing or invalid.
 */
function extractSource(diagram) {
  if (!diagram?.diagram || typeof diagram.diagram !== "string") {
    throw new Error(`[${diagram?.id ?? "unknown"}] Diagram source is missing or invalid`);
  }

  return diagram.diagram;
}

/**
 * Performs structural validation on a single Mermaid diagram block.
 *
 * Enforced invariants:
 * 1. Block type must be BlockType.DIAGRAM
 * 2. Mermaid init block must appear first
 * 3. Tabs are forbidden (Mermaid grammar sensitivity)
 * 4. Diagram declaration must be valid
 * 5. Recommended readability rules are warned (not failed)
 *
 * @param {Object} diagram - Normalized diagram block.
 * @throws {Error} If any required invariant is violated.
 */
function lintDiagram(diagram) {
  if (diagram.type !== BlockType.DIAGRAM) {
    throw new Error(
      `[${diagram.id}] Invalid block type ${diagram.type}. Expected BlockType.DIAGRAM`
    );
  }

  /**
   * RULE: Diagram source must exist and be non-empty.
   *
   * Empty diagram blocks indicate:
   * - Corrupt data
   * - Incomplete migrations
   * - Authoring mistakes
   *
   * We fail early here to avoid downstream scripts
   * attempting to format or render invalid input.
   */
  const source = extractSource(diagram);

  /**
   * RULE: Mermaid init block must appear first.
   *
   * Mermaid requires the init directive (%%{init: ... }%%)
   * to be the *very first* content in the diagram.
   *
   * If it appears later:
   * - Mermaid will silently ignore it
   * - Theme and config settings will not apply
   * - Rendering output becomes inconsistent across environments
   *
   * This rule is enforced strictly because downstream scripts
   * assume formatting and rendering stability.
   */
  if (!source.startsWith("%%{init:")) {
    throw new Error(
      `[${diagram.id}] Mermaid init block must be the first characters in the diagram`
    );
  }

  /**
   * RULE: Tabs are forbidden in Mermaid source.
   *
   * Mermaid is indentation-sensitive but does NOT define
   * consistent tab-width semantics.
   *
   * Tabs can:
   * - Break subgraph nesting
   * - Produce visually valid but semantically broken diagrams
   * - Render differently across Mermaid versions
   *
   * We enforce spaces-only indentation to guarantee
   * deterministic formatting and rendering.
   */

  if (/\t/.test(source)) {
    throw new Error(`[${diagram.id}] Tabs detected — Mermaid requires spaces only`);
  }

  const normalized = stripInit(source)
    .replace(/\r\n/g, "\n")
    .replace(/^\s*\n+/, "")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n");

  /**
   * RULE: Diagram must start with a valid declaration.
   *
   * Mermaid diagrams MUST begin with a declaration such as:
   *   flowchart
   *   sequenceDiagram
   *   classDiagram
   *
   * Without a valid declaration:
   * - Mermaid parsing fails
   * - Renderers throw cryptic errors
   * - Linting later in the pipeline becomes meaningless
   *
   * This is treated as a hard failure.
   * ------------------------------------------------------------
   * NOTE:
   * This whitelist is intentionally strict.
   *
   * New diagram types should only be added here
   * after confirming:
   * - Mermaid version compatibility
   * - Formatting support
   * - Rendering support
   */

  if (!/^(flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram)\b/.test(normalized)) {
    throw new Error(`[${diagram.id}] Invalid or missing Mermaid diagram declaration`);
  }

  /**
   * READABILITY RULE (Warning Only)
   *
   * These checks do NOT fail linting.
   * They exist to:
   * - Encourage consistent visual structure
   * - Improve maintainability of diagrams
   * - Reduce review friction
   *
   * Warnings should never block CI unless explicitly promoted
   * to hard rules.
   */

  const lines = normalized.split("\n");
  if (lines.length > 1 && lines[1].trim() !== "") {
    console.warn(`⚠️  [${diagram.id}] Recommended: blank line after diagram declaration`);
  }
}
/**
 * ENTRYPOINT BEHAVIOR
 *
 * This script is designed to FAIL FAST.
 *
 * Any lint violation:
 * - Throws immediately
 * - Exits with a non-zero code
 * - Prevents rendering, asset generation, and docs builds
 *
 * This is intentional and critical for CI safety.
 * ------------------------------------------------------------
 * Entry point for diagram linting.
 *
 * Normalizes diagrams, validates presence, and runs
 * lint checks against every diagram block.
 *
 * @throws {Error} If no diagrams are found or linting fails.
 */
function run() {
  const list = normalizeDiagrams(diagrams);

  if (!list.length) {
    throw new Error("No diagrams found to lint");
  }

  for (const diagram of list) {
    lintDiagram(diagram);
  }

  console.log("✅ Mermaid diagrams linted successfully.");
}

run();
