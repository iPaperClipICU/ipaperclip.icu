import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { minify } from "html-minifier";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const needSSL: boolean = false;
  return {
    build: {
      sourcemap: "hidden",
      rollupOptions: {
        output: {
          entryFileNames: "assets/[hash].js",
          chunkFileNames: "assets/[hash].js",
          assetFileNames: "assets/[hash][extname]",
        },
      },
    },
    server: {
      host: "0.0.0.0",
      https: needSSL,
    },
    envPrefix: ["VITE_", "TencentCDN_"],
    plugins: [
      vue(),
      {
        ...basicSsl(),
        apply: needSSL ? "serve" : command === "serve" ? "build" : "serve",
      },
      {
        name: "html",
        apply: "build",
        transformIndexHtml(html) {
          return minify(
            html.replace(
              "<!-- CloudFlareWebAnalytics -->",
              `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "a9d6db727c5a4b3483f3bb80358921ed"}'></script>`
            ),
            {
              collapseWhitespace: true,
              removeComments: true,
              minifyJS: true,
              minifyCSS: true,
            }
          );
        },
      },
      {
        name: "move-sourcemap-plugin",
        apply: "build",
        closeBundle() {
          try {
            const files = fs.readdirSync(path.resolve(__dirname, "dist/assets/"));
            const mapFiles = files.filter((file) => file.endsWith(".js.map"));
            fs.mkdirSync(path.resolve(__dirname, "dist/map/"), { recursive: true });
            mapFiles.forEach((file) => {
              const sourcePath = path.join(__dirname, "dist/assets/", file);
              const destinationPath = path.join(__dirname, "dist/map/", file);

              fs.renameSync(sourcePath, destinationPath);
            });
            console.log("🎉 Sourcemap moved successfully!");
          } catch (err) {
            console.error("Error moving Sourcemap:", err);
          }
        },
      },
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
