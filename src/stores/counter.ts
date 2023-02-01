import { defineStore } from "pinia";
import type {
  FileTypeT,
  FilesMenuDataType,
  Search_FilesMenuDataType,
} from "@/types/";

interface State {
  CDNDomain: string;
  FilesMenuData: FilesMenuDataType | Search_FilesMenuDataType;
  FileCardData: {
    type: FileTypeT;
    url: string;
    name: string;
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
    FilesMenuData: {
      search: false,
      hrefHead: "",
      data: [[""]],
    },
    FileCardData: {
      type: undefined,
      url: "",
      name: "",
    },
  }),
});
