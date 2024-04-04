import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { minify } from "html-minifier";
import { visualizer } from "rollup-plugin-visualizer";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import basicSsl from "@vitejs/plugin-basic-ssl";

// @ts-ignore
import d from "./src/assets/data.json";
const data = d as any;

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const needSSL: boolean = false;
  return {
    build: {
      // sourcemap: true,
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
    },
    envPrefix: ["VITE_", "TencentCDN_", "CF_PAGES"],
    plugins: [
      vue(),
      visualizer(),
      {
        ...basicSsl(),
        apply: needSSL ? "serve" : command === "serve" ? "build" : "serve",
      },
      {
        name: "html",
        apply: "build",
        transformIndexHtml(html) {
          html = html.replace(
            "<!-- CloudFlareWebAnalytics -->",
            `<script
              defer
              src='https://static.cloudflareinsights.com/beacon.min.js'
              data-cf-beacon='{"token": "a9d6db727c5a4b3483f3bb80358921ed"}'
            ></script>`,
          );
          // html = html.replace(
          //   "<!-- MicrosoftClarity -->",
          //   `<script type="text/javascript">
          //     (function (c, l, a, r, i, t, y) {
          //       c[a] = c[a] || function () {(c[a].q = c[a].q || []).push(arguments)};
          //       t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
          //       y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
          //     })(window, document, "clarity", "script", "9p0cfoa6gl");
          //   </script>`,
          // );
          return minify(html);
        },
      },
      {
        name: "sitemap",
        apply: "build",
        closeBundle() {
          const hostname = "https://ipaperclip.icu";
          const outList: string[] = [`${hostname}/`];
          const addOut = (path: string) => {
            outList.push(`${hostname}/${encodeURI(path)}`);
          };

          // Files
          for (const [filesName, tagsList] of data.menuData) {
            if (tagsList !== undefined) {
              // 有 Tag
              tagsList.forEach((tagName: string) => {
                addOut(`${filesName}/${tagName}`);
              });
            } else {
              // 沒有 Tag
              addOut(`${filesName}`);
            }
          }

          // File
          for (const fileName in data.searchData) {
            const [filesName, tagName] = data.searchData[fileName];
            if (tagName !== null) {
              // 有 Tag
              addOut(`${filesName}/${tagName}/${fileName}`);
            } else {
              // 沒有 Tag
              addOut(`${filesName}/${fileName}`);
            }
          }

          fs.writeFileSync(
            path.resolve(__dirname, "dist/sitemap.txt"),
            outList.join("\n"),
            "utf-8",
          );
          console.log(
            `🎉 Sitemap generation successful! There are a total of ${outList.length} links.`,
          );
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
