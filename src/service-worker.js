/* eslint-disable no-undef */
import { RangeRequestsPlugin } from "workbox-range-requests";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

if (workbox) {
  console.log(`Yay! Workbox is loaded!`);
} else {
  console.log(`Boo! Workbox didn't load!`);
}

let cacheSuffixVersion = "-20220621"; // 缓存版本号

workbox.core.setCacheNameDetails({
  prefix: "ipaperclip-icu",
  suffix: cacheSuffixVersion,
});

// have our sw update and control a web page as soon as possible.
workbox.core.skipWaiting(); // 强制等待中的 Service Worker 被激活
workbox.core.clientsClaim(); // Service Worker 被激活后使其立即获得页面控制权

// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Other
workbox.routing.registerRoute(
  new RegExp(".*.(?:png|jpg|jpeg|svg|gif|webp)"),
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  new RegExp(".*.(?:mp4|flv)"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "video" + cacheSuffixVersion,
    plugins: [new RangeRequestsPlugin()],
  })
);
workbox.routing.registerRoute(
  new RegExp(".*.(?:mp3|flac)"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "audio" + cacheSuffixVersion,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200, 206],
      }),
      new RangeRequestsPlugin(),
    ],
  })
);
workbox.routing.registerRoute(
  new RegExp(".*.(css|js)"),
  new workbox.strategies.StaleWhileRevalidate()
);

// 其他
workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate()
);
