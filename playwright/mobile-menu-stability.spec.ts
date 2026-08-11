/**
 * @file playwright/mobile-menu-stability.spec.ts
 * @description Regression coverage for mobile menu/drawer interactions.
 * @module playwright/mobile-menu-stability
 */

import { test, expect } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

test.describe("Mobile Menu Stability", () => {
  test("opens navigation and drawer utilities without page reloads", async ({ page }) => {
    const runtimeErrors: string[] = [];
    let postStabilizeLoadEvents = 0;

    page.on("pageerror", (err) => runtimeErrors.push(String(err)));

    await page.setViewportSize({ width: 390, height: 844 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/"));
    await stabilizePage(page, { theme: "dark" });
    const baselineUrl = page.url();
    page.on("load", () => {
      postStabilizeLoadEvents += 1;
    });

    const navTrigger = page.getByRole("button", { name: /open navigation menu/i }).first();
    await expect(navTrigger).toBeVisible();
    await navTrigger.click();
    await expect(page.getByRole("heading", { name: /site navigation/i })).toBeVisible();
    await expect(page.getByTestId("mobile-resume-trigger-wrapper")).toBeVisible();

    const colorTrigger = page.getByRole("button", { name: /open color settings/i }).first();
    await expect(colorTrigger).toBeVisible();
    await colorTrigger.click();
    const colorDialog = page.getByRole("dialog", { name: /color settings/i });
    await expect(colorDialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(colorDialog).toBeHidden();

    if (!(await page.getByRole("heading", { name: /site navigation/i }).isVisible())) {
      await navTrigger.click();
    }
    const a11yTrigger = page.getByRole("button", { name: /open accessibility settings/i }).first();
    await expect(a11yTrigger).toBeVisible();
    await a11yTrigger.click();
    await expect(page.getByRole("dialog", { name: /accessibility settings/i })).toBeVisible();

    const baseline = new URL(baselineUrl);
    const current = new URL(page.url());
    expect(`${current.origin}${current.pathname}${current.search}`).toBe(
      `${baseline.origin}${baseline.pathname}${baseline.search}`
    );
    expect(postStabilizeLoadEvents).toBe(0);
    expect(runtimeErrors, runtimeErrors.join("\n\n")).toHaveLength(0);
  });

  test("contact page mobile icon triggers stay on-page without reloads", async ({ page }) => {
    const runtimeErrors: string[] = [];
    let postStabilizeLoadEvents = 0;

    page.on("pageerror", (err) => runtimeErrors.push(String(err)));

    await page.setViewportSize({ width: 390, height: 844 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/contact"));
    await stabilizePage(page, { theme: "dark" });
    const baselineUrl = page.url();
    page.on("load", () => {
      postStabilizeLoadEvents += 1;
    });

    await expect(page.locator(".mobile-icon-hint")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /open section navigation/i })).toHaveCount(0);

    const mobileHeaderBox = await page.getByTestId("unified-navigation").boundingBox();
    const firstContactItemBox = await page.getByText(/Email: fosterkyle/i).boundingBox();

    expect(mobileHeaderBox).not.toBeNull();
    expect(firstContactItemBox).not.toBeNull();
    expect(firstContactItemBox!.y).toBeGreaterThan(mobileHeaderBox!.y + mobileHeaderBox!.height);

    const navTrigger = page.getByRole("button", { name: /open navigation menu/i }).first();
    await expect(navTrigger).toBeVisible();
    await navTrigger.click();
    await expect(page.getByRole("heading", { name: /site navigation/i })).toBeVisible();
    await expect(page.getByTestId("mobile-resume-trigger-wrapper")).toBeVisible();

    const colorTrigger = page.getByRole("button", { name: /open color settings/i }).first();
    await expect(colorTrigger).toBeVisible();
    await colorTrigger.click();
    const colorDialog = page.getByRole("dialog", { name: /color settings/i });
    await expect(colorDialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(colorDialog).toBeHidden();

    if (!(await page.getByRole("heading", { name: /site navigation/i }).isVisible())) {
      await navTrigger.click();
    }
    const a11yTrigger = page.getByRole("button", { name: /open accessibility settings/i }).first();
    await expect(a11yTrigger).toBeVisible();
    await a11yTrigger.click();
    await expect(page.getByRole("dialog", { name: /accessibility settings/i })).toBeVisible();

    const baseline = new URL(baselineUrl);
    const current = new URL(page.url());
    expect(`${current.origin}${current.pathname}${current.search}`).toBe(
      `${baseline.origin}${baseline.pathname}${baseline.search}`
    );
    expect(postStabilizeLoadEvents).toBe(0);
    expect(runtimeErrors, runtimeErrors.join("\n\n")).toHaveLength(0);
  });
});
