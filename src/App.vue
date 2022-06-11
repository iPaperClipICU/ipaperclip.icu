<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-dialog-provider>
      <n-loading-bar-provider>
        <div style="text-align: center; padding-top: 15px">
          <n-h1>
            <a style="color: #ffffffe6; text-decoration: none" href="/">
              iPaperClipICU
            </a>
          </n-h1>
        </div>
        <n-grid
          :x-gap="12"
          :cols="12"
          item-responsive
          style="padding-top: 20px"
        >
          <n-gi span="1 1330:3" />
          <n-gi span="10 1330:6">
            <router-view />
            <div style="padding-top: 15px">
              <READMECard />
            </div>
          </n-gi>
          <n-gi span="1 1330:3" />
        </n-grid>
      </n-loading-bar-provider>
    </n-dialog-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { defineComponent, ref } from "vue";
import READMECard from "@/components/READMECard";
import { NH1, NGi, NGrid } from "naive-ui";
import {
  NGlobalStyle,
  NConfigProvider,
  NDialogProvider,
  NLoadingBarProvider,
} from "naive-ui";
import { darkTheme, zhCN } from "naive-ui";

const mailLoginShow = ref(true);
export default defineComponent({
  components: {
    READMECard,
    NH1,
    NGi,
    NGrid,
    NGlobalStyle,
    NConfigProvider,
    NDialogProvider,
    NLoadingBarProvider,
  },
  setup() {
    return {
      zhCN,
      darkTheme,
      mailLoginShow,
    };
  },
});
</script>
