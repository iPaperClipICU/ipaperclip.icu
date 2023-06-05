import { createApp } from "vue";
import { createPinia } from "pinia";

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: "https://ae9c3808da514430acdf87f18b2a02e7@o4504849146118144.ingest.sentry.io/4504849148608512",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ["ipaperclip-file.xodvnm.cn", "r2.ipaperclip.top", /^\//],
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
