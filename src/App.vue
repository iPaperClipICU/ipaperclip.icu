<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-back-top />
    <n-layout
      position="absolute"
      :style="{ '--header-height': showTag ? '98px' : '64px' }"
    >
      <n-layout-header bordered class="navigation">
        <div class="navigation-head">
          <HeadView
            @change-padding="(key: string) => navigationCSS_padding = key"
            @set-tag="(key: boolean) => showTag = key"
          />
        </div>
        <n-collapse-transition :show="showTag">
          <div
            class="navigation-tag"
            :style="{ display: showTag ? 'flex' : 'none' }"
          >
            <TagMenu />
          </div>
        </n-collapse-transition>
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
  NCollapseTransition,
} from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config

import router from "@/router";
import { clearRubbish, getFileInfo } from "@/assets/utils.js";
import TagMenu from "./components/TagMenu.vue";
import HeadView from "@/components/HeadView.vue";
import READMECard from "./components/READMECard.vue";

const showTag = ref<boolean>(false);
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
.navigation {
  display: grid;
  border-radius: 0.5em;
  height: var(--header-height);
  padding: 0 v-bind(navigationCSS_padding);
  padding-top: 15px;
}
.navigation-head {
  display: flex;
  height: 34px;
}
.navigation-tag {
  height: 34px;
  justify-content: center;
}

.container {
  max-width: 1055px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
