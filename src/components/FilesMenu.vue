<template>
  <n-list :key="listKey">
    <n-list-item
      v-for="(item, index) in getListData(store.state.FilesMenuData)"
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

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { NIcon, NList, NButton, NListItem, NPagination } from "naive-ui";
import router from "@/router";
import FilesMenuICON from "@/components/FilesMenuICON.vue";
import { getFileInfo } from "@/assets/utils.js";

const store = useStore();

const showPage = ref(false);
const maxPage = ref(100);
const nowPage = ref(1);
const listKey = ref(1);

/**
 * 获取当前页数
 * @returns {Number} 页数
 */
const getPage = () => {
  const search = Number(
    new URL(decodeURIComponent(location.href)).searchParams.get("p")
  );
  if (search === void 0 || isNaN(search) || search === 0) {
    return 1;
  } else {
    return search;
  }
};

// {
//   hrefHead: "",
//   data: [["FileName"], ["FileName"]],
// };
const getListData = (data) => {
  showPage.value = false;

  if (data === void 0) return;
  const hrefHead = data.hrefHead;
  if (data.search) {
    return getListData_search(data.data);
  }
  const pages = data.data.length != 1;
  data = data.data;

  if (pages) {
    showPage.value = true;
    maxPage.value = data.length;
    data = data[getPage() - 1];
  } else {
    data = data[0];
  }

  const ListData = [];
  for (const fileName of data) {
    const fileInfo = getFileInfo(fileName);

    ListData.push({
      name: fileInfo.name,
      type: fileInfo.type,
      href: `${hrefHead}/${fileName}`,
    });
  }

  return ListData;
};

// {
//   search: true,
//   data: [
//     {
//       name: "test",
//       hrefHead: "/test",
//       tag: "[XXX]",
//     },
//   ],
// };
const getListData_search = (data) => {
  const ListData = [];
  for (const FileName of data) {
    const fileInfo = getFileInfo(data[FileName].name);

    ListData.push({
      name: `${data[FileName].tag} ${fileInfo.name}`,
      type: fileInfo.type,
      href: `${data[FileName].hrefHead}/${data[FileName].name}`,
    });
  }

  return ListData;
};

const updatePage = async (page) => {
  await router.push(`${location.pathname}?p=${page}`);
  listKey.value = page;
  nowPage.value = page;
};

const clickButton = async (data) => {
  await router.push(data.href);
  store.state.init();
};
</script>
