<template>
  <n-card hoverable>
    <n-grid :cols="4" item-responsive>
      <n-gi span="4 425:2 705:1">
        <n-input-group>
          <n-input v-model:value="searchValue" placeholder="搜索" clearable />
          <n-button type="primary" @click="searchButton" ghost>搜索</n-button>
        </n-input-group>
      </n-gi>
      <n-gi span="0 425:2 705:3" />
    </n-grid>
  </n-card>
  <div style="padding-top: 15px">
    <n-card hoverable>
      <!-- 菜单 -->
      <TagMenu />
      <n-divider />
      <!-- 文件夹 -->
      <FilesMenu v-if="AtPageType === 'Files'" />
      <!-- 文件 -->
      <div v-else-if="AtPageType === 'File'" style="margin-top: 15px">
        <FileCard />
      </div>
      <!-- Null -->
      <n-empty
        v-else-if="AtPageType === 'Home'"
        description="请在「菜单」中选择"
      />
    </n-card>
  </div>
  <div v-if="AtPageType === 'Home'" style="margin-top: 15px">
    <READMECard />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NGi,
  NCard,
  NGrid,
  NEmpty,
  NInput,
  NButton,
  NDivider,
  NInputGroup,
} from "naive-ui";

import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import TagMenu from "@/components/TagMenu.vue";
import FileCard from "@/components/FileCard.vue";
import FilesMenu from "@/components/FilesMenu.vue";
import READMECard from "@/components/READMECard.vue";
import { getFileInfo, clearRubbish, getData } from "@/assets/utils.js";

const data = getData();
const counter = useCounterStore();

const AtPageType = ref("Home");

/**
 * /
 * /files
 * /files/tag
 * /files/tag/file
 * /files/file
 */

const init = (): void => {
  const path = decodeURIComponent(location.pathname);
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
    }
  }
};

// 搜索
const searchValue = ref("");
const searchButton = (e: MouseEvent) => {
  e.preventDefault();
  // location.href = `/search?s=${searchValue.value}`;
  router.push(`/search?s=${searchValue.value}`);
  clearRubbish();
};

// Run
counter.init = init;
init();
</script>
