/**
 * @file playwright\utils\waitForMermaid.ts
 * @description playwright\utils\waitForMermaid module.
 * @module playwright\utils\waitForMermaid
 */

import { Page, expect } from "@playwright/test";

/**
 * Brings the next lazy Mermaid placeholder into view when its real container
 * has not mounted yet. Route tests call diagrams in source order, matching the
 * order of deferred placeholders on the page.
 *
 * @param page - Active Playwright page containing deferred diagram placeholders.
 * @returns A promise that settles after the next placeholder is activated.
 */
export async function activateNextDeferredDiagram(page: Page) {
  const placeholder = page.getByRole("status", { name: "Loading diagram" }).first();
  if ((await placeholder.count()) === 0) return;

  await placeholder.scrollIntoViewIfNeeded();
}

export async function waitForMermaidRender(page: Page, diagramId: string) {
  const container = page.locator(`#${diagramId}`);
  const host = container.locator(".mermaid-svg-host");

  if ((await container.count()) === 0) {
    await activateNextDeferredDiagram(page);
  }

  await container.waitFor({ state: "attached", timeout: 30000 });
  await expect(host).toBeVisible({ timeout: 30000 });

  // Use .mermaid-svg-host to avoid matching icon SVGs (caret, download, etc.).
  const svg = host.locator("svg");
  await expect(svg).toBeVisible({ timeout: 30000 });

  const renderError = host.locator(".mermaid-error");
  await expect(renderError).toHaveCount(0);
}
