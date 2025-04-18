<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-layout position="absolute">
      <n-layout-header bordered class="navigation">
        <HeadComponent />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 3.6rem; bottom: 0">
        <n-layout-sider
          v-if="publicStore.deviceType === 'pc'"
          :native-scrollbar="false"
          :collapsed-width="0"
          collapse-mode="transform"
          trigger-style="top: 240px;"
          collapsed-trigger-style="top: 240px; right: -20px;"
          bordered
          show-trigger="arrow-circle"
        >
          <MenuComponent />
        </n-layout-sider>
        <n-layout-content embedded :native-scrollbar="false">
          <n-back-top />
          <div
            style="max-width: 1120px; margin: 0 auto"
            :style="{ padding: publicStore.deviceType === 'pc' ? '20px 16px' : '20px 12px' }"
          >
            <n-alert title="温馨提示" type="info" style="margin-bottom: 5px">
              <n-p>本网站并不是由 回形针PaperClip/基本操作PlayClass 的官方运营。</n-p>
              <div>
                关于在访问 基本操作 时出现问题，请前往
                <n-button
                  @click="
                    (e) => {
                      e.preventDefault()
                      $router.push('/jbcz')
                    }
                  "
                  text
                  type="primary"
                  tag="a"
                  href="/jbcz"
                >
                  测试页面
                </n-button>
                获取解决方案
              </div>
              <n-p>关于交互视频无法正常播放：官方没向视频服务商续费</n-p>
            </n-alert>
            <n-collapse-transition :show="downloadStore.switch">
              <DownloadControlCard />
            </n-collapse-transition>
            <router-view />
            <div style="text-align: center">
              This site is protected by reCAPTCHA Enterprise and the Google
              <n-a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</n-a>
              and
              <n-a href="https://policies.google.com/terms" target="_blank">Terms of Service</n-a>
              apply.
            </div>
            <div style="text-align: center">Version: {{ version }}</div>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { NBackTop, NCollapseTransition } from 'naive-ui'
import {
  NA,
  NP,
  NAlert,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
} from 'naive-ui'
import { zhCN, darkTheme, NGlobalStyle, NConfigProvider } from 'naive-ui' // NaiveUI Config

import { usePublicStore, useDownloadStore } from './stores'

import HeadComponent from '@/components/HeadComponent.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import DownloadControlCard from '@/components/DownloadControlCard.vue'

const version = import.meta.env.CF_PAGES_COMMIT_SHA.slice(0, 7)
const publicStore = usePublicStore()
const downloadStore = useDownloadStore()

// 平台
const resizeEvent = () => {
  const pageWidth = window.innerWidth
  if (pageWidth <= 825) publicStore.deviceType = 'phone'
  else publicStore.deviceType = 'pc'
}
window.addEventListener('resize', () => resizeEvent())
resizeEvent()

// showSomething
const initShowSomething = async () => {
  const resp = await fetch('/test')
  if (resp.headers.get('show-something') !== 'false') {
    publicStore.showSomething = true
    publicStore.CDNDomain = 'https://r2.ipaperclip.icu'
  }
}
initShowSomething()
</script>

<style scoped>
.navigation {
  padding: 0 32px;
  height: calc(3.6rem - 1px);

  user-select: none;
  text-align: center;

  display: flex;
  align-items: center;
}
</style>
