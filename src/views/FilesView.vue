<template>
  <n-card hoverable>
    <n-collapse-transition :show="tag !== false">
      <n-h5 prefix="bar" style="margin-bottom: 0px">
        当前分支: <n-text type="info">{{ tag }}</n-text>
      </n-h5>
    </n-collapse-transition>
    <!-- 文件夹 -->
    <FilesMenu v-if="FilesMenuData !== undefined" :data="FilesMenuData" />
    <!-- Null -->
    <n-empty v-else-if="showNull" description="请在「菜单」中选择" />
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NH5, NText, NCard, NEmpty, NCollapseTransition } from "naive-ui";

import router from "@/router";
import type { FilesMenuDataType } from "@/types";
import { useCounterStore } from "@/stores/counter";
import FilesMenu from "@/components/FilesMenu.vue";
import { getFileInfo, getData } from "@/assets/utils.js";

const counter = useCounterStore();
const data = getData();

const showNull = ref<boolean>(false);
const tag = ref<false | string>(false);
const FilesMenuData = ref<FilesMenuDataType | undefined>(undefined);

/* 
No  Tag /files
Has Tag /files or /files/tag
*/

const init = (): void => {
  const [hrefHead, filesData] = (():
    | [string, string[][]]
    | [undefined, undefined] => {
    const pathList = decodeURIComponent(location.pathname).split("/");
    const filesName = pathList[1];

    const filesData = data.data[filesName];
    if (filesData === undefined) {
      // FilesName错误
      return [undefined, undefined];
    }

    if (!Array.isArray(filesData)) {
      // 有Tag

      // 获取TagName
      let tagName = pathList[2];
      if (tagName === void 0 || tagName === "") {
        // 缺少TagName
        for (const i in data.menuData) {
          const md = data.menuData[i] as [string, string[]];
          if (md[0] === filesName) {
            tagName = md[1][0];
            router.push(`/${filesName}/${tagName}`);
          }
        }
      }
      const tagData = filesData[tagName];

      if (tagData === undefined) {
        return [undefined, undefined];
      }

      tag.value = tagName;
      return [`/${filesName}/${tagName}`, tagData];
    } else {
      // 无Tag

      tag.value = false;
      return [`/${filesName}`, filesData];
    }
  })();

  if (hrefHead === undefined) {
    showNull.value = true;
    return;
  }

  const pagesData: FilesMenuDataType["data"] = [];
  for (const i of filesData) {
    const pageData: FilesMenuDataType["data"][0] = [];
    for (const fileName of i) {
      pageData.push({
        name: getFileInfo(fileName).name,
        type: getFileInfo(fileName).type,
        href: `${hrefHead}/${fileName}`,
      });
    }
    pagesData.push(pageData);
  }

  FilesMenuData.value = {
    needPagination: true,
    data: pagesData,
  };
  counter.FilesMenuDate = FilesMenuData.value;
};
router.afterEach((to, from) => {
  if (
    String(to.name).startsWith("FILES:") &&
    String(from.name).startsWith("FILES:")
  ) {
    FilesMenuData.value = undefined;
    init();
  }
});

init();
</script>
