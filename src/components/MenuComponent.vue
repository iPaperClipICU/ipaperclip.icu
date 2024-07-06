<template>
  <div style="display: flex; justify-content: center; margin: 15px 30px">
    <n-button
      v-if="downloadStore.switch === false"
      dashed
      type="primary"
      block
      size="large"
      @click="openDownloadMode()"
    >
      打开批量下载模式
    </n-button>
    <n-button v-else dashed type="error" block size="large" @click="closeDownloadMode()">
      关闭批量下载模式
    </n-button>
  </div>
  <n-menu
    accordion
    :options="menuOptions"
    v-model:value="menuValue"
    @update:value="(key) => emit('change', key)"
  />
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { h, ref, watch, type Component } from "vue";
import { NMenu, NIcon, NButton, type MenuOption } from "naive-ui";

import router from "@/router";
import FileControl from "@/assets/FileControl";
import { usePublicStore, useDownloadStore } from "@/stores";
import NaiveUIDiscreteAPI from "@/assets/NaiveUIDiscreteAPI";

import MailICON from "@/ICON/Contact/Mail.vue";
import GithubICON from "@/ICON/Contact/Github.vue";
import TelegramICON from "@/ICON/Contact/Telegram.vue";

const emit = defineEmits<{
  (e: "change", key: string): void;
}>();
const publicStore = usePublicStore();
const downloadStore = useDownloadStore();

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

const menuValue = ref<string | null>("");
const setMenuValue = () => {
  if (location.pathname === "/") {
    menuValue.value = "Home";
    return;
  }
  const paths = decodeURI(location.pathname).split("/");
  const filesName = String(paths[1]);
  const tagName = String(paths[2]);

  if (tagName === "undefined") menuValue.value = filesName;
  else menuValue.value = `${filesName}/${tagName}`;
};
router.afterEach(() => setMenuValue());
setMenuValue();
const setMenuOptions = (showSomething = false) => {
  const tmp: MenuOption[] = [];
  tmp.push({
    label: () => h(RouterLink, { to: `/` }, { default: () => "首页" }),
    key: "Home",
  });
  // Menu
  for (const i of publicStore.data.menuData) {
    const name = i[0];

    if (i[1] !== undefined) {
      // 有 tag
      const children = [];
      for (const tag of i[1]) {
        children.push({
          label: () => h(RouterLink, { to: `/${name}/${tag}` }, { default: () => tag }),
          key: `${name}/${tag}`,
        });
      }

      tmp.push({
        label: name,
        key: name,
        children,
      });
    } else {
      // 无 tag
      tmp.push({
        label: () => h(RouterLink, { to: `/${name}` }, { default: () => name }),
        key: name,
      });
    }
  }
  // 联系方式
  const contact: [string, string, any, boolean?][] = [
    ["Telegram 通知频道", "https://t.me/iPaperClipICU", TelegramICON, true],
    ["Telegram Bot", "https://t.me/iPaperClipICUChatBot", TelegramICON, true],
    ["GitHub", "https://github.com/iPaperClipICU/ipaperclip.icu/", GithubICON],
    ["hi@ipaperclip.icu", "mailto:hi@ipaperclip.icu", MailICON],
  ];
  tmp.push({
    key: "divider-1",
    type: "divider",
  });
  for (const [name, href, ICON, something] of contact) {
    if (something === true && showSomething === false) continue;
    tmp.push({
      label: () =>
        h(
          "a",
          {
            href,
            target: "_blank",
          },
          name,
        ),
      key: name,
      icon: renderIcon(ICON),
    });
  }
  return tmp;
};
const menuOptions = ref<MenuOption[]>(setMenuOptions());
watch(publicStore, (value) => {
  if (value.showSomething) menuOptions.value = setMenuOptions(value.showSomething);
});

/**
 * 打开批量下载模式
 */
const openDownloadMode = async () => {
  if (FileControl.checkSupport() !== null) {
    const selectLength = Object.keys(downloadStore.select).length;
    if (selectLength > 0) {
      NaiveUIDiscreteAPI.dialog.warning({
        title: "是否使用上次的选择？",
        content: `上次您选择了 ${selectLength} 个文件，是否使用上次的选择？`,
        positiveText: "使用",
        negativeText: "不使用",
        onNegativeClick: () => {
          localStorage.setItem("downloadSelect", "[]");
          downloadStore.deleteDownloadSelect();
        },
        onAfterLeave: () => {
          downloadStore.switch = true;
        },
      });
    } else {
      downloadStore.switch = true;
    }
  } else {
    NaiveUIDiscreteAPI.message.warning("您的浏览器不支持批量下载");
  }
};

/**
 * 关闭批量下载模式
 */
const closeDownloadMode = () => {
  if (Object.keys(downloadStore.select).length > 0) {
    NaiveUIDiscreteAPI.dialog.warning({
      title: "确定要关闭批量下载模式吗？",
      content: "您的已经选择已保存到本地，下次打开时将会自动加载。",
      positiveText: "确定",
      negativeText: "不确定",
      onPositiveClick: () => {
        downloadStore.switch = false;
      },
    });
  } else {
    downloadStore.switch = false;
  }
};
</script>
