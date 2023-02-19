<template>
  <div class="tag" v-if="showData.tag === 'drawer'" style="margin-right: 5px">
    <n-icon size="32" @click="showDrawer = true"><MenuICON /></n-icon>
  </div>
  <span
    v-if="showData.siteName"
    class="siteLogo siteName"
    @click="router.push('/')"
    :style="{ 'flex-grow': showData.tag === 'drawer' ? 0 : 1 }"
  >
    iPaperClipICU
  </span>
  <div
    v-else
    class="siteLogo"
    @click="router.push('/')"
    :style="{ 'flex-grow': showData.tag === 'drawer' ? 0 : 1 }"
  >
    <img style="width: 32px; height: 32px" src="/favicon.png" />
  </div>
  <div class="tag" v-if="showData.tag === 'menu'">
    <TagMenu />
  </div>
  <div
    class="search"
    :style="{
      'flex-grow': showData.search === 'PC' ? 1 : 30,
      'margin-left': showData.search === 'PC' ? 0 : '5px',
      'justify-content': showData.search === 'PC' ? 'flex-end' : 'center',
    }"
  >
    <SearchCard :mode="showData.search" />
  </div>
  <!-- 抽屉 -->
  <n-drawer v-model:show="showDrawer" :width="250" placement="left">
    <n-drawer-content>
      <template #header>菜单</template>
      <TagMenu mode="Mobile" @change="showDrawer = false" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NIcon, NDrawer, NDrawerContent } from "naive-ui";

import router from "@/router";
import SearchCard from "./SearchCard.vue";
import MenuICON from "@/ICON/MenuICON.vue";
import TagMenu from "@/components/TagMenu.vue";

const emit = defineEmits<{
  (e: "changePadding", key: string): void; // 32px
  (e: "setTag", key: boolean): void;
}>();

const showDrawer = ref<boolean>(false);
const showData = ref<{
  siteName: boolean;
  tag: "menu" | null | "drawer";
  search: "PC" | "Mobile";
}>({
  siteName: true,
  tag: "menu",
  search: "PC",
});

window.addEventListener("resize", function () {
  pageSizeChange();
});

const pageSizeChange = () => {
  const tmp: {
    siteName: boolean;
    tag: "menu" | null | "drawer";
    search: "PC" | "Mobile";
  } = {
    siteName: true,
    tag: "menu",
    search: "PC",
  };

  const pageWidth = window.innerWidth;
  if (pageWidth < 1260) {
    tmp.siteName = false;
  }
  if (pageWidth < 1140) {
    tmp.tag = null;
    tmp.siteName = true;
  }
  if (pageWidth <= 935) {
    tmp.tag = "drawer";
    emit("changePadding", "16px");
  } else {
    // 大于 935
    emit("changePadding", "32px");
  }
  if (pageWidth < 440) {
    tmp.siteName = false;
    tmp.search = "Mobile";
    emit("changePadding", "10px");
  }
  emit("setTag", tmp.tag === null);
  showData.value = tmp;
};
pageSizeChange();
</script>

<style>
.n-drawer-body-content-wrapper {
  padding: 0 !important;
}

.search {
  display: flex;
  align-items: center;
}

.tag {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.siteLogo {
  display: flex;
  align-items: center;

  cursor: default;
}

.siteName {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  white-space: nowrap;
}
</style>
