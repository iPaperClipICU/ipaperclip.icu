const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: "all",
  },
  pwa: {
    name: "ipaperclip.icu",
    // 背景色
    themeColor: "#101014",
    // msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
      importWorkboxFrom: "disabled",
      importScripts: "/workbox-v6.5.3/workbox-sw.js",
    },
  },
});
