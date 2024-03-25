<template>
  <div v-if="props.data.type === 'video'">
    <media-player :src="playUrl" aspect-ratio="16/9" crossorigin>
      <media-outlet>
        <media-poster></media-poster>
      </media-outlet>
      <media-community-skin></media-community-skin>
    </media-player>
  </div>
  <div v-else-if="props.data.type === 'image'">
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img :src="playUrl" loading="lazy" style="width: 100%" />
      </n-gi>
      <n-gi span="1 768:5" />
    </n-grid>
  </div>
  <div v-else-if="props.data.type === 'audio'" style="min-height: 76px">
    <media-player viewType="audio" crossorigin>
      <media-outlet>
        <source :src="playUrl" type="audio/flac" />
      </media-outlet>
      <media-community-skin default-appearance></media-community-skin>
    </media-player>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="请完成人机验证"
    :mask-closable="false"
    style="width: 400px"
  >
    <div v-if="!isLoading" id="captcha-vaptcha" style="min-height: 36px">
      <div>加载中~</div>
    </div>
    <div v-else>加载中~</div>
  </n-modal>
</template>

<script setup lang="ts">
import { NGi, NGrid, NModal, NButton } from "naive-ui";
import { ref, watch, onMounted, type PropType } from "vue";

import type { FileData } from "@/types";
import { getSign } from "@/assets/utils";
import { usePublicStore } from "@/stores";

// Vidstack
import "vidstack/define/media-player.js";
import { defineCustomElements } from "vidstack/elements";
import type { CommunitySkinTranslations } from "vidstack";
import NaiveUIDiscreteAPI from "@/assets/NaiveUIDiscreteAPI";

const w = window as any;
const props = defineProps({
  data: {
    type: Object as PropType<FileData>,
    required: true,
  },
});
const publicStore = usePublicStore();

const loadScript = (url: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = () => {
      resolve(true);
    };
    s.onerror = () => {
      reject(false);
    };
    s.async = true;
    document.body.appendChild(s);
  });
};
const showModal = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const playUrl = ref<string>();
const updatePlayUrl = async (data: FileData, CDNDomain: string) => {
  const filePath = `${publicStore.CDNDomain}/${props.data.fileUri}`;
  NaiveUIDiscreteAPI.loadingBar.start();
  const result = await getSign(filePath);
  if (result === "") {
    playUrl.value = "";
    NaiveUIDiscreteAPI.loadingBar.error();
  } else if (result === "vaptcha") {
    NaiveUIDiscreteAPI.message.warning("请完成人机验证以继续~");
    showModal.value = true;
    let loadResult = true;
    if (!w.vaptcha) {
      console.log("Vaptcha 未加载JS");
      loadResult = await loadScript("https://v-sea.vaptcha.com/v3.js");
    }
    // TODO: 加载失败处理显示提示
    if (loadResult) {
      const obj = await w.vaptcha({
        vid: "6601a585d3784602950e811c",
        mode: "click",
        scene: 1,
        container: "#captcha-vaptcha",
        color: "#70c0e8",
      });
      obj.render();
      obj.listen("pass", () => {
        isLoading.value = true;
        const { server, token } = obj.getServerToken();
        console.log({ server, token });
        getSign(filePath, { url: server, token }).then((vaptchaResult) => {
          isLoading.value = false;
          showModal.value = false;
          if (vaptchaResult === "" || vaptchaResult === "vaptcha") {
            playUrl.value = "";
            NaiveUIDiscreteAPI.loadingBar.error();
          } else {
            playUrl.value = vaptchaResult;
            NaiveUIDiscreteAPI.loadingBar.finish();
          }
        });
      });
      // obj.reset(); // 重置
    }
  } else {
    playUrl.value = result;
    NaiveUIDiscreteAPI.loadingBar.finish();
  }
};
watch([props, publicStore], async ([props, publicStore]) => {
  await updatePlayUrl(props.data, publicStore.CDNDomain);
});
updatePlayUrl(props.data, publicStore.CDNDomain);

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
