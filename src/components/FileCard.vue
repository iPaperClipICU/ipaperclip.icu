<template>
  <n-h5 prefix="bar">
    文件名: <n-text type="info">{{ counter.FileCardData.name }}</n-text>
  </n-h5>
  <n-grid cols="4">
    <n-gi span="4 361:3 541:2">
      <n-h5 prefix="bar">
        <n-space align="center">
          <span>CDN: </span>
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
  <div v-if="counter.FileCardData.type === 'video'" class="video">
    <video
      controls
      preload="metadata"
      :src="getSign(`${counter.CDNDomain}/${counter.FileCardData.url}`)"
    >
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-else-if="counter.FileCardData.type === 'image'">
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img
          :src="getSign(`${counter.CDNDomain}/${counter.FileCardData.url}`)"
          :alt="counter.FileCardData.name"
          loading="lazy"
          style="width: 100%"
        />
      </n-gi>
      <n-gi span="1 768:5" />
    </n-grid>
  </div>
  <div v-else-if="counter.FileCardData.type === 'audio'">
    <!-- <audio preload="none" controls>
      <source :src="getSign(counter.FileCardData.url)" type="audio/mpeg" />
      <n-result status="info" title="您的浏览器不支持此音频格式" />
    </audio> -->
    <div id="audioPlayer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import APlayer from "aplayer-ts";
import "aplayer-ts/dist/APlayer.min.css";
import { NH5, NGi, NText, NGrid, NResult, NSelect, NSpace } from "naive-ui";

import { useCounterStore } from "@/stores/counter";
import { getSign, getFileInfo } from "@/assets/utils";

const w = window as any;
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

onMounted(() => {
  if (counter.FileCardData.type === "audio") {
    const ap = new APlayer({
      container: document.getElementById("audioPlayer") || undefined,
      audio: [
        {
          name: getFileInfo(counter.FileCardData.name).name,
          url: getSign(`${counter.CDNDomain}/${counter.FileCardData.url}`),
        },
      ],
    });
    w.$AudioPlayer = ap;
  }
});

const selectValueUpdate = (value: string) => {
  selectValue.value = value;
  counter.CDNDomain = value;
  localStorage.setItem("CDNDomain", value);
  if (counter.FileCardData.type === "audio") {
    w.$AudioPlayer.audio.src = getSign(
      `${counter.CDNDomain}/${counter.FileCardData.url}`
    );
  }
};
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
