/// <reference types="@types/wicg-file-system-access" />

import DiscreteAPI from "@/assets/NaiveUIDiscreteAPI";
import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";

type SupportType = "native" | "storage" | null;

/**
 * 创建文件夹
 * @param dirHandle 文件夹句柄
 * @param files 文件夹路径
 */
const createDir = async (
  dirHandle: FileSystemDirectoryHandle,
  files: string[]
): Promise<FileSystemDirectoryHandle> => {
  if (files.length === 0) return dirHandle;
  const newDirHandle = await dirHandle.getDirectoryHandle(files[0], {
    create: true,
  });
  if (files.length > 1) {
    return await createDir(newDirHandle, files.slice(1));
  } else return newDirHandle;
};

const initDirHandle = async (
  dirHandle: FileSystemDirectoryHandle,
  supportType: SupportType
) => {
  for await (const [key] of dirHandle.entries()) {
    console.log(`Deleting ${key}`);
    await dirHandle.removeEntry(key, { recursive: true });
  }

  if (supportType === "native") return dirHandle;

  dirHandle = await dirHandle.getDirectoryHandle("iPaperClipICU", {
    create: true,
  });

  return dirHandle;
};

export default class FileControl {
  supportType: SupportType = null;
  dirHandle: FileSystemDirectoryHandle | null = null;
  iPaperClipICUDirHandle: FileSystemDirectoryHandle | null = null;
  tasks: { [key: string]: FileSystemFileHandle };

  constructor() {
    this.supportType = FileControl.checkSupport();
    this.tasks = {};
  }

  async init() {
    if (this.supportType === "storage") {
      this.dirHandle = await navigator.storage.getDirectory();
      this.iPaperClipICUDirHandle = await initDirHandle(
        this.dirHandle,
        this.supportType
      );
    }
  }

  /**
   * supportType 为 native 时, 需要授权
   */
  async auth(): Promise<boolean> {
    try {
      if (this.dirHandle === null) {
        this.dirHandle = await window.showDirectoryPicker({
          mode: "readwrite",
          startIn: "downloads",
        });
        this.iPaperClipICUDirHandle = await initDirHandle(
          this.dirHandle,
          this.supportType
        );
      }
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
  }

  /**
   * 新增文件
   * @param data 文件数据
   * @param fileName 文件名
   * @param files 文件夹路径
   */
  async addFile(
    data: FileSystemWriteChunkType,
    fileHref: string
  ): Promise<void> {
    if (this.iPaperClipICUDirHandle === null) {
      throw {
        name: "AbortError",
        message: "授权失效，请重新授权",
      };
    }

    const { fileHrefArr, fileName } = FileControl.parseFileHref(fileHref);

    const atHandle = await createDir(
      this.iPaperClipICUDirHandle,
      fileHrefArr.filter((value) => value !== "")
    );
    const fileHandle = await atHandle.getFileHandle(fileName, {
      create: true,
    });
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
    this.tasks[fileHref] = fileHandle;
  }

  async finish() {
    if (this.supportType === "native") return "native";

    // 压缩
    const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
    for (const [fileHref, atHandle] of Object.entries(this.tasks)) {
      const fileData = await atHandle.getFile();
      zipWriter.add(`iPaperClipICU${fileHref}`, new BlobReader(fileData));
    }
    const blob = await zipWriter.close();

    // 下载
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ipaperclip.icu 批量下载.zip";
    a.click();
    URL.revokeObjectURL(a.href);

    // 清理
    await this.dirHandle?.removeEntry("iPaperClipICU", { recursive: true });

    return "storage";
  }

  /**
   * 检查支持情况
   */
  static checkSupport() {
    if ("showDirectoryPicker" in window) {
      // 支持授权写入
      return "native";
    } else if (
      "FileSystemWritableFileStream" in window &&
      "write" in FileSystemWritableFileStream.prototype
    ) {
      // 支持写入 storage
      return "storage";
    } else {
      // TODO: 支持 IndexedDB
      return null;
    }
  }

  /**
   * 解析文件路径
   * @param fileHref 文件路径
   */
  static parseFileHref(fileHref: string) {
    const fileHrefArr = fileHref.split("/");
    const fileName = fileHrefArr.pop() ?? "";

    return { fileHrefArr, fileName };
  }
}
