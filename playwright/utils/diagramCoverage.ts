/**
 * @file playwright\utils\diagramCoverage.ts
 * @description playwright\utils\diagramCoverage module.
 * @module playwright\utils\diagramCoverage
 */

import { Page } from "@playwright/test";
import { activateNextDeferredDiagram } from "./waitForMermaid";

export type DiagramCoverageResult = {
  rendered: string[];
  missing: string[];
};

export async function collectDiagramCoverage(
  page: Page,
  expectedIds: string[]
): Promise<DiagramCoverageResult> {
  const rendered: string[] = [];
  const missing: string[] = [];

  for (const id of expectedIds) {
    // Use .mermaid-svg-host to avoid matching icon SVGs inside the same panel.
    const svg = page.locator(`#${id} .mermaid-svg-host svg`);
    try {
      if ((await svg.count()) === 0) {
        await activateNextDeferredDiagram(page);
      }
      await svg.waitFor({ state: "attached", timeout: 10000 });
      rendered.push(id);
    } catch {
      missing.push(id);
    }
  }

  return { rendered, missing };
}
