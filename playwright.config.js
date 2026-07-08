import { defineConfig } from "@playwright/test";

const PLAYWRIGHT_RESULTS_ROOT = "./playwright/test-results";
const PLAYWRIGHT_BASE_URL =
  process.env.PLAYWRIGHT_BASE_URL || process.env.BASE_URL || "http://localhost:5173";
const PLAYWRIGHT_PORT =
  Number(process.env.PLAYWRIGHT_PORT || new URL(PLAYWRIGHT_BASE_URL).port) || 5173;

export default defineConfig({
  testDir: "./playwright",
  timeout: 30_000,
  respectGitIgnore: true,
  updateSnapshots: "missing",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html", { open: "never", outputFolder: `${PLAYWRIGHT_RESULTS_ROOT}/report` }],
    ["list"],
  ],
  outputDir: `${PLAYWRIGHT_RESULTS_ROOT}/artifacts`,
  snapshotPathTemplate: `${PLAYWRIGHT_RESULTS_ROOT}/snapshots{/projectName}/{testFilePath}/{arg}{ext}`,
  expect: {
    // Global visual diff tolerances
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.002, // 0.2% of pixels
      threshold: 0.2, // perceptual threshold
      animations: "disabled",
    },
  },
  use: {
    baseURL: PLAYWRIGHT_BASE_URL,
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    // Keep Playwright's managed server aligned with explicit non-default test URLs.
    command: `npm run dev -- --host 127.0.0.1 --port ${PLAYWRIGHT_PORT}`,
    port: PLAYWRIGHT_PORT,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
