import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      pages: path.resolve(__dirname, "src/pages"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      types: path.resolve(__dirname, "src/types"),
      navigation: path.resolve(__dirname, "src/navigation"),
      tests: path.resolve(__dirname, "src/tests"),
      scripts: path.resolve(__dirname, "scripts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setupTests.js",

    exclude: ["playwright/**", "docs/**.*", "node_modules/**", "**/*.spec.ts", "**/*.spec.js"],

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
