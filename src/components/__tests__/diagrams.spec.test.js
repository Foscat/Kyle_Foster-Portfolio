/**
 * @file src\components\__tests__\diagrams.spec.test.js
 * @description src\components\__tests__\diagrams.spec.test module.
 * @module src\components\__tests__\diagrams.spec.test
 */

import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

/**
 * @description Guard test that ensures diagram E2E coverage files remain
 * present and active under Playwright.
 */

const PLAYWRIGHT_SPECS = [
  "playwright/diagrams.spec.ts",
  "playwright/diagram-snapshots.spec.ts",
  "playwright/diagram-coverage.spec.ts",
];

describe("Diagram coverage guard", () => {
  it("keeps canonical diagram Playwright suites present", () => {
    for (const relativePath of PLAYWRIGHT_SPECS) {
      const absolutePath = path.join(process.cwd(), relativePath);
      expect(fs.existsSync(absolutePath), `${relativePath} should exist`).toBe(true);

      const source = fs.readFileSync(absolutePath, "utf8");
      expect(source).not.toMatch(/\b(describe|it|test)\.skip\(/);
      expect(source.length).toBeGreaterThan(100);
    }
  });

  it("ensures the Mermaid smoke suite still asserts rendered output", () => {
    const smokeFile = path.join(process.cwd(), "playwright/diagrams.spec.ts");
    const source = fs.readFileSync(smokeFile, "utf8");

    expect(source).toContain("Mermaid diagram page loads without app-owned console errors");
    expect(source).toContain(".mermaid");
  });
});
