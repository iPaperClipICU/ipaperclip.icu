<template>
  <!-- TODO: 写个视频/音频播放器 -->
  <div v-if="store.state.FileCardData.type === 'video'" class="video">
    <video :src="getSigh(store.state.FileCardData.url)" controls preload>
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-if="store.state.FileCardData.type === 'image'">
    <!-- TODO: Use NaiveUI Image -->
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img
          :src="getSigh(store.state.FileCardData.url)"
          :alt="store.state.FileCardData.name"
          loading="lazy"
          style="width: 100%"
        />
      </n-gi>
      <n-gi span="1 768:5" />
    </n-grid>
  </div>
  <div v-if="store.state.FileCardData.type === 'audio'">
    <!-- <audio preload="none" controls>
      <source :src="getSigh(store.state.FileCardData.url)" type="audio/mpeg" />
      <n-result status="info" title="您的浏览器不支持此音频格式" />
    </audio> -->
    <div id="audioPlayer"></div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import md5 from "js-md5";
import { nanoid } from "nanoid";
import { NGi, NGrid, NResult } from "naive-ui";
import { getFileInfo } from "@/assets/utils.js";

const store = useStore();

onMounted(() => {
  if (store.state.FileCardData.type === "audio") {
    const ap = new APlayer({
      container: document.getElementById("audioPlayer"),
      audio: [
        {
          name: getFileInfo(store.state.FileCardData.name).name,
          url: getSigh(store.state.FileCardData.url),
        },
      ],
    });
    window.$AudioPlayer = ap;
  }
});

const getUID = () => {
  nanoid(10);
  let uid = localStorage.getItem("uid");
  if (uid === null) {
    const t = nanoid(10);
    localStorage.setItem("uid", t);
    uid = t;
  }

  return uid;
};

const getSigh = (FileURL) => {
  const u = new URL(FileURL);
  if (u.host === "ipaperclip-file.xodvnm.cn") {
    const PKEY = import.meta.env.TencentCDN_PKEY || "null";
    const uri = u.pathname; // url
    const ts = Math.floor(Date.now() / 1000); // ts
    const uid = getUID();
    const rand = nanoid(10);
    const sigh = `${ts}-${rand}-${uid}-${md5(
      `${uri}-${ts}-${rand}-${uid}-${PKEY}`
    )}`;
    u.searchParams.set("sigh", sigh);

    return u.href;
  } else {
    return FileURL;
  }
};
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
