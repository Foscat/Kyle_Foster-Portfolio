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
import diagrams from "../src/assets/data/content/diagrams.js";
import { BlockType } from "../src/types/ui.types.js";

/**
 * VALID_MERMAID_TYPES
 * ---------------------------------------------------------------------------
 * Hybrid strict mode:
 * - CORE_TYPES are always allowed
 * - EXTENDED_TYPES are allowed but validated more strictly
 */
const CORE_TYPES = new Set(["flowchart", "sequenceDiagram", "classDiagram", "erDiagram"]);

const EXTENDED_TYPES = new Set(["stateDiagram", "stateDiagram-v2", "mindmap"]);

/**
 * Removes the Mermaid init block for structural validation only.
 */
function stripInit(source) {
  return source.replace(/^%%\{init:[\s\S]*?\}%%\s*/m, "");
}

/**
 * Extracts all Mermaid source strings from a diagram block.
 */
function extractSources(diagram) {
  const sources = [];

  const maybeAdd = (value) => {
    if (typeof value === "string") {
      sources.push(value);
    } else if (value && typeof value === "object") {
      if (typeof value.diagram === "string") {
        sources.push(value.diagram);
      }
    }
  };

  maybeAdd(diagram.diagram);
  maybeAdd(diagram.mobile);
  maybeAdd(diagram.desktop);

  if (typeof diagram.mobile === "string") {
    sources.push(diagram.mobile);
  }

  if (typeof diagram.desktop === "string") {
    sources.push(diagram.desktop);
  }

  if (!sources.length) {
    console.error("DEBUG DIAGRAM SHAPE:", diagram);
    throw new Error(`[${diagram?.id ?? "unknown"}] No valid Mermaid diagram source found`);
  }

  return sources;
}

/**
 * Performs structural validation on a single Mermaid diagram block.
 */
function lintDiagram(diagram) {
  if (diagram.type !== BlockType.DIAGRAM) {
    throw new Error(
      `[${diagram.id}] Invalid block type ${diagram.type}. Expected BlockType.DIAGRAM`
    );
  }

  const sources = extractSources(diagram);

  for (const source of sources) {
    /**
     * RULE: Mermaid init block must appear first (ignoring leading whitespace).
     */
    if (!source.trimStart().startsWith("%%{init:")) {
      throw new Error(
        `[${diagram.id}] Mermaid init block must be the first characters in the diagram`
      );
    }

    /**
     * RULE: Tabs are forbidden.
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

    const lines = normalized.split("\n");

    const declaration = lines[0]?.trim().split(" ")[0];

    /**
     * RULE: Diagram type validation (hybrid strict).
     */
    const isCore = CORE_TYPES.has(declaration);
    const isExtended = EXTENDED_TYPES.has(declaration);

    if (!isCore && !isExtended) {
      throw new Error(`[${diagram.id}] Unsupported Mermaid type: "${declaration}"`);
    }

    /**
     * RULE: Blank line required after declaration.
     */
    if (lines.length > 1 && lines[1].trim() !== "") {
      throw new Error(`[${diagram.id}] Missing blank line after Mermaid declaration`);
    }

    /**
     * EXTRA STRICT RULES FOR MINDMAP
     */
    if (declaration === "mindmap") {
      const rootLine = lines.find((l, i) => i > 0 && l.trim() !== "");

      if (!rootLine) {
        throw new Error(`[${diagram.id}] Mindmap must contain a root node`);
      }

      if (!rootLine.startsWith("  ")) {
        throw new Error(`[${diagram.id}] Mindmap root must be indented with two spaces`);
      }
    }
  }
}

/**
 * ENTRYPOINT BEHAVIOR
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
