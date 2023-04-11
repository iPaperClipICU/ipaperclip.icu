<template>
  <n-modal
    v-model:show="downloadModal"
    preset="card"
    title="批量下载"
    style="width: 600px"
    :bordered="false"
    :mask-closable="downloadModalData.status === 'finish'"
    :close-on-esc="downloadModalData.status === 'finish'"
    :closable="
      downloadModalData.status === 'finish' ||
      downloadModalData.status === 'auth'
    "
    @update:show="
      (value) => emit('close', value, downloadModalData.status === 'finish')
    "
  >
    <n-alert
      v-if="downloadModalData.progress.status === 'error'"
      :title="downloadModalData.error.title"
      type="error"
    >
      {{ downloadModalData.error.message }}
    </n-alert>
    <div
      v-if="
        downloadModalData.status === 'loading' ||
        downloadModalData.status === 'zip'
      "
    >
      <n-result
        :title="downloadModalData.status === 'loading' ? '加载中~' : '压缩中~'"
      >
        <template #icon>
          <n-spin size="large" />
        </template>
      </n-result>
    </div>
    <div v-else-if="downloadModalData.status === 'auth'">
      <n-result
        status="info"
        title="获取访问授权"
        description="请选择并授权一个文件夹用于保存下载的文件"
      >
        <template #footer>
          <n-button @click="() => authFilesButtonClick()">选择</n-button>
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
          @click="() => retryButtonClick()"
        >
          {{
            downloadModalData.error.name === "PR:AuthError"
              ? "重新授权"
              : "重试"
          }}
        </n-button>
        <n-popconfirm
          @positive-click="
            () => {
              controlDownload(false);
              emit('close', false, false);
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
          <n-button @click="() => emit('close', false)">关闭</n-button>
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
  NSpin,
  NText,
  NAlert,
  NModal,
  NSpace,
  NButton,
  NResult,
  NProgress,
  NPopconfirm,
} from "naive-ui";
import axios from "axios";
import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";

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
  (e: "close", value: boolean, needDelete?: boolean): void;
}>();

const downloadModal = ref<boolean>(true);
const needZip = ref<boolean>(false);
const downloadModalData = ref<{
  status: "loading" | "auth" | "download" | "zip" | "finish";
  // eslint-disable-next-line no-undef
  tasks: { [key: string]: FileSystemFileHandle | null };
  progress: {
    status: "download" | "stop" | "error";
    totalFilesNum: number; // 总文件数
    finishedFilesNum: number; // 已完成文件数
    nowFileName: string; // 当前正在下载的文件名
    nowFileProgressNum: number; // 当前正在下载的文件的进度
  };
  error: {
    title: string;
    name: string;
    message: string;
  };
}>({
  status: "loading",
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
    name: "",
    message: "",
  },
});
// eslint-disable-next-line no-undef
let dirHandle: FileSystemDirectoryHandle | null = null;
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

const createDir = async (
  // eslint-disable-next-line no-undef
  dirHandle: FileSystemDirectoryHandle,
  files: string[]
  // eslint-disable-next-line no-undef
): Promise<FileSystemDirectoryHandle> => {
  if (files.length === 0) return dirHandle;
  const newDirHandle = await dirHandle.getDirectoryHandle(files[0], {
    create: true,
  });
  if (files.length > 1) {
    return await createDir(newDirHandle, files.slice(1));
  } else return newDirHandle;
};

const finish = async () => {
  if (!needZip.value) {
    downloadModalData.value.status = "finish";
    return;
  }

  // 需要压缩
  downloadModalData.value.status = "zip";
  const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
  for (const [fileHref, atHandle] of Object.entries(
    downloadModalData.value.tasks
  )) {
    // eslint-disable-next-line no-undef
    const fileHandle = atHandle as FileSystemFileHandle;
    const file = await fileHandle.getFile();
    zipWriter.add(fileHref, new BlobReader(file));
  }
  const blob = await zipWriter.close();
  // 下载
  // 创建下载链接
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "ipaperclip.icu 批量下载.zip";

  // 触发下载
  downloadLink.click();

  // 释放下载链接
  URL.revokeObjectURL(downloadLink.href);

  downloadModalData.value.status = "finish";
};

const download = async () => {
  downloadModalData.value.status = "download";
  const fileHrefList = Object.keys(downloadModalData.value.tasks).filter(
    (key) => downloadModalData.value.tasks[key] === null
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
    const fileHrefArr = fileHref.split("/");
    const fileName = fileHrefArr.pop() ?? "";
    downloadModalData.value.progress.nowFileName = fileName;
    downloadModalData.value.progress.nowFileProgressNum = 0;
    if (downloadModalData.value.progress.status === "stop") return;

    controller = new AbortController();
    const resp = await axios({
      url: `https://r2.ipaperclip.top/video${fileHref}`,
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

    if (dirHandle === null) {
      throw {
        name: "AbortError",
        message: "授权失效，请重新授权",
      };
    }
    const atHandle = await createDir(
      dirHandle,
      fileHrefArr.filter((value) => value !== "")
    ); // 创建文件夹
    const fileHandle = await atHandle.getFileHandle(fileName, {
      create: true,
    }); // 创建文件Handle
    const writable = await fileHandle.createWritable();
    await writable.write(resp.data); // 写入文件
    await writable.close();
    downloadModalData.value.progress.finishedFilesNum++;
    downloadModalData.value.tasks[fileHref] = fileHandle;
  }

  await finish();
};

/**
 * 处理下载错误
 * @param e Error
 */
const downloadError = (e: any) => {
  console.error(e, e.name, e.code, e.message);
  if (e.name === "CanceledError") return;
  if (["AbortError", "NotAllowedError"].includes(e.name)) {
    // 授权失效
    downloadModalData.value.error = {
      title: "授权失效",
      name: "PR:AuthError",
      message: "授权失效，请重新授权",
    };
    dirHandle = null;
  } else {
    downloadModalData.value.error = {
      title: "出现错误",
      name: e.name ?? e.code ?? "Error don't have name or code",
      message: e.message,
    };
  }
  downloadModalData.value.progress.status = "error";
};

const setDirHandle = async (): Promise<boolean> => {
  try {
    if (dirHandle === null)
      dirHandle = await window.showDirectoryPicker({
        mode: "readwrite",
        startIn: "downloads",
      });
    return true;
  } catch (e: any) {
    if (e.name === "AbortError") {
      DiscreteAPI.message.warning("取消授权");
    } else {
      DiscreteAPI.message.error(`授权失败: ${e.message}`);
    }
    console.error(e.name, e.code, e.message);
    return false;
  }
};

const retryButtonClick = async () => {
  if (downloadModalData.value.error.name === "PR:AuthError") {
    dirHandle = null;
  }
  if (!(await setDirHandle())) return;
  download().catch(downloadError);
};

const authFilesButtonClick = async () => {
  if (!(await setDirHandle())) return;
  download().catch(downloadError);
};

const main = async () => {
  Object.keys(props.data).forEach((key) => {
    downloadModalData.value.tasks[key] = null;
  });
  if (typeof window.showDirectoryPicker === "function") {
    downloadModalData.value.status = "auth";
  } else {
    needZip.value = true;
    dirHandle = await navigator.storage.getDirectory();
    download().catch(downloadError);
  }
};
main();
</script>
