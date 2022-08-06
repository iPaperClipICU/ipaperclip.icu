<template>
  <n-card hoverable>
    <n-grid :cols="4" item-responsive>
      <n-gi span="4 425:2 705:1">
        <n-input-group>
          <n-input v-model:value="searchValue" placeholder="搜索" clearable />
          <n-button type="primary" @click="searchButton" ghost>搜索</n-button>
        </n-input-group>
      </n-gi>
      <n-gi span="0 425:2 705:3" />
    </n-grid>
  </n-card>
  <div style="padding-top: 15px">
    <n-card hoverable>
      <!-- 菜单 -->
      <CMenu />
      <n-divider />
      <!-- 文件夹 -->
      <div v-if="showFilesMenu">
        <FilesMenu :data="FilesMenu_data" @refresh="FilesMenuRefresh" />
      </div>
      <!-- 文件 -->
      <div v-if="showShowFile" style="margin-top: 15px">
        <ShowFile :data="ShowFile_data" />
      </div>
      <!-- Null -->
      <n-empty v-if="showEmpty" description="请在「菜单」中选择" />
    </n-card>
  </div>
  <div v-if="showREADME" style="padding-top: 15px">
    <READMECard />
  </div>
</template>

<script>
import { h, ref, defineComponent } from "vue";
import router from "@/router";
import {
  NGi,
  NCard,
  NGrid,
  NEmpty,
  NInput,
  NSpace,
  NButton,
  NDivider,
  NDropdown,
  NInputGroup,
} from "naive-ui";
import ShowFile from "@/components/ShowFile";
import FilesMenu from "@/components/FilesMenu";
import READMECard from "@/components/READMECard";
import data from "@/assets/data.json";
import { getFileInfo } from "@/assets/box.js";

const setNullState = () => {
  showFilesMenu.value = false;
  showShowFile.value = false;
  showEmpty.value = true;
};

/**
 * /
 * /files
 * /files/tag
 * /files/tag/file
 * /files/file
 */

const init = () => {
  const path = decodeURIComponent(location.pathname);
  const pathList = path.split("/");
  const filesName = pathList[1];

  showFilesMenu.value = false;
  showShowFile.value = false;
  showEmpty.value = false;
  showREADME.value = false;

  if (path == "/") showREADME.value = true;

  const filesData = data.data[filesName];
  if (path == "/" || filesData == void 0) {
    // Path: / || FilesName错误
    setNullState();
    return;
  }

  if (filesData[0] == void 0) {
    // 有Tag

    // 获取TagName
    let tagName = pathList[2];
    if (tagName == void 0 || tagName == "") {
      // 缺少TagName
      for (const i in data.menuData) {
        if (data.menuData[i][0] == filesName) {
          tagName = data.menuData[i][1][0];
          router.push(`/${filesName}/${tagName}`);
        }
      }
    }
    const tagData = filesData[tagName];

    if (tagData == void 0) {
      setNullState();
      return;
    }

    const fileName = pathList[3];
    if (fileName == void 0) {
      // /files/tag
      FilesMenu_data.value = {
        hrefHead: `/${filesName}/${tagName}`,
        data: tagData,
      };
      showFilesMenu.value = true;
    } else {
      // /files/tag/file
      const fileNameC = data.searchData[fileName];
      if (
        fileNameC == void 0 ||
        fileNameC[0] != filesName ||
        fileNameC[1] != tagName
      ) {
        setNullState();
        return;
      }

      ShowFile_data.value = {
        type: getFileInfo(fileName).type,
        name: fileName,
        url: `https://file.hsyhx.top/video/${filesName}/${tagName}/${fileName}`,
      };
      showShowFile.value = true;
    }
  } else {
    // 无Tag

    const fileName = pathList[2];
    if (fileName == void 0) {
      // /files
      FilesMenu_data.value = {
        hrefHead: `/${filesName}`,
        data: filesData,
      };
      showFilesMenu.value = true;
    } else {
      // /files/file
      const fileNameC = data.searchData[fileName];
      if (fileNameC == void 0 || fileNameC[0] != filesName) {
        setNullState();
        return;
      }

      ShowFile_data.value = {
        type: getFileInfo(fileName).type,
        name: fileName,
        url: `https://file.hsyhx.top/video/${filesName}/${fileName}`,
      };
      showShowFile.value = true;
    }
  }
};

const getCMenu = () => {
  const filesName = decodeURIComponent(location.pathname).split("/")[1];
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
        "on-click": async () => {
          if (click) {
            await router.push(`/${name}`);
            init();
          }
        },
      },
      {
        default: () => name,
      }
    );
  };

  let MenuList = [];
  for (const i in data.menuData) {
    const MenuData = data.menuData[i];
    let at;
    if (filesName == MenuData[0]) at = true;
    else at = false;

    if (MenuData.length == 2) {
      // 有Tag
      let options = [];
      for (const ii in MenuData[1]) {
        options.push({
          label: MenuData[1][ii],
          key: `/${MenuData[0]}/${MenuData[1][ii]}`,
        });
      }

      MenuList.push(
        h(
          NDropdown,
          {
            trigger: "hover",
            options: options,
            "on-select": async (key) => {
              await router.push(key);
              init();
            },
          },
          {
            default: () => getButton(MenuData[0], at, false),
          }
        )
      );
    } else {
      // 没有Tag
      MenuList.push(getButton(MenuData[0], at, true));
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

const searchValue = ref("");
const CMenu = getCMenu();
// Show
const showEmpty = ref(false);
const showShowFile = ref(false);
const showFilesMenu = ref(false);
const showREADME = ref(false);
// Data
const FilesMenu_data = ref({
  hrefHead: "/test",
  search: false,
  data: [
    {
      name: "test",
    },
  ],
});
// const FilesMenu_data = ref({
//   search: true,
//   data: [
//     {
//       name: "test",
//       hrefHead: "/test",
//       tag: "[XXX]",
//     },
//   ],
// });
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
    READMECard,
    NGi,
    NCard,
    NGrid,
    NEmpty,
    NInput,
    NButton,
    NDivider,
    NInputGroup,
  },
  setup() {
    init();
    return {
      // Show
      showEmpty,
      showShowFile,
      showFilesMenu,
      showREADME,
      // Data
      ShowFile_data,
      FilesMenu_data,
      // 搜索
      searchValue,
      searchButton: (e) => {
        e.preventDefault();
        location.href = `/search?s=${searchValue.value}`;
      },
      FilesMenuRefresh: () => {
        init();
      },
    };
  },
});
</script>
