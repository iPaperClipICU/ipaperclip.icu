<template>
  <n-card>
    <TestView />
    <n-divider />
    <!-- 文件夹 -->
    <div v-if="showFilesMenu == true">
      <FilesMenu :data="FilesMenu_data" />
    </div>
    <!-- Null -->
    <n-empty v-if="showEmpty" description="请在「菜单」中选择" />
    <!-- 文件 -->
    <div v-if="showShowFile" style="margin-top: 15px">
      <ShowFile :data="ShowFile_data" />
    </div>
  </n-card>
</template>

<script>
import { ref, defineComponent } from "vue";
import router from "@/router";
import { NCard, NEmpty, NDivider } from "naive-ui";
import TestView from "@/views/TestView";
import ShowFile from "@/components/ShowFile";
import FilesMenu from "@/components/FilesMenu";
import data from "@/assets/data.json";
import { getFileInfo } from "@/assets/box.js";

/**
 * 获取data
 */
const getData = (data, name) => {
  for (const i in data) {
    if (data[i].name == name) {
      return data[i];
    }
  }
  // 没有找到
  showTabs.value = false;
  showFilesMenu.value = false;
  showEmpty.value = true;
  showShowFile.value = false;
  return null;
};

/**
 * /
 * /files
 * /files/tag
 * /files/tag/file
 * /files/file
 */

const init = () => {
  const path = location.pathname;

  showTabs.value = false;
  showFilesMenu.value = false;
  showEmpty.value = false;
  showShowFile.value = false;

  if (path == "/") {
    // Path: /
    showEmpty.value = true;
  } else {
    const filesName = decodeURIComponent(path.split("/")[1]);
    const filesData = getData(data, filesName);
    if (filesData == null) return;

    if (filesData.tag) {
      var tagName = decodeURIComponent(path.split("/")[2]);
      if (tagName == "undefined") {
        tagName = filesData.data[0].name;
        router.push(`/${filesName}/${tagName}`);
      }

      const tagData = getData(filesData.data, tagName);
      if (tagData == null) return;
      const fileName = decodeURIComponent(path.split("/")[3]);

      if (fileName == "undefined" || fileName == "") {
        // Path: /files/tag
        FilesMenu_data.value = {
          hrefHead: `/${filesName}/${tagName}`,
          data: tagData.data,
        };
        showTabs.value = true;
        showFilesMenu.value = true;
      } else {
        // Path: /files/tag/file
        var fileNameW = undefined;
        for (const i in tagData.data) {
          if (fileName == tagData.data[i].substr(0, fileName.length)) {
            fileNameW = tagData.data[i];
          }
        }
        if (fileNameW == undefined) {
          showTabs.value = false;
          showFilesMenu.value = false;
          showEmpty.value = true;
          showShowFile.value = false;
          return;
        }

        ShowFile_data.value = {
          type: getFileInfo(fileNameW).type,
          name: fileName,
          url: `https://file.hsyhx.top/video/${filesName}/${tagName}/${fileNameW}`,
        };
        showShowFile.value = true;
      }
    } else {
      const fileName = decodeURIComponent(path.split("/")[2]);

      if (fileName == "undefined" || fileName == "") {
        // Path: /files
        FilesMenu_data.value = {
          hrefHead: `/${filesName}`,
          data: filesData.data,
        };
        showFilesMenu.value = true;
      } else {
        // Path: /files/file
        var fileNameM = undefined;
        for (const i in filesData.data) {
          if (fileName == filesData.data[i].substr(0, fileName.length)) {
            fileNameM = filesData.data[i];
          }
        }
        if (fileNameM == undefined) {
          showTabs.value = false;
          showFilesMenu.value = false;
          showEmpty.value = true;
          showShowFile.value = false;
          return;
        }

        ShowFile_data.value = {
          type: getFileInfo(fileNameM).type,
          name: fileName,
          url: `https://file.hsyhx.top/video/${filesName}/${fileNameM}`,
        };
        showShowFile.value = true;
      }
    }
  }
};

// Show
const showTabs = ref(false);
const showFilesMenu = ref(false);
const showEmpty = ref(false);
const showShowFile = ref(false);
// Data
const FilesMenu_data = ref({
  hrefHead: "/test",
  data: [
    {
      name: "123",
      type: "files",
    },
  ],
});
const ShowFile_data = ref({
  type: "audio",
  name: "test audio",
  url: "https://file.hsyhx.top/video/%E5%85%B6%E4%BB%96/%E9%9D%9E%E8%A7%86%E9%A2%91/PlayGround%20%E6%90%AD%E5%BB%BA%E4%BD%A0%E7%9A%84%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C%20-%20%E5%BD%AD%E5%AF%92.mp3",
});
export default defineComponent({
  components: {
    TestView,
    ShowFile,
    FilesMenu,
    NCard,
    NEmpty,
    NDivider,
  },
  setup() {
    init();
    return {
      // Show
      showTabs,
      showFilesMenu,
      showEmpty,
      showShowFile,
      // Data
      FilesMenu_data,
      ShowFile_data,
      TabsUpdate_function(value) {
        // Path: /files/tag
        const path = location.pathname;
        const filesName = decodeURIComponent(path.split("/")[1]);
        const filesData = getData(data, filesName);
        if (filesData == null) return;
        const tagData = getData(filesData.data, value);
        if (tagData == null) return;

        router.push(`/${filesName}/${value}`);
        FilesMenu_data.value = {
          hrefHead: `/${filesName}/${value}`,
          data: tagData.data,
        };
      },
    };
  },
});
</script>
