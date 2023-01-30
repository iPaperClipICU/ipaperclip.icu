<template>
  <div
    v-if="props.mode === undefined || props.mode === 'ALL'"
    style="width: 250px; height: 34px"
  >
    <n-input-group>
      <n-input placeholder="搜索" clearable v-model:value="searchValue" />
      <n-button type="primary" ghost @click="searchButtonClick">
        搜索
      </n-button>
    </n-input-group>
  </div>
  <n-input
    v-else-if="props.mode !== 'OnlyButton'"
    placeholder="搜索"
    clearable
    v-model:value="searchValue"
    @click="showModal = true"
  />
  <n-button v-else type="primary" ghost @click="showModal = true">
    搜索
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 425px"
    title="搜索"
    size="huge"
    :bordered="false"
  >
    <n-input-group>
      <n-input placeholder="搜索" clearable v-model:value="searchValue" />
      <n-button ghost type="primary" @click="searchButtonClick">
        搜索
      </n-button>
    </n-input-group>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { NInputGroup, NInput, NButton, NModal } from "naive-ui";

import router from "@/router";

const props = defineProps({
  mode: {
    type: String as PropType<"ALL" | "OnlyInput" | "OnlyButton">,
  },
});

const showModal = ref<boolean>(false);
const searchValue = ref<string>(
  (() => {
    const KeyWord =
      new URL(decodeURIComponent(location.href)).searchParams.get("s") || "";
    if (location.pathname !== "/search") {
      return "";
    } else {
      return KeyWord;
    }
  })()
);

router.beforeEach((to) => {
  if (to.name !== "Search") searchValue.value = "";
});

// 搜索
const searchButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  showModal.value = false;
  router.push(`/search?s=${searchValue.value}`);
};
</script>
