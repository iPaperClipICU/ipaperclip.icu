<template>
  <div v-if="props.data.fileType === 'video'">
    <media-player
      :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)"
      aspect-ratio="16/9"
      crossorigin
    >
      <media-outlet>
        <media-poster
          alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
        ></media-poster>
      </media-outlet>
      <media-community-skin></media-community-skin>
    </media-player>
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
  <div v-else-if="props.data.fileType === 'audio'" style="min-height: 76px">
    <media-player viewType="audio" crossorigin>
      <media-outlet>
        <source :src="getSign(`${counter.CDNDomain}/${props.data.fileUrl}`)" type="audio/flac" />
      </media-outlet>
      <media-community-skin default-appearance></media-community-skin>
    </media-player>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from "vue";
import { NGi, NGrid } from "naive-ui";

import { getSign } from "@/assets/utils";
import type { FileCardDataType } from "@/types/";
import { useCounterStore } from "@/stores/counter";

// Vidstack
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/audio.css";
import "vidstack/styles/community-skin/video.css";
import "vidstack/define/media-player.js";
import { defineCustomElements } from "vidstack/elements";
import type { CommunitySkinTranslations } from "vidstack";

const props = defineProps({
  data: {
    type: Object as PropType<FileCardDataType>,
    required: true,
  },
});
const counter = useCounterStore();

onMounted(async () => {
  await defineCustomElements();

  const SPANISH: CommunitySkinTranslations = {
    Audio: "音频",
    Auto: "自动",
    Captions: "字幕",
    Chapters: "章节",
    Default: "默认",
    Mute: "静音",
    Normal: "正常",
    Off: "关闭",
    Pause: "暂停",
    Play: "播放",
    Speed: "速度",
    Quality: "质量",
    Settings: "设置",
    Unmute: "取消静音",
    "Seek Forward": "快进",
    "Seek Backward": "快退",
    "Closed-Captions On": "开启字幕",
    "Closed-Captions Off": "关闭字幕",
    "Enter Fullscreen": "进入全屏",
    "Exit Fullscreen": "退出全屏",
    "Enter PiP": "进入画中画",
    "Exit PiP": "退出画中画",
  };
  try {
    const skin = document.querySelector("media-community-skin") as any;
    skin.translations = SPANISH;
  } catch (e) {
    console.error(e);
  }
});
</script>

<style>
media-community-skin[data-audio] {
  --audio-border: none; /* 解决左侧有一条竖线的问题 */
  --audio-bg: rgb(24, 24, 28);
}
</style>
