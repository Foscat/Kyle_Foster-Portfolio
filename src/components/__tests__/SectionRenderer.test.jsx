/**
 * @file src\components\__tests__\SectionRenderer.test.jsx
 * @description src\components\__tests__\SectionRenderer.test module.
 * @module src\components\__tests__\SectionRenderer.test
 */

import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

/**
 * @description Guard test that keeps this legacy path active while canonical
 * SectionRenderer behavior coverage lives in
 * `src/components/renderers/__tests__/SectionRenderer.test.jsx`.
 */

const CANONICAL_TEST_FILE = path.join(
  process.cwd(),
  "src/components/renderers/__tests__/SectionRenderer.test.jsx"
);

describe("SectionRenderer coverage guard", () => {
  it("keeps canonical SectionRenderer tests present and non-empty", () => {
    expect(fs.existsSync(CANONICAL_TEST_FILE)).toBe(true);

    const source = fs.readFileSync(CANONICAL_TEST_FILE, "utf8");
    expect(source).not.toMatch(/\b(describe|it|test)\.skip\(/);
    expect(source).toContain('describe("SectionRenderer"');
    expect(source).toContain('it("registers the section on mount"');
    expect(source).toContain('it("renders a MermaidDiagram for DIAGRAM blocks"');
  });
});
