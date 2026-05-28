/**
 * @file playwright/components/accordion-list.keyboard.spec.ts
 * @description Bounded keyboard accessibility smoke test for AccordionList behavior.
 * @module playwright/components/accordion-list.keyboard.spec
 */

import { expect, test } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "../utils/stabilizePage";

test.describe("AccordionList keyboard smoke", () => {
  test("supports keyboard toggle + roving focus on a representative accordion", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto("/codestream");
    await stabilizePage(page, { theme: "dark" });

    const accordion = page.locator(".frosted-accordion .fa-list").first();
    await expect(accordion).toBeVisible();

    const headers = accordion.locator(".fa-list-item .rs-panel-header .rs-panel-btn");
    await expect(headers.first()).toBeVisible();

    const count = await headers.count();
    expect(count).toBeGreaterThan(0);

    const first = headers.first();
    await first.focus();
    await expect(first).toBeFocused();

    const before = await first.getAttribute("aria-expanded");
    await page.keyboard.press("Enter");
    const afterEnter = await first.getAttribute("aria-expanded");
    expect(afterEnter).not.toBe(before);

    await page.keyboard.press(" ");
    const afterSpace = await first.getAttribute("aria-expanded");
    expect(afterSpace).toBe(before);

    if (count > 1) {
      const second = headers.nth(1);
      await page.keyboard.press("ArrowDown");
      await expect(second).toBeFocused();

      await page.keyboard.press("ArrowUp");
      await expect(first).toBeFocused();
    }
  });
});
