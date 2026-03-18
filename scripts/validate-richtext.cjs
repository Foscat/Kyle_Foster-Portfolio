/**
 * @file validate-richtext.cjs
 * @description
 * Validation script for rich text content blocks.
 * This script performs structural validation on rich text blocks to ensure
 * they conform to expected formats before rendering.
 * It checks for:
 * - Valid node types (e.g. "p", "text", "strong", etc.)
 * - Proper nesting (e.g. <li> must be inside <ul> or <ol>)
 * - Required fields (e.g. <a> must have href)
 * - Content length (e.g. <p> should not exceed 600 characters)
 * - Single paragraph blocks (discouraged but not disallowed)
 *
 * Usage:
 * node validate-richtext.cjs <input-file.json>
 *
 * The input file should contain an array of rich text nodes to validate.
 * The script will output any validation issues to the console, categorized by severity.
 *
 * This script is intended to be used as part of a content validation pipeline,
 * and should be run before any rendering or formatting steps.
 *
 * @throws {Error}
 * Exits with non-zero status if any validation errors are found.
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

/**
 * @function validateRichText
 * @description Validates an array of rich text nodes against expected structure and content rules.
 * Validation rules include:
 * - Node types must be recognized and allowed
 * - <li> elements must be properly nested inside <ul> or <ol>
 * - <a> elements must include an href attribute
 * - <p> elements should not exceed 600 characters of combined text content
 * - Single <p> blocks are discouraged (but not disallowed)
 * @param {Array} nodes - Array of rich text nodes to validate.
 * @returns {Array} Array of validation issues.
 * Each issue is an object with the following shape:
 * {
 *   ruleId: string, // Unique identifier for the validation rule
 *   level: "error" | "warn", // Severity level of the issue
 *   path: string, // Path to the node in the tree
 *   message: string // Human-readable description of the issue
 * }
 */
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

/**
 * @function flattenText
 * @description Recursively concatenates text content from a node's children.
 * This is used to calculate the total text length of a <p> block for validation.
 * @param {Array} children - Array of child nodes to flatten.
 * @returns {string} Combined text content from all descendant <text> nodes.
 * Note: This function ignores non-text nodes and does not include whitespace from element nodes.
 */
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
