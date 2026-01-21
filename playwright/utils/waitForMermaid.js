import { expect } from "@playwright/test";

export async function waitForMermaidRender(page, diagramId) {
  const container = page.locator(`#${diagramId}`);

  await container.waitFor({ state: "attached", timeout: 10000 });

  const svg = container.locator("svg");
  await expect(svg).toBeVisible({ timeout: 10000 });
}
