<template>
  <n-card size="small" hoverable style="margin-bottom: 15px">
    <n-space align="center" justify="space-between">
      <n-space align="center" justify="start">
        <n-button strong secondary type="primary" @click="downloadButtonClick">下载</n-button>
        <n-button-group v-if="allData.length > 0">
          <n-button strong secondary @click="selectAll(true)">全选当前页面</n-button>
          <n-button strong secondary type="error" @click="selectAll(true, true)">
            取消当前页面的选择
          </n-button>
        </n-button-group>
        <n-button-group v-if="allData.length / publicStore.pageSize > 1">
          <n-button strong secondary @click="selectAll(false)">全选当前分支</n-button>
          <n-button strong secondary type="error" @click="selectAll(false, true)">
            取消当前分支的选择
          </n-button>
        </n-button-group>
        <n-button strong secondary type="error" @click="() => downloadStore.deleteDownloadSelect()">
          取消全部选择
        </n-button>
        <div>您已选择 {{ Object.keys(downloadStore.select).length }} 个文件</div>
      </n-space>
      <n-space align="center" justify="end">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button strong secondary tag="a" href="https://r2.ipaperclip.icu/zip/ALL_221205.7z">
              下载全部文件
            </n-button>
          </template>
          共 42.6 GB，请注意磁盘剩余空间及网络环境<br />
          SHA-256: CEC8D73C9183A046E815B623900EFAF48F038F30A91F89C8BBE93AE804222F06
        </n-tooltip>
      </n-space>
    </n-space>
  </n-card>
  <DownloadModal
    v-if="downloadModal"
    :data="downloadStore.select"
    @close="
      (value, needDelete) => {
        downloadModal = value
        if (needDelete === undefined || needDelete === true) {
          downloadStore.deleteDownloadSelect()
          downloadStore.switch = false
        }
      }
    "
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUrlSearchParams } from '@vueuse/core'
import { NCard, NSpace, NButton, NButtonGroup, NTooltip } from 'naive-ui'

import router from '@/router'
import { useDownloadStore, usePublicStore } from '@/stores'
import NaiveUIDiscreteAPI from '@/assets/NaiveUIDiscreteAPI'

import DownloadModal from '@/components/DownloadModal.vue'

const route = useRoute()
const publicStore = usePublicStore()
const downloadStore = useDownloadStore()

const downloadModal = ref<boolean>(false)

const downloadButtonClick = () => {
  if (Object.keys(downloadStore.select).length === 0) {
    NaiveUIDiscreteAPI.message.warning('您还没有选择任何文件')
  } else downloadModal.value = true
}

const getAllData = () => {
  const routeName = String(route.name ?? '')

  const t: string[] = []
  if (routeName.startsWith('FILES:')) {
    const [filesName, tagName] = route.path
      .replace('FILES:', '')
      .split('/')
      .filter((v) => v !== '')
    const filesData = publicStore.data.data[filesName!]!
    if (Array.isArray(filesData)) {
      // 无tag
      filesData.forEach((fileName) => {
        t.push(`/${filesName}/${fileName}`)
      })
    } else {
      // 有tag
      filesData[tagName!]!.forEach((fileName) => {
        t.push(`/${filesName}/${tagName}/${fileName}`)
      })
    }
  } else if (routeName === 'Search') {
    const searchParams = useUrlSearchParams('history')
    const keyword = String(searchParams.s || '').toLocaleLowerCase()
    if (!['undefined', 'null'].includes(keyword) && keyword.replace(/\s+/g, '') !== '') {
      for (const fileName in publicStore.data.searchData) {
        if (fileName.toLocaleLowerCase().indexOf(keyword) != -1) {
          const [filesName, tagName] = publicStore.data.searchData[fileName]!
          t.push(`/${filesName}${tagName !== null ? `/${tagName}` : ''}/${fileName}`)
        }
      }
    }
  }

  return t
}
const allData = ref<string[]>(getAllData())
router.afterEach(() => (allData.value = getAllData()))

/**
 * 全选
 * @param at 是否只选择当前页面
 */
const selectAll = (at: boolean, remove: boolean = false) => {
  if (allData.value.length <= 0) return
  const searchParams = useUrlSearchParams('history')
  const p = Number(searchParams.p || 1)
  const pageSize = publicStore.pageSize

  let selectData: string[] = []
  if (at) {
    // 当前页
    const startIndex = (p - 1) * pageSize
    selectData = allData.value.slice(startIndex, startIndex + pageSize)
  } else selectData = allData.value

  selectData.forEach((value) => downloadStore.changeDownloadSelect(value, remove))
}
</script>
