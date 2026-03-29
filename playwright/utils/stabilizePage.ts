import { expect, type Page } from "@playwright/test";

/**
 * Deterministic storage key used by ThemeContext.
 */
const THEME_STORAGE_KEY = "portfolio-theme";

/**
 * Prime browser storage before navigation so React providers read a deterministic theme.
 */
export async function preparePageForStableTests(
  page: Page,
  opts: { theme?: "light" | "dark" } = {}
) {
  const { theme = "dark" } = opts;

  await page.addInitScript(
    ({ nextTheme, themeStorageKey }) => {
      try {
        window.localStorage.setItem(themeStorageKey, nextTheme);
        // Keep compatibility with older tests/components that may read this key.
        window.localStorage.setItem("theme", nextTheme);
        window.sessionStorage.clear();
      } catch {
        // Ignore storage issues in hardened browsers
      }

      // Disable route-level scroll restoration for deterministic screenshots.
      window.__DISABLE_RESTORE_SCROLL_POSITION__ = true;

      const applyThemeAttribute = () => {
        const root = document.documentElement;
        if (!root) return;
        root.setAttribute("data-theme", nextTheme);
        root.dataset.theme = nextTheme;
      };

      if (document.documentElement) {
        applyThemeAttribute();
      } else {
        document.addEventListener("DOMContentLoaded", applyThemeAttribute, { once: true });
      }
    },
    { nextTheme: theme, themeStorageKey: THEME_STORAGE_KEY }
  );
}

/**
 * stabilizePage
 * ---------------------------------------------------------------------------
 * Normalizes page state after navigation for snapshot + layout tests.
 */
export async function stabilizePage(page: Page, opts: { theme?: "light" | "dark" } = {}) {
  const { theme = "dark" } = opts;

  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");

  // Let webfonts settle before taking visual snapshots.
  await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    await document.fonts?.ready;
  });

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
  await page.evaluate((t) => {
    try {
      localStorage.setItem("portfolio-theme", t);
      localStorage.setItem("theme", t);
      document.documentElement.setAttribute("data-theme", t);
    } catch {
      // Ignore storage issues in hardened browsers
    }
  }, theme);

  // Keep React theme context in sync by using the actual toggle controls when present.
  const themeButtonName = theme === "dark" ? "Dark theme" : "Light theme";
  const themeButton = page.getByRole("button", { name: themeButtonName }).first();
  if (await themeButton.isVisible().catch(() => false)) {
    await themeButton.click();
  }

  await expect
    .poll(async () => {
      return page.evaluate(() => document.documentElement.dataset.theme || "");
    })
    .toBe(theme);

  // Wait until visible images are fully loaded to reduce visual flake.
  await page.evaluate(async () => {
    const visibleImages = Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0;
    });

    await Promise.all(
      visibleImages.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }

            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          })
      )
    );
  });

  // Wait until visible Mermaid containers either render an SVG or report an error.
  await page
    .waitForFunction(() => {
      const hosts = Array.from(document.querySelectorAll(".mermaid-svg-host"));
      const visibleHosts = hosts.filter((node) => {
        const rect = node.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight;
      });

      if (visibleHosts.length === 0) return true;

      return visibleHosts.every((node) => {
        return Boolean(node.querySelector("svg") || node.querySelector(".mermaid-error"));
      });
    })
    .catch(() => {
      // Not every route renders Mermaid in viewport; avoid hard failures.
    });

  // Ensure screenshot starts from a consistent scroll position.
  await page.evaluate(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  });

  // Give the UI one frame to repaint after theme change
  await page.waitForTimeout(500);
}
