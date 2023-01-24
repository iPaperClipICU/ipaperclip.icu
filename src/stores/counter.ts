import { defineStore } from "pinia";
import type {
  FileTypeT,
  FilesMenuDataType,
  Search_FilesMenuDataType,
} from "@/types/";

interface State {
  init: () => void;
  AtPageFilesName: string;
  FilesMenuData: FilesMenuDataType | Search_FilesMenuDataType;
  FileCardData: {
    type: FileTypeT;
    url: string;
    name: string;
  };
}

export const useCounterStore = defineStore("counter", {
  state: (): State => ({
    init: () => {},
    AtPageFilesName: "",
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
