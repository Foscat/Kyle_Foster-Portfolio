import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cssPath = path.resolve(__dirname, "../src/click-animate/interactive-surface.css");
const interactiveSurfaceCss = fs.readFileSync(cssPath, "utf8");

function buildFixtureHtml() {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Interactive Surface Browser Matrix Fixture</title>
        <style>
          :root {
            --bg-surface: rgb(250, 250, 255);
            --text-primary: rgb(15, 23, 42);
            --focus-ring: rgb(31, 91, 235);
          }

          body {
            margin: 0;
            padding: 2rem;
            background: rgb(240, 244, 248);
            font-family: Arial, sans-serif;
          }

          .row {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .interactive-surface {
            padding: 0.75rem 1.25rem;
          }
        </style>
        <style>${interactiveSurfaceCss}</style>
      </head>
      <body>
        <div class="row">
          <button id="target" class="interactive-surface">Primary Target</button>
          <button id="disabled" class="interactive-surface" disabled>Disabled</button>
          <button id="ariaDisabled" class="interactive-surface" aria-disabled="true">ARIA Disabled</button>
          <button id="pressed" class="interactive-surface" aria-pressed="true">Pressed</button>
          <button id="iconOnly" class="interactive-surface icon-only" aria-label="Icon Action">+</button>
        </div>
      </body>
    </html>
  `;
}

test.describe("interactive-surface cross-browser behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.setContent(buildFixtureHtml());
  });

  test("standalone fallback visuals render without app tokens", async ({ page }) => {
    const styles = await page.locator("#target").evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        borderStyle: computed.borderStyle,
        borderWidth: computed.borderWidth,
        color: computed.color,
      };
    });

    expect(styles.backgroundColor).toBe("rgb(250, 250, 255)");
    expect(styles.borderStyle).toBe("solid");
    expect(styles.borderWidth).toBe("1px");
    expect(styles.color).toBe("rgb(15, 23, 42)");
  });

  test("hover applies interaction elevation", async ({ page }) => {
    const target = page.locator("#target");
    const before = await target.evaluate((el) => window.getComputedStyle(el).boxShadow);
    await target.hover();
    const after = await target.evaluate((el) => window.getComputedStyle(el).boxShadow);

    expect(before).not.toBe(after);
  });

  test("keyboard focus shows visible focus treatment", async ({ page }) => {
    await page.keyboard.press("Tab");

    const target = page.locator("#target");
    await expect(target).toBeFocused();

    const focusStyles = await target.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outlineStyle: computed.outlineStyle,
        outlineWidth: computed.outlineWidth,
        outlineColor: computed.outlineColor,
      };
    });

    expect(focusStyles.outlineStyle).toBe("solid");
    expect(focusStyles.outlineWidth).toBe("2px");
    expect(focusStyles.outlineColor).toContain("31, 91, 235");
  });

  test("reduced motion removes movement and transition behavior", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setContent(buildFixtureHtml());

    const target = page.locator("#target");
    await target.hover();

    const reduced = await target.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        transform: computed.transform,
        transitionDuration: computed.transitionDuration,
      };
    });

    expect(reduced.transform).toBe("none");
    expect(reduced.transitionDuration).toBe("0s");
  });

  test("aria and native disabled states are both non-interactive", async ({ page }) => {
    const disabledPointerEvents = await page
      .locator("#disabled")
      .evaluate((el) => window.getComputedStyle(el).pointerEvents);

    const ariaDisabledPointerEvents = await page
      .locator("#ariaDisabled")
      .evaluate((el) => window.getComputedStyle(el).pointerEvents);

    expect(disabledPointerEvents).toBe("none");
    expect(ariaDisabledPointerEvents).toBe("none");
  });

  test("aria-pressed maps to active state styling", async ({ page }) => {
    const styles = await page.locator("#pressed").evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        filter: computed.filter,
        boxShadow: computed.boxShadow,
      };
    });

    expect(styles.filter).toContain("brightness");
    expect(styles.boxShadow).not.toBe("none");
  });

  test("icon-only variant keeps minimum touch target size", async ({ page }) => {
    const icon = await page.locator("#iconOnly").evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        minWidth: computed.minWidth,
        minHeight: computed.minHeight,
      };
    });

    expect(icon.minWidth).toBe("44px");
    expect(icon.minHeight).toBe("44px");
  });
});
