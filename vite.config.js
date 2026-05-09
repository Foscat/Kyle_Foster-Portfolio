import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const normalizeModuleId = (id) => id.replaceAll("\\", "/");

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = normalizeModuleId(id);

          if (!normalizedId.includes("/node_modules/")) {
            return;
          }

          if (
            normalizedId.includes("/node_modules/react/") ||
            normalizedId.includes("/node_modules/react-dom/") ||
            normalizedId.includes("/node_modules/scheduler/")
          ) {
            return "framework-react";
          }

          // Let RSuite be auto-split by usage so route-level lazy chunks
          // don't inherit a single oversized vendor bundle.
          if (normalizedId.includes("/node_modules/rsuite/")) {
            return;
          }

          // Allow Vite/Rolldown to auto-split remaining dependencies by usage.
          return;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      pages: path.resolve(__dirname, "src/pages"),
      navigation: path.resolve(__dirname, "src/components/navigation"),
      hooks: path.resolve(__dirname, "src/assets/hooks"),
      context: path.resolve(__dirname, "src/assets/context"),
      data: path.resolve(__dirname, "src/assets/data"),
      types: path.resolve(__dirname, "src/types"),
      tests: path.resolve(__dirname, "src/tests"),
      theme: path.resolve(__dirname, "src/theme"),
      scripts: path.resolve(__dirname, "scripts"),
    },
  },
  optimizeDeps: {
    exclude: ["mermaid"],
    include: ["dayjs", "@braintree/sanitize-url"],
  },
});
