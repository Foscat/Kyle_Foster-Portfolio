/**
 * @file playwright\performance.route-budgets.spec.ts
 * @description playwright\performance.route-budgets.spec module.
 * @module playwright\performance.route-budgets.spec
 */

import { test, expect, type Page, type Request, type Response } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

type RouteResourceBudget = {
  route: string;
  name: string;
  jsKb: number;
  cssKb: number;
  imageKb: number;
};

type ResourceTotals = {
  js: number;
  css: number;
  image: number;
};

type BudgetStage = "1" | "2" | "3";

const ROUTE_BUDGET_STAGES: Record<BudgetStage, RouteResourceBudget[]> = {
  // Stage 1: immediate tightening from baseline while preserving CI stability.
  "1": [
    { route: "/", name: "Home", jsKb: 6650, cssKb: 20, imageKb: 25 },
    { route: "/contact", name: "Contact", jsKb: 7700, cssKb: 20, imageKb: 25 },
    { route: "/codestream", name: "CodeStream", jsKb: 8500, cssKb: 20, imageKb: 2700 },
  ],
  // Stage 2: medium-term target.
  "2": [
    { route: "/", name: "Home", jsKb: 6500, cssKb: 15, imageKb: 20 },
    { route: "/contact", name: "Contact", jsKb: 7500, cssKb: 15, imageKb: 20 },
    { route: "/codestream", name: "CodeStream", jsKb: 8200, cssKb: 15, imageKb: 2450 },
  ],
  // Stage 3: stretch target.
  "3": [
    { route: "/", name: "Home", jsKb: 6200, cssKb: 10, imageKb: 15 },
    { route: "/contact", name: "Contact", jsKb: 7100, cssKb: 10, imageKb: 15 },
    { route: "/codestream", name: "CodeStream", jsKb: 7800, cssKb: 10, imageKb: 2200 },
  ],
};

const resolveBudgetStage = (): BudgetStage => {
  const stage = process.env.ROUTE_BUDGET_STAGE;
  if (stage === "2" || stage === "3") {
    return stage;
  }
  return "1";
};

const ACTIVE_BUDGET_STAGE = resolveBudgetStage();
const ROUTE_BUDGETS = ROUTE_BUDGET_STAGES[ACTIVE_BUDGET_STAGE];

const CONTENT_LENGTH_HEADER = "content-length";
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";

const toKilobytes = (bytes: number) => bytes / 1024;

const shouldTrackResponse = (response: Response, baseOrigin: string) => {
  const url = response.url();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.origin === baseOrigin && response.ok();
  } catch {
    return false;
  }
};

const classifyRequest = (request: Request, response: Response): keyof ResourceTotals | null => {
  const resourceType = request.resourceType();
  if (resourceType === "script") return "js";
  if (resourceType === "stylesheet") return "css";
  if (resourceType === "image") return "image";

  const contentType = response.headers()["content-type"] || "";
  if (contentType.includes("javascript")) return "js";
  if (contentType.includes("text/css")) return "css";
  if (contentType.startsWith("image/")) return "image";
  return null;
};

const parseContentLength = (response: Response) => {
  const contentLengthHeader = response.headers()[CONTENT_LENGTH_HEADER];
  if (!contentLengthHeader) return null;

  const parsed = Number.parseInt(contentLengthHeader, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
};

const getResponseSizeBytes = async (response: Response) => {
  const contentLength = parseContentLength(response);
  if (contentLength !== null) {
    return contentLength;
  }

  try {
    const body = await response.body();
    return body.byteLength;
  } catch {
    return 0;
  }
};

async function collectRouteResourceTotals(page: Page, route: string) {
  const baseOrigin = new URL(BASE_URL).origin;
  const targetUrl = new URL(route, BASE_URL).toString();
  const totals: ResourceTotals = { js: 0, css: 0, image: 0 };
  const pendingSizeReads: Array<Promise<void>> = [];

  const responseHandler = (response: Response) => {
    pendingSizeReads.push(
      (async () => {
        if (!shouldTrackResponse(response, baseOrigin)) return;

        const bucket = classifyRequest(response.request(), response);
        if (!bucket) return;

        const sizeBytes = await getResponseSizeBytes(response);
        totals[bucket] += sizeBytes;
      })()
    );
  };

  page.on("response", responseHandler);

  await page.goto(targetUrl);
  await stabilizePage(page, { theme: "light" });
  await page.waitForLoadState("networkidle");
  await Promise.all(pendingSizeReads);
  page.off("response", responseHandler);

  return totals;
}

test.describe(`Route-level performance budgets (stage ${ACTIVE_BUDGET_STAGE}) @route-budget`, () => {
  for (const budget of ROUTE_BUDGETS) {
    test(`${budget.name} route stays within JS/CSS/image budgets @route-budget`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await preparePageForStableTests(page, { theme: "light" });

      const totals = await collectRouteResourceTotals(page, budget.route);
      const jsKb = toKilobytes(totals.js);
      const cssKb = toKilobytes(totals.css);
      const imageKb = toKilobytes(totals.image);

      expect(
        jsKb,
        `[stage ${ACTIVE_BUDGET_STAGE}] JS budget exceeded on ${budget.route}: ${jsKb.toFixed(1)}KB > ${budget.jsKb}KB`
      ).toBeLessThanOrEqual(budget.jsKb);
      expect(
        cssKb,
        `[stage ${ACTIVE_BUDGET_STAGE}] CSS budget exceeded on ${budget.route}: ${cssKb.toFixed(1)}KB > ${budget.cssKb}KB`
      ).toBeLessThanOrEqual(budget.cssKb);
      expect(
        imageKb,
        `[stage ${ACTIVE_BUDGET_STAGE}] Image budget exceeded on ${budget.route}: ${imageKb.toFixed(1)}KB > ${budget.imageKb}KB`
      ).toBeLessThanOrEqual(budget.imageKb);
    });
  }
});
