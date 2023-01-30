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
const menuOptions: MenuOption[] = [
  // {
  //   label: () =>
  //     h(
  //       RouterLink,
  //       {
  //         to: "/",
  //       },
  //       { default: () => "主页" }
  //     ),
  //   key: "Home",
  // },
  // {
  //   label: "关于",
  //   children: [
  //     {
  //       label: "饮品",
  //       key: "beverage",
  //     },
  //   ],
  //   key: "About",
  // },
];

router.beforeEach((to) => {
  const p = to.params.pathMatch;
  if (p === undefined || p === "") menuValue.value = null;
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
  menuValue.value = (() => {
    const paths = location.pathname.split("/");
    const filesName = paths[1];
    const tagName = paths[2];
    if (filesName === "" || filesName === undefined) {
      return null;
    } else if (tagName !== undefined) {
      return decodeURIComponent(`${filesName}/${tagName}`);
    } else {
      return decodeURIComponent(`${filesName}`);
    }
  })();
};
main();
</script>
