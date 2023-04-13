<template>
  <n-card size="small" hoverable style="margin-bottom: 15px">
    <n-button
      v-if="!counter.download.switch"
      type="primary"
      dashed
      @click="openDownloadMode"
    >
      批量下载
    </n-button>
    <n-space v-else align="center">
      <n-button type="error" dashed @click="() => closeDownloadMode()">
        关闭批量下载
      </n-button>
      <n-button strong secondary type="primary" @click="downloadButtonClick">
        下载
      </n-button>
      <n-button-group v-if="counter.FilesMenuDate !== undefined">
        <n-button strong secondary @click="() => selectAll({ at: true })">
          全选当前页面
        </n-button>
        <n-button
          strong
          secondary
          type="error"
          @click="() => selectAll({ at: true, remove: true })"
        >
          取消当前页面的选择
        </n-button>
      </n-button-group>
      <n-button-group
        v-if="
          counter.FilesMenuDate !== undefined &&
          counter.FilesMenuDate.data.length > 1
        "
      >
        <n-button strong secondary @click="() => selectAll()">
          全选当前分支
        </n-button>
        <n-button
          strong
          secondary
          type="error"
          @click="() => selectAll({ remove: true })"
        >
          取消当前分支的选择
        </n-button>
      </n-button-group>
      <n-button
        strong
        secondary
        type="error"
        @click="() => counter.deleteDownloadSelect()"
      >
        取消全部选择
      </n-button>
      <div>
        您已选择 {{ Object.keys(counter.download.select).length }} 个文件
      </div>
    </n-space>
  </n-card>
  <DownloadModal
    v-if="downloadModal"
    :data="counter.download.select"
    @close="
      (value, needDelete) => {
        downloadModal = value;
        if (needDelete === undefined || needDelete === true) {
          counter.deleteDownloadSelect();
          counter.download.switch = false;
        }
      }
    "
  />
</template>

<script setup lang="ts">
/// <reference types="@types/wicg-file-system-access" />
import { ref } from "vue";
import { NCard, NSpace, NButton, NButtonGroup } from "naive-ui";

import { useCounterStore } from "@/stores/counter";
import FileControl from "@/assets/FileControl";
import DiscreteAPI from "@/assets/NaiveUIDiscreteAPI";
import DownloadModal from "./DownloadModal.vue";

const counter = useCounterStore();

const downloadModal = ref<boolean>(false);

const downloadButtonClick = () => {
  if (Object.keys(counter.download.select).length === 0) {
    DiscreteAPI.message.warning("您还没有选择任何文件");
  } else downloadModal.value = true;
};

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
    } else counter.download.switch = true;
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
  } else counter.download.switch = false;
};

/**
 * 全选
 * @param at 是否只选择当前页面
 */
const selectAll = (opt?: { at?: boolean; remove?: boolean }) => {
  const value = opt?.remove === true ? false : true;
  if (opt?.at === true)
    counter.FilesMenuDate?.data[counter.nowPage - 1].forEach((item) =>
      counter.changeDownloadSelect(item, value)
    );
  else
    counter.FilesMenuDate?.data.forEach((page) => {
      page.forEach((item) => counter.changeDownloadSelect(item, value));
    });
  counter.changeListKey();
};
</script>
