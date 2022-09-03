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
      <TagMenu />
      <n-divider />
      <!-- 文件夹 -->
      <FilesMenu v-if="store.state.AtPageType == 'Files'" />
      <!-- 文件 -->
      <div v-if="store.state.AtPageType == 'File'" style="margin-top: 15px">
        <FileCard />
      </div>
      <!-- Null -->
      <n-empty
        v-if="store.state.AtPageType == 'Home'"
        description="请在「菜单」中选择"
      />
    </n-card>
  </div>
  <div v-if="store.state.AtPageType == 'Home'" style="margin-top: 15px">
    <READMECard />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, defineComponent } from "vue";
import {
  NGi,
  NCard,
  NGrid,
  NEmpty,
  NInput,
  NButton,
  NDivider,
  NInputGroup,
} from "naive-ui";
import router from "@/router";
import TagMenu from "@/components/TagMenu.vue";
import FileCard from "@/components/FileCard.vue";
import FilesMenu from "@/components/FilesMenu.vue";
import READMECard from "@/components/READMECard.vue";
import data from "@/assets/data.json";
import { getFileInfo, clearRubbish } from "@/assets/utils.js";

/**
 * /
 * /files
 * /files/tag
 * /files/tag/file
 * /files/file
 */

const init = () => {
  const store = window.$store;
  const path = decodeURIComponent(location.pathname);
  const pathList = path.split("/");
  const filesName = pathList[1];

  const filesData = data.data[filesName];
  if (path == "/" || filesData == void 0) {
    // Path: / || FilesName错误
    store.commit("setAtPageType", "Home");
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
      return;
    }

    const fileName = pathList[3];
    if (fileName == void 0) {
      // /files/tag
      store.commit("setAtPageType", "Files");
      store.commit("setState", (state) => {
        state.FilesMenuData = {
          hrefHead: `/${filesName}/${tagName}`,
          data: tagData,
        };
      });
      store.commit("setState", (state) => {
        state.AtPageFilesName = filesName;
      });
    } else {
      // /files/tag/file
      store.commit("setAtPageType", "File");
      const fileNameC = data.searchData[fileName];
      if (
        fileNameC == void 0 ||
        fileNameC[0] != filesName ||
        fileNameC[1] != tagName
      ) {
        return;
      }

      store.commit("setState", (state) => {
        state.FileCardData = {
          type: getFileInfo(fileName).type,
          name: fileName,
          url: `https://file.hsyhx.top/video/${filesName}/${tagName}/${fileName}`,
        };
      });
      store.commit("setState", (state) => {
        state.AtPageFilesName = filesName;
      });
    }
  } else {
    // 无Tag

    const fileName = pathList[2];
    if (fileName == void 0) {
      // /files
      store.commit("setAtPageType", "Files");
      store.commit("setState", (state) => {
        state.FilesMenuData = {
          hrefHead: `/${filesName}`,
          data: filesData,
        };
      });
      store.commit("setState", (state) => {
        state.AtPageFilesName = filesName;
      });
    } else {
      // /files/file
      store.commit("setAtPageType", "File");
      const fileNameC = data.searchData[fileName];
      if (fileNameC == void 0 || fileNameC[0] != filesName) {
        return;
      }

      store.commit("setState", (state) => {
        state.FileCardData = {
          type: getFileInfo(fileName).type,
          name: fileName,
          url: `https://file.hsyhx.top/video/${filesName}/${fileName}`,
        };
      });
      store.commit("setState", (state) => {
        state.AtPageFilesName = filesName;
      });
    }
  }
};

// Data
// const FilesMenu_data = ref({
//   hrefHead: "/test",
//   search: false,
//   data: [
//     {
//       name: "test",
//     },
//   ],
// });
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
// const ShowFile_data = ref({
//   type: "audio",
//   name: "test audio",
//   url: "https://file.hsyhx.top/video/test.mp3",
// });
export default defineComponent({
  components: {
    // Components
    TagMenu,
    FileCard,
    FilesMenu,
    READMECard,
    // NaiveUI
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
    const store = useStore();
    window.$store = store;
    store.commit("setState", (state) => {
      state.init = init;
    });
    init();

    const searchValue = ref("");
    return {
      store,
      // 搜索
      searchValue,
      searchButton: (e) => {
        e.preventDefault();
        // location.href = `/search?s=${searchValue.value}`;
        router.push(`/search?s=${searchValue.value}`);
        clearRubbish();
      },
    };
  },
});
</script>
