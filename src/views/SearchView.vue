<template>
  <!-- 文件夹 -->
  <div v-if="!showErrorEmpty">
    关键词: {{ searchKeyWord }}, 共找到相关结果 {{ searchNum }} 个
  </div>
  <FilesMenu v-if="!(showErrorEmpty || showNullEmpty)" />
  <!-- Null -->
  <n-empty v-if="showErrorEmpty" description="请输入关键词" />
  <n-empty v-if="showNullEmpty" description="找不到和查询相匹配的结果" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NEmpty } from "naive-ui";

import router from "@/router";
import { getData } from "@/assets/utils";
import FilesMenu from "@/components/FilesMenu.vue";
import { useCounterStore } from "@/stores/counter";
import type { Search_FilesMenuDataType } from "@/types/";

const data = getData();
const counter = useCounterStore();

const showNullEmpty = ref<boolean>(false);
const showErrorEmpty = ref<boolean>(false);
const searchNum = ref<number>(0);
const searchKeyWord = ref<string>("");

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

  searchKeyWord.value = KeyWord;

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

  const searchData: Search_FilesMenuDataType = {
    search: true,
    data: [],
  };
  for (const i in data.searchData) {
    if (i.toLocaleLowerCase().indexOf(keyword) != -1) {
      if (data.searchData[i].length === 2) {
        // 有Tag
        searchData.data.push({
          name: i,
          hrefHead: `/${data.searchData[i][0]}/${data.searchData[i][1]}`,
          tag: `[${data.searchData[i][0]}/${data.searchData[i][1]}]`,
        });
      } else {
        // 没有Tag
        searchData.data.push({
          name: i,
          hrefHead: `/${data.searchData[i][0]}`,
          tag: `[${data.searchData[i][0]}]`,
        });
      }
    }
  }

  if (searchData.data.length === 0) {
    // 没有搜索结果
    searchNum.value = 0;
    showNullEmpty.value = true;
  } else {
    // 有搜索结果
    counter.FilesMenuData = searchData;
    searchNum.value = searchData.data.length;
  }
};
init();
</script>
