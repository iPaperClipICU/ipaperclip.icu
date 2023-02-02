<template>
  <n-input
    class="search-input"
    :style="{
      width: `${props.mode === 'PC' ? '172px' : '100%'}`,
      height: '34px',
    }"
    round
    readonly
    placeholder="搜索..."
    @click="
      showModal = true;
      inputInstRef?.blur();
    "
    ref="inputInstRef"
    v-model:value="searchValue"
  >
    <template #prefix>
      <n-icon>
        <SearchICON />
      </n-icon>
    </template>
    <template #suffix>
      <div v-if="os !== 'Mobile'" style="display: flex; align-items: center">
        <div class="search-input-suffix-item">
          {{ os === "Mac" ? "⌘" : "Ctrl" }}
        </div>
        <div class="search-input-suffix-item" style="margin-left: 4px">K</div>
      </div>
    </template>
  </n-input>
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 425px"
    title="搜索"
    size="huge"
    :bordered="false"
  >
    <n-input-group>
      <n-input
        clearable
        placeholder="搜索"
        ref="searchInputInstRef"
        v-model:value="searchValue"
      />
      <n-button ghost type="primary" @click="searchButtonClick">
        搜索
      </n-button>
    </n-input-group>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watchEffect, type PropType } from "vue";
import {
  NIcon,
  NInput,
  NModal,
  NButton,
  NInputGroup,
  type InputInst,
} from "naive-ui";
import tinykeys from "tinykeys";

import router from "@/router";
import SearchICON from "@/ICON/SearchICON.vue";

const props = defineProps({
  mode: {
    type: String as PropType<"PC" | "Mobile">,
  },
});

const inputInstRef = ref<InputInst | null>(null);
const searchInputInstRef = ref<InputInst | null>(null);
const os: "Mobile" | "Mac" | "Other" = (() => {
  const userAgent = window.navigator.userAgent;

  if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("Mobile") > -1)
    return "Mobile";
  else if (userAgent.indexOf("Mac OS") > -1) return "Mac";
  else return "Other";
})();
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
watchEffect(() => {
  if (searchInputInstRef.value !== null && showModal.value === true) {
    searchInputInstRef.value.focus();
  }
});
tinykeys(window, {
  "$mod+KeyK": (e) => {
    showModal.value = true;
    e.preventDefault();
    searchInputInstRef.value?.focus();
  },
});

// 搜索
const searchButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  showModal.value = false;
  router.push(`/search?s=${searchValue.value}`);
};
</script>

<style>
.n-input.search-input .n-input__input-el,
.n-input.search-input {
  cursor: default;
}

.search-input-suffix-item {
  line-height: 1rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: rgb(99, 226, 183);
  background-color: rgba(99, 226, 183, 0.16);
}
</style>
