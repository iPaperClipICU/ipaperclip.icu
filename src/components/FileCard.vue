<template>
  <!-- TODO: 写个视频/音频播放器 -->
  <div v-if="store.state.FileCardData.type === 'video'" class="video">
    <video :src="store.state.FileCardData.url" controls preload>
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-if="store.state.FileCardData.type === 'image'">
    <!-- TODO: Use NaiveUI Image -->
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img
          :src="store.state.FileCardData.url"
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
      <source :src="store.state.FileCardData.url" type="audio/mpeg" />
      <n-result status="info" title="您的浏览器不支持此音频格式" />
    </audio> -->
    <div id="audioPlayer"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, defineComponent } from "vue";
import APlayer from "aplayer";
import "aplayer/dist/APlayer.min.css";
import { NGi, NGrid, NResult } from "naive-ui";
import { getFileInfo } from "@/assets/utils.js";

export default defineComponent({
  components: {
    NGi,
    NGrid,
    NResult,
  },
  setup() {
    const store = useStore();
    window.$store = store;

    onMounted(() => {
      if (store.state.FileCardData.type === "audio") {
        const ap = new APlayer({
          container: document.getElementById("audioPlayer"),
          audio: [
            {
              name: getFileInfo(store.state.FileCardData.name).name,
              url: store.state.FileCardData.url,
            },
          ],
        });
        window.$AudioPlayer = ap;
      }
    });

    return {
      store,
    };
  },
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
