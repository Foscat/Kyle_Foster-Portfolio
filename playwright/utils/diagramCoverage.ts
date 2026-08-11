/**
 * @file playwright\utils\diagramCoverage.ts
 * @description playwright\utils\diagramCoverage module.
 * @module playwright\utils\diagramCoverage
 */

import { Page } from "@playwright/test";
import { waitForMermaidRender } from "./waitForMermaid";

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
    try {
      // Reuse the production render waiter so lazy diagrams receive the same activation and error checks.
      await waitForMermaidRender(page, id);
      rendered.push(id);
    } catch {
      missing.push(id);
    }
  }

  return { rendered, missing };
}
