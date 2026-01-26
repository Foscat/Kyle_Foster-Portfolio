import { Page } from "@playwright/test";

export type DiagramCoverageResult = {
  rendered: string[];
  missing: string[];
};

export async function collectDiagramCoverage(
  page: Page,
  expectedIds: string[]
): Promise<DiagramCoverageResult> {
  const rendered = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("[id^='diagram-']"))
      .filter((el) => el.querySelector("svg"))
      .map((el) => el.id);
  });

  const missing = expectedIds.filter((id) => !rendered.includes(id));

  return { rendered, missing };
}
