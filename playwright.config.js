import { defineConfig } from "@playwright/test";

const PLAYWRIGHT_RESULTS_ROOT = "./playwright/test-results";

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
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
