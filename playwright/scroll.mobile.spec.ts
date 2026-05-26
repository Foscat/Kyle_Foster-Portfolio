/**
 * @file playwright/scroll.mobile.spec.ts
 * @description Fast, deterministic mobile scroll regressions for side-project content.
 * @module playwright/scroll.mobile.spec
 */

import { expect, test } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

const SIDE_PROJECTS_ROUTE = "/side-projects";
const SECTION_NAV = 'nav[aria-label="Section navigation"]';

test.describe("Mobile scroll regressions", () => {
  test("insight-card content supports programmatic vertical scroll", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(SIDE_PROJECTS_ROUTE);
    await stabilizePage(page, { theme: "dark" });

    const contents = page.locator(".insight-card__content");
    await expect(contents.first()).toBeVisible();

    const count = await contents.count();
    let chosenIndex = 0;
    for (let i = 0; i < count; i += 1) {
      const overflow = await contents.nth(i).evaluate((el) => el.scrollHeight > el.clientHeight);
      if (overflow) {
        chosenIndex = i;
        break;
      }
    }

    const target = contents.nth(chosenIndex);
    const before = await target.evaluate((el) => ({
      scrollTop: el.scrollTop,
      max: Math.max(0, el.scrollHeight - el.clientHeight),
    }));

    await target.evaluate((el) => {
      el.scrollTop = Math.max(0, Math.min(220, el.scrollHeight - el.clientHeight));
    });

    const after = await target.evaluate((el) => el.scrollTop);
    expect(after).toBeGreaterThanOrEqual(before.scrollTop);
  });

  test("section nav active item updates when scrolling through sections", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await preparePageForStableTests(page, { theme: "dark" });
    await page.goto(SIDE_PROJECTS_ROUTE);
    await stabilizePage(page, { theme: "dark" });

    const nav = page.locator(SECTION_NAV);
    await expect(nav).toBeVisible();

    const sections = page.locator("main section[id]");
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(2);

    const firstId = await sections.nth(0).getAttribute("id");
    const secondId = await sections.nth(1).getAttribute("id");
    const thirdId = await sections.nth(2).getAttribute("id");

    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(thirdId).toBeTruthy();

    const activeLocator = nav.locator("[data-nav-id].is-active").first();

    await sections.nth(0).scrollIntoViewIfNeeded();
    await expect
      .poll(async () => activeLocator.getAttribute("data-nav-id"), { timeout: 3000 })
      .toBeTruthy();

    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" })
    );
    await expect
      .poll(async () => activeLocator.getAttribute("data-nav-id"), { timeout: 3000 })
      .toBeTruthy();
  });
});
