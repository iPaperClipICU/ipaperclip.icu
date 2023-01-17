import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ["VITE_", "TencentCDN_"],
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
