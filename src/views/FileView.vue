<template>
  <n-space align="center" style="margin-bottom: 15px; flex-wrap: nowrap">
    <n-tag type="success">{{ filesName }}</n-tag>
    <n-h2 style="margin-bottom: 0">{{ FileCardData?.fileName }}</n-h2>
  </n-space>
  <FileCard
    v-if="FileCardData !== undefined"
    :data="FileCardData"
    style="margin-bottom: 15px"
  />
  <n-card hoverable style="margin-bottom: 15px" size="small">
    <n-space align="baseline">
      <span style="font-size: 15px">线路</span>
      <n-radio-group v-model:value="radioValue" name="radiogroup">
        <n-space>
          <n-radio
            v-for="radio in radioOption"
            :key="radio.value"
            :value="radio.value"
            @change="radioChange(radio.value)"
          >
            {{ radio.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-space>
  </n-card>
  <MarkdownPlayer v-if="MarkdownUrl !== ''" :url="MarkdownUrl" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NH2, NTag, NCard, NRadio, NSpace, NRadioGroup } from "naive-ui";

import FileCard from "@/components/FilePlayer.vue";
import { useCounterStore } from "@/stores/counter";
import type { FileCardDataType, FileTypes } from "@/types";
import { getData, getFileInfo } from "@/assets/utils";
import MarkdownPlayer from "@/components/MarkdownPlayer.vue";

const data = getData();
const counter = useCounterStore();

const showNull = ref<boolean>(false);
const FileCardData = ref<FileCardDataType>();
const MarkdownUrl = ref<string>("");
const filesName = ref<string>("");
const radioValue = ref<string | null>(counter.CDNDomain);
const radioOption: {
  label: string;
  value: string;
}[] = [
  {
    label: "Auto",
    value: "https://ipaperclip-file.xodvnm.cn",
  },
  {
    label: "Cloudflare",
    value: "https://cf.ipaperclip-icu.cyou",
  },
];

const radioChange = (value: string) => {
  counter.CDNDomain = value;
  localStorage.setItem("CDNDomain", value);
};

const init = () => {
  const fileData = (():
    | {
        name: string;
        url: string;
        type: FileTypes;
        doc: string | null;
        tag: string;
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
          tag: filesName,
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
          tag: filesName,
        };
      } else return undefined;
    } else return undefined;
  })();

  if (fileData === undefined) {
    showNull.value = true;
    return;
  }
  if (fileData.doc !== null) {
    MarkdownUrl.value = `https://cdn.jsdelivr.net/gh/iPaperClipICU/paperclip-doc/${fileData.doc}`;
  } else MarkdownUrl.value = "";
  FileCardData.value = {
    fileType: fileData.type,
    fileUrl: `video/${fileData.url}`,
    fileName: fileData.name,
  };
  filesName.value = fileData.tag;
};
init();
</script>
