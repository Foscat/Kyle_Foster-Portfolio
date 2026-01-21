/**
 * Deterministic Mermaid formatter (Node-only)
 * - Structural only (never changes meaning)
 * - Mermaid 11 safe
 */

const DIAGRAM_DECL_RE = /^(flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram)\b/;

export function formatMermaid(source) {
  if (typeof source !== "string") return source;

  // Normalize line endings + tabs
  let text = source.replace(/\r\n/g, "\n").replace(/\t/g, "  ");

  // Extract init block (must stay first)
  let init = "";
  const initMatch = text.match(/^%%\{init:[\s\S]*?\}%%/);
  if (initMatch) {
    init = initMatch[0];
    text = text.slice(init.length);
  }

  // Remove leading whitespace after init
  text = text.replace(/^\s+/, "");

  const lines = text.split("\n");

  let indent = 0;
  const out = [];

  for (let raw of lines) {
    const trimmed = raw.trim();

    if (!trimmed) {
      out.push("");
      continue;
    }

    if (trimmed === "end") {
      indent = Math.max(0, indent - 1);
    }

    out.push("  ".repeat(indent) + trimmed);

    if (trimmed.startsWith("subgraph")) {
      indent++;
    }
  }

  let body = out.join("\n").trimEnd();

  // Ensure blank line after diagram declaration
  const bodyLines = body.split("\n");
  if (bodyLines.length > 1 && DIAGRAM_DECL_RE.test(bodyLines[0]) && bodyLines[1].trim() !== "") {
    bodyLines.splice(1, 0, "");
    body = bodyLines.join("\n");
  }

  // Reassemble (CRITICAL newline after init)
  if (init) {
    return `${init}\n${body}\n`;
  }

  return `${body}\n`;
}
