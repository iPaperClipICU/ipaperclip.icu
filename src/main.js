import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.unregister();
  });
}

createApp(App).use(router).mount("#app");
