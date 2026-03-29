import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./playwright",
  timeout: 30_000,
  respectGitIgnore: true,
  updateSnapshots: "missing",
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  outputDir: "./playwright/test-results/",
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
