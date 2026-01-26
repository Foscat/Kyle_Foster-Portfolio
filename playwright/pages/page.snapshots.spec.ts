import { test, expect } from "@playwright/test";
import { stabilizePage } from "../utils/stabilizePage";

/**
 * Page snapshot matrix
 * ------------------------------------------------------------
 * Generates baseline screenshots per:
 * - page route
 * - theme (light/dark)
 * - viewport (desktop/mobile)
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const THEMES = ["light", "dark"] as const;

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Hackathon", path: "/hackathon" },
  { name: "CodeStream SMU", path: "/codestream-smu" },
  { name: "Side Projects", path: "/side-projects" },
];

test.describe("Page layout snapshots", () => {
  for (const pageDef of PAGES) {
    for (const theme of THEMES) {
      test(`${pageDef.name} — ${theme} theme (desktop)`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto(toUrl(pageDef.path));

        await stabilizePage(page, { theme });

        await expect(page).toHaveScreenshot(`${pageDef.name}-${theme}-desktop.png`, {
          fullPage: true,
        });
      });

      test(`${pageDef.name} — ${theme} theme (mobile)`, async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 }); // iPhone X baseline
        await page.goto(toUrl(pageDef.path));

        await stabilizePage(page, { theme });

        await expect(page).toHaveScreenshot(`${pageDef.name}-${theme}-mobile.png`, {
          fullPage: true,
        });
      });
    }
  }
});
