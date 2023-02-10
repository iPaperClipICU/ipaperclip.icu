<template>
  <!-- TODO: 写个视频/音频播放器 -->
  <div v-if="props.data.fileType === 'video'" class="video">
    <video
      controls
      preload="metadata"
      :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)"
    >
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-else-if="props.data.fileType === 'image'">
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img
          :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)"
          :alt="props.data.fileName"
          loading="lazy"
          style="width: 100%"
        />
      </n-gi>
      <n-gi span="1 768:5" />
    </n-grid>
  </div>
  <div v-else-if="props.data.fileType === 'audio'">
    <!-- <audio preload="none" controls>
      <source :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)" type="audio/mpeg" />
      <n-result status="info" title="您的浏览器不支持此音频格式" />
    </audio> -->
    <div id="audioPlayer"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from "vue";
import APlayer from "aplayer-ts";
import "aplayer-ts/dist/APlayer.min.css";
import { NGi, NGrid } from "naive-ui";

import { getSign } from "@/assets/utils";
import type { FileCardDataType } from "@/types/";
import { useCounterStore } from "@/stores/counter";

const w = window as any;
const counter = useCounterStore();

const props = defineProps({
  data: {
    type: Object as PropType<FileCardDataType>,
    required: true,
  },
});

onMounted(() => {
  if (props.data.fileType === "audio") {
    const ap = new APlayer({
      container: document.getElementById("audioPlayer") || undefined,
      audio: [
        {
          name: props.data.fileName,
          url: getSign(`${counter.CDNDomain}/${props.data.fileUrl}`),
        },
      ],
    });
    w.$AudioPlayer = ap;
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
