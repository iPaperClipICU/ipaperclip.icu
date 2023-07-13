/// <reference types="@types/wicg-file-system-access" />

import { openDB, dbCheckHref } from "@/assets/IndexedDB";
import DiscreteAPI from "@/assets/NaiveUIDiscreteAPI";

type SupportType = "native" | "storage" | "indexedDB" | null;

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

const initDirHandle = async (dirHandle: FileSystemDirectoryHandle, supportType: SupportType) => {
  for await (const [key] of dirHandle.entries()) {
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
  DB: IDBDatabase | null = null;
  tasks: { [key: string]: FileSystemFileHandle | null };

  constructor() {
    this.supportType = FileControl.checkSupport();
    this.tasks = {};
  }

  async init() {
    if (this.supportType === "storage") {
      this.dirHandle = await navigator.storage.getDirectory();
      this.iPaperClipICUDirHandle = await initDirHandle(this.dirHandle, this.supportType);
    } else if (this.supportType === "indexedDB") {
      // 清理垃圾
      this.DB = await openDB();
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
        this.iPaperClipICUDirHandle = await initDirHandle(this.dirHandle, this.supportType);
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
  async addFile(data: Blob, fileHref: string): Promise<void> {
    if (this.supportType === "native" || this.supportType === "storage") {
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
    } else if (this.supportType === "indexedDB") {
      if (this.DB === null) {
        throw {
          name: "DB Not Found",
          message: "数据库错误",
        };
      }

      if (await dbCheckHref(this.DB, fileHref)) {
        // 已存在
        this.tasks[fileHref] = null;
      } else {
        // 不存在
        const transaction = this.DB.transaction(["FileStorage"], "readwrite");
        const objectStore = transaction.objectStore("FileStorage");
        const request = objectStore.put({ fileHref, data });

        await (async () => {
          return new Promise((resolve) => {
            request.onsuccess = async () => {
              if (await dbCheckHref(this.DB as IDBDatabase, fileHref)) {
                this.tasks[fileHref] = null;
                resolve(true);
              }
            };
          });
        })();
      }
    }
  }

  async finish() {
    if (this.supportType === "native") return "";

    const ZipJS = () => import("@zip.js/zip.js"); // TODO: 加载失败报错
    return await ZipJS()
      .then(async ({ BlobReader, BlobWriter, ZipWriter }) => {
        // 压缩
        const zipWriter = new ZipWriter(new BlobWriter("application/zip"));
        if (this.supportType === "storage") {
          for (const [fileHref, atHandle] of Object.entries(this.tasks)) {
            const fileData = await (atHandle as FileSystemFileHandle).getFile();
            zipWriter.add(`iPaperClipICU${fileHref}`, new BlobReader(fileData));
          }
        } else if (this.supportType === "indexedDB") {
          for (const fileHref of Object.keys(this.tasks)) {
            const db = this.DB as IDBDatabase;
            const transaction = db.transaction(["FileStorage"], "readwrite");
            const objectStore = transaction.objectStore("FileStorage");

            const request = objectStore.index("fileHref").get(fileHref);
            const fileData: Blob | null = await (() => {
              return new Promise((resolve) => {
                request.onsuccess = function () {
                  resolve(this.result.data);
                };
                request.onerror = () => {
                  resolve(null);
                };
              });
            })();
            if (fileData !== null) {
              zipWriter.add(`iPaperClipICU${fileHref}`, fileData.stream());
            }
          }
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
        window.indexedDB.deleteDatabase("Download");

        return "";
      })
      .catch((e) => {
        console.log("加载 @zip/zip.js 失败", e);
        throw e;
      });
  }

  /**
   * 检查支持情况
   */
  static checkSupport() {
    if ("showDirectoryPicker" in window) {
      // 支持授权写入
      console.log("support native");
      return "native";
    } else if (
      "FileSystemWritableFileStream" in window &&
      "write" in FileSystemWritableFileStream.prototype
    ) {
      console.log("support storage");
      // 支持写入 storage
      return "storage";
    } else if ("indexedDB" in window) {
      // 支持 IndexedDB
      console.log("support indexedDB");
      return "indexedDB";
    } else {
      console.log("support null");
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
