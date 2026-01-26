import type { Page } from "@playwright/test";

/**
 * stabilizePage
 * ---------------------------------------------------------------------------
 * Normalizes page state for snapshot + layout tests.
 *
 * What it does:
 * - Waits for DOM + network to settle
 * - Disables CSS motion (reduces flaky snapshots)
 * - Applies theme deterministically (localStorage + attribute)
 */
export async function stabilizePage(page: Page, opts: { theme?: "light" | "dark" } = {}) {
  const { theme = "dark" } = opts;

  // Wait for initial render
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");

  // Disable animations/transitions for snapshot stability
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `,
  });

  // Apply theme deterministically.
  // Adjust the storage key if your ThemeContext uses a different one.
  await page.evaluate((t) => {
    try {
      localStorage.setItem("theme", t);
      document.documentElement.setAttribute("data-theme", t);
    } catch {
      // Ignore storage issues in hardened browsers
    }
  }, theme);

  // Give the UI one frame to repaint after theme change
  await page.waitForTimeout(50);
}
