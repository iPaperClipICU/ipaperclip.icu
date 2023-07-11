<template>
  <n-card hoverable>
    <!-- 文件夹 -->
    <div v-if="searchStatus === 'Success'">共找到相关结果 {{ searchNum }} 个</div>
    <FilesMenu
      v-if="searchStatus === 'Success' && FilesMenuData !== undefined"
      :data="FilesMenuData"
    />
    <!-- Null -->
    <n-empty v-if="searchStatus === null" description="请输入关键词" />
    <n-empty v-if="searchStatus === 'NotFound'" description="找不到和查询相匹配的结果" />
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NEmpty } from "naive-ui";

import router from "@/router";
import { useUrlSearchParams } from "@vueuse/core";
import type { FilesMenuDataType } from "@/types/";
import { useCounterStore } from "@/stores/counter";
import FilesMenu from "@/components/FilesMenu.vue";
import { getData, getFileInfo } from "@/assets/utils";

const counter = useCounterStore();
const data = getData();

const searchNum = ref<number>(0); // 结果数量
const searchStatus = ref<null | "NotFound" | "Success">(null);
const FilesMenuData = ref<FilesMenuDataType>();

const init = () => {
  const params = useUrlSearchParams("history");
  const KeyWord = String(params.s).toLocaleLowerCase();

  search(KeyWord);
};

router.afterEach((to, from) => {
  if (from.name === "Search" && to.name === "Search") init();
});

const search = (keyword: string) => {
  if (keyword === "undefined" || keyword === "null" || keyword.replace(/\s+/g, "") === "") {
    // 没有搜索关键字
    searchStatus.value = null;
    return;
  }

  const searchData: FilesMenuDataType["data"][0] = [];
  for (const fileName in data.searchData) {
    if (fileName.toLocaleLowerCase().indexOf(keyword) != -1) {
      const [filesName, tagName, , fileSize] = data.searchData[fileName];
      const fileInfo = getFileInfo(fileName);
      if (tagName !== null) {
        // 有Tag
        searchData.push({
          name: `[${filesName}/${tagName}] ${fileInfo.name}`,
          href: `/${filesName}/${tagName}/${fileName}`,
          type: fileInfo.type,
          size: fileSize,
        });
      } else {
        // 没有Tag
        searchData.push({
          name: `[${filesName}] ${fileInfo.name}`,
          href: `/${filesName}/${fileName}`,
          type: fileInfo.type,
          size: fileSize,
        });
      }
    }
  }

  if (searchData.length === 0) {
    // 没有搜索结果
    searchNum.value = 0;
    searchStatus.value = "NotFound";
    counter.FilesMenuDate = undefined; // 兼容批量下载
  } else {
    // 有搜索结果
    FilesMenuData.value = {
      needPagination: false,
      data: [searchData],
    };
    searchNum.value = searchData.length;
    searchStatus.value = "Success";
    counter.FilesMenuDate = FilesMenuData.value; // 兼容批量下载
    counter.nowPage = 1; // 兼容批量下载
  }
};
init();
</script>
