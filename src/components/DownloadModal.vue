<template>
  <n-modal
    v-model:show="downloadModal"
    preset="card"
    title="批量下载"
    style="width: 600px"
    :bordered="false"
    :mask-closable="downloadModalData.status === 'finish'"
    :close-on-esc="downloadModalData.status === 'finish'"
    :closable="downloadModalData.status === 'finish'"
  >
    <div v-if="downloadModalData.status === 'auth'">
      <n-result
        status="info"
        title="获取访问授权"
        description="请选择并授权一个文件夹用于保存下载的文件"
      >
        <template #footer>
          <n-button @click="authFilesButtonClick">选择</n-button>
        </template>
      </n-result>
    </div>
    <div v-else-if="downloadModalData.status === 'download'">
      <n-h3 align-text>
        <n-text type="warning">
          请不要关闭或刷新当前页面，这会导致下载进度丢失！
        </n-text>
      </n-h3>
      <span>总进度</span>
      <n-progress
        type="line"
        :status="
          ((status) => {
            if (status === 'download') {
              return 'default';
            } else if (status === 'stop') {
              return 'warning';
            } else {
              return 'error';
            }
          })(downloadModalData.progress.status)
        "
        processing
        :percentage="
          Math.round(
            (downloadModalData.progress.finishedFilesNum /
              downloadModalData.progress.totalFilesNum) *
              100
          )
        "
      >
        {{ downloadModalData.progress.finishedFilesNum }} /
        {{ downloadModalData.progress.totalFilesNum }}
      </n-progress>
      <span>当前正在下载: {{ downloadModalData.progress.nowFileName }}</span>
      <n-progress
        type="line"
        :status="
          ((status) => {
            if (status === 'download') {
              return 'default';
            } else if (status === 'stop') {
              return 'warning';
            } else {
              return 'error';
            }
          })(downloadModalData.progress.status)
        "
        processing
        :percentage="downloadModalData.progress.nowFileProgressNum"
      />
      <n-space justify="end" align="center" style="margin-top: 10px">
        <n-button
          v-if="downloadModalData.progress.status === 'stop'"
          size="small"
          type="success"
          @click="controlDownload(true)"
        >
          继续
        </n-button>
        <n-button
          v-else-if="downloadModalData.progress.status === 'download'"
          size="small"
          type="warning"
          @click="controlDownload(false)"
        >
          暂停
        </n-button>
        <n-button
          v-else-if="downloadModalData.progress.status === 'error'"
          size="small"
          type="success"
        >
          重试
        </n-button>
        <n-popconfirm
          @positive-click="
            () => {
              controlDownload(false);
              emit('close');
            }
          "
        >
          <template #trigger>
            <n-button size="small" type="error">取消</n-button>
          </template>
          确定要取消下载吗？
        </n-popconfirm>
      </n-space>
    </div>
    <div v-else-if="downloadModalData.status === 'finish'">
      <n-result status="success" title="下载成功">
        <template #footer>
          <n-button @click="() => emit('close')">关闭</n-button>
        </template>
      </n-result>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
/// <reference types="@types/wicg-file-system-access" />
import { ref, type PropType } from "vue";
import {
  NH3,
  NText,
  NModal,
  NSpace,
  NButton,
  NResult,
  NProgress,
  NPopconfirm,
} from "naive-ui";
import axios from "axios";

import DiscreteAPI from "@/assets/NaiveUIDiscreteAPI";

const props = defineProps({
  data: {
    type: Object as PropType<{
      [key: string]: boolean;
    }>,
    required: true,
  },
});
const emit = defineEmits<{
  (e: "close"): void;
}>();

const downloadModal = ref<boolean>(true);
const downloadModalData = ref<{
  status: "auth" | "download" | "finish";
  tasks: { [key: string]: boolean };
  progress: {
    status: "download" | "stop" | "error";
    totalFilesNum: number; // 总文件数
    finishedFilesNum: number; // 已完成文件数
    nowFileName: string; // 当前正在下载的文件名
    nowFileProgressNum: number; // 当前正在下载的文件的进度
  };
  error: {
    title: string;
    description: string;
  };
}>({
  status: "auth",
  tasks: {},
  progress: {
    status: "download",
    totalFilesNum: 0,
    finishedFilesNum: 0,
    nowFileName: "",
    nowFileProgressNum: 0,
  },
  error: {
    title: "",
    description: "",
  },
});
// eslint-disable-next-line no-undef
const dirHandle = ref<FileSystemDirectoryHandle | null>(null);
let controller: AbortController | null = new AbortController();

const controlDownload = async (control: boolean) => {
  if (control) {
    downloadModalData.value.progress.status = "download";
    download();
  } else {
    downloadModalData.value.progress.status = "stop";
    controller?.abort();
  }
};

const download = async () => {
  const pathName = decodeURI(location.pathname);
  const fileHrefList = Object.keys(downloadModalData.value.tasks).filter(
    (key) => !downloadModalData.value.tasks[key]
  );
  const totalFilesNum = Object.keys(downloadModalData.value.tasks).length;
  downloadModalData.value.progress = {
    status: "download",
    totalFilesNum,
    finishedFilesNum: totalFilesNum - fileHrefList.length,
    nowFileName: "",
    nowFileProgressNum: 0,
  };

  for (const fileHref of fileHrefList) {
    const fileName = fileHref.split("/").pop() ?? "";
    downloadModalData.value.progress.nowFileName = fileName;
    downloadModalData.value.progress.nowFileProgressNum = 0;
    if (downloadModalData.value.progress.status === "stop") return;

    controller = new AbortController();
    const resp = await axios({
      url: `https://r2.ipaperclip.top/video${pathName}/${fileName}`,
      method: "GET",
      responseType: "blob",
      signal: controller.signal,
      onDownloadProgress: (progressEvent) => {
        downloadModalData.value.progress.nowFileProgressNum = Math.round(
          (progressEvent.progress ?? 0) * 100
        );
      },
    });
    controller = null;

    if (dirHandle.value === null) {
      downloadModalData.value.error = {
        title: "下载失败",
        description: "授权失效，请重新授权",
      };
      throw new Error("授权失效，请重新授权");
    }
    // TODO: 错误处理
    const fileHandle = await dirHandle.value.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(resp.data);
    await writable.close();
    downloadModalData.value.progress.finishedFilesNum++;
    downloadModalData.value.tasks[fileHref] = true;
  }

  downloadModalData.value.status = "finish";
};

const authFilesButtonClick = async () => {
  try {
    dirHandle.value = await window.showDirectoryPicker({
      mode: "readwrite",
      startIn: "downloads",
    });
    downloadModalData.value.status = "download";
    Object.keys(props.data).forEach((key) => {
      downloadModalData.value.tasks[key] = false;
    });
    download();
  } catch (err: any) {
    if (err.name === "AbortError") {
      DiscreteAPI.message.warning("取消授权");
    } else {
      DiscreteAPI.message.error(`授权失败: ${err.message}`);
    }
    console.error(err.name, err.code, err.message);
  }
};
</script>
