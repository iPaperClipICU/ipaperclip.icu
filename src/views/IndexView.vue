<template>
  <n-collapse-transition :show="tag !== false && AtPageType !== 'Home'">
    <n-h5 prefix="bar" style="margin-bottom: 0px">
      当前分支: <n-text type="info">{{ tag }}</n-text>
    </n-h5>
  </n-collapse-transition>
  <!-- 文件夹 -->
  <FilesMenu v-if="AtPageType === 'Files'" />
  <!-- 文件 -->
  <div v-else-if="AtPageType === 'File'" style="margin-top: 15px">
    <FileCard />
  </div>
  <!-- Null -->
  <n-empty v-else-if="AtPageType === 'Home'" description="请在「菜单」中选择" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NH5, NText, NEmpty, NCollapseTransition } from "naive-ui";

import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import FileCard from "@/components/FileCard.vue";
import FilesMenu from "@/components/FilesMenu.vue";
import { getFileInfo, getData } from "@/assets/utils.js";

const data = getData();
const counter = useCounterStore();

const AtPageType = ref<"Home" | "Files" | "File">("Home");
const tag = ref<false | string>(false);

/**
 * /
 * /files
 * /files/tag
 * /files/tag/file
 * /files/file
 */

const init = (url?: string): void => {
  const path = decodeURIComponent(url || location.pathname);
  const pathList = path.split("/");
  const filesName = pathList[1];

  const filesData = data.data[filesName];
  if (path === "/" || filesData === undefined) {
    // Path: / || FilesName错误
    AtPageType.value = "Home";
    return;
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
      return;
    }

    const fileName = pathList[3];
    if (fileName === void 0) {
      // /files/tag
      AtPageType.value = "Files";
      counter.FilesMenuData = {
        search: false,
        hrefHead: `/${filesName}/${tagName}`,
        data: tagData,
      };
      counter.AtPageFilesName = filesName;
      tag.value = tagName;
    } else {
      // /files/tag/file
      AtPageType.value = "File";
      const fileNameC = data.searchData[fileName];
      if (
        fileNameC === void 0 ||
        fileNameC[0] != filesName ||
        fileNameC[1] != tagName
      ) {
        return;
      }

      counter.FileCardData = {
        type: getFileInfo(fileName).type,
        name: fileName,
        url: `https://ipaperclip-file.xodvnm.cn/video/${filesName}/${tagName}/${fileName}`,
      };
      counter.AtPageFilesName = filesName;
      tag.value = tagName;
    }
  } else {
    // 无Tag

    const fileName = pathList[2];
    if (fileName === void 0) {
      // /files
      AtPageType.value = "Files";
      counter.FilesMenuData = {
        search: false,
        hrefHead: `/${filesName}`,
        data: filesData,
      };
      counter.AtPageFilesName = filesName;
      tag.value = false;
    } else {
      // /files/file
      AtPageType.value = "File";
      const fileNameC = data.searchData[fileName];
      if (fileNameC === void 0 || fileNameC[0] != filesName) {
        return;
      }

      counter.FileCardData = {
        type: getFileInfo(fileName).type,
        name: fileName,
        url: `https://ipaperclip-file.xodvnm.cn/video/${filesName}/${fileName}`,
      };
      counter.AtPageFilesName = filesName;
      tag.value = false;
    }
  }
};

// 刷新
router.beforeEach((to) => {
  if (to.name === "Index") init(to.fullPath);
});

// Run
init();
</script>
