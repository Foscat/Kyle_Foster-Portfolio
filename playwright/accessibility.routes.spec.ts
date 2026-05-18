/**
 * @file playwright\accessibility.routes.spec.ts
 * @description playwright\accessibility.routes.spec module.
 * @module playwright\accessibility.routes.spec
 */

import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

type AllowedSeriousViolation = {
  id: string;
  maxNodes: number;
};

type RouteAccessibilityCase = {
  route: string;
  name: string;
  allowedSeriousViolations: AllowedSeriousViolation[];
};

const ROUTE_CASES: RouteAccessibilityCase[] = [
  { route: "/", name: "Home", allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 1 }] },
  {
    route: "/contact",
    name: "Contact",
    allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 2 }],
  },
  {
    route: "/codestream",
    name: "CodeStream",
    allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 1 }],
  },
  {
    route: "/docs",
    name: "Docs",
    allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 1 }],
  },
  {
    route: "/side-projects",
    name: "Side Projects",
    allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 1 }],
  },
  {
    route: "/hackathon",
    name: "Hackathon",
    allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 1 }],
  },
  { route: "/smu", name: "SMU", allowedSeriousViolations: [{ id: "color-contrast", maxNodes: 1 }] },
];

const formatViolations = (
  violations: Array<{ id: string; impact?: string | null; nodes: { target: string[] }[] }>
) =>
  violations
    .map((item) => `${item.id} [${item.impact ?? "unknown"}] nodes=${item.nodes.length}`)
    .join(", ");

async function runAxeScan(page: Page) {
  return new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
}

test.describe("Accessibility route scans @a11y", () => {
  for (const routeCase of ROUTE_CASES) {
    test(`${routeCase.name} route keeps critical violations at zero and serious violations near-zero @a11y`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await preparePageForStableTests(page, { theme: "light" });
      await page.goto(routeCase.route);
      await stabilizePage(page, { theme: "light" });

      const results = await runAxeScan(page);
      const criticalViolations = results.violations.filter(
        (violation) => violation.impact === "critical"
      );
      const seriousViolations = results.violations.filter(
        (violation) => violation.impact === "serious"
      );

      expect(
        criticalViolations,
        `Critical axe violations must be zero on ${routeCase.route}. Found: ${formatViolations(criticalViolations)}`
      ).toEqual([]);

      const allowedById = new Map(
        routeCase.allowedSeriousViolations.map((violation) => [violation.id, violation.maxNodes])
      );

      const unexpectedSeriousViolations: string[] = [];
      const overBudgetSeriousViolations: string[] = [];

      for (const violation of seriousViolations) {
        const maxNodes = allowedById.get(violation.id);
        if (typeof maxNodes !== "number") {
          unexpectedSeriousViolations.push(`${violation.id} nodes=${violation.nodes.length}`);
          continue;
        }

        if (violation.nodes.length > maxNodes) {
          overBudgetSeriousViolations.push(
            `${violation.id} nodes ${violation.nodes.length} > ${maxNodes}`
          );
        }
      }

      expect(
        unexpectedSeriousViolations,
        `Unexpected serious violations on ${routeCase.route}: ${unexpectedSeriousViolations.join(", ")}`
      ).toEqual([]);

      expect(
        overBudgetSeriousViolations,
        `Serious violation budget exceeded on ${routeCase.route}: ${overBudgetSeriousViolations.join(", ")}`
      ).toEqual([]);
    });
  }
});
