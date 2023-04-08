<template>
  <div style="margin: 10px">
    <n-button
      v-if="!downloadMode"
      type="primary"
      dashed
      @click="openDownloadMode"
    >
      批量下载
    </n-button>
    <n-space v-if="downloadMode">
      <n-button type="error" dashed @click="() => closeDownloadMode()">
        关闭批量下载
      </n-button>
      <n-button strong secondary type="primary" @click="downloadButtonClick">
        下载
      </n-button>
      <n-button
        v-if="props.data.data.length > 1"
        strong
        secondary
        @click="() => selectAll({ at: true })"
      >
        全选当前页面
      </n-button>
      <n-button strong secondary @click="() => selectAll()">全选所有</n-button>
      <n-button
        v-if="props.data.data.length > 1"
        strong
        secondary
        type="error"
        @click="() => selectAll({ at: true, remove: true })"
      >
        取消当前页面的选择
      </n-button>
      <n-button
        strong
        secondary
        type="error"
        @click="() => selectAll({ remove: true })"
      >
        取消所有的选择
      </n-button>
    </n-space>
  </div>
  <n-list :key="listKey">
    <n-list-item
      v-for="(item, index) in props.data.data[nowPage - 1]"
      :key="index"
    >
      <template #prefix v-if="downloadMode">
        <n-checkbox
          v-model:checked="downloadSelect[item.href]"
          @update-checked="(checked) => changeDownloadSelect(item, checked)"
        />
      </template>
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
  <div v-if="props.data.data.length > 1 && props.data.needPagination">
    <n-pagination
      @update:page="updatePage"
      v-model:page="nowPage"
      :page-count="props.data.data.length"
    />
  </div>
  <DownloadModal
    v-if="downloadModal"
    :data="downloadSelect"
    @close="() => (downloadModal = false)"
  />
</template>

<script setup lang="ts">
/// <reference types="@types/wicg-file-system-access" />
import { ref, type PropType } from "vue";
import {
  NIcon,
  NList,
  NSpace,
  NButton,
  NCheckbox,
  NListItem,
  NPagination,
} from "naive-ui";

import router from "@/router";
import type { FileTypes, FilesMenuDataType } from "@/types/";
import DiscreteAPI from "@/assets/NaiveUIDiscreteAPI";
import DownloadModal from "./DownloadModal.vue";
import FilesMenuICON from "@/components/FilesMenuICON.vue";

const props = defineProps({
  data: {
    type: Object as PropType<FilesMenuDataType>,
    required: true,
  },
});

const clickButton = async (data: {
  name: string;
  type: FileTypes;
  href: string;
}) => {
  await router.push(data.href);
};

// --- 分页 ---
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
const nowPage = ref<number>(getPage());

const updatePage = (page: number) => {
  listKey.value = page;
  nowPage.value = page;
};

// --- 批量下载 ---
const onSearch = ref<boolean>(location.pathname === "/search");
const getLocalStorageName = () =>
  `downloadSelectData_${decodeURI(location.pathname)}`;
const downloadMode = ref<boolean>(false);
const downloadSelect = ref<{ [key: string]: boolean }>({}); // { href: checked }
const downloadModal = ref<boolean>(false);

const initDownloadSelect = () => {
  if (onSearch.value) return null;
  const localStorageName = getLocalStorageName();
  const data = ((): null | string[] => {
    try {
      return JSON.parse(localStorage.getItem(localStorageName) ?? "");
    } catch (error) {
      return null;
    }
  })();
  if (data === null || data.length === 0) {
    localStorage.setItem(localStorageName, "[]");
    downloadSelect.value = {};
    return null;
  } else {
    const obj: { [key: string]: boolean } = {};
    data.forEach((item) => {
      obj[item] = true;
    });
    downloadSelect.value = obj;
    return data;
  }
};
initDownloadSelect();
const changeDownloadSelect = (
  item: {
    name: string;
    type: FileTypes;
    href: string;
  },
  checked: boolean = true
) => {
  if (checked) {
    downloadSelect.value[item.href] = true;
  } else {
    delete downloadSelect.value[item.href];
  }

  // 本地存储
  if (onSearch.value) return;
  localStorage.setItem(
    getLocalStorageName(),
    JSON.stringify(Object.keys(downloadSelect.value))
  );
};

const downloadButtonClick = () => {
  if (Object.keys(downloadSelect.value).length === 0) {
    DiscreteAPI.message.warning("您还没有选择任何文件");
  } else downloadModal.value = true;
};

/**
 * 打开批量下载模式
 */
const openDownloadMode = () => {
  if (typeof window.showDirectoryPicker !== "object") {
    DiscreteAPI.message.warning("您的浏览器不支持批量下载");
    return;
  }
  const data = initDownloadSelect();
  if (data !== null) {
    DiscreteAPI.dialog.warning({
      title: "是否使用上次的选择？",
      content: `上次您选择了${data.length}个文件，是否使用上次的选择？`,
      positiveText: "使用",
      negativeText: "不使用",
      onNegativeClick: () => {
        localStorage.setItem(getLocalStorageName(), "[]");
        downloadSelect.value = {};
      },
      onAfterLeave: () => {
        downloadMode.value = true;
      },
    });
  } else downloadMode.value = true;
};

/**
 * 关闭批量下载模式
 */
const closeDownloadMode = () => {
  if (Object.keys(downloadSelect.value).length > 0) {
    DiscreteAPI.dialog.warning({
      title: "确定要关闭批量下载模式吗？",
      content: onSearch.value
        ? "注意，您的选择将不会保留！"
        : "您的已经选择已保存到本地，下次打开时将会自动加载。",
      positiveText: "确定",
      negativeText: "不确定",
      onPositiveClick: () => {
        downloadMode.value = false;
      },
    });
  } else downloadMode.value = false;
};

/**
 * 全选
 * @param at 是否只选择当前页面
 */
const selectAll = (opt?: { at?: boolean; remove?: boolean }) => {
  const value = opt?.remove === true ? false : true;
  if (opt?.at === true)
    props.data.data[nowPage.value - 1].forEach((item) =>
      changeDownloadSelect(item, value)
    );
  else
    props.data.data.forEach((page) => {
      page.forEach((item) => changeDownloadSelect(item, value));
    });
  listKey.value = Math.random();
};

router.afterEach((to, from) => {
  if (
    downloadMode.value === true &&
    String(to.name).startsWith("FILES:") &&
    String(from.name).startsWith("FILES:")
  ) {
    initDownloadSelect();
    listKey.value = Math.random();
  }
});
</script>
