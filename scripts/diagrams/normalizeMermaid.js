/**
 * @module scripts/diagrams/normalize-mermaid
 * @file scripts/diagrams/normalize-mermaid.js
 * @function normalizeMermaidSource
 * @description Normalizes a Mermaid diagram source string by removing init blocks,
 * normalizing line endings, and trimming leading whitespace.
 * @param {string} source - The Mermaid diagram source string.
 * @returns {string} The normalized Mermaid diagram source string.
 *
 * @example
 * ```js
 * const source = `%%{init: {"theme": "dark"}}%%
 * graph TD
 * A --> B
 * `;
 * const normalized = normalizeMermaidSource(source);
 * console.log(normalized);
 * // Output:
 * // graph TD
 * // A --> B
 * ```
 */
export function normalizeMermaidSource(source) {
  if (typeof source !== "string") return "";

  // Remove Mermaid init block
  let cleaned = source.replace(/^%%\{init:[\s\S]*?\}%%\s*/m, "");

  // Normalize line endings
  cleaned = cleaned.replace(/\r\n/g, "\n");

  // Remove leading indentation per line
  cleaned = cleaned
    .split("\n")
    .map((line) => line.trimStart())
    .join("\n");

  // Remove leading blank lines
  cleaned = cleaned.replace(/^\s*\n+/g, "");

  return cleaned;
}
