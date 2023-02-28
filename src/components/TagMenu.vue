<template>
  <n-menu
    :mode="
      props.mode === undefined || props.mode === 'PC'
        ? 'horizontal'
        : 'vertical'
    "
    v-model:value="menuValue"
    :options="counter.menuOptions"
    @update:value="ValueChange"
  />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { h, ref, type PropType } from "vue";
import { NMenu } from "naive-ui";

import { getData } from "@/assets/utils";
import { useCounterStore } from "@/stores/counter";

const props = defineProps({
  mode: {
    type: String as PropType<"PC" | "Mobile">,
  },
});
const emit = defineEmits<{
  (e: "change", key: string): void;
}>();
const counter = useCounterStore();

const data = getData();

const menuValue = ref<string | null>(null);

const setMenuValue = () => {
  const paths = decodeURIComponent(location.pathname).split("/");
  const filesName = String(paths[1]);
  const tagName = String(paths[2]);

  if (Array.isArray(data.data[filesName])) menuValue.value = `${filesName}`;
  else menuValue.value = `${filesName}/${tagName}`;
};

const ValueChange = (key: string) => {
  emit("change", key);
};

const main = () => {
  if (counter.menuOptions.length === 0) {
    for (const i of data.menuData) {
      const name = i[0];

      if (i[1] !== undefined) {
        // 有 tag
        const children = [];
        for (const tag of i[1]) {
          children.push({
            label: () =>
              h(RouterLink, { to: `/${name}/${tag}` }, { default: () => tag }),
            key: `${name}/${tag}`,
          });
        }

        counter.menuOptions.push({
          label: name,
          key: name,
          children,
        });
      } else {
        // 无 tag
        counter.menuOptions.push({
          label: () =>
            h(RouterLink, { to: `/${name}` }, { default: () => name }),
          key: name,
        });
      }
    }
  }

  setMenuValue();
};
main();
</script>
