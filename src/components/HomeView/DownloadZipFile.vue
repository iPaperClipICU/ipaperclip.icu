<template>
  <div style="display: flex; gap: 5px">
    <n-button
      v-for="(value, index) in list"
      :key="index"
      size="small"
      strong
      secondary
      type="primary"
      @click="
        () => {
          selectNum = index
          showModal = true
        }
      "
    >
      {{ value.name }}
    </n-button>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    style="width: 600px"
    title="下载信息"
    size="small"
  >
    <div>请注意磁盘剩余空间及网络环境</div>
    <div>
      下载链接: <n-text code>{{ list[selectNum]!.url }}</n-text>
    </div>
    <div>文件大小: {{ list[selectNum]!.size }}</div>
    <div>
      SHA-256: <n-text code>{{ list[selectNum]!.sha256 }}</n-text>
    </div>
    <div style="display: flex; justify-content: end; margin-top: 8px">
      <n-button secondary strong size="small" type="info" @click="downloadVideoButtonClick('')">
        下载
      </n-button>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NModal, NText } from 'naive-ui'

const showModal = ref(false)
const selectNum = ref(0)
const list = [
  {
    name: '全部文件',
    url: 'https://r2.ipaperclip.icu/zip/ALL_221205.7z',
    size: '42.6 GB',
    sha256: 'CEC8D73C9183A046E815B623900EFAF48F038F30A91F89C8BBE93AE804222F06',
  },
  {
    name: '回形针PaperClip 相关文件',
    url: 'https://r2.ipaperclip.icu/zip/OnlyPaperClip_230702.zip',
    size: '20 GB',
    sha256: '41D8287C450FF69DB1DF30D41378CC511ED8E36B5E00D7DB45EDE4C23F5EF8E1',
  },
]

const downloadVideoButtonClick = (url: string) => {
  const a = document.createElement('a')
  a.target = '_blank'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>
