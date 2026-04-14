/**
 * @file normalize-diagrams.test.js
 * @description Unit tests for diagram normalization helpers.
 * @module scripts/diagrams/tests/normalize-diagrams
 */

import { describe, expect, it } from "vitest";
import { normalizeDiagrams } from "../normalize-diagrams";

describe("normalizeDiagrams", () => {
  it("returns filtered arrays for legacy diagram lists", () => {
    expect(normalizeDiagrams([null, { key: "a" }, undefined])).toEqual([{ key: "a" }]);
  });

  it("normalizes diagram source fields for object map input", () => {
    const input = {
      sample: {
        diagram: '%%{init: {"theme": "dark"}}%%graph TD\nA --> B',
      },
    };

    const [entry] = normalizeDiagrams(input);

    expect(entry.key).toBe("sample");
    expect(entry.diagram).toContain("%%{init:");
    expect(entry.diagram).toContain("graph TD");
  });
});
