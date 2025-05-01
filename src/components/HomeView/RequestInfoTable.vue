<template>
  <td>{{ getName(name) }}</td>
  <td>{{ data ?? '错误' }}</td>
  <td @mouseenter="numberAnimationInstRef?.play()">
    <n-number-animation
      v-if="requests !== undefined"
      ref="numberAnimationInstRef"
      :from="0"
      :to="requests"
      show-separator
    />
    <span v-else>错误</span>
  </td>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NNumberAnimation, type NumberAnimationInst } from 'naive-ui'

const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)

defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
  },
  requests: {
    type: Number,
  },
})

const getName = (k: string) => {
  switch (k) {
    case 'today':
      return '今天'
    case 'yesterday':
      return '昨天'
    case 'monthToDate':
      return '本月'
    case 'yearToDate':
      return '今年'
    default:
      return '未知'
  }
}
</script>
