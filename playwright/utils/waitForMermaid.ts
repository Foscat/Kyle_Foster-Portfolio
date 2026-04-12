/**
 * @file playwright\utils\waitForMermaid.ts
 * @description playwright\utils\waitForMermaid module.
 * @module playwright\utils\waitForMermaid
 */

import { Page, expect } from "@playwright/test";

export async function waitForMermaidRender(page: Page, diagramId: string) {
  const container = page.locator(`#${diagramId}`);
  const host = container.locator(".mermaid-svg-host");

  await container.waitFor({ state: "attached", timeout: 30000 });
  await expect(host).toBeVisible({ timeout: 30000 });

  // Use .mermaid-svg-host to avoid matching icon SVGs (caret, download, etc.).
  const svg = host.locator("svg");
  await expect(svg).toBeVisible({ timeout: 30000 });

  const renderError = host.locator(".mermaid-error");
  await expect(renderError).toHaveCount(0);
}
