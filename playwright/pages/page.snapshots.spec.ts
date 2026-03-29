import { test, expect } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

/**
 * Page snapshot matrix
 * ------------------------------------------------------------
 * Generates baseline screenshots per:
 * - page route
 * - theme (dark and light)
 * - viewport (desktop/mobile)
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const THEMES = ["dark", "light"] as const;

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Hackathon", path: "/hackathon" },
  { name: "CodeStream SMU", path: "/codestream-smu" },
  { name: "Side Projects", path: "/side-projects" },
];

test.describe("Page layout snapshots", () => {
  test.describe.configure({ mode: "serial" });

  for (const pageDef of PAGES) {
    for (const theme of THEMES) {
      test(`${pageDef.name} - ${theme} theme (desktop)`, async ({ page }) => {
        test.setTimeout(120000);
        await page.setViewportSize({ width: 1280, height: 720 });
        await preparePageForStableTests(page, { theme });

        await page.goto(toUrl(pageDef.path));
        await stabilizePage(page, { theme });
        await page.waitForTimeout(750);

        const screenshot = await page.screenshot({
          animations: "disabled",
          timeout: 120000,
          mask: [page.locator(".mermaid-container")],
        });

        expect(screenshot.byteLength).toBeGreaterThan(0);
      });

      test(`${pageDef.name} - ${theme} theme (mobile)`, async ({ page }) => {
        test.setTimeout(120000);
        await page.setViewportSize({ width: 375, height: 812 });
        await preparePageForStableTests(page, { theme });

        await page.goto(toUrl(pageDef.path));
        await stabilizePage(page, { theme });
        await page.waitForTimeout(750);

        const screenshot = await page.screenshot({
          animations: "disabled",
          timeout: 120000,
          mask: [page.locator(".mermaid-container")],
        });

        expect(screenshot.byteLength).toBeGreaterThan(0);
      });
    }
  }
});
