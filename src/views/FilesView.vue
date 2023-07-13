<template>
  <n-card size="small">
    <n-collapse-transition :show="tag !== undefined">
      <n-h5 prefix="bar" style="margin-bottom: 6px">
        当前分支: <n-text type="info">{{ tag }}</n-text>
      </n-h5>
    </n-collapse-transition>
    <FilesListComponent v-if="filesListData" :files-list-data="filesListData" />
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NH5, NCard, NText, NCollapseTransition } from "naive-ui";

import router from "@/router";
import { usePublicStore } from "@/stores";
import type { FilesListData } from "@/types";
import { getFileInfo } from "@/assets/utils";

import FilesListComponent from "@/components/FilesListComponent.vue";

const publicStore = usePublicStore();

const tag = ref<string | undefined>(undefined);

const filesListData = ref<FilesListData | undefined>(undefined);
const getFilesData = () => {
  const pathList = decodeURI(location.pathname)
    .split("/")
    .filter((value) => value !== "");

  const filesName = pathList[0];
  const filesData = publicStore.data.data[filesName];
  if (Array.isArray(filesData)) {
    // 无Tag
    filesListData.value = filesData.map((value) => ({
      uri: `/${filesName}/${value}`,
      ...getFileInfo(value),
    }));
    tag.value = undefined;
  } else {
    // 有Tag
    const tagName = pathList[1];
    const tagData = filesData[tagName];
    filesListData.value = tagData.map((value) => ({
      uri: `/${filesName}/${tagName}/${value}`,
      ...getFileInfo(value),
    }));
    tag.value = tagName;
  }
};
getFilesData();
router.afterEach((to) => {
  if (String(to.name).startsWith("FILES:")) getFilesData();
});
</script>
