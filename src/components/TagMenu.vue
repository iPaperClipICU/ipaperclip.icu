<template>
  <div style="display: flex; justify-content: center; margin: 15px 30px">
    <n-button
      v-if="counter.download.switch === false"
      dashed
      type="primary"
      block
      size="large"
      @click="openDownloadMode"
    >
      打开批量下载模式
    </n-button>
    <n-button
      v-else
      dashed
      type="error"
      block
      size="large"
      @click="closeDownloadMode"
    >
      关闭批量下载
    </n-button>
  </div>
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
import { NMenu, NButton } from "naive-ui";

import router from "@/router";
import FileControl from "@/assets/FileControl";
import DiscreteAPI from "@/assets/NaiveUIDiscreteAPI";
import { getData } from "@/assets/utils";
import { useCounterStore } from "@/stores/counter";

const props = defineProps({
  mode: {
    type: String as PropType<"PC" | "Mobile">,
  },
});
const emit = defineEmits<{
  (e: "change", key: string): void;
  (e: "changeDownloadMode", key: boolean): void;
}>();
const counter = useCounterStore();

const data = getData();

const menuValue = ref<string | null>(null);

/**
 * 打开批量下载模式
 */
const openDownloadMode = async () => {
  if (FileControl.checkSupport() !== null) {
    const selectLength = Object.keys(counter.download.select).length;
    if (selectLength > 0) {
      DiscreteAPI.dialog.warning({
        title: "是否使用上次的选择？",
        content: `上次您选择了 ${selectLength} 个文件，是否使用上次的选择？`,
        positiveText: "使用",
        negativeText: "不使用",
        onNegativeClick: () => {
          localStorage.setItem("downloadSelect", "[]");
          counter.deleteDownloadSelect();
        },
        onAfterLeave: () => {
          counter.download.switch = true;
        },
      });
    } else {
      counter.download.switch = true;
    }
  } else {
    DiscreteAPI.message.warning("您的浏览器不支持批量下载");
  }
};

/**
 * 关闭批量下载模式
 */
const closeDownloadMode = () => {
  if (Object.keys(counter.download.select).length > 0) {
    DiscreteAPI.dialog.warning({
      title: "确定要关闭批量下载模式吗？",
      content: "您的已经选择已保存到本地，下次打开时将会自动加载。",
      positiveText: "确定",
      negativeText: "不确定",
      onPositiveClick: () => {
        counter.download.switch = false;
      },
    });
  } else {
    counter.download.switch = false;
  }
};

const setMenuValue = () => {
  if (location.pathname === "/") {
    menuValue.value = "Home";
    return;
  }
  const paths = decodeURIComponent(location.pathname).split("/");
  const filesName = String(paths[1]);
  const tagName = String(paths[2]);

  if (Array.isArray(data.data[filesName])) menuValue.value = `${filesName}`;
  else menuValue.value = `${filesName}/${tagName}`;
};

const ValueChange = (key: string) => {
  emit("change", key);
};

router.afterEach(() => {
  // 路由变化时，更新 menuValue
  setMenuValue();
});

const main = () => {
  if (counter.menuOptions.length === 0) {
    counter.menuOptions.push({
      label: () => h(RouterLink, { to: `/` }, { default: () => "首页" }),
      key: "Home",
    });
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
