<template>
  <n-card size="small">
    <!-- 文件夹 -->
    <div v-if="searchResult && searchResult.length >= 1" style="margin-bottom: 6px">
      共找到相关结果 {{ searchResult.length }} 个
    </div>
    <FilesListComponent
      v-if="searchResult && searchResult.length >= 1"
      :files-list-data="searchResult"
    />
    <!-- Null -->
    <n-empty v-if="!searchResult" description="请输入关键词" />
    <n-empty v-if="searchResult?.length === 0" description="找不到和查询相匹配的结果" />
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NEmpty, NCard } from 'naive-ui'
import { useUrlSearchParams } from '@vueuse/core'

import router from '@/router'
import { usePublicStore } from '@/stores'
import { getFileInfo } from '@/assets/utils'
import type { FilesListData } from '@/types'

import FilesListComponent from '@/components/FilesListComponent.vue'

const publicStore = usePublicStore()

const searchResult = ref<FilesListData | undefined>(undefined)

const init = () => {
  const params = useUrlSearchParams('history')
  const KeyWord = String(params.s).toLocaleLowerCase()

  search(KeyWord)
}
router.afterEach((to, from) => {
  if (from.name === 'Search' && to.name === 'Search') init()
})
const search = (keyword: string) => {
  if (keyword === 'undefined' || keyword === 'null' || keyword.replace(/\s+/g, '') === '') {
    // 没有搜索关键字
    searchResult.value = undefined
    return
  }

  const result: FilesListData = []
  for (const fileName in publicStore.data.searchData) {
    if (fileName.toLocaleLowerCase().indexOf(keyword) != -1) {
      const [filesName, tagName] = publicStore.data.searchData[fileName]
      result.push({
        ...getFileInfo(fileName),
        uri: `/${filesName}${tagName !== null ? `/${tagName}` : ''}/${fileName}`,
      })
    }
  }
  searchResult.value = result
}
init()
</script>
