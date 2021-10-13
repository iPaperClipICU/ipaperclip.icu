<template>
  <video width="512" src="{{ Hsrc }}" controls>
    <n-result
      status="404"
      size="small"
      title="您的浏览器不支持<video>"
      description="获得称号「收藏家」"
    >
    </n-result>
  </video>
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
