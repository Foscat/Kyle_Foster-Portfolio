/**
 * @file playwright/performance.route-budgets.spec.ts
 * @description Deterministic route payload budgets with bounded response accounting.
 * @module playwright/performance.route-budgets.spec
 */

import { expect, test, type Response } from "@playwright/test";
import { preparePageForStableTests, stabilizePage } from "./utils/stabilizePage";

type Budget = {
  route: string;
  name: string;
  jsKb: number;
  cssKb: number;
  imageKb: number;
};

type Totals = {
  js: number;
  css: number;
  image: number;
};

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const BASE_ORIGIN = new URL(BASE_URL).origin;
const KB = 1024;

// Stage-1 budgets tuned to current route payloads to prevent noisy CI failures.
// The v2 style-kit imports add shared dev-server module payload. The home route
// is usually the first route sampled in the fully parallel suite, so its budget
// includes cold shared-module overhead observed during quality:check.
const BUDGETS: Budget[] = [
  { route: "/", name: "Home", jsKb: 9000, cssKb: 35, imageKb: 9000 },
  { route: "/contact", name: "Contact", jsKb: 8200, cssKb: 35, imageKb: 120 },
  { route: "/codestream", name: "CodeStream", jsKb: 9250, cssKb: 35, imageKb: 3200 },
];

const parseSize = async (response: Response) => {
  const contentLength = response.headers()["content-length"];
  if (contentLength) {
    const parsed = Number.parseInt(contentLength, 10);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }

  try {
    const body = await response.body();
    return body?.byteLength ?? 0;
  } catch {
    return 0;
  }
};

const bucketFor = (response: Response): keyof Totals | null => {
  const requestType = response.request().resourceType();
  if (requestType === "script") return "js";
  if (requestType === "stylesheet") return "css";
  if (requestType === "image") return "image";

  const contentType = response.headers()["content-type"] || "";
  if (contentType.includes("javascript")) return "js";
  if (contentType.includes("text/css")) return "css";
  if (contentType.startsWith("image/")) return "image";
  return null;
};

const shouldTrack = (response: Response) => {
  if (!response.ok()) return false;
  const url = response.url();
  if (!url || url.startsWith("data:") || url.startsWith("blob:")) return false;
  try {
    return new URL(url).origin === BASE_ORIGIN;
  } catch {
    return false;
  }
};

test.describe("Route-level performance budgets @route-budget", () => {
  for (const budget of BUDGETS) {
    test(`${budget.name} route payload stays under budget`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await preparePageForStableTests(page, { theme: "light" });

      const totals: Totals = { js: 0, css: 0, image: 0 };
      const pendingSizeReads: Promise<void>[] = [];
      const responseHandler = (response: Response) => {
        if (!shouldTrack(response)) return;
        const bucket = bucketFor(response);
        if (!bucket) return;

        pendingSizeReads.push(
          parseSize(response).then((size) => {
            totals[bucket] += size;
          })
        );
      };

      page.on("response", responseHandler);
      await page.goto(new URL(budget.route, BASE_URL).toString());
      await stabilizePage(page, { theme: "light" });
      await page.waitForLoadState("networkidle");
      page.off("response", responseHandler);
      await Promise.all(pendingSizeReads);

      const jsKb = totals.js / KB;
      const cssKb = totals.css / KB;
      const imageKb = totals.image / KB;

      expect(
        jsKb,
        `${budget.route} JS ${jsKb.toFixed(1)}KB > ${budget.jsKb}KB`
      ).toBeLessThanOrEqual(budget.jsKb);
      expect(
        cssKb,
        `${budget.route} CSS ${cssKb.toFixed(1)}KB > ${budget.cssKb}KB`
      ).toBeLessThanOrEqual(budget.cssKb);
      expect(
        imageKb,
        `${budget.route} image ${imageKb.toFixed(1)}KB > ${budget.imageKb}KB`
      ).toBeLessThanOrEqual(budget.imageKb);
    });
  }
});
