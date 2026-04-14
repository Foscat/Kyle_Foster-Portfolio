/**
 * @file normalizeMermaid.test.js
 * @description Unit tests for Mermaid source normalization.
 * @module scripts/diagrams/tests/normalizeMermaid
 */

import { describe, expect, it } from "vitest";
import { normalizeMermaidSource } from "../normalizeMermaid.js";

describe("normalizeMermaidSource", () => {
  it("removes init blocks and normalizes indentation", () => {
    const source = `%%{init: {"theme": "dark"}}%%\n    graph TD\n      A --> B\n`;

    expect(normalizeMermaidSource(source)).toBe("graph TD\nA --> B\n");
  });

  it("returns an empty string for non-string input", () => {
    expect(normalizeMermaidSource(null)).toBe("");
    expect(normalizeMermaidSource(undefined)).toBe("");
  });
});
