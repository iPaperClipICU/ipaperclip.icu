import { defineStore } from "pinia";

interface State {
  CDNDomain: string;
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
  }),
});
