<template>
  <n-alert v-if="loadError" type="error">
    {{ loadError_name }}加载失败
  </n-alert>
  <!-- TODO: 写个视频/音频播放器 -->
  <div v-if="fineData.type == 'video'" class="video">
    <video :src="fineData.url" controls preload>
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-if="fineData.type == 'image'">
    <!-- TODO: Use NaiveUI Image -->
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img :src="fineData.url" :alt="fineData.name" loading="lazy" style="width: 100%" :onerror="imgError(fineData)" />
      </n-gi>
      <n-gi span="1 768:5" />
    </n-grid>
  </div>
  <div v-if="fineData.type == 'audio'">
    <!-- <audio preload="none" controls>
      <source :src="fineData.url" type="audio/mpeg" />
      <n-result status="info" title="您的浏览器不支持此音频格式" />
    </audio> -->
    <div id="audioPlayer"></div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "vue";
import { NGi, NGrid, NAlert, NResult } from "naive-ui";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";
import { getFileInfo } from "@/assets/box.js";

const loadError = ref(false);
const loadError_name = ref('额');
export default defineComponent({
  components: {
    NGi,
    NGrid,
    NAlert,
    NResult,
  },
  props: ["data"],
  setup(props) {
    onMounted(() => {
      if (props.data.type == "audio") {
        new APlayer({
          container: document.getElementById("audioPlayer"),
          audio: [
            {
              name: getFileInfo(props.data.name).name,
              url: props.data.url,
            },
          ],
        });
      }
    });
    return {
      loadError,
      loadError_name,
      fineData: props.data,
      imgError: () => {
        loadError_name.value = "图片";
        loadError.value = true;
      },
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
