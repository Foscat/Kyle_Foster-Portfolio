import { test, expect } from "@playwright/test";

test.describe("Mermaid diagrams", () => {
  test("render matches snapshots", async ({ page }) => {
    // assumes `npm run dev` is running in CI via Playwright config webServer
    await page.goto("/#/__diagrams"); // or your route
    await page.waitForTimeout(1000);

    const diagrams = page.locator('[data-testid="diagram-wrap"]');
    const count = await diagrams.count();

    for (let i = 0; i < count; i++) {
      const item = diagrams.nth(i);
      await expect(item).toHaveScreenshot(`diagram-${i}.png`, {
        animations: "disabled",
      });
    }
  });
});
