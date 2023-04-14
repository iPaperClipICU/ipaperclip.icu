<template>
  <n-card size="small" hoverable style="margin-bottom: 15px">
    <n-space align="center">
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

import router from "@/router";
import { useCounterStore } from "@/stores/counter";
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

router.afterEach((to) => {
  if (String(to.name).startsWith("FILE:")) {
    counter.FilesMenuDate = undefined;
  }
});
</script>
