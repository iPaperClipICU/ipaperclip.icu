import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/public.css";
// Vidstack
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/audio.css";
import "vidstack/styles/community-skin/video.css";

const app = createApp(App);

if (import.meta.env.PROD) {
  (async () => {
    const Sentry = () => import("@sentry/vue");
    Sentry().then(({ init }) => {
      init({
        app,
        dsn: "https://ae9c3808da514430acdf87f18b2a02e7@o4504849146118144.ingest.sentry.io/4504849148608512",
        tracesSampleRate: 1.0,
      });
    });
  })();
}

app.use(createPinia());
app.use(router);

app.mount("#app");
