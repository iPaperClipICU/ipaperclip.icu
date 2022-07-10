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
    FileType = undefined;
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
export { getFileInfo };
