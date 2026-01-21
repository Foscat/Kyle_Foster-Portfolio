/**
 * Normalize diagram collections into a predictable array
 *
 * Accepts:
 * - Object maps (preferred)
 * - Arrays (legacy)
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
      console.log("Entry", { entry });
      return entry;
    });
  }

  return [];
}
