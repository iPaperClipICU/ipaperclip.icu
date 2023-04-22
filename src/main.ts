import { createApp } from "vue";
import { createPinia } from "pinia";

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import App from "./App.vue";
import router from "./router";

import { inject as VercelAnalyticsInject } from "@vercel/analytics";

const app = createApp(App);

if (import.meta.env.PROD) {
  VercelAnalyticsInject();
  Sentry.init({
    app,
    dsn: "https://2956ca4446814699b4025c0930d18ee1@o4504849146118144.ingest.sentry.io/4504854292004864",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: [
          "ipaperclip-file.xodvnm.cn",
          "cf.ipaperclip-icu.cyou",
          "r2.ipaperclip-icu.cyou",
          "api.ipaperclip-icu.cyou",
          "api.ipaperclip.icu",
          /^\//,
        ],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

app.use(createPinia());
app.use(router);

app.mount("#app");
