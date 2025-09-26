<template>
  <n-card size="small">
    <div style="display: flex; justify-content: space-between">
      <n-h3>
        <n-text v-if="state.type === 'checking'" type="info">测试中~</n-text>
        <n-text v-else-if="state.errDomain.length === 0" type="primary">可能正常</n-text>
        <n-text v-else type="warning">可能无法访问</n-text>
      </n-h3>
      <n-button
        strong
        secondary
        type="primary"
        @click="startCheck"
        :loading="state.type === 'checking'"
      >
        重新测试
      </n-button>
    </div>
    <n-progress
      v-if="state.type === 'checking'"
      type="line"
      :percentage="Number(state.percentage.toFixed(1))"
    />
    <div v-else-if="state.errDomain.length > 0" style="margin-bottom: 24px">
      <div>请访问以下域名并信任证书以解决</div>
      <div v-for="(v, k) in state.errDomain" :key="k">
        <n-a :href="v" target="_blank">{{ v }}</n-a>
      </div>
    </div>
    <n-text type="info">*受限于浏览器环境限制，该测试结果可能无法正确描述访问失败的原因</n-text>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NProgress, NH3, NText, NA, NButton } from 'naive-ui'

const state = ref<
  | {
      type: 'checking'
      percentage: number
    }
  | {
      type: 'done'
      errDomain: string[]
    }
>({
  type: 'checking',
  percentage: 0,
})

const domainList = [
  // 'https://media.paperclipclub.net/',
  'https://api.jibencaozuo.com/',
  'https://jibencaozuo.com/',
  'https://media-links.jibencaozuo.com/',
  'https://act-server.jibencaozuo.com/',
  'https://rs.jibencaozuo.com/',
]

const check = async (domain: string) => {
  try {
    await fetch(domain, {
      method: 'HEAD',
      mode: 'no-cors',
      referrer: '',
      referrerPolicy: 'no-referrer',
    })
    return true
  } catch {
    return false
  }
}

const startCheck = async () => {
  state.value = {
    type: 'checking',
    percentage: 0,
  }
  const errorList: string[] = []
  for (const domain of domainList) {
    const result = await check(domain)
    state.value.percentage += (1 / domainList.length) * 100
    if (!result) errorList.push(domain)
  }
  state.value = {
    type: 'done',
    errDomain: errorList,
  }
}
startCheck()
</script>
