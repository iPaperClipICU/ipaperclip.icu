<template>
  <n-card hoverable style="margin-bottom: 15px">
    <n-h5 prefix="bar">
      文件名: <n-text type="info">{{ FileCardData?.fileName }}</n-text>
    </n-h5>
    <n-grid cols="4">
      <n-gi span="4 361:3 541:2">
        <n-h5 prefix="bar">
          <n-space align="center">
            <span>线路: </span>
            <n-select
              size="small"
              :menu-props="{ class: 'cdn-select' }"
              v-bind:value="selectValue"
              :options="selectOptions"
              @update-value="selectValueUpdate"
            />
          </n-space>
        </n-h5>
      </n-gi>
      <n-gi span="0 361:1 541:2" />
    </n-grid>
    <FileCard v-if="FileCardData !== undefined" :data="FileCardData" />
  </n-card>
  <MarkdownPlayer v-if="MarkdownUrl !== ''" :url="MarkdownUrl" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NGi, NH5, NCard, NGrid, NText, NSpace, NSelect } from "naive-ui";

import FileCard from "@/components/FilePlayer.vue";
import { useCounterStore } from "@/stores/counter";
import type { FileCardDataType, FileTypes } from "@/types";
import { getData, getSign, getFileInfo } from "@/assets/utils";
import MarkdownPlayer from "@/components/MarkdownPlayer.vue";

const w = window as any;
const data = getData();
const counter = useCounterStore();
const selectValue = ref<string>(counter.CDNDomain);
const selectOptions = [
  {
    label: "自动",
    value: "https://ipaperclip-file.xodvnm.cn",
  },
  {
    label: "Cloudflare",
    value: "https://cf.ipaperclip-icu.cyou",
  },
];

const showNull = ref<boolean>(false);
const FileCardData = ref<FileCardDataType>();
const MarkdownUrl = ref<string>("");

const selectValueUpdate = (value: string) => {
  selectValue.value = value;
  counter.CDNDomain = value;
  localStorage.setItem("CDNDomain", value);
  if (FileCardData.value?.fileType === "audio") {
    w.$AudioPlayer.audio.src = getSign(
      `${counter.CDNDomain}/${FileCardData.value?.fileUrl}`
    );
  }
};

const init = () => {
  const fileData = (():
    | {
        name: string;
        url: string;
        type: FileTypes;
        doc: string | null;
      }
    | undefined => {
    const pathList = decodeURIComponent(location.pathname).split("/");
    const filesName = pathList[1];

    if (pathList.length === 4) {
      // 有 Tag

      const fileName = pathList[3];
      const tagName = pathList[2];
      const searchData = data.searchData[fileName];
      if (searchData !== undefined) {
        const fileInfo = getFileInfo(fileName);
        return {
          name: fileInfo.name,
          url: `${filesName}/${tagName}/${fileName}`,
          type: fileInfo.type,
          doc: searchData[2],
        };
      } else return undefined;
    } else if (pathList.length === 3) {
      // 无 Tag

      const fileName = pathList[2];
      const searchData = data.searchData[fileName];
      if (searchData !== undefined) {
        const fileInfo = getFileInfo(fileName);
        return {
          name: fileInfo.name,
          url: `${filesName}/${fileName}`,
          type: fileInfo.type,
          doc: searchData[2],
        };
      } else return undefined;
    } else return undefined;
  })();

  if (fileData === undefined) {
    showNull.value = true;
    return;
  }
  if (fileData.doc !== null) {
    MarkdownUrl.value = `https://cdn.jsdelivr.net/gh/ipaperclip/paperclipfans/${fileData.doc}`;
  } else MarkdownUrl.value = "";
  FileCardData.value = {
    fileType: fileData.type,
    fileUrl: `video/${fileData.url}`,
    fileName: fileData.name,
  };
};
init();
</script>

<style>
.cdn-select {
  width: 116px !important;
}
</style>
