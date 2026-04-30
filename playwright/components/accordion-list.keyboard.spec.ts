/**
 * @file playwright/components/accordion-list.keyboard.spec.ts
 * @description Keyboard-only accessibility coverage for AccordionList interactions.
 * @module playwright/components/accordion-list.keyboard.spec
 */

import { expect, test, type Locator } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const headerButtonsForAccordion = (accordionTree: Locator) =>
  accordionTree.locator(".fa-list-item .rs-panel-header .rs-panel-btn");

test.describe("AccordionList Keyboard Accessibility", () => {
  test("supports keyboard-only traversal and toggle interactions for every accordion on CodeStream", async ({
    page,
  }) => {
    const runtimeErrors: string[] = [];
    page.on("pageerror", (err) => runtimeErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") runtimeErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(toUrl("/codestream"));
    await stabilizePage(page, { theme: "dark" });

    const accordions = page.locator('.frosted-accordion .fa-list[role="tree"]');
    const accordionCount = await accordions.count();
    expect(accordionCount).toBeGreaterThan(0);

    for (let accordionIndex = 0; accordionIndex < accordionCount; accordionIndex += 1) {
      const accordion = accordions.nth(accordionIndex);
      await accordion.scrollIntoViewIfNeeded();
      await expect(accordion).toBeVisible();

      const headers = headerButtonsForAccordion(accordion);
      const headerCount = await headers.count();
      expect(headerCount).toBeGreaterThan(0);

      const firstHeader = headers.first();
      const lastHeader = headers.nth(headerCount - 1);

      await firstHeader.focus();
      await expect(firstHeader).toBeFocused();

      // Enter should toggle expanded state.
      const expandedBeforeEnter = await firstHeader.getAttribute("aria-expanded");
      await page.keyboard.press("Enter");
      const expandedAfterEnter = await firstHeader.getAttribute("aria-expanded");
      expect(expandedAfterEnter).not.toBe(expandedBeforeEnter);

      // Space should toggle expanded state again.
      await page.keyboard.press(" ");
      const expandedAfterSpace = await firstHeader.getAttribute("aria-expanded");
      expect(expandedAfterSpace).toBe(expandedBeforeEnter);

      if (headerCount > 1) {
        const secondHeader = headers.nth(1);

        await page.keyboard.press("ArrowDown");
        await expect(secondHeader).toBeFocused();

        await page.keyboard.press("ArrowUp");
        await expect(firstHeader).toBeFocused();

        await page.keyboard.press("End");
        await expect(lastHeader).toBeFocused();

        await page.keyboard.press("Home");
        await expect(firstHeader).toBeFocused();
      }

      // Right opens (if collapsed), Left collapses (if open).
      const stateBeforeRight = await firstHeader.getAttribute("aria-expanded");
      if (stateBeforeRight === "false") {
        await page.keyboard.press("ArrowRight");
        await expect(firstHeader).toHaveAttribute("aria-expanded", "true");
      }

      await page.keyboard.press("ArrowLeft");
      await expect(firstHeader).toHaveAttribute("aria-expanded", "false");

      // Tab and Shift+Tab should continue keyboard navigation behavior.
      await page.keyboard.press("Tab");
      const focusedAfterTab = page.locator(":focus");
      await expect(focusedAfterTab).toBeVisible();

      await page.keyboard.press("Shift+Tab");
      await expect(firstHeader).toBeFocused();
    }

    expect(runtimeErrors, runtimeErrors.join("\n\n")).toHaveLength(0);
  });
});
