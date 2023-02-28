import { defineStore } from "pinia";
import type { MenuOption } from "naive-ui";

interface State {
  CDNDomain: string;
  menuOptions: MenuOption[];
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
    menuOptions: [],
  }),
});
