<template>
  <div class="tag" v-if="showData.tag === 'drawer'" style="margin-right: 5px">
    <n-icon size="32" @click="() => (showDrawer = true)"><MenuICON /></n-icon>
  </div>
  <span
    class="siteName"
    @click="() => router.push('/')"
    :style="{
      'margin-left': showData.siteName === 'start' ? '0' : '-37px',
      'justify-content': showData.siteName === 'start' ? 'flex-start' : 'center',
    }"
  >
    iPaperClipICU
  </span>
  <div class="search" v-if="showData.search">
    <SearchCard :mode="showData.search" />
  </div>
  <!-- 抽屉 -->
  <n-drawer v-model:show="showDrawer" :width="250" placement="left" :auto-focus="false">
    <n-drawer-content>
      <template #header>
        <span>菜单</span>
        <div style="margin-top: 10px">
          <SearchCard :mode="showData.search" @change="() => (showDrawer = false)" />
        </div>
      </template>
      <TagMenu mode="Mobile" @change="() => (showDrawer = false)" />
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
  (e: "changeSider", key: boolean): void;
}>();

type showDataType = {
  siteName: "start" | "center";
  tag: "menu" | "drawer";
  search: boolean;
};

const showDrawer = ref<boolean>(false);
const showData = ref<showDataType>({
  siteName: "start",
  tag: "menu",
  search: true,
});

window.addEventListener("resize", () => {
  pageSizeChange();
});

const pageSizeChange = () => {
  const tmp: showDataType = {
    siteName: "start",
    tag: "menu",
    search: true,
  };

  const pageWidth = window.innerWidth;
  if (pageWidth <= 750) {
    tmp.siteName = "center";
    tmp.tag = "drawer";
    tmp.search = false;
    emit("changeSider", false);
  } else {
    emit("changeSider", true);
  }
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
  flex-grow: 1;
  justify-content: flex-end;
}

.tag {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.siteName {
  display: flex;
  flex-grow: 1;
  align-items: center;

  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  white-space: nowrap;
  cursor: default;
}
</style>
