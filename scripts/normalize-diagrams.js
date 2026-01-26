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
 * Normalizes a diagram collection into an array.
 *
 * Accepted input formats:
 * 1. Object map:
 *    {
 *      diagramId: { ...diagramData }
 *    }
 *
 * 2. Array (legacy):
 *    [
 *      { ...diagramData }
 *    ]
 *
 * Normalization rules:
 * - Null/undefined input yields an empty array
 * - Array input is filtered to remove falsy entries
 * - Object input is converted into an array with injected `key`
 * - Unsupported input types return an empty array
 *
 * @param {Object<string, Object>|Array<Object>|undefined|null} input
 *   Raw diagram collection.
 *
 * @returns {Array<Object>}
 *   Normalized diagram array suitable for downstream processing.
 */
export function normalizeDiagrams(input) {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.filter(Boolean);
  }

  if (typeof input === "object") {
    return Object.entries(input).map(([key, diagram]) => {
      // Inject the object key as a stable identifier for downstream tools
      const entry = {
        key,
        ...diagram,
      };
      if (process.env.DEBUG_DIAGRAMS) {
        console.log("Normalized diagram entry:", entry);
      }

      return entry;
    });
  }

  return [];
}
