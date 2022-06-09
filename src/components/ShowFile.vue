<template>
  <div v-if="fineData.type == 'video'" class="video">
    <video :src="fineData.url" controls preload>
      <n-result status="info" title="您的浏览器不支持 video 标签" />
    </video>
  </div>
  <div v-if="fineData.type == 'image'">
    <img :src="fineData.url" :alt="fineData.name" />
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
import { onMounted, defineComponent } from "vue";
import { NResult } from "naive-ui";
import "aplayer/dist/APlayer.min.css";
import APlayer from "aplayer";

export default defineComponent({
  components: {
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
              name: props.data.name,
              url: props.data.url,
            },
          ],
        });
      }
    });
    return {
      fineData: props.data,
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
