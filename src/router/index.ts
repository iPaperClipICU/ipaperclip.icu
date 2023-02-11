import { createRouter, createWebHistory } from "vue-router";
import SearchView from "@/views/SearchView.vue";
import FilesView from "@/views/FilesView.vue";
import FileView from "@/views/FileView.vue";

import { getData } from "@/assets/utils";
import HomeView from "@/views/HomeView.vue";

const data = getData();

const routes = [
  {
    path: "/search",
    name: "Search",
    component: SearchView,
  },
];

for (const i of data.menuData) {
  const filesName = i[0];
  if (i.length !== 1) {
    // 有 Tag
    routes.push({
      path: `/${filesName}`,
      name: `/${filesName}`,
      component: FilesView,
    });
    for (const tagName of i[1]) {
      const path = `/${filesName}/${tagName}`;
      routes.push(
        {
          path,
          name: `FILES:${path}`,
          component: FilesView,
        }
        // {
        //   path: `${path}/:pathMatch(.*)*`,
        //   name: `${path}/*`,
        //   component: FileView,
        // }
      );
    }
  } else {
    // 无 Tag
    const path = `/${filesName}`;
    routes.push(
      {
        path,
        name: `FILES:${path}`,
        component: FilesView,
      }
      // {
      //   path: `${path}/:pathMatch(.*)*`,
      //   name: `${path}/*`,
      //   component: FileView,
      // }
    );
  }
}

for (const fileName in data.searchData) {
  const [filesName, tagName] = data.searchData[fileName];

  if (tagName === null) {
    // 无 Tag
    routes.push({
      path: `/${filesName}/${fileName}`,
      name: `FILE:/${filesName}/${fileName}`,
      component: FileView,
    });
  } else {
    // 有 Tag
    routes.push({
      path: `/${filesName}/${tagName}/${fileName}`,
      name: `FILE:/${filesName}/${tagName}/${fileName}`,
      component: FileView,
    });
  }
}

routes.push({
  path: "/:pathMatch(.*)*",
  name: "Home",
  component: HomeView,
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  // 中文路径
  const decodedPath = decodeURIComponent(to.path);
  if (decodedPath !== to.path) {
    return { path: decodedPath };
  }
});

export default router;
