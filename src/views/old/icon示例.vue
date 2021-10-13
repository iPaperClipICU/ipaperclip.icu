<template>
  <n-timeline :icon-size="30">
    <n-timeline-item type="error" content="2.93 MB" time="2021.9.27">
      <template #header
        ><n-button text tag="a" href="" target="_blank" type="primary"
          >这是一个示例音频</n-button
        ></template
      >
      <template #icon
        ><Icon><FileAudioRegular /></Icon
      ></template>
    </n-timeline-item>
    <n-timeline-item type="warning" content="118.14 KB" time="2021.9.27">
      <template #header
        ><n-button text tag="a" href="" target="_blank" type="primary"
          >这是一个示例图片</n-button
        ></template
      >
      <template #icon
        ><Icon><FileImageRegular /></Icon
      ></template>
    </n-timeline-item>
    <n-timeline-item type="info" content="25.66 MB" time="2021.09.27">
      <template #header
        ><n-button text tag="a" href="" target="_blank" type="primary"
          >这是一个示例视频</n-button
        ></template
      >
      <template #icon
        ><Icon><FileVideoRegular /></Icon
      ></template>
    </n-timeline-item>
  </n-timeline>
</template>

<script>
import { defineComponent } from "vue";
import { NTimeline, NTimelineItem, NButton } from "naive-ui";
import { Icon } from "@vicons/utils";
import {
  FileVideoRegular,
  FileImageRegular,
  FileAudioRegular,
} from "@vicons/fa";

export default defineComponent({
  components: {
    Icon,
    FileVideoRegular,
    FileImageRegular,
    FileAudioRegular,
    NTimeline,
    NTimelineItem,
    NButton,
  },
});
</script>
