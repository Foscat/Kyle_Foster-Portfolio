import { normalizeDiagrams } from "./normalize-diagrams.js";
import diagrams from "../src/assets/data/diagrams.js";
import { BlockType } from "../src/types/ui.types.js";

/**
 * Strip the Mermaid init block ONLY for structural checks.
 * We never feed this back to Mermaid.
 */
function stripInit(source) {
  return source.replace(/^%%\{init:[\s\S]*?\}%%\s*/m, "");
}

function extractSource(diagram) {
  if (!diagram?.diagram || typeof diagram.diagram !== "string") {
    throw new Error(`[${diagram?.id ?? "unknown"}] Diagram source is missing or invalid`);
  }

  return diagram.diagram;
}

function lintDiagram(diagram) {
  if (diagram.type !== BlockType.DIAGRAM) {
    throw new Error(
      `[${diagram.id}] Invalid block type ${diagram.type}. Expected BlockType.DIAGRAM`
    );
  }

  const source = extractSource(diagram);

  /* ------------------------------------------------------------
     1. Init block MUST be first characters
  ------------------------------------------------------------ */
  if (!source.startsWith("%%{init:")) {
    throw new Error(
      `[${diagram.id}] Mermaid init block must be the first characters in the diagram`
    );
  }

  /* ------------------------------------------------------------
     2. Tabs are forbidden (Mermaid grammar bug source)
  ------------------------------------------------------------ */
  if (/\t/.test(source)) {
    throw new Error(`[${diagram.id}] Tabs detected — Mermaid requires spaces only`);
  }

  const normalized = stripInit(source)
    .replace(/\r\n/g, "\n")
    .replace(/^\s*\n+/, "")
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n");

  console.log(`[DEBUG] Parsed source for ${diagram.id}:\n---\n${normalized}\n---`);

  /* ------------------------------------------------------------
     3. Must start with a valid diagram declaration
  ------------------------------------------------------------ */
  if (!/^(flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram)\b/.test(normalized)) {
    throw new Error(`[${diagram.id}] Invalid or missing Mermaid diagram declaration`);
  }

  /* ------------------------------------------------------------
     4. Enforce blank line after declaration (readability + safety)
  ------------------------------------------------------------ */
  const lines = normalized.split("\n");
  if (lines.length > 1 && lines[1].trim() !== "") {
    console.warn(`⚠️  [${diagram.id}] Recommended: blank line after diagram declaration`);
  }
}

function run() {
  const list = normalizeDiagrams(diagrams);

  if (!list.length) {
    throw new Error("No diagrams found to lint");
  }

  for (const diagram of list) {
    lintDiagram(diagram);
  }

  console.log("✅ Mermaid diagrams linted successfully.");
}

run();
