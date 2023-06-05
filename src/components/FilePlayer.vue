<template>
  <div v-if="props.data.fileType === 'video'" :class="playerStatus === 'def' ? 'videoPlayer' : ''">
    <n-skeleton v-if="playerStatus === 'load'" :sharp="false" class="videoPlayer" />
    <video
      v-show="playerStatus !== 'load'"
      controls
      playsinline
      id="videoPlayer"
      :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)"
    ></video>
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
    <n-skeleton v-if="playerStatus === 'load'" height="52px" />
    <audio
      v-show="playerStatus !== 'load'"
      controls
      id="audioPlayer"
      style="max-width: 100%"
      :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type PropType } from "vue";
// import Plyr from "plyr";
import { NGi, NGrid, NSkeleton } from "naive-ui";

import { getSign, loadScripts } from "@/assets/utils";
import type { FileCardDataType } from "@/types/";
import { useCounterStore } from "@/stores/counter";

const props = defineProps({
  data: {
    type: Object as PropType<FileCardDataType>,
    required: true,
  },
});
const counter = useCounterStore();

const w = window as any;
let playerStatus = ref<"load" | "def" | "plyr">("load");
let plyrPlayer: null | any = null;

const loadPlyr = async (): Promise<string | boolean> => {
  if (typeof w.Plyr === "function") return true;

  return await loadScripts([
    "https://cdn.jsdelivr.net/npm/plyr@3.7.3/dist/plyr.min.js",
    "https://cdn.plyr.io/3.7.3/plyr.js",
  ]);
};

onMounted(async () => {
  if (await loadPlyr()) {
    playerStatus.value = "plyr";

    const i18n = {
      speed: "速度",
      normal: "正常",
    };

    if (props.data.fileType === "audio") {
      plyrPlayer = new w.Plyr("#audioPlayer", { i18n });
    } else if (props.data.fileType === "video") {
      plyrPlayer = new w.Plyr("#videoPlayer", {
        i18n,
        fullscreen: {
          iosNative: true,
        },
      });
    }
  } else {
    playerStatus.value = "def";
  }
});

onBeforeUnmount(() => {
  plyrPlayer?.destroy();
});
</script>

<style>
@import "plyr/dist/plyr.css";

.videoPlayer {
  position: relative;
  padding-top: 56.25%;
}
.videoPlayer video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
