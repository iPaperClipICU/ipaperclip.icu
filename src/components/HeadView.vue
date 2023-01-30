<template>
  <span
    v-if="showData.siteName"
    class="siteLogo siteName"
    @click="router.push('/')"
  >
    iPaperClipICU
  </span>
  <div v-else class="siteLogo" @click="router.push('/')">
    <img style="width: 32px; height: 32px" src="/favicon.png" />
  </div>
  <div class="tag" v-if="showData.tag !== 'popover'">
    <TagMenu v-if="showData.tag === 'menu'" />
    <n-select
      v-else-if="showData.tag === 'select'"
      style="width: 295px"
      v-model:value="selectValue"
      v-model:show="selectShow"
      :options="[]"
    >
      <template #empty>
        <TagMenu mode="Mobile" @change="TagChange" />
      </template>
    </n-select>
  </div>
  <div class="search">
    <SearchCard :mode="showData.search" />
  </div>
  <div
    class="tag"
    id="tag-popover"
    style="justify-content: flex-end"
    v-if="showData.tag === 'popover'"
  >
    <n-popover
      trigger="click"
      ref="popoverRef"
      style="padding: 0px; width: 270px"
    >
      <template #trigger>
        <n-icon size="32"><MenuICON /></n-icon>
      </template>
      <TagMenu mode="Mobile" @change="TagChange" />
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NIcon, NPopover, NSelect } from "naive-ui";

import router from "@/router";
import SearchCard from "./SearchCard.vue";
import MenuICON from "@/ICON/MenuICON.vue";
import TagMenu from "@/components/TagMenu.vue";

const emit = defineEmits<{
  (e: "changePadding", key: string): void; // 32px
}>();

const selectValue = ref<string | null>(
  (() => {
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
  })()
);
const selectShow = ref<boolean | undefined>(undefined); // 是否显示 select
const popoverRef = ref<any>(null);
const pageWidth = ref<number>(window.innerWidth); // 可视区域宽度
const searchCSS_justify_content = ref<"flex-end" | "center">("flex-end");
const showData = ref<{
  siteName: boolean;
  tag: "menu" | "select" | "popover";
  search: "ALL" | "OnlyButton" | "OnlyInput";
}>({
  siteName: true,
  tag: "menu",
  search: "ALL",
});

window.addEventListener("resize", function () {
  pageWidth.value = this.window.innerWidth;
  pageSizeChange();
});
router.beforeEach((to) => {
  const p = to.params.pathMatch;
  if (p === undefined || p === "") selectValue.value = null;
});

const TagChange = (key: string) => {
  selectValue.value = key;
  selectShow.value = false;
  popoverRef.value?.setShow(false);
};

const pageSizeChange = () => {
  const tmp: {
    siteName: boolean;
    tag: "menu" | "select" | "popover";
    search: "ALL" | "OnlyButton" | "OnlyInput";
  } = {
    siteName: true,
    tag: "menu",
    search: "ALL",
  };
  if (pageWidth.value < 1330) {
    tmp.siteName = false;
  }
  if (pageWidth.value < 1220) {
    tmp.search = "OnlyButton";
  }
  if (pageWidth.value < 1025) {
    tmp.tag = "select";
    tmp.siteName = true;
    tmp.search = "ALL";
  }
  if (pageWidth.value < 760) {
    tmp.siteName = false;
  }
  if (pageWidth.value < 650) {
    tmp.search = "OnlyButton";
  }
  if (pageWidth.value < 460) {
    tmp.tag = "popover";
    tmp.search = "OnlyInput";
    emit("changePadding", "10px");
    searchCSS_justify_content.value = "center";
  } else {
    // 大于 460
    emit("changePadding", "32px");
    searchCSS_justify_content.value = "flex-end";
  }
  showData.value = tmp;
};
pageSizeChange();
</script>

<style>
.n-select-menu {
  width: 295px !important;
}

.n-select-menu .n-base-select-menu__empty {
  display: block !important;
  padding: 0 !important;
}

.search {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: v-bind(searchCSS_justify_content);
}

.tag {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-around;
}

.siteLogo {
  display: flex;
  flex-grow: 1;
  align-items: center;

  cursor: default;
}

.siteName {
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  white-space: nowrap;
}
</style>
