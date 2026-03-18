/**
 * @function formatRichText
 * @description Cleans and formats a rich text node tree by:
 * - Trimming whitespace from text nodes (end only)
 * - Removing empty text nodes
 * - Merging adjacent text nodes into single nodes
 * - Recursively applying the same logic to child nodes
 *
 * This function is designed to be idempotent and can be safely re-run on already formatted rich text structures.
 * It does not modify the structure of non-text nodes, but it will clean their children if they exist.
 *
 * @param {Array} nodes - An array of rich text nodes to be processed.
 * @return {Array} A new array of cleaned and formatted rich text nodes.
 * @example
 * ```js
 * const input = [
 *   { type: "text", text: "  Hello " },
 *   { type: "text", text: "World  " },
 *   { type: "text", text: "   " },
 *   { type: "element", children: [
 *     { type: "text", text: "  Nested " },
 *     { type: "text", text: "Text  " }
 *   ]}
 * ];
 */
export default function formatRichText(nodes) {
  if (!Array.isArray(nodes)) return nodes;

  function fixNode(node) {
    if (!node || typeof node !== "object") return node;

    // Clean children
    if (Array.isArray(node.children)) {
      node.children = node.children.map(fixNode).filter(Boolean);

      // merge adjacent text nodes
      const merged = [];
      for (const child of node.children) {
        const prev = merged[merged.length - 1];
        if (prev && prev.type === "text" && child.type === "text") {
          prev.text = `${prev.text || ""}${child.text || ""}`;
        } else {
          merged.push(child);
        }
      }
      node.children = merged;

      // remove empty children arrays
      if (node.children.length === 0) delete node.children;
    } else if (node.children && !Array.isArray(node.children)) {
      // don't attempt to fix invalid shape here
    }

    // Trim text
    if (typeof node.text === "string") {
      const trimmed = node.text.replace(/\s+$/g, "");
      node.text = trimmed;
      if (node.type === "text" && trimmed.trim().length === 0) return null; // remove empty text node
    }

    return node;
  }

  return nodes.map(fixNode).filter(Boolean);
}
