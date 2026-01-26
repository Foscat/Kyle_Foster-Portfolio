// scripts/normalizeMermaid.js

export function normalizeMermaidSource(source) {
  if (typeof source !== "string") return "";

  // Remove Mermaid init block
  let cleaned = source.replace(/^%%\{init:[\s\S]*?\}%%\s*/m, "");

  // Normalize line endings
  cleaned = cleaned.replace(/\r\n/g, "\n");

  // Remove leading indentation per line
  cleaned = cleaned
    .split("\n")
    .map((line) => line.trimStart())
    .join("\n");

  // Remove leading blank lines
  cleaned = cleaned.replace(/^\s*\n+/g, "");

  return cleaned;
}
