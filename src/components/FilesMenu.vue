<template>
  <n-list :key="listKey">
    <n-list-item
      v-for="(item, index) in props.data.data[nowPage - 1]"
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
  <div v-if="props.data.data.length > 1 && props.data.needPagination">
    <n-pagination
      @update:page="updatePage"
      v-model:page="nowPage"
      :page-count="props.data.data.length"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { NIcon, NList, NButton, NListItem, NPagination } from "naive-ui";

import router from "@/router";
import type { FilesMenuDataType } from "@/types/";
import FilesMenuICON from "@/components/FilesMenuICON.vue";

const props = defineProps({
  data: {
    type: Object as PropType<FilesMenuDataType>,
    required: true,
  },
});

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

const clickButton = async (data: {
  name: string;
  type: "audio" | "video" | "image" | undefined;
  href: string;
}) => {
  await router.push(data.href);
};
</script>
