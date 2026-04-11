import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" })],
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          // Keep RSuite internals together to avoid circular chunk-order warnings.
          if (id.includes("node_modules/rsuite")) {
            return "vendor-rsuite";
          }

          if (id.includes("node_modules/mermaid")) {
            return "vendor-mermaid";
          }

          return "vendor";
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
