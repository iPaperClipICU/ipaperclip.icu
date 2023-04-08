<template>
  <n-card hoverable>
    <!-- 文件夹 -->
    <div v-if="!showErrorEmpty">共找到相关结果 {{ searchNum }} 个</div>
    <FilesMenu
      v-if="!(showErrorEmpty || showNullEmpty) && FilesMenuData !== undefined"
      :data="FilesMenuData"
    />
    <!-- Null -->
    <n-empty v-if="showErrorEmpty" description="请输入关键词" />
    <n-empty v-if="showNullEmpty" description="找不到和查询相匹配的结果" />
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NCard, NEmpty } from "naive-ui";

import router from "@/router";
import type { FilesMenuDataType } from "@/types/";
import { useCounterStore } from "@/stores/counter";
import FilesMenu from "@/components/FilesMenu.vue";
import { getData, getFileInfo } from "@/assets/utils";

const counter = useCounterStore();
const data = getData();

const searchNum = ref<number>(0); // 结果数量
const showNullEmpty = ref<boolean>(false);
const showErrorEmpty = ref<boolean>(false);
const FilesMenuData = ref<FilesMenuDataType>();

const init = () => {
  const KeyWord = new URL(decodeURIComponent(location.href)).searchParams.get(
    "s"
  );
  if (
    KeyWord === void 0 ||
    KeyWord === null ||
    KeyWord.replace(/\s+/g, "") === ""
  ) {
    // 没有搜索关键字
    showErrorEmpty.value = true;
    return;
  }

  search(String(KeyWord).toLocaleLowerCase());
};

router.afterEach((to, from) => {
  if (from.name === "Search" && to.name === "Search") init();
});

const search = (keyword: string | undefined) => {
  if (keyword === undefined || keyword === "") {
    // 没有搜索关键字
    showErrorEmpty.value = true;
    return;
  }

  showNullEmpty.value = false;
  showErrorEmpty.value = false;

  const searchData: FilesMenuDataType["data"][0] = [];
  for (const fileName in data.searchData) {
    if (fileName.toLocaleLowerCase().indexOf(keyword) != -1) {
      const [filesName, tagName] = data.searchData[fileName];
      const fileInfo = getFileInfo(fileName);
      if (tagName !== null) {
        // 有Tag
        searchData.push({
          name: `[${filesName}/${tagName}] ${fileInfo.name}`,
          href: `/${filesName}/${tagName}/${fileName}`,
          type: fileInfo.type,
        });
      } else {
        // 没有Tag
        searchData.push({
          name: `[${filesName}] ${fileInfo.name}`,
          href: `/${filesName}/${fileName}`,
          type: fileInfo.type,
        });
      }
    }
  }

  if (searchData.length === 0) {
    // 没有搜索结果
    searchNum.value = 0;
    showNullEmpty.value = true;
    counter.FilesMenuDate = undefined;
  } else {
    // 有搜索结果
    FilesMenuData.value = {
      needPagination: false,
      data: [searchData],
    };
    searchNum.value = searchData.length;
    counter.FilesMenuDate = FilesMenuData.value;
    counter.nowPage = 1;
  }
};
init();
</script>
