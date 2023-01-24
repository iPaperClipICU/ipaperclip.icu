<template>
  <!-- TODO: 写个视频/音频播放器 -->
  <div v-if="counter.FileCardData.type === 'video'" class="video">
    <video :src="getSign(counter.FileCardData.url)" controls preload="metadata">
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-else-if="counter.FileCardData.type === 'image'">
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img
          :src="getSign(counter.FileCardData.url)"
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
import { onMounted } from "vue";
import APlayer from "aplayer-ts";
import "aplayer-ts/dist/APlayer.min.css";
import { NGi, NGrid, NResult } from "naive-ui";

import { useCounterStore } from "@/stores/counter";
import { getSign, getFileInfo } from "@/assets/utils";

const counter = useCounterStore();

onMounted(() => {
  if (counter.FileCardData.type === "audio") {
    const ap = new APlayer({
      container: document.getElementById("audioPlayer") || undefined,
      audio: [
        {
          name: getFileInfo(counter.FileCardData.name).name,
          url: getSign(counter.FileCardData.url),
        },
      ],
    });
    (window as any).$AudioPlayer = ap;
  }
});
</script>

<style>
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
