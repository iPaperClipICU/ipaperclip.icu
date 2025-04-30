<template>
  <n-table v-if="data.type === 'success'" size="small">
    <thead>
      <tr>
        <th>时间</th>
        <th>流量</th>
        <th>请求</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(v, k) in data.data" :key="k">
        <RequestInfoTable :name="v[0]" :data="v[1]?.bytes" :requests="v[1]?.requests" />
      </tr>
    </tbody>
  </n-table>
  <n-skeleton v-else-if="data.type === 'loading'" :height="177.96" width="100%" :sharp="false" />
  <n-result v-else-if="data.type === 'error'" size="small" status="500" :description="data.msg" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NTable, NSkeleton, NResult } from 'naive-ui'

import RequestInfoTable from './RequestInfoTable.vue'

const data = ref<
  | {
      type: 'loading'
    }
  | {
      type: 'error'
      msg: string
    }
  | {
      type: 'success'
      data: [
        string,
        {
          bytes: string
          requests: number
        } | null,
      ][]
    }
>({ type: 'loading' })
const main = async () => {
  try {
    const resp = await fetch('/api/v2/analytics/httpRequests', {
      headers: {
        version: ' ',
      },
    })
    if (resp.ok) {
      const resp_json = await resp.json()
      if (resp_json.code === 200) {
        data.value = {
          type: 'success',
          data: resp_json.data,
        }
      } else {
        data.value = {
          type: 'error',
          msg: resp_json.msg,
        }
      }
    } else {
      data.value = {
        type: 'error',
        msg: `请求失败:${resp.status}:${resp.statusText}`,
      }
    }
  } catch (e: any) {
    data.value = {
      type: 'error',
      msg: `请求错误:${String(e.name || e)}:${String(e.message)}`,
    }
  }
}
main()
</script>
