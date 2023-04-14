import { defineStore } from "pinia";

import type { FileTypes, FilesMenuDataType } from "@/types";

interface State {
  CDNDomain: string;
  nowPage: number;
  listKey: number;
  FilesMenuDate: FilesMenuDataType | undefined;
  download: {
    switch: boolean; // 是否开启批量下载
    select: { [key: string]: boolean }; // { href: checked }
  };
}

export const useCounterStore = defineStore("counter", {
  state: (): State => ({
    CDNDomain: (() => {
      const CDNDomainList = [
        "https://ipaperclip-file.xodvnm.cn",
        "https://cf.ipaperclip-icu.cyou",
      ];
      const local = localStorage.getItem("CDNDomain");
      if (local === null || !CDNDomainList.includes(local)) {
        localStorage.setItem("CDNDomain", CDNDomainList[0]);
        return CDNDomainList[0];
      } else return local;
    })(),
    nowPage: 1,
    listKey: Math.random(),
    FilesMenuDate: undefined,
    download: {
      switch: false,
      select: (() => {
        const data = ((): null | string[] => {
          try {
            return JSON.parse(localStorage.getItem("downloadSelect") ?? "");
          } catch (error) {
            return null;
          }
        })();
        if (data === null || data.length === 0) {
          localStorage.setItem("downloadSelect", "[]");
          return {};
        } else {
          const obj: { [key: string]: boolean } = {};
          data.forEach((item) => {
            obj[item] = true;
          });
          return obj;
        }
      })(),
    },
  }),
  actions: {
    changeListKey() {
      this.listKey = Math.random();
    },
    changeDownloadSelect(
      item: {
        name: string;
        type: FileTypes;
        href: string;
      },
      checked: boolean = true
    ) {
      if (checked) {
        this.download.select[item.href] = true;
      } else {
        delete this.download.select[item.href];
      }

      // 本地存储
      localStorage.setItem(
        "downloadSelect",
        JSON.stringify(Object.keys(this.download.select))
      );
    },
    deleteDownloadSelect() {
      this.download.select = {};
      localStorage.setItem("downloadSelect", "[]");
    },
  },
});
