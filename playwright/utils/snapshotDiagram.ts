import { expect, Page } from "@playwright/test";

export async function snapshotDiagram(page: Page, diagramId: string) {
  const svgHandle = page.locator(`#${diagramId} svg`);

  await expect(svgHandle).toBeVisible();

  const svgMarkup = await svgHandle.evaluate((el) =>
    el.outerHTML
      .replace(/id="[^"]+"/g, 'id="__ID__"') // normalize
      .replace(/url\(#.*?\)/g, "url(__ID__)")
  );

  expect(svgMarkup).toMatchSnapshot(`${diagramId}.svg`);
}
