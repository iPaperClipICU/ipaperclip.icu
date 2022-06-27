<template>
  <n-scrollbar x-scrollable>
    <div style="white-space: nowrap; padding: 12px">
      <slot />
    </div>
  </n-scrollbar>
</template>

<script>
import { defineComponent } from "vue";
import { NScrollbar } from "naive-ui";

export default defineComponent({
  components: { NScrollbar },
});
</script>
