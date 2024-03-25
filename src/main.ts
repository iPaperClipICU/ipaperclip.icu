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

// reCaptcha Load
const w = window as any;
const loadScript = (url: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = () => {
      resolve(true);
    };
    s.onerror = () => {
      reject(false);
    };
    s.async = true;
    document.body.appendChild(s);
  });
};
w.reCaptchaOnloadList = [];
const loadReCaptchaScript = async () => {
  try {
    await loadScript(
      "https://www.recaptcha.net/recaptcha/enterprise.js?render=6LewyaMpAAAAAGk7sPDTBVxK3mI-SYeykrIkeKM8",
    );
    for (const i of w.reCaptchaOnloadList) i(true);
  } catch (error) {
    console.error(error);
    for (const i of w.reCaptchaOnloadList) i(false);
  }
};
loadReCaptchaScript();
