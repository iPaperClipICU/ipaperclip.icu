<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-back-top />
    <div class="container">
      <div style="text-align: center">
        <n-h1>
          <a style="color: #ffffffe6; text-decoration: none" href="/">
            iPaperClipICU
          </a>
        </n-h1>
      </div>
      <router-view />
    </div>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NH1, NBackTop } from "naive-ui";
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from "naive-ui"; // NaiveUI Config
</script>

<style>
.container {
  max-width: 1055px;
  padding: 15px 15px;
  margin: 0 auto;
}
</style>
