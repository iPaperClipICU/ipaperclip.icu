<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-back-top />
    <div style="text-align: center; margin-top: 15px">
      <n-h1>
        <a style="color: #ffffffe6; text-decoration: none" href="/">
          iPaperClipICU
        </a>
      </n-h1>
    </div>
    <n-grid :cols="36" item-responsive style="margin-top: 15px">
      <n-gi span="1 1330:3" />
      <n-gi span="34 1330:30">
        <router-view />
      </n-gi>
      <n-gi span="1 1330:3" />
    </n-grid>
    <n-global-style />
  </n-config-provider>
</template>

<script setup>
import { NGi, NH1, NGrid, NBackTop } from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config
</script>
