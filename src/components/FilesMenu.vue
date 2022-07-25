<template>
  <n-list>
    <n-list-item v-for="(item, index) in getListData(data)" :key="index">
      <n-button
        size="large"
        tag="a"
        :href="item.href"
        quaternary
        style="white-space: normal"
      >
        <template #icon>
          <n-icon>
            <FileIcon v-if="item.type == void 0" />
            <FileVideoIcon v-if="item.type == 'video'" />
            <FileAudioIcon v-if="item.type == 'audio'" />
            <FileImageIcon v-if="item.type == 'image'" />
          </n-icon>
        </template>
        {{ item.name }}
      </n-button>
    </n-list-item>
  </n-list>
  <div v-if="showPage">
    <n-pagination
      @update:page="updatePage"
      v-model:page="getPage"
      :page-count="maxPage"
    />
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import {
  FileRegular as FileIcon,
  FileVideoRegular as FileVideoIcon,
  FileAudioRegular as FileAudioIcon,
  FileImageRegular as FileImageIcon,
} from "@vicons/fa";
import { NIcon, NList, NButton, NListItem, NPagination } from "naive-ui";
import { getFileInfo, getSearch } from "@/assets/box.js";

/**
 * 获取当前页数
 * @returns {Number} 页数
 */
const getPage = () => {
  const search = getSearch(location.search, "p");
  if (search == void 0) {
    return 1;
  } else {
    return Number(search);
  }
};

// {
//   hrefHead: "",
//   data: [["FileName"], ["FileName"]],
// };
const getListData = (data) => {
  showPage.value = false;

  if (data == void 0) return;
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
  for (const i in data) {
    const fileName = data[i];
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
  for (const i in data) {
    const fileInfo = getFileInfo(data[i].name);

    ListData.push({
      name: `${data[i].tag} ${fileInfo.name}`,
      type: fileInfo.type,
      href: `${data[i].hrefHead}/${data[i].name}`,
    });
  }

  return ListData;
};

const showPage = ref(false);
const maxPage = ref(100);
export default defineComponent({
  components: {
    NIcon,
    NList,
    NButton,
    NListItem,
    NPagination,
    // Icon
    FileIcon,
    FileVideoIcon,
    FileAudioIcon,
    FileImageIcon,
  },
  props: ["data"],
  setup() {
    return {
      getListData,
      showPage,
      maxPage,
      getPage: getPage(),
      updatePage(page) {
        location.href = `${location.pathname}?p=${page}`;
      },
    };
  },
});
</script>
