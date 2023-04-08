<template>
  <n-list :key="counter.listKey">
    <n-list-item
      v-for="(item, index) in props.data.data[counter.nowPage - 1]"
      :key="index"
    >
      <template #prefix v-if="counter.download.switch">
        <n-checkbox
          v-model:checked="counter.download.select[item.href]"
          @update-checked="
            (checked) => counter.changeDownloadSelect(item, checked)
          "
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
      v-model:page="counter.nowPage"
      :page-count="props.data.data.length"
    />
  </div>
</template>

<script setup lang="ts">
/// <reference types="@types/wicg-file-system-access" />
import type { PropType } from "vue";
import {
  NIcon,
  NList,
  NButton,
  NCheckbox,
  NListItem,
  NPagination,
} from "naive-ui";

import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import type { FileTypes, FilesMenuDataType } from "@/types/";
import FilesMenuICON from "@/components/FilesMenuICON.vue";

const props = defineProps({
  data: {
    type: Object as PropType<FilesMenuDataType>,
    required: true,
  },
});
const counter = useCounterStore();

const clickButton = async (data: {
  name: string;
  type: FileTypes;
  href: string;
}) => {
  await router.push(data.href);
};

// --- 分页 ---

/**
 * 获取当前页数
 * @returns 页数
 */
// const getPage = (): number => {
//   const search = Number(
//     new URL(decodeURIComponent(location.href)).searchParams.get("p")
//   );
//   if (search === void 0 || isNaN(search) || search === 0) {
//     return 1;
//   } else {
//     return search;
//   }
// };
counter.nowPage = 1;

const updatePage = (page: number) => {
  counter.listKey = page;
  counter.nowPage = page;
};

router.afterEach((to, from) => {
  if (
    String(to.name).startsWith("FILES:") &&
    String(from.name).startsWith("FILES:")
  ) {
    counter.nowPage = 1;
    counter.listKey = counter.nowPage;
  }
});
</script>
