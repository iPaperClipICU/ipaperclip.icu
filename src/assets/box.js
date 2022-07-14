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
 * 整理查询参数
 * @param {String} search location.search
 * @param {String} key 键
 * @returns {JSON|String|undefined} 整理后的查询参数
 */
const getSearch = (search, key = null) => {
  if (search == "") {
    return void 0;
  } else {
    const searchList = search.replace("?", "").split("&");
    const searchData = {};
    for (const i in searchList) {
      const tmp = searchList[i].split("=");

      if (key != null && key == tmp[0]) return tmp[1];
      searchData[tmp[0]] = tmp[1];
    }
    return searchData;
  }
};

export { getFileInfo, getSearch };
