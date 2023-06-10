<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-layout position="absolute">
      <n-layout-header bordered class="navigation">
        <div class="navigation-head">
          <HeadView @change-sider="(key) => (showSider = key)" />
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px">
        <n-layout-sider
          v-if="showSider"
          :native-scrollbar="false"
          :collapsed-width="0"
          collapse-mode="transform"
          trigger-style="top: 240px;"
          collapsed-trigger-style="top: 240px; right: -20px;"
          bordered
          show-trigger="arrow-circle"
        >
          <TagMenu mode="Mobile" />
        </n-layout-sider>
        <n-layout-content embedded :native-scrollbar="false">
          <n-back-top />
          <div style="display: flex; justify-content: center">
            <div style="margin: 20px; max-width: 1200px; width: 1200px">
              <n-collapse-transition :show="counter.download.switch">
                <DownloadControlCard />
              </n-collapse-transition>
              <router-view />
            </div>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NLayout,
  NBackTop,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NCollapseTransition,
} from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config

import router from "@/router";
import { useCounterStore } from "@/stores/counter";
import TagMenu from "@/components/TagMenu.vue";
import HeadView from "@/components/HeadView.vue";
import DownloadControlCard from "@/components/DownloadControlCard.vue";

const counter = useCounterStore();

const showSider = ref<boolean>(true);

router.beforeEach((to) => {
  if (to.name === "Home") counter.FilesMenuDate = undefined;
});
</script>

<style>
.navigation {
  display: grid;
  height: 64px;
  padding: 0 32px;
  padding-top: 15px;
}
.navigation-head {
  display: flex;
  height: 34px;
}
</style>
