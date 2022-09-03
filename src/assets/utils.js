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

export { getFileInfo, clearRubbish };
