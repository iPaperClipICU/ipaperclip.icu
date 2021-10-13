<template>
  <n-timeline :icon-size="30">
    <n-timeline-item type="info" content="25.66 MB" time="2021.09.27">
      <template #header>
        <n-button text @click="demo = true">这是一个示例视频</n-button>
      </template>
      <template #icon>
        <Icon><FileVideoRegular /></Icon>
      </template>
    </n-timeline-item>
  </n-timeline>
  <!-- Modal -->
  <n-modal
    class="custom-card"
    v-model:show="demo"
    preset="card"
    :style="bodyStyle"
    title="demo"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <HVideo src="https://eliro.hsyhx.top/video.mp4" />
  </n-modal>
</template>

<script>
import { defineComponent } from "vue";
import { NTimeline, NTimelineItem, NButton, NModal } from "naive-ui";
import { Icon } from "@vicons/utils";
import { FileVideoRegular } from "@vicons/fa";
import HVideo from "../components/AVideo.vue";

export default defineComponent({
  components: {
    Icon,
    FileVideoRegular,
    NTimeline,
    NTimelineItem,
    NButton,
    NModal,
    HVideo,
  },
  setup() {
    return {
      bodyStyle: {
        width: "592px",
      },
      segmented: {
        content: "soft",
        footer: "soft",
      },
      // demo: ref(false),
    };
  },
});
</script>
