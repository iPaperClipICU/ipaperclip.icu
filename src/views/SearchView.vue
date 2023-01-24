<template>
  <n-card hoverable>
    <n-grid :cols="4" item-responsive>
      <n-gi span="4 425:2 705:1">
        <n-input-group>
          <n-input v-model:value="searchValue" placeholder="搜索" clearable />
          <n-button type="primary" ghost @click="searchButton">搜索</n-button>
        </n-input-group>
      </n-gi>
      <n-gi span="0 425:2 705:3" />
    </n-grid>
  </n-card>
  <div style="margin-top: 15px">
    <n-card hoverable>
      <!-- 菜单 -->
      <TagMenu />
      <n-divider />
      <!-- 文件夹 -->
      <div v-if="!(showErrorEmpty || showNullEmpty)">
        共找到相关结果 {{ searchNum }} 个
        <FilesMenu />
      </div>
      <!-- Null -->
      <n-empty v-if="showErrorEmpty" description="请输入关键词" />
      <n-empty v-if="showNullEmpty" description="找不到和查询相匹配的结果" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NGi,
  NGrid,
  NCard,
  NEmpty,
  NInput,
  NButton,
  NDivider,
  NInputGroup,
} from "naive-ui";

import router from "@/router";
import { getData } from "@/assets/utils";
import TagMenu from "@/components/TagMenu.vue";
import FilesMenu from "@/components/FilesMenu.vue";
import { useCounterStore } from "@/stores/counter";
import type { Search_FilesMenuDataType } from "@/types/";

const data = getData();
const counter = useCounterStore();

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
  searchValue.value = KeyWord;

  search(String(KeyWord).toLocaleLowerCase());
};

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
    showNullEmpty.value = true;
  } else {
    // 有搜索结果
    counter.FilesMenuData = searchData;
    searchNum.value = searchData.data.length;
  }
};

const showNullEmpty = ref<boolean>(false);
const showErrorEmpty = ref<boolean>(false);
const searchNum = ref<number>(0);
const searchValue = ref<string>("");

const searchButton = () => {
  search(searchValue.value.toLocaleLowerCase());
  router.push(`/search?s=${searchValue.value}`);
};

// Run
init();
</script>
