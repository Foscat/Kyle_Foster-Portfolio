/**
 * @file playwright\diagrams.spec.ts
 * @description playwright\diagrams.spec module.
 * @module playwright\diagrams.spec
 */

import { test, expect } from "@playwright/test";

/**
 * @description Mermaid diagram smoke test.
 * Ensures the Mermaid diagram route loads and at least one diagram renders.
 * Runtime checks focus on app-owned errors only, while known external-network
 * noise is ignored for CI/sandbox stability.
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const BASE_ORIGIN = new URL(BASE_URL).origin;
const toUrl = (path: string) =>
  path.startsWith("http") ? path : new URL(path, BASE_URL).toString();

const IGNORABLE_EXTERNAL_ERROR_PATTERNS = [
  /ERR_NETWORK_ACCESS_DENIED/i,
  /Failed to load resource/i,
  /net::ERR_/i,
  /fonts\.googleapis\.com/i,
  /fonts\.gstatic\.com/i,
];

const APP_OWNED_STACK_HINTS = [BASE_ORIGIN, "/src/", "/assets/", "mermaid"];

const parseOrigin = (url = "") => {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
};

const isIgnorableExternalNoise = (message = "", sourceUrl = "") => {
  const combined = `${message} ${sourceUrl}`;
  return IGNORABLE_EXTERNAL_ERROR_PATTERNS.some((pattern) => pattern.test(combined));
};

const isAppOwnedMessage = (message = "", sourceUrl = "") => {
  if (sourceUrl && parseOrigin(sourceUrl) === BASE_ORIGIN) {
    return true;
  }

  return APP_OWNED_STACK_HINTS.some((hint) => message.includes(hint));
};

test("Mermaid diagram page loads without app-owned console errors", async ({ page }) => {
  const runtimeErrors: string[] = [];

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;

    const text = msg.text();
    const sourceUrl = msg.location()?.url || "";
    if (isIgnorableExternalNoise(text, sourceUrl)) return;
    if (!isAppOwnedMessage(text, sourceUrl)) return;

    runtimeErrors.push(`[console] ${text}${sourceUrl ? ` (${sourceUrl})` : ""}`);
  });

  page.on("pageerror", (error) => {
    const message = String(error?.stack || error?.message || error);
    if (isIgnorableExternalNoise(message)) return;
    if (!isAppOwnedMessage(message)) return;

    runtimeErrors.push(`[pageerror] ${message}`);
  });

  await page.goto(toUrl("/codestream"));
  await page.waitForLoadState("networkidle");

  await expect(page.locator(".mermaid").first()).toBeVisible();

  expect(runtimeErrors, `App-owned runtime errors:\n${runtimeErrors.join("\n")}`).toEqual([]);
});
