<template>
  <n-pagination
    v-if="publicStore.deviceType === 'pc'"
    :page="props.page"
    :page-size="props.pageSize"
    :page-count="props.pageCount"
    :page-sizes="[10, 20, 30, 40]"
    show-size-picker
    @update:page="(value) => emit('update:page', value)"
    @update:page-size="(value) => emit('update:pageSize', value)"
  />
  <div v-else style="width: 100%">
    <div style="display: flex; align-items: center; gap: 5px">
      <span>{{ props.page }} / {{ props.pageCount }} 页</span>
      <n-select
        size="small"
        :value="props.pageSize"
        @update:value="(value) => emit('update:pageSize', value)"
        :options="selectOptions"
        style="width: 85px"
      />
    </div>
    <div style="margin-top: 5px; display: flex; justify-content: space-between; gap: 5px">
      <n-button
        size="small"
        type="primary"
        block
        strong
        secondary
        style="flex: 1"
        :disabled="props.page <= 1"
        @click="emit('update:page', props.page - 1)"
      >
        上一页
      </n-button>
      <n-button
        size="small"
        type="primary"
        block
        strong
        secondary
        style="flex: 1"
        :disabled="props.page >= props.pageCount"
        @click="emit('update:page', props.page + 1)"
      >
        下一页
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NSelect, NPagination } from 'naive-ui'

import { usePublicStore } from '@/stores'

const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['update:page', 'update:pageSize'])
const publicStore = usePublicStore()

const selectOptions = [
  {
    label: '10/页',
    value: 10,
  },
  {
    label: '20/页',
    value: 20,
  },
  {
    label: '30/页',
    value: 30,
  },
  {
    label: '40/页',
    value: 40,
  },
]
</script>
