<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-back-top />
    <n-layout position="absolute">
      <n-layout-content :native-scrollbar="false" position="absolute">
        <div class="container">
          <!-- Title -->
          <div
            style="text-align: center; margin-top: 15px; margin-bottom: 10px"
          >
            <n-button text @click="router.push(`/`)">
              <n-h1>iPaperClipICU</n-h1>
            </n-button>
          </div>
          <!-- 搜索 -->
          <n-card hoverable>
            <n-grid :cols="4" item-responsive>
              <n-gi span="4 425:2 705:1">
                <n-input-group>
                  <n-input
                    v-model:value="searchValue"
                    placeholder="搜索"
                    clearable
                  />
                  <n-button type="primary" @click="searchButtonClick" ghost>
                    搜索
                  </n-button>
                </n-input-group>
              </n-gi>
              <n-gi span="0 425:2 705:3" />
            </n-grid>
          </n-card>
          <div style="margin-top: 15px">
            <n-card hoverable>
              <!-- 菜单 -->
              <TagMenu />
              <n-divider />
              <router-view />
            </n-card>
          </div>
          <!-- README -->
          <div v-if="showREADME" style="margin-top: 15px">
            <READMECard />
          </div>
        </div>
      </n-layout-content>
    </n-layout>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NGi,
  NH1,
  NCard,
  NGrid,
  NInput,
  NButton,
  NLayout,
  NBackTop,
  NDivider,
  NInputGroup,
  NLayoutContent,
} from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config

import router from "@/router";
import { clearRubbish, getFileInfo } from "@/assets/utils.js";
import TagMenu from "./components/TagMenu.vue";
import READMECard from "./components/READMECard.vue";

const searchValue = ref<string>("");
const showREADME = ref<boolean>(true);

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

// 搜索
const searchButtonClick = (e: MouseEvent) => {
  e.preventDefault();
  router.push(`/search?s=${searchValue.value}`);
};
</script>

<style>
.container {
  max-width: 1055px;
  padding: 15px 15px;
  margin: 0 auto;
}
</style>
