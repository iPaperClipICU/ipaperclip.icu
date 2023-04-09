import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { createHtmlPlugin } from "vite-plugin-html";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const needSSL: boolean = false;
  const CloudFlareWebAnalytics =
    command === "serve"
      ? "" // 开发
      : `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "a9d6db727c5a4b3483f3bb80358921ed"}'></script>`; // 生产
  return {
    server: {
      host: "0.0.0.0",
      https: needSSL,
    },
    envPrefix: ["VITE_", "TencentCDN_"],
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            CloudFlareWebAnalytics,
          },
        },
      }),
      {
        ...basicSsl(),
        apply: needSSL ? "serve" : command === "serve" ? "build" : "serve",
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
