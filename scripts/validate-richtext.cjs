/**
 * RichText validator
 * Lints structural + authoring rules
 */

const ALLOWED_TYPES = new Set([
  "p",
  "text",
  "strong",
  "em",
  "a",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "blockquote",
  "inlineIcon",
  "h1",
  "h2",
  "h3",
  "h4",
]);

function validateRichText(nodes) {
  const issues = [];

  function push(ruleId, level, path, message) {
    issues.push({ ruleId, level, path, message });
  }

  function walk(node, parentType, path) {
    if (!node || typeof node !== "object") {
      push("rt/node-object", "error", path, "Node must be an object.");
      return;
    }

    const { type, text, href, children } = node;

    if (!type || typeof type !== "string") {
      push("rt/type", "error", path, "Node.type must be a string.");
      return;
    }

    if (!ALLOWED_TYPES.has(type)) {
      push("rt/type-unknown", "error", path, `Unknown type: ${type}`);
    }

    if (type === "li" && !["ul", "ol"].includes(parentType)) {
      push("rt/li-parent", "error", path, "<li> must be inside <ul> or <ol>.");
    }

    if (type === "text") {
      if (children) push("rt/text-children", "error", path, "<text> cannot have children.");
      if (typeof text !== "string")
        push("rt/text-value", "error", path, "<text> must have string text.");
      if (text && text.trim() === "") push("rt/text-empty", "warn", path, "Empty text node.");
    }

    if (type === "a" && !href) {
      push("rt/a-href", "error", path, "<a> must include href.");
    }

    if (type === "p" && Array.isArray(children)) {
      const combined = flattenText(children);
      if (combined.length > 600) {
        push("rt/p-length", "warn", path, "Paragraph exceeds 600 characters.");
      }
    }

    if (Array.isArray(children)) {
      children.forEach((child, i) => walk(child, type, `${path}.children[${i}]`));
    }
  }

  if (!Array.isArray(nodes)) {
    push("rt/root-array", "error", "root", "Content must be array.");
    return issues;
  }

  nodes.forEach((node, i) => walk(node, "root", `root[${i}]`));

  if (nodes.length === 1 && nodes[0]?.type === "p") {
    push("rt/single-p", "warn", "root", "Single paragraph blocks discouraged.");
  }

  return issues;
}

function flattenText(children) {
  let out = "";
  children.forEach((c) => {
    if (!c || typeof c !== "object") return;
    if (c.type === "text" && c.text) out += c.text;
    if (Array.isArray(c.children)) out += flattenText(c.children);
  });
  return out;
}

module.exports = { validateRichText };
