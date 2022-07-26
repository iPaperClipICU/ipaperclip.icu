<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-back-top />
    <div style="text-align: center; padding-top: 15px">
      <n-h1>
        <a style="color: #ffffffe6; text-decoration: none" href="/">
          iPaperClipICU
        </a>
      </n-h1>
    </div>
    <n-grid :cols="36" item-responsive style="padding-top: 15px">
      <n-gi span="1 1330:3" />
      <n-gi span="34 1330:30">
        <router-view />
        <div style="padding-top: 15px">
          <READMECard />
        </div>
      </n-gi>
      <n-gi span="1 1330:3" />
    </n-grid>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { darkTheme, zhCN } from "naive-ui";
import { NH1, NGi, NGrid, NBackTop } from "naive-ui";
import { NGlobalStyle, NConfigProvider } from "naive-ui";

import READMECard from "@/components/READMECard";

export default defineComponent({
  components: {
    READMECard,
    NH1,
    NGi,
    NGrid,
    NBackTop,
    NGlobalStyle,
    NConfigProvider,
  },
  setup() {
    return {
      zhCN,
      darkTheme,
    };
  },
});
</script>
