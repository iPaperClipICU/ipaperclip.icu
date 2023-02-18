<template>
  <div v-if="props.data.fileType === 'video'">
    <video
      controls
      playsinline
      id="videoPlayer"
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
    <audio
      controls
      id="audioPlayer"
      :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)"
    >
      <n-result status="info" title="您的浏览器不支持此音频格式" />
    </audio>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, type PropType } from "vue";
import Plyr from "plyr";
import { NGi, NGrid, NResult } from "naive-ui";

import { getSign } from "@/assets/utils";
import type { FileCardDataType } from "@/types/";
import { useCounterStore } from "@/stores/counter";

const props = defineProps({
  data: {
    type: Object as PropType<FileCardDataType>,
    required: true,
  },
});
const counter = useCounterStore();

let player: null | Plyr = null;

onMounted(() => {
  if (props.data.fileType === "audio") {
    player = new Plyr("#audioPlayer", {
      i18n: {
        speed: "速度",
        normal: "正常",
      },
    });
  } else if (props.data.fileType === "video") {
    player = new Plyr("#videoPlayer", {
      i18n: {
        speed: "速度",
        normal: "正常",
      },
    });
  }
});

onBeforeUnmount(() => {
  player?.destroy();
});
</script>

<style scoped>
@import "plyr/dist/plyr.css";
</style>
