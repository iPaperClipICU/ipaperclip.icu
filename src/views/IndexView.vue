<template>
  <n-card hoverable>
    <n-grid :cols="4" item-responsive>
      <n-gi span="4 425:2 705:1">
        <n-input-group>
          <n-input v-model:value="searchValue" placeholder="搜索" clearable />
          <n-button type="primary" ghost @click="searchButton">搜索</n-button>
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
      <div v-if="showFilesMenu == true">
        <FilesMenu :data="FilesMenu_data" />
      </div>
      <!-- Null -->
      <n-empty v-if="showEmpty" description="请在「菜单」中选择" />
      <n-empty v-if="showNullEmpty" description="找不到和查询相匹配的结果" />
      <!-- 文件 -->
      <div v-if="showShowFile" style="margin-top: 15px">
        <ShowFile :data="ShowFile_data" />
      </div>
    </n-card>
  </div>
</template>

<script>
import { h, ref, defineComponent } from "vue";
import router from "@/router";
import {
  NGi,
  NGrid,
  NCard,
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
import data from "@/assets/data.json";
import { getFileInfo } from "@/assets/box.js";

import * as IndexedDB from "@/assets/IndexedDB";

const FData = data["data"];

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
    const filesData = getData(FData, filesName);
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
  for (const i in FData) {
    let at;
    if (filesName == FData[i].name) at = true;
    else at = false;

    if (FData[i].tag) {
      // 有Tag
      let options = [];
      for (const ii in FData[i].data) {
        options.push({
          label: FData[i].data[ii].name,
          key: `/${FData[i].name}/${FData[i].data[ii].name}`,
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
            default: () => getButton(FData[i].name, at, false),
          }
        )
      );
    } else {
      // 没有Tag
      MenuList.push(getButton(FData[i].name, at, true));
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
const showNullEmpty = ref(false);
const showShowFile = ref(false);
const showFilesMenu = ref(false);
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
    NGi,
    NGrid,
    NCard,
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
      showNullEmpty,
      showFilesMenu,
      // Data
      ShowFile_data,
      FilesMenu_data,
      // 搜索
      searchValue,
      searchButton: async (e) => {
        e.preventDefault();

        if (searchValue.value == "") return;

        showEmpty.value = false;
        showShowFile.value = false;
        showNullEmpty.value = false;
        showFilesMenu.value = false;

        let searchData = {
          search: true,
          data: [],
        };

        /**
         * 通过游标读取数据
         * @param {IDBDatabase} db 数据库实例
         * @param {String} storeName 仓库名称
         * @param {String} keyWorld 查询关键字
         */
        const cursorSearchData = (db, storeName, keyWorld) => {
          // eslint-disable-next-line no-unused-vars
          return new Promise((resolve, reject) => {
            const KW = String(keyWorld.toLocaleLowerCase());
            let list = [];
            const request = db
              .transaction(storeName, "readwrite") //事务
              .objectStore(storeName) //仓库对象
              .openCursor(); //指针对象

            // 游标开启成功，逐行读数据
            request.onsuccess = (e) => {
              const cursor = e.target.result;
              if (cursor) {
                // 必须要检查
                if (cursor.value.fileName.toLocaleLowerCase().indexOf(KW) != -1)
                  list.push(cursor.value);
                cursor.continue(); //遍历了存储对象中的所有内容
              } else {
                // console.log("游标读取的数据：", list);
                resolve(list);
              }
            };
          });
        };

        const db = await IndexedDB.InitDB();
        const cursorSearchData_data = await cursorSearchData(
          db,
          "searchData",
          searchValue.value
        );
        IndexedDB.closeDB(db);

        for (const i in cursorSearchData_data) {
          const fileData = cursorSearchData_data[i];
          if (fileData.data.tag) {
            // 有Tag
            searchData.data.push({
              name: fileData.fileName,
              hrefHead: `/${fileData.data.filesName}/${fileData.data.tagName}`,
              tag: `[${fileData.data.filesName}/${fileData.data.tagName}]`,
            });
          } else {
            // 没有Tag
            searchData.data.push({
              name: fileData.fileName,
              hrefHead: `/${fileData.data.filesName}`,
              tag: `[${fileData.data.filesName}]`,
            });
          }
        }

        if (searchData.data.length == 0) {
          showNullEmpty.value = true;
        } else {
          FilesMenu_data.value = searchData;
          showFilesMenu.value = true;
        }
      },
    };
  },
});
</script>
