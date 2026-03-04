/**
 * Safe RichText normalizer
 */

function fixRichText(nodes) {
  if (!Array.isArray(nodes)) return nodes;

  function clean(node) {
    if (!node || typeof node !== "object") return node;

    if (typeof node.text === "string") {
      node.text = node.text.trimEnd();
      if (node.type === "text" && node.text.trim() === "") return null;
    }

    if (Array.isArray(node.children)) {
      node.children = node.children.map(clean).filter(Boolean);

      const merged = [];
      for (const child of node.children) {
        const prev = merged[merged.length - 1];
        if (prev && prev.type === "text" && child.type === "text") {
          prev.text += child.text;
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
