import { expect, Page } from "@playwright/test";

export async function snapshotDiagram(page: Page, diagramId: string) {
  // Wait for network activity to settle before asserting; Mermaid renders async.
  await page.waitForLoadState("networkidle");

  // Use .mermaid-svg-host to avoid matching icon SVGs inside the same panel.
  const svgHandle = page.locator(`#${diagramId} .mermaid-svg-host svg`);

  // Allow up to 15 s — complex pages (e.g. /codestream with 4 diagrams) need it.
  await expect(svgHandle).toBeVisible({ timeout: 15000 });

  const svgMarkup = await svgHandle.evaluate((el) =>
    el.outerHTML
      .replace(/id="[^"]+"/g, 'id="__ID__"') // normalize element IDs
      .replace(/url\(#.*?\)/g, "url(__ID__)") // normalize url() references
      .replace(/#mermaid-[a-z0-9_-]+/g, "#mermaid-__ID__") // normalize Mermaid CSS scope IDs
      .replace(/<path d="[^"]+" stroke="none"/g, '<path d="__PATH__" stroke="none"')
      .replace(
        /<path d="[^"]+" stroke="#C9A227" stroke-width="2" fill="none" stroke-dasharray="0 0"/g,
        '<path d="__PATH__" stroke="#C9A227" stroke-width="2" fill="none" stroke-dasharray="0 0"'
      )
      .replace(
        /<path d="[^"]+" stroke="#5BA4FF" stroke-width="2" fill="none" stroke-dasharray="0 0"/g,
        '<path d="__PATH__" stroke="#5BA4FF" stroke-width="2" fill="none" stroke-dasharray="0 0"'
      )
  );

  expect(svgMarkup).toMatchSnapshot(`${diagramId}.svg`);
}
