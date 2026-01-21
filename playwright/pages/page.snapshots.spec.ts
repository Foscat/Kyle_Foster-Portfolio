import { test, expect } from "@playwright/test";
import { stabilizePage } from "../utils/stabilizePage";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Hackathon", path: "/hackathon" },
  { name: "CodeStream SMU", path: "/codestream-smu" },
  { name: "Side Projects", path: "/side-projects" },
] as const;

const THEMES = ["light", "dark"] as const;

test.describe("Page layout snapshots", () => {
  for (const pageDef of PAGES) {
    for (const theme of THEMES) {
      test(`${pageDef.name} — ${theme} theme (desktop)`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(pageDef.path);

        await stabilizePage(page, { theme });

        await expect(page).toHaveScreenshot(
          `${pageDef.name.toLowerCase().replace(/\s+/g, "-")}-${theme}-desktop.png`,
          { fullPage: true }
        );
      });

      test(`${pageDef.name} — ${theme} theme (mobile)`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto(pageDef.path);

        await stabilizePage(page, { theme });

        await expect(page).toHaveScreenshot(
          `${pageDef.name.toLowerCase().replace(/\s+/g, "-")}-${theme}-mobile.png`,
          { fullPage: true }
        );
      });
    }
  }
});
