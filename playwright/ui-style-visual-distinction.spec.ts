/**
 * @file playwright\ui-style-visual-distinction.spec.ts
 * @description Rendered regressions that ensure style libraries change visible surface identity.
 * @module playwright/ui-style-visual-distinction
 */

import { expect, test, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const UI_STYLES = ["minimal-saas", "brutalism", "neumorphism", "y2k", "retro-glass"];
const LAYOUT_STYLES = ["retro-glass", "maximalist"];

async function setStyleState(page: Page, uiStyle: string) {
  await page.evaluate((nextUiStyle) => {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.mode = "dark";
    document.documentElement.dataset.palette = "cyber-lime";
    document.documentElement.dataset.ui = nextUiStyle;

    document.body.dataset.ui = nextUiStyle;
    document.body.dataset.theme = "cyber-lime";
    document.body.dataset.mode = "dark";

    window.localStorage.setItem("portfolio-theme", "dark");
    window.localStorage.setItem("portfolio-palette", "cyber-lime");
    window.localStorage.setItem("portfolio-ui-style", nextUiStyle);
  }, uiStyle);

  await expect.poll(() => page.evaluate(() => document.body.dataset.ui || "")).toBe(uiStyle);
}

async function getRenderedSignature(page: Page, uiStyle: string) {
  await setStyleState(page, uiStyle);

  return page.evaluate((currentUiStyle) => {
    const surface = document.querySelector(".page-header.blue-tile, .blue-tile");
    if (!surface) {
      throw new Error("Expected a visible app surface for UI style signature testing");
    }

    const bodyStyles = window.getComputedStyle(document.body);
    const surfaceStyles = window.getComputedStyle(surface);

    return {
      uiStyle: currentUiStyle,
      tokens: {
        bgStyleLayer: bodyStyles.getPropertyValue("--app-bg-style-layer").trim(),
        cardBg: bodyStyles.getPropertyValue("--app-surface-card-bg").trim(),
        panelBg: bodyStyles.getPropertyValue("--app-surface-panel-bg").trim(),
        texture: bodyStyles.getPropertyValue("--app-surface-texture").trim(),
        borderWidth: bodyStyles.getPropertyValue("--app-surface-border-width").trim(),
        headingFont: bodyStyles.getPropertyValue("--app-heading-font-family").trim(),
        radiusMd: bodyStyles.getPropertyValue("--app-surface-radius-md").trim(),
        shadow: bodyStyles.getPropertyValue("--app-surface-shadow").trim(),
      },
      surface: {
        backgroundImage: surfaceStyles.backgroundImage,
        borderTopWidth: surfaceStyles.borderTopWidth,
        borderTopStyle: surfaceStyles.borderTopStyle,
        borderTopColor: surfaceStyles.borderTopColor,
        borderTopLeftRadius: surfaceStyles.borderTopLeftRadius,
        boxShadow: surfaceStyles.boxShadow,
      },
    };
  }, uiStyle);
}

async function getLayoutSignature(page: Page, layoutStyle: string) {
  await page.evaluate((nextLayoutStyle) => {
    document.body.classList.add("ly-root");
    document.body.dataset.layout = nextLayoutStyle;
    document.body.setAttribute("layout-style", nextLayoutStyle);

    window.localStorage.setItem("portfolio-layout-style", nextLayoutStyle);
  }, layoutStyle);

  await expect.poll(() => page.evaluate(() => document.body.dataset.layout || "")).toBe(layoutStyle);

  return page.evaluate((currentLayoutStyle) => {
    const bodyStyles = window.getComputedStyle(document.body);

    return {
      layoutStyle: currentLayoutStyle,
      attrs: {
        className: document.body.className,
        dataLayout: document.body.dataset.layout || "",
        layoutStyle: document.body.getAttribute("layout-style") || "",
      },
      tokens: {
        containerMax: bodyStyles.getPropertyValue("--ly-container-max").trim(),
        gap: bodyStyles.getPropertyValue("--ly-gap").trim(),
        gridMin: bodyStyles.getPropertyValue("--ly-grid-min").trim(),
        pagePadding: bodyStyles.getPropertyValue("--ly-page-padding-inline").trim(),
        sectionPadding: bodyStyles.getPropertyValue("--ly-section-padding-block").trim(),
        stackGap: bodyStyles.getPropertyValue("--ly-stack-gap").trim(),
      },
    };
  }, layoutStyle);
}

test.describe("UI style visual distinction", () => {
  test("switching UI styles changes non-color surface identity", async ({ page }) => {
    test.setTimeout(60_000);

    await page.setViewportSize({ width: 1280, height: 800 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/"));
    await stabilizePage(page, { theme: "dark" });

    const signatures = [];
    for (const uiStyle of UI_STYLES) {
      signatures.push(await getRenderedSignature(page, uiStyle));
    }

    const structuralSignatures = new Set(
      signatures.map((signature) =>
        [
          signature.tokens.borderWidth,
          signature.tokens.cardBg,
          signature.tokens.panelBg,
          signature.tokens.texture,
          signature.tokens.headingFont,
          signature.tokens.radiusMd,
          signature.tokens.shadow,
          signature.surface.backgroundImage,
          signature.surface.borderTopWidth,
          signature.surface.borderTopLeftRadius,
          signature.surface.boxShadow,
        ].join("|")
      )
    );

    expect(structuralSignatures.size, JSON.stringify(signatures, null, 2)).toBeGreaterThanOrEqual(
      UI_STYLES.length - 1
    );

    const brutalism = signatures.find((signature) => signature.uiStyle === "brutalism");
    expect(brutalism?.surface.borderTopWidth).toBe("3px");
    expect(brutalism?.surface.boxShadow).toMatch(/px\s+\d+px\s+0px/);

    const neumorphism = signatures.find((signature) => signature.uiStyle === "neumorphism");
    expect(neumorphism?.surface.boxShadow.split(",").length).toBeGreaterThanOrEqual(2);

    const y2k = signatures.find((signature) => signature.uiStyle === "y2k");
    expect(Number.parseFloat(y2k?.surface.borderTopLeftRadius || "0")).toBeGreaterThan(20);
    expect(y2k?.tokens.texture).toContain("radial-gradient");

    const minimalSaas = signatures.find((signature) => signature.uiStyle === "minimal-saas");
    expect(minimalSaas?.tokens.cardBg).not.toBe(y2k?.tokens.cardBg);
  });

  test("theme menu layout style switcher applies layout-style-css tokens", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => consoleErrors.push(String(error)));

    await page.setViewportSize({ width: 1280, height: 800 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/"));
    await stabilizePage(page, { theme: "dark" });

    const baseline = await getLayoutSignature(page, LAYOUT_STYLES[0]);

    await page.getByRole("button", { name: /open color settings/i }).first().click();
    await expect(page.getByRole("dialog", { name: /color settings/i })).toBeVisible();
    await page.getByRole("combobox", { name: /layout style/i }).selectOption(LAYOUT_STYLES[1]);

    await expect
      .poll(() => page.evaluate(() => document.body.getAttribute("layout-style") || ""))
      .toBe(LAYOUT_STYLES[1]);

    const switched = await getLayoutSignature(page, LAYOUT_STYLES[1]);

    expect(switched.attrs.className).toContain("ly-root");
    expect(switched.attrs.dataLayout).toBe(LAYOUT_STYLES[1]);
    expect(switched.attrs.layoutStyle).toBe(LAYOUT_STYLES[1]);
    expect(switched.tokens.gap).not.toBe("");
    expect(switched.tokens.gap).not.toBe(baseline.tokens.gap);
    expect(switched.tokens.sectionPadding).not.toBe(baseline.tokens.sectionPadding);
    expect(consoleErrors, consoleErrors.join("\n\n")).toHaveLength(0);
  });
});
