import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import SearchView from "@/views/SearchView.vue";

const routes = [
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Index",
    component: IndexView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
