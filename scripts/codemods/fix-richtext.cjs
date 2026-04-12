/**
 * @module scripts\codemods\fix-richtext
 * @file scripts\codemods\fix-richtext.cjs
 * @function fixRichText
 * @description Cleans and normalizes rich text nodes by trimming whitespace, removing empty text nodes, and merging adjacent text nodes.
 * @param {Array} nodes - An array of rich text nodes to be processed.
 * @returns {Array} A new array of cleaned and normalized rich text nodes.
 * @example
 * ```js
 * const input = [
 *  { type: "text", text: "  Hello " },
 *  { type: "text", text: "World  " },
 *  { type: "text", text: "   " },
 *  { type: "element", children: [
 *    { type: "text", text: "  Nested " },
 *    { type: "text", text: "Text  " }
 *  ]}
 * ];
 * const output = fixRichText(input);
 * console.log(output);
 * // Output:
 * // [
 * //   { type: "text", text: "Hello World" },
 * //   { type: "element", children: [
 * //     { type: "text", text: "Nested Text" }
 * //   ] }
 * // ]
 * ```
 */
function fixRichText(nodes) {
  if (!Array.isArray(nodes)) return nodes;

  function clean(node) {
    if (!node || typeof node !== "object") return node;

    if (typeof node.text === "string") {
      node.text = node.text.trimEnd();
      if (node.type === "text" && node.text.trim() === "") return null;
    }

    // Recursively clean children if present
    if (Array.isArray(node.children)) {
      node.children = node.children.map(clean).filter(Boolean);

      // Merge adjacent text nodes after cleaning
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

      if (node.children.length === 0) delete node.children;
    }

    return node;
  }

  return nodes.map(clean).filter(Boolean);
}

module.exports = { fixRichText };
