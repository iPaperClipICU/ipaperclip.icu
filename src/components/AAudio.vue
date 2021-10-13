<template>
  <audio controls>
    <!-- <source src="{{ Hsrc }}" type="audio/flac" /> -->
    <source src="{{ Hsrc }}" type="audio/mpeg" />
    <n-result
      status="404"
      size="small"
      title="您的浏览器不支持<audio>"
      description="获得称号「收藏家」"
    >
    </n-result>
  </audio>
</template>

<script>
import { NResult } from "naive-ui";

export default {
  name: "Video",
  components: {
    NResult,
  },
  props: {
    Hsrc: String,
  },
};
</script>
