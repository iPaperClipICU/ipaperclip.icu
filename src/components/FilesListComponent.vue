<template>
  <PaginationComponent
    v-model:page="nowPage"
    :page-size="publicStore.pageSize"
    @update:page-size="(value) => publicStore.changePageSize(value)"
    :page-count="pageCount"
    style="margin-bottom: 6px"
  />
  <n-list hoverable clickable>
    <n-list-item
      v-for="(value, index) in nowPagesData[nowPage - 1]"
      :key="`${nowPage}-${index}-${Object.keys(downloadStore.select).length}`"
    >
      <template #prefix v-if="downloadStore.switch">
        <n-checkbox
          v-model:checked="downloadStore.select[value.uri]"
          @update-checked="(checked) => downloadStore.changeDownloadSelect(value.uri, !checked)"
        />
      </template>
      <div
        style="height: 30px; display: flex; align-items: center; gap: 5px"
        @click="router.push(value.uri)"
      >
        <FilesTypeICON v-if="value.type !== undefined" :type="value.type" />
        <span class="files-name">{{ value.name }}</span>
      </div>
    </n-list-item>
  </n-list>
  <PaginationComponent
    v-model:page="nowPage"
    v-model:page-size="publicStore.pageSize"
    :page-count="pageCount"
    style="margin-top: 6px"
  />
</template>

<script setup lang="ts">
import { useUrlSearchParams } from '@vueuse/core'
import { NList, NListItem, NCheckbox } from 'naive-ui'
import { ref, watch, computed, type PropType } from 'vue'

import router from '@/router'
import { useDownloadStore, usePublicStore } from '@/stores'
import type { FilesListData } from '@/types'

import FilesTypeICON from '@/ICON/FilesTypeICON.vue'

import PaginationComponent from './PaginationComponent.vue'

const props = defineProps({
  filesListData: {
    type: Object as PropType<FilesListData>,
    required: true,
  },
})
const publicStore = usePublicStore()
const downloadStore = useDownloadStore()

const groupArray = (arr: any[], groupSize: number): any[][] => {
  return arr.reduce((result, current, index) => {
    if (index % groupSize === 0) {
      result.push(arr.slice(index, index + groupSize))
    }
    return result
  }, [])
}

const nowPagesData = computed((): FilesListData[] =>
  groupArray(props.filesListData, publicStore.pageSize),
)

const nowPage = ref<number>(
  (() => {
    const searchParams = useUrlSearchParams('history')
    let p = Number(searchParams.p)
    if (Number.isNaN(p) || p < 1 || p > nowPagesData.value.length) {
      searchParams.p = '1'
      p = 1
    }
    return p
  })(),
) // 当前页
const pageCount = computed(() => nowPagesData.value.length) // 总页数
watch(nowPage, (value) => {
  const searchParams = useUrlSearchParams('history')
  searchParams.p = String(value)
}) // 同步更新uri
watch(nowPagesData, (value) => {
  if (nowPage.value > value.length) nowPage.value = value.length
}) // 更新pageSize时触发
watch(props, () => {
  nowPage.value = 1
  const searchParams = useUrlSearchParams()
  searchParams.p = '1'
}) // props.filesData 更新时触发
</script>

<style scoped>
.files-name {
  font-size: 15px;

  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
