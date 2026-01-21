import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setupTests.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      lines: 80,
      functions: 80,
      branches: 70,
      statements: 80,
    },
  },
});
