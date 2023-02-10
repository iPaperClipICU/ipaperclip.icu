<template>
  <n-card hoverable>
    <n-h5 prefix="bar">
      文件名: <n-text type="info">{{ fileName }}</n-text>
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
    <!-- TODO: 写个视频/音频播放器 -->
    <div v-if="fileType === 'video'" class="video">
      <video
        controls
        preload="metadata"
        :src="getSign(`${counter.CDNDomain}/${fileUrl}`)"
      >
        <n-result status="info" title="您的浏览器不支持 video 标签" />
      </video>
    </div>
    <div v-else-if="fileType === 'image'">
      <n-grid :cols="36" item-responsive>
        <n-gi span="1 768:5" />
        <n-gi span="34 768:26">
          <img
            :src="getSign(`${counter.CDNDomain}/${fileUrl}`)"
            :alt="fileName"
            loading="lazy"
            style="width: 100%"
          />
        </n-gi>
        <n-gi span="1 768:5" />
      </n-grid>
    </div>
    <div v-else-if="fileType === 'audio'">
      <!-- <audio preload="none" controls>
        <source :src="getSign(`${counter.CDNDomain}/${fileUrl}`)" type="audio/mpeg" />
        <n-result status="info" title="您的浏览器不支持此音频格式" />
      </audio> -->
      <div id="audioPlayer"></div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import APlayer from "aplayer-ts";
import "aplayer-ts/dist/APlayer.min.css";
import {
  NGi,
  NH5,
  NCard,
  NGrid,
  NText,
  NSpace,
  NResult,
  NSelect,
} from "naive-ui";

import type { FileTypes } from "@/types";
import { useCounterStore } from "@/stores/counter";
import { getData, getSign, getFileInfo } from "@/assets/utils";

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
const fileType = ref<FileTypes | undefined>(undefined);
const fileUrl = ref<string>("");
const fileName = ref<string>("");

const selectValueUpdate = (value: string) => {
  selectValue.value = value;
  counter.CDNDomain = value;
  localStorage.setItem("CDNDomain", value);
  if (fileType.value === "audio") {
    w.$AudioPlayer.audio.src = getSign(`${counter.CDNDomain}/${fileUrl.value}`);
  }
};

onMounted(() => {
  if (fileType.value === "audio") {
    const ap = new APlayer({
      container: document.getElementById("audioPlayer") || undefined,
      audio: [
        {
          name: fileName.value,
          url: getSign(`${counter.CDNDomain}/${fileUrl.value}`),
        },
      ],
    });
    w.$AudioPlayer = ap;
  }
});

const init = () => {
  const fileData = (():
    | {
        name: string;
        url: string;
        type: FileTypes;
      }
    | undefined => {
    const pathList = decodeURIComponent(location.pathname).split("/");
    const filesName = pathList[1];

    if (pathList.length === 4) {
      // 有 Tag

      const fileName = pathList[3];
      const tagName = pathList[2];
      if (data.searchData[fileName] !== undefined) {
        const fileInfo = getFileInfo(fileName);
        return {
          name: fileInfo.name,
          url: `${filesName}/${tagName}/${fileName}`,
          type: fileInfo.type,
        };
      } else return undefined;
    } else if (pathList.length === 3) {
      // 无 Tag

      const fileName = pathList[2];
      if (data.searchData[fileName] !== undefined) {
        const fileInfo = getFileInfo(fileName);
        return {
          name: fileInfo.name,
          url: `${filesName}/${fileName}`,
          type: fileInfo.type,
        };
      } else return undefined;
    } else return undefined;
  })();

  if (fileData === undefined) {
    showNull.value = true;
    return;
  }
  fileType.value = fileData.type;
  fileUrl.value = `video/${fileData.url}`;
  fileName.value = fileData.name;
};
init();
</script>

<style>
.cdn-select {
  width: 116px !important;
}

/* video标签自适应 */

.video {
  position: relative;
  padding-top: 56.25%;
}

video {
  border: none;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

/* APlayer */

.aplayer-title {
  color: #24292e;
}

.aplayer-author {
  color: #fff !important;
}
</style>
