import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";

const routes = [
  {
    path: "/:pathMatch(.*)",
    name: "Index",
    component: IndexView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
