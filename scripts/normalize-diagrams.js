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
 * Normalizes Mermaid diagram source for consistent linting.
 * This function ensures:
 * - Proper newline after init block
 * - Blank line after diagram declaration
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
 * Normalizes a diagram collection into an array.
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
