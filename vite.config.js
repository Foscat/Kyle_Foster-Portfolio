import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      pages: path.resolve((__dirname, "src/pages")),
    },
  },

  optimizeDeps: {
    exclude: ["mermaid"],
    include: ["dayjs", "@braintree/sanitize-url"],
  },

  build: {
    sourcemap: true,
  },
  define: {
    __DEV__: true,
  },
});
