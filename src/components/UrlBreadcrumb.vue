<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="(item, index) in props.data"
      :key="index"
      :href="item.href"
    >
      {{ item.name }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script>
import { defineComponent } from "vue";
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";

export default defineComponent({
  components: {
    NBreadcrumb,
    NBreadcrumbItem,
  },
  props: ["data"],
  setup(props) {
    return {
      props,
    };
  },
});
</script>
