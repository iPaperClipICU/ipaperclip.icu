import md5 from "js-md5";
import { customAlphabet } from 'nanoid/non-secure'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);

/**
 * 通过文件名获取文件类型
 * @param {String} FileName 文件名
 * @returns {Json} Data
 */
const getFileInfo = (FileName) => {
  let FileType = "";

  if (FileName.endsWith(".mp4") || FileName.endsWith(".flv")) {
    FileType = "video";
  } else if (
    FileName.endsWith(".jpg") ||
    FileName.endsWith(".png") ||
    FileName.endsWith(".gif")
  ) {
    FileType = "image";
  } else if (FileName.endsWith(".mp3") || FileName.endsWith(".flac")) {
    FileType = "audio";
  } else {
    FileType = void 0;
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

/**
 * 清理 Video 和 Audio 播放器
 */
const clearRubbish = () => {
  const vp = document.getElementsByClassName("video");
  for (let i = 0; i < vp.length; i++) vp[i].innerHTML = "";

  if (window.$AudioPlayer != void 0) window.$AudioPlayer.destroy();
};

const getSign = (FileURL) => {
  const u = new URL(FileURL);
  if (u.host === "ipaperclip-file.xodvnm.cn") {
    const PKEY = import.meta.env.TencentCDN_PKEY || "null";
    const uri = u.pathname; // url
    const ts = Math.floor(Date.now() / 1000); // ts
    const uid = 0;
    const rand = nanoid();
    const sign = `${ts}-${rand}-${uid}-${md5(
      `${uri}-${ts}-${rand}-${uid}-${PKEY}`
    )}`;
    u.searchParams.set("sign", sign);

    return u.href;
  } else {
    return FileURL;
  }
};

export { getFileInfo, clearRubbish, getSign as getSign };
