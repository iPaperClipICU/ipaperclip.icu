import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { minify } from "html-minifier";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import basicSsl from "@vitejs/plugin-basic-ssl";

// @ts-ignore
import d from "./src/assets/data.json";
const data = d as any;

const deleteFiles = (path: string) => {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true });
  }
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const needSSL: boolean = false;
  return {
    base: "https://assets.ipaperclip.icu/",
    build: {
      outDir: "dist/web",
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
          html = html.replace(
            "<!-- CloudFlareWebAnalytics -->",
            `<script
              defer
              src='https://static.cloudflareinsights.com/beacon.min.js'
              data-cf-beacon='{"token": "a9d6db727c5a4b3483f3bb80358921ed"}'
            ></script>`
          );
          html = html.replace(
            "<!-- MicrosoftClarity -->",
            `<script type="text/javascript">
              (function (c, l, a, r, i, t, y) {
                c[a] = c[a] || function () {(c[a].q = c[a].q || []).push(arguments)};
                t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
              })(window, document, "clarity", "script", "9p0cfoa6gl");
            </script>`
          );
          return minify(html);
        },
      },
      {
        name: "move-sourcemap-plugin",
        apply: "build",
        closeBundle() {
          try {
            const assetsPath = path.resolve(__dirname, "dist/web/assets/");
            const mapPath = path.resolve(__dirname, "dist/map/");
            deleteFiles(mapPath);

            const files = fs.readdirSync(assetsPath);
            const mapFiles = files.filter((file) => file.endsWith(".js.map"));
            fs.mkdirSync(mapPath, { recursive: true });
            mapFiles.forEach((file) => {
              const sourcePath = path.join(assetsPath, file);
              const destinationPath = path.join(mapPath, file);

              fs.renameSync(sourcePath, destinationPath);
            });
            console.log("🎉 Sourcemap moved successfully!");
          } catch (err) {
            console.error("Error moving Sourcemap:", err);
          }
        },
      },
      {
        name: "move-assets-plugin",
        apply: "build",
        closeBundle() {
          try {
            const assetsPath = path.resolve(__dirname, "dist/assets/");
            deleteFiles(assetsPath);

            fs.mkdirSync(assetsPath, { recursive: true });
            fs.renameSync(
              path.resolve(__dirname, "dist/web/assets/"),
              path.join(assetsPath, "assets/")
            );
            fs.renameSync(
              path.resolve(__dirname, "dist/web/favicon.png"),
              path.join(assetsPath, "favicon.png")
            );
            console.log("🎉 Assets moved successfully!");
          } catch (err) {
            console.error("Error moving Assets:", err);
          }
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
            path.resolve(__dirname, "dist/web/sitemap.txt"),
            outList.join("\n"),
            "utf-8"
          );
          console.log(
            `🎉 Sitemap generation successful! There are a total of ${outList.length} links.`
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
