import { customAlphabet } from "nanoid/non-secure";

import d from "@/assets/data.json";
import type { DataType, FileTypes } from "@/types/";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10);

export const getData = (): DataType => {
  return d as any;
};

/**
 * 通过文件名获取文件类型
 * @param FileName 文件名
 * @returns Data
 */
export const getFileInfo = (
  FileName: string
): {
  name: string;
  type: FileTypes;
} => {
  let FileType: FileTypes = undefined;

  if (FileName.endsWith(".mp4") || FileName.endsWith(".flv")) {
    FileType = "video";
  } else if (FileName.endsWith(".jpg") || FileName.endsWith(".png") || FileName.endsWith(".gif")) {
    FileType = "image";
  } else if (FileName.endsWith(".mp3") || FileName.endsWith(".flac")) {
    FileType = "audio";
  }

  return {
    name: FileName.replace(".mp4", "")
      .replace(".flv", "")
      .replace(".jpg", "")
      .replace(".png", "")
      .replace(".gif", "")
      .replace(".mp3", "")
      .replace(".flac", ""),
    type: FileType,
  };
};

const md5 = async (message: string): Promise<string> => {
  // 将字符串转换为字节数组
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  // 计算MD5哈希值
  const hashBuffer = await crypto.subtle.digest("MD5", data);

  // 将哈希结果转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");

  return hashString;
};

export const getSign = (FileURL: string): string => {
  const u = new URL(FileURL);
  if (u.host === "ipaperclip-file.xodvnm.cn") {
    const PKEY = String(import.meta.env.TencentCDN_PKEY);
    const uri = u.pathname; // url
    const ts = Math.floor(Date.now() / 1000); // ts
    const uid = 0;
    const rand = nanoid();
    const sign = `${ts}-${rand}-${uid}-${md5(`${uri}-${ts}-${rand}-${uid}-${PKEY}`)}`;
    u.searchParams.set("sign", sign);

    return u.href;
  } else {
    return FileURL;
  }
};

export const loadScript = (url: string): Promise<string | false> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      resolve(url);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const loadScripts = async (urls: string[] | string): Promise<string | false> => {
  if (typeof urls === "string") urls = [urls];

  for (const url of urls) {
    const t = await loadScript(url);
    if (t !== false) return t;
  }

  return Promise.resolve(false);
};
