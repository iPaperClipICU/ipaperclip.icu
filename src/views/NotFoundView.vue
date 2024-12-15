<template>
  <n-card>
    <n-result status="404" title="404" description="抱歉，您访问的页面不存在！">
      <template #footer>
        <n-button type="primary" @click="() => router.push('/')">返回首页</n-button>
      </template>
    </n-result>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NResult, NButton } from 'naive-ui'

import router from '@/router'
</script>
