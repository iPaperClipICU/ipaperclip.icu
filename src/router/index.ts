import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import d from "@/assets/data.json";
import type { Data } from "@/types";
import NaiveUIDiscreteAPI from "@/assets/NaiveUIDiscreteAPI";

import HomeView from "@/views/HomeView.vue";
const FileView = () => import("@/views/FileView.vue");
const FilesView = () => import("@/views/FilesView.vue");
const SearchView = () => import("@/views/SearchView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");

const data: Data = d as any;

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFoundView,
  },
];

for (const i of data.menuData) {
  const filesName = i[0];
  if (i.length !== 1) {
    // 有 Tag
    routes.push({
      path: `/${filesName}`,
      redirect: `/${filesName}/${i[1][0]}`,
    });
    for (const tagName of i[1]) {
      const path = `/${filesName}/${tagName}`;
      routes.push({
        path: path,
        name: `FILES:${path}`,
        component: FilesView,
      });
    }
  } else {
    // 无 Tag
    const path = `/${filesName}`;
    routes.push({
      path: path,
      name: `FILES:${path}`,
      component: FilesView,
    });
  }
}

for (const fileName in data.searchData) {
  const [filesName, tagName] = data.searchData[fileName];

  if (tagName === null) {
    // 无 Tag
    const path = `/${filesName}/${fileName}`;
    routes.push({
      path: path,
      name: `FILE:${path}`,
      component: FileView,
    });
  } else {
    // 有 Tag
    const path = `/${filesName}/${tagName}/${fileName}`;
    routes.push({
      path: path,
      name: `FILE:${path}`,
      component: FileView,
    });
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // 中文路径 & 404
  const decodedPath = decodeURIComponent(to.fullPath);
  if (decodedPath !== to.fullPath) {
    return decodedPath;
  } else if (to.name === undefined) return "/404";
});

// 加载进度条
router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/") NaiveUIDiscreteAPI.loadingBar.start();
  next();
});
router.afterEach((to) => {
  if (to.fullPath !== "/") NaiveUIDiscreteAPI.loadingBar.finish();
});

export default router;
