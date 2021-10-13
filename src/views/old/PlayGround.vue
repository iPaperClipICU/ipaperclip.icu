<template>
  <n-timeline :icon-size="30"
    ><!-- TimeLine --><n-timeline-item
      type="info"
      content="25.66 MB"
      time="2021.09.27"
      ><template #header
        ><n-button text @click="ID4d35f7aba19994e0a8716f92d164a741 = true"
          >《一个人工智能的诞生》宣传片.mp4</n-button
        ></template
      ><template #icon
        ><Icon><FileVideoRegular /></Icon></template></n-timeline-item
    ><n-timeline-item type="info" content="245.45 MB" time="2021.09.27"
      ><template #header
        ><n-button text @click="ID3dd18dee68f80348415f030552f72213 = true"
          >基本操作 2020 线上发布会全程.mp4</n-button
        ></template
      ><template #icon
        ><Icon><FileVideoRegular /></Icon></template></n-timeline-item
    ><n-timeline-item type="info" content="15.49 MB" time="2021.09.27"
      ><template #header
        ><n-button text @click="ID74e2592622c71410d61e98fa8c801a54 = true"
          >基本操作 2021 夏季线上发布会预告片.mp4</n-button
        ></template
      ><template #icon
        ><Icon><FileVideoRegular /></Icon></template></n-timeline-item
    ><n-timeline-item type="info" content="123.28 MB" time="2021.09.27"
      ><template #header
        ><n-button text @click="IDdb20c67625e40fbf0382ff77bfbc63ec = true"
          >数码荔枝 × 基本操作 聊聊 AI
          交互视频课程与正版软件的故事.mp4</n-button
        ></template
      ><template #icon
        ><Icon
          ><FileVideoRegular /></Icon></template></n-timeline-item></n-timeline
  ><!-- Modal --><n-modal
    class="custom-card"
    v-model:show="ID4d35f7aba19994e0a8716f92d164a741"
    preset="card"
    :style="bodyStyle"
    title="《一个人工智能的诞生》宣传片.mp4"
    size="huge"
    :bordered="false"
    :segmented="segmented"
    ><HVideo
      src="https://file.hsyhx.top/基本操作/《一个人工智能的诞生》宣传片.mp4" /></n-modal
  ><n-modal
    class="custom-card"
    v-model:show="ID3dd18dee68f80348415f030552f72213"
    preset="card"
    :style="bodyStyle"
    title="基本操作 2020 线上发布会全程.mp4"
    size="huge"
    :bordered="false"
    :segmented="segmented"
    ><HVideo
      src="https://file.hsyhx.top/基本操作/基本操作 2020 线上发布会全程.mp4" /></n-modal
  ><n-modal
    class="custom-card"
    v-model:show="ID74e2592622c71410d61e98fa8c801a54"
    preset="card"
    :style="bodyStyle"
    title="基本操作 2021 夏季线上发布会预告片.mp4"
    size="huge"
    :bordered="false"
    :segmented="segmented"
    ><HVideo
      src="https://file.hsyhx.top/基本操作/基本操作 2021 夏季线上发布会预告片.mp4" /></n-modal
  ><n-modal
    class="custom-card"
    v-model:show="IDdb20c67625e40fbf0382ff77bfbc63ec"
    preset="card"
    :style="bodyStyle"
    title="数码荔枝 × 基本操作 聊聊 AI 交互视频课程与正版软件的故事.mp4"
    size="huge"
    :bordered="false"
    :segmented="segmented"
    ><HVideo
      src="https://file.hsyhx.top/基本操作/数码荔枝 × 基本操作 聊聊 AI 交互视频课程与正版软件的故事.mp4"
  /></n-modal>
</template>
<script>
import { defineComponent, ref } from "vue";
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
      bodyStyle: { width: "592px" },
      segmented: { content: "soft", footer: "soft" },
      ID4d35f7aba19994e0a8716f92d164a741: ref(false),
      ID3dd18dee68f80348415f030552f72213: ref(false),
      ID74e2592622c71410d61e98fa8c801a54: ref(false),
      IDdb20c67625e40fbf0382ff77bfbc63ec: ref(false),
    };
  },
});
</script>
