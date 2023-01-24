<template>
  <n-list :key="listKey">
    <n-list-item
      v-for="(item, index) in getListData(counter.FilesMenuData)"
      :key="index"
    >
      <n-button
        size="large"
        tag="a"
        quaternary
        style="white-space: normal"
        @click="clickButton(item)"
      >
        <template #icon>
          <n-icon>
            <FilesMenuICON :type="item.type" />
          </n-icon>
        </template>
        {{ item.name }}
      </n-button>
    </n-list-item>
  </n-list>
  <div v-if="showPage">
    <n-pagination
      @update:page="updatePage"
      v-model:page="nowPage"
      :page-count="maxPage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NIcon, NList, NButton, NListItem, NPagination } from "naive-ui";

import router from "@/router";
import { getFileInfo } from "@/assets/utils";
import { useCounterStore } from "@/stores/counter";
import FilesMenuICON from "@/components/FilesMenuICON.vue";
import type { FilesMenuDataType, Search_FilesMenuDataType } from "@/types/";

const counter = useCounterStore();

const showPage = ref<boolean>(false);
const maxPage = ref<number>(100);
const nowPage = ref<number>(1);
const listKey = ref<number>(1);

/**
 * 获取当前页数
 * @returns 页数
 */
const getPage = (): number => {
  const search = Number(
    new URL(decodeURIComponent(location.href)).searchParams.get("p")
  );
  if (search === void 0 || isNaN(search) || search === 0) {
    return 1;
  } else {
    return search;
  }
};

const getListData = (d: FilesMenuDataType | Search_FilesMenuDataType) => {
  showPage.value = false;

  if (d.search === true) {
    return getListData_search(d.data);
  }
  const { hrefHead, data } = d;
  const pages = data.length != 1;
  const FileNameList = (() => {
    if (pages) {
      showPage.value = true;
      maxPage.value = data.length;
      return data[getPage() - 1];
    } else {
      return data[0];
    }
  })();

  const ListData = [];
  for (const fileName of FileNameList) {
    const fileInfo = getFileInfo(fileName);

    ListData.push({
      name: fileInfo.name,
      type: fileInfo.type,
      href: `${hrefHead}/${fileName}`,
    });
  }

  return ListData;
};

const getListData_search = (data: Search_FilesMenuDataType["data"]) => {
  const ListData = [];
  for (const FileName of data) {
    const fileInfo = getFileInfo(FileName.name);

    ListData.push({
      name: `${FileName.tag} ${fileInfo.name}`,
      type: fileInfo.type,
      href: `${FileName.hrefHead}/${FileName.name}`,
    });
  }

  return ListData;
};

const updatePage = async (page: number) => {
  await router.push(`${location.pathname}?p=${page}`);
  listKey.value = page;
  nowPage.value = page;
};

const clickButton = async (data: {
  name: string;
  type: "audio" | "video" | "image" | undefined;
  href: string;
}) => {
  await router.push(data.href);
  counter.init();
};
</script>
