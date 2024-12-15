import { defineStore } from 'pinia'

import data from '@/assets/data.json'
import type { Data } from '@/types'

interface State {
  deviceType: 'pc' | 'phone'
  data: Data
  showSomething: boolean // 是否展示某些东西
  pageSize: number // FilesList每页显示数量
  CDNDomain: string
}

export const usePublicStore = defineStore('public', {
  state: (): State => ({
    deviceType: 'pc',
    data: data as any,
    showSomething: false,
    pageSize: (() => {
      const t = Number(localStorage.getItem('pageSize'))
      if ([10, 20, 30, 40].includes(t)) return t
      else {
        localStorage.setItem('pageSize', '20')
        return 20
      }
    })(),
    CDNDomain: (() => {
      const CDNDomainList = ['https://ipaperclip-file.xodvnm.cn', 'https://r2.ipaperclip.icu']
      const local = localStorage.getItem('CDNDomain')
      if (local === null || !CDNDomainList.includes(local)) {
        localStorage.setItem('CDNDomain', CDNDomainList[0])
        return CDNDomainList[0]
      } else if (local === 'https://cf.ipaperclip-icu.cyou') {
        localStorage.setItem('CDNDomain', CDNDomainList[1])
        return CDNDomainList[1]
      } else return local
    })(),
  }),
  actions: {
    changePageSize(value: number) {
      this.pageSize = value
      localStorage.setItem('pageSize', String(value))
    },
  },
})
