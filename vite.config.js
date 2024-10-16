import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: "src/",
  publicDir: "../public",
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "src/index.html"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
