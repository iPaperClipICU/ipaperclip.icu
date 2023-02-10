<template>
  <div v-if="props.mode === undefined || props.mode === 'PC'">
    <n-menu
      mode="horizontal"
      v-model:value="menuValue"
      :options="menuOptions"
      @update:value="ValueChange"
    />
  </div>
  <div v-if="props.mode === 'Mobile'">
    <n-scrollbar style="max-height: 400px" trigger="none">
      <n-menu
        v-model:value="menuValue"
        :options="menuOptions"
        @update:value="ValueChange"
      />
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { h, ref, type PropType } from "vue";
import { NMenu, NScrollbar, type MenuOption } from "naive-ui";

import router from "@/router";
import { getData } from "@/assets/utils";

const props = defineProps({
  mode: {
    type: String as PropType<"PC" | "Mobile">,
  },
});
const emit = defineEmits<{
  (e: "change", key: string): void;
}>();

const data = getData();

const menuValue = ref<string | null>(null);
const menuOptions: MenuOption[] = [];

router.afterEach(() => {
  const paths = decodeURIComponent(location.pathname).split("/");
  const filesName = String(paths[1]);
  const tagName = String(paths[2]);

  if (Array.isArray(data.data[filesName])) menuValue.value = `${filesName}`;
  else menuValue.value = `${filesName}/${tagName}`;
});

const ValueChange = (key: string) => {
  emit("change", key);
};

const main = () => {
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

      menuOptions.push({
        label: name,
        key: name,
        children,
      });
    } else {
      // 无 tag
      menuOptions.push({
        label: () => h(RouterLink, { to: `/${name}` }, { default: () => name }),
        key: name,
      });
    }
  }
};
main();
</script>
