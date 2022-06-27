<template>
  <n-card>
    <!-- 菜单 -->
    <CMenu />
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
import { h, ref, defineComponent } from "vue";
import router from "@/router";
import { NCard, NEmpty, NDivider, NButton, NDropdown, NSpace } from "naive-ui";
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

const getCMenu = () => {
  const filesName = decodeURIComponent(location.pathname.split("/")[1]);
  const getButton = (name, at, click) => {
    let type = "";
    if (at) type = "primary";
    else type = "default";

    return h(
      NButton,
      {
        text: true,
        size: "large",
        type,
        "on-click": () => {
          if (click) location.href = `/${name}`;
        },
      },
      {
        default: () => name,
      }
    );
  };

  let MenuList = [];
  for (const i in data) {
    let at;
    if (filesName == data[i].name) at = true;
    else at = false;

    if (data[i].tag) {
      // 有Tag
      let options = [];
      for (const ii in data[i].data) {
        options.push({
          label: data[i].data[ii].name,
          key: `/${data[i].name}/${data[i].data[ii].name}`,
        });
      }

      MenuList.push(
        h(
          NDropdown,
          {
            trigger: "hover",
            options: options,
            "on-select": (key) => {
              location.href = key;
            },
          },
          {
            default: () => getButton(data[i].name, at, false),
          }
        )
      );
    } else {
      // 没有Tag
      MenuList.push(getButton(data[i].name, at, true));
    }
  }

  return h(
    NSpace,
    {
      justify: "center",
      size: 30,
    },
    {
      default: () => MenuList,
    }
  );
};

const CMenu = getCMenu();
// Show
const showEmpty = ref(false);
const showShowFile = ref(false);
const showFilesMenu = ref(false);
// Data
const FilesMenu_data = ref({
  hrefHead: "/test",
  data: [
    {
      name: "test",
      type: "files",
    },
  ],
});
const ShowFile_data = ref({
  type: "audio",
  name: "test audio",
  url: "https://file.hsyhx.top/video/test.mp3",
});
export default defineComponent({
  components: {
    CMenu,
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
      showEmpty,
      showShowFile,
      showFilesMenu,
      // Data
      ShowFile_data,
      FilesMenu_data,
    };
  },
});
</script>
