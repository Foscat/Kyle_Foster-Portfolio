/**
 * @file scripts/diagrams/format-mermaid.js
 * @module scripts/diagrams/format-mermaid
 * @description
 * Deterministic formatter for Mermaid diagram source strings.
 *
 * This module operates on raw Mermaid source text and enforces:
 * - Structural indentation
 * - Whitespace normalization
 * - Mermaid grammar safety (Mermaid v11 compatible)
 *
 * Characteristics:
 * - Pure function (no side effects)
 * - Idempotent (repeated runs produce the same output)
 * - Project-agnostic (safe to reuse elsewhere)
 *
 * IMPORTANT:
 * - This module does NOT read or write files
 * - It does NOT validate diagram correctness
 * - It only normalizes formatting
 */

/**
 * Formats a Mermaid diagram source string into a deterministic,
 * readable, and Mermaid-safe structure.
 *
 * This function is intentionally:
 * - Pure (no side effects)
 * - Idempotent (safe to run multiple times)
 * - Structural-only (never changes semantic meaning)
 *
 * It does NOT validate diagrams — linting is handled separately.
 *
 * @param {string} source - Raw Mermaid source text.
 * @returns {string} Canonically formatted Mermaid source.
 */
export default function formatMermaid(source) {
  // Defensive: only operate on strings
  if (typeof source !== "string") return source;

  /**
   * @description Step 1: Normalize line endings and indentation characters - Converts Windows CRLF to LF for consistency - Replaces tabs with two spaces (Mermaid is indentation-sensitive) /
   */
  let text = source.replace(/\r\n/g, "\n").replace(/\t/g, "  ");
  // Normalize init directive only when it is exactly the Mermaid directive form.
  text = text.replace(/^%\s*%?\{init:/, "%%{init:");
  text = text.replace(/\}%%\s*$/, "}%%");

  /**
   * @description Step 2: Extract Mermaid init block (if present) Mermaid requires the init block (%%{init: ... }%%) to appear at the very top of the diagram. We temporarily remove it so the body can be formatted independently, then reattach it later. /
   */
  let init = "";
  const initMatch = text.match(/^%%\{init:[\s\S]*?\}%%/);
  if (initMatch) {
    init = initMatch[0];
    text = text.slice(init.length);
  }

  // IMPORTANT: do NOT strip leading whitespace for mindmap safety
  if (!text.startsWith("\n")) {
    text = "\n" + text;
  }

  const lines = text.split("\n");

  if (!lines.length) return source;

  const declarationIndex = lines.findIndex((l) => l.trim() !== "");
  const declaration = lines[declarationIndex]?.trim().split(" ")[0];

  if (!declaration) return source;

  // Ensure exactly one blank line after declaration
  if (lines[declarationIndex + 1]?.trim() !== "") {
    lines.splice(declarationIndex + 1, 0, "");
  }

  // For other diagram types, manage indentation structurally
  let indent = 0;
  const out = [];

  for (let raw of lines) {
    const trimmed = raw.trim();

    // Preserve intentional blank lines
    if (!trimmed) {
      out.push("");
      continue;
    }

    /**
     * @description Mermaid closes blocks explicitly with `end`. Indentation must decrease BEFORE writing the line. /
     */
    if (trimmed === "end") {
      indent = Math.max(0, indent - 1);
    }

    // Apply canonical indentation
    out.push("  ".repeat(indent) + trimmed);

    /**
     * @description Mermaid opens a new indentation scope after `subgraph`. Increase indentation AFTER writing the line. /
     */
    if (trimmed.startsWith("subgraph")) {
      indent++;
    }
  }

  /**
   * @description Step 5: Reassemble the formatted body - Trim trailing whitespace - Preserve internal blank lines /
   */
  let body = out.join("\n").trimEnd();

  /**
   * @description Step 6: Ensure readability rule — insert a blank line after the diagram declaration Example: flowchart TD A --> B This improves readability and prevents Mermaid parsing edge cases. /
   */
  const bodyLines = body.split("\n");
  if (bodyLines.length > 1 && bodyLines[1].trim() !== "") {
    bodyLines.splice(1, 0, "");
    body = bodyLines.join("\n");
  }

  /**
   * @description Step 7: Reattach the init block (if present) CRITICAL: - Must be followed by a newline - Must remain the first content in the diagram /
   */
  if (init) {
    return `${init}\n${body}\n`;
  }

  // Always ensure a trailing newline for file consistency
  return `${body}\n`;
}
