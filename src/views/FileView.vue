<template>
  <n-space align="center" style="flex-wrap: nowrap; margin-bottom: 15px">
    <n-tag type="success">{{ fileData.tagName }}</n-tag>
    <n-h2 style="margin-bottom: 0">{{ fileData.name }}</n-h2>
  </n-space>
  <FileComponent :data="fileData" style="margin-bottom: 15px" />
  <!-- <n-card hoverable style="margin-bottom: 15px" size="small">
    <n-space justify="space-between" align="center">
      <div>
        <n-space align="baseline">
          <span style="font-size: 15px">线路</span>
          <n-radio-group v-model:value="radioValue" name="radiogroup">
            <n-space>
              <n-radio
                v-for="radio in radioOption"
                :key="radio.value"
                :value="radio.value"
                @change="radioChange(radio.value)"
              >
                {{ radio.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-space>
      </div>
      <div>
        <n-button strong secondary type="primary" size="small" @click="download">下载</n-button>
      </div>
    </n-space>
  </n-card> -->
  <MarkdownPlayer v-if="fileData.docUrl !== null" :url="fileData.docUrl" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NTag, NH2, NSpace, NRadio, NRadioGroup, NCard, NButton } from 'naive-ui'

import router from '@/router'
import type { FileData } from '@/types'
import { usePublicStore } from '@/stores'
import { getFileInfo } from '@/assets/utils'

import FileComponent from '@/components/FileComponent.vue'
import MarkdownPlayer from '@/components/MarkdownPlayer.vue'

const publicStore = usePublicStore()

const getFileData = (): FileData => {
  const pathList = decodeURI(location.pathname)
    .split('/')
    .filter((value) => value !== '')
  const fileName = pathList.length === 2 ? pathList[1] : pathList[2]
  const [filesName, tagName, docPath] = publicStore.data.searchData[fileName]
  return {
    ...getFileInfo(fileName),
    fileUri: `video/${filesName}${tagName !== null ? `/${tagName}` : ''}/${fileName}`,
    tagName: filesName,
    docUrl:
      docPath !== null
        ? `https://cdn.jsdelivr.net/gh/iPaperClipICU/paperclip-doc/${docPath}`
        : null,
  }
}
const fileData = ref<FileData>(getFileData())
router.afterEach((to) => {
  if (String(to.name).startsWith('FILE:')) fileData.value = getFileData()
})

// Chang CDNDomain
const radioValue = ref<string | null>(publicStore.CDNDomain)
const radioOption: {
  label: string
  value: string
}[] = [
  {
    label: 'Auto',
    value: 'https://ipaperclip-file.cfm.fan',
  },
  {
    label: 'Cloudflare',
    value: 'https://r2.ipaperclip.icu',
  },
]
const radioChange = (value: string) => {
  publicStore.CDNDomain = value
  localStorage.setItem('CDNDomain', value)
}
const download = () => {
  window.open(`https://r2.ipaperclip.icu/${fileData.value.fileUri}`)
}
</script>
