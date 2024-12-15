import { defineStore } from 'pinia'

interface State {
  switch: boolean // 是否开启批量下载
  select: { [key: string]: boolean } // { href: checked }
}

export const useDownloadStore = defineStore('download', {
  state: (): State => ({
    switch: false,
    select: (() => {
      const data = ((): null | string[] => {
        try {
          return JSON.parse(localStorage.getItem('downloadSelect') ?? '')
        } catch {
          return null
        }
      })()
      if (data === null || data.length === 0) {
        localStorage.setItem('downloadSelect', '[]')
        return {}
      } else {
        const obj: { [key: string]: boolean } = {}
        data.forEach((item) => {
          obj[item] = true
        })
        return obj
      }
    })(),
  }),
  actions: {
    changeDownloadSelect(uri: string, remove: boolean) {
      if (remove) {
        delete this.select[uri]
      } else {
        this.select[uri] = true
      }

      // 本地存储
      localStorage.setItem('downloadSelect', JSON.stringify(Object.keys(this.select)))
    },
    deleteDownloadSelect() {
      this.select = {}
      localStorage.setItem('downloadSelect', '[]')
    },
  },
})
