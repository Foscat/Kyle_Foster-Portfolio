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
