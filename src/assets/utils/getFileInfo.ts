/**
 * 通过文件名获取文件类型
 * @param FileName 文件名
 * @returns Data
 */
export const getFileInfo = (
  FileName: string,
): {
  name: string
  type: 'video' | 'audio' | 'image' | undefined
} => {
  let FileType: 'video' | 'audio' | 'image' | undefined = undefined

  if (FileName.endsWith('.mp4') || FileName.endsWith('.flv')) {
    FileType = 'video'
  } else if (FileName.endsWith('.jpg') || FileName.endsWith('.png') || FileName.endsWith('.gif')) {
    FileType = 'image'
  } else if (FileName.endsWith('.mp3') || FileName.endsWith('.flac')) {
    FileType = 'audio'
  }

  return {
    name: FileName.replace('.mp4', '')
      .replace('.flv', '')
      .replace('.jpg', '')
      .replace('.png', '')
      .replace('.gif', '')
      .replace('.mp3', '')
      .replace('.flac', ''),
    type: FileType,
  }
}
