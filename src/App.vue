<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-back-top />
    <n-layout position="absolute">
      <n-layout-header
        bordered
        class="navigation"
        style="height: var(--header-height)"
      >
        <HeadView
          @change-padding="(key: string) => navigationCSS_padding = key"
        />
      </n-layout-header>
      <n-layout-content
        :native-scrollbar="false"
        style="top: var(--header-height)"
        position="absolute"
      >
        <div class="container">
          <n-card hoverable style="margin-top: 15px">
            <router-view />
          </n-card>
          <!-- README -->
          <READMECard v-if="showREADME" style="margin-top: 15px" />
        </div>
      </n-layout-content>
    </n-layout>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NCard,
  NLayout,
  NBackTop,
  NLayoutHeader,
  NLayoutContent,
} from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config

import router from "@/router";
import { clearRubbish, getFileInfo } from "@/assets/utils.js";
import HeadView from "@/components/HeadView.vue";
import READMECard from "./components/READMECard.vue";

const showREADME = ref<boolean>(true);
const navigationCSS_padding = ref<string>("32px");

// 判断是否显示 README
router.beforeEach((to) => {
  showREADME.value = to.fullPath === "/";
});

// 清理未删除的视频/音频
router.beforeEach((to, from) => {
  const p = from.params.pathMatch;
  if (Array.isArray(p) && getFileInfo(p[p.length - 1]).type !== undefined) {
    clearRubbish();
  }
});
</script>

<style>
body {
  --header-height: 64px;
}

.navigation {
  display: flex;
  padding: 0 v-bind(navigationCSS_padding);
}

.container {
  max-width: 1055px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
