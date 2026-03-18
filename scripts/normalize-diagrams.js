/**
 * @file normalize-diagrams.js
 * @description
 * Normalizes diagram collections into a predictable array structure.
 *
 * This utility exists to support both:
 * - Modern object-based diagram maps (preferred)
 * - Legacy array-based diagram definitions
 *
 * All downstream diagram tooling (linting, formatting, rendering)
 * relies on this function to provide a stable, iterable array.
 *
 * IMPORTANT:
 * - This function does NOT validate diagram contents
 * - It only normalizes collection shape
 * - Invalid or falsy entries are filtered defensively
 */

/**
 * @function normalizeMermaidSource
 * @description Normalizes Mermaid diagram source for consistent linting.
 * This function ensures:
 * - Proper newline after init block
 * - Blank line after diagram declaration
 * - Consistent line endings
 * - Trims leading whitespace
 * This is a best-effort normalization to improve linting consistency.
 * It does NOT attempt to fully parse or validate Mermaid syntax.
 * It simply applies common formatting fixes to reduce false positives in linters.
 * @param {string} source - The raw Mermaid diagram source string.
 * @returns {string} The normalized Mermaid diagram source string.
 * @example
 * ```js
 * const source = `%%{init: {"theme": "dark"}}%%
 * graph TD
 * A --> B
 * `;
 * const normalized = normalizeMermaidSource(source);
 * console.log(normalized);
 * // Output:
 * // %%{init: {"theme": "dark"}}%%
 * // graph TD
 * // A --> B
 * ```
 */
function normalizeMermaidSource(source) {
  if (typeof source !== "string") return source;

  let cleaned = source.replace(/\r\n/g, "\n");

  // Extract init block safely
  const initMatch = cleaned.match(/^%%\{init:[\s\S]*?\}%%\s*/);

  let initBlock = "";
  if (initMatch) {
    initBlock = initMatch[0];
    cleaned = cleaned.slice(initBlock.length);
  }

  const lines = cleaned.split("\n");

  if (!lines.length) return source;

  // Ensure blank line after declaration
  if (lines.length > 1 && lines[1].trim() !== "") {
    lines.splice(1, 0, "");
  }

  const body = lines.join("\n");

  // Ensure newline after init block
  return initBlock ? initBlock.replace(/\s*$/, "\n") + body : body;
}

/**
 * @function normalizeDiagrams
 * @description Normalizes a diagram collection into a consistent array format.
 * Supports both object maps and legacy arrays. Applies Mermaid source normalization.
 * This function is designed to be flexible and forgiving, allowing for various input shapes while ensuring a predictable output structure for downstream processing.
 * @param {object|array} input - The raw diagram collection, either as an object map or an array.
 * @returns {array} An array of normalized diagram entries, each with a consistent structure.
 * @example
 * ```js
 * // Object map input
 * const diagramsMap = {
 * "diagram1": { diagram: "graph TD\nA --> B" },
 * "diagram2": { diagram: "graph LR\nC --> D" }
 * };
 * const normalizedFromMap = normalizeDiagrams(diagramsMap);
 * console.log(normalizedFromMap);
 * // Output:
 * // [
 * //   { key: "diagram1", diagram: "graph TD\nA --> B" },
 * //   { key: "diagram2", diagram: "graph LR\nC --> D" }
 * // ]
 *
 * // Array input
 * ```
 */
export function normalizeDiagrams(input) {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.filter(Boolean);
  }

  if (typeof input === "object") {
    return Object.entries(input).map(([key, diagram]) => {
      const entry = {
        key,
        ...diagram,
      };

      ["diagram", "mobile", "desktop"].forEach((field) => {
        if (typeof entry[field] === "string") {
          entry[field] = normalizeMermaidSource(entry[field]);
        } else if (entry[field] && typeof entry[field] === "object") {
          if (typeof entry[field].diagram === "string") {
            entry[field].diagram = normalizeMermaidSource(entry[field].diagram);
          }
        }
      });

      if (process.env.DEBUG_DIAGRAMS) {
        console.log("Normalized diagram entry:", entry);
      }

      return entry;
    });
  }

  return [];
}
