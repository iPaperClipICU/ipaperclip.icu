<template>
  <div
    style="width: 100%; display: flex; align-items: center; position: relative"
    :style="{
      'justify-content': publicStore.deviceType === 'pc' ? 'space-between' : 'center',
    }"
  >
    <n-icon
      v-if="publicStore.deviceType === 'phone'"
      size="32"
      style="position: absolute; left: 0"
      @click="showDrawer = true"
    >
      <MenuICON />
    </n-icon>
    <span class="siteName" @click="() => router.push('/')">iPaperClipICU</span>
    <div v-if="publicStore.deviceType === 'pc'">
      <SearchCard :mode="true" />
    </div>
  </div>
  <!-- 抽屉 -->
  <n-drawer v-model:show="showDrawer" :width="250" placement="left" :auto-focus="false">
    <n-drawer-content>
      <template #header>
        <span>菜单</span>
        <div style="margin-top: 10px">
          <SearchCard :mode="false" @change="() => (showDrawer = false)" />
        </div>
      </template>
      <MenuComponent @change="() => (showDrawer = false)" />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NIcon, NDrawer, NDrawerContent } from "naive-ui";

import router from "@/router";
import { usePublicStore } from "@/stores";

import MenuICON from "@/ICON/MenuICON.vue";

import SearchCard from "./SearchCard.vue";
import MenuComponent from "@/components/MenuComponent.vue";

const publicStore = usePublicStore();

const showDrawer = ref<boolean>(false);
</script>

<style>
.n-drawer-body-content-wrapper {
  padding: 0 !important;
}

.siteName {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  white-space: nowrap;
  cursor: default;
}
</style>
