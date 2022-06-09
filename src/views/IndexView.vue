<template>
  <n-card>
    <!-- 面包屑 -->
    <UrlBreadcrumb :data="UrlBreadcrumb_data" />
    <!-- Tabs -->
    <n-tabs
      v-if="showTabs"
      type="line"
      :default-value="TabsDefault_value"
      @update:value="TabsUpdate_function"
    >
      <n-tab v-for="(item, index) in TabsData_value" :key="index" :name="item">
        {{ item }}
      </n-tab>
    </n-tabs>
    <!-- 文件夹 -->
    <div v-if="showFilesMenu == true">
      <FilesMenu :data="FilesMenu_data" />
    </div>
    <!-- Null -->
    <n-empty v-if="showEmpty" description="无数据">
      <template #extra>
        <n-button @click="BackToHome_function">返回首页</n-button>
      </template>
    </n-empty>
    <!-- 文件 -->
    <div v-if="showShowFile" style="margin-top: 15px">
      <ShowFile :data="ShowFile_data" />
    </div>
  </n-card>
</template>

<script>
import { ref, defineComponent } from "vue";
import { NCard, NTabs, NTab, NEmpty, NButton } from "naive-ui";
import router from "@/router";
import UrlBreadcrumb from "@/components/UrlBreadcrumb";
import FilesMenu from "@/components/FilesMenu";
import ShowFile from "@/components/ShowFile";
import data from "@/assets/data.json";

/**
 * 获取data
 */
const getData = (data, name) => {
  for (const i in data) {
    if (data[i].name == name) {
      return data[i];
    }
  }
  showTabs.value = false;
  showFilesMenu.value = false;
  showEmpty.value = true;
  showShowFile.value = false;
  return null;
};

const getFileName = (fileName) => {
  return fileName
    .replace(".mp4", "")
    .replace(".flv", "")
    .replace(".jpg", "")
    .replace(".png", "")
    .replace(".gif", "")
    .replace(".mp3", "")
    .replace(".flac", "");
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
    UrlBreadcrumb_data.value = [
      {
        name: "首页",
        href: "/",
      },
    ];
    FilesMenu_data.value = {
      hrefHead: "",
      data: data,
    };
    showFilesMenu.value = true;
  } else {
    const filesName = decodeURIComponent(path.split("/")[1]);
    const filesData = getData(data, filesName);
    if (filesData == null) return;

    if (filesData.data[0].type == "tag") {
      var tagName = decodeURIComponent(path.split("/")[2]);
      if (tagName == "undefined") {
        tagName = filesData.data[0].name;
        router.push(`/${filesName}/${tagName}`);
      }

      const tagData = getData(filesData.data, tagName);
      if (tagData == null) return;
      const fileName = decodeURIComponent(path.split("/")[3]);

      if (fileName == "undefined") {
        // Path: /files/tag
        UrlBreadcrumb_data.value = [
          {
            name: "首页",
            href: "/",
          },
          {
            name: filesName,
            href: `/${filesName}`,
          },
          {
            name: tagName,
            href: `/${filesName}/${tagName}`,
          },
        ];
        TabsDefault_value.value = tagName;
        TabsData_value.value = [];
        for (const i in filesData.data) {
          TabsData_value.value.push(filesData.data[i].name);
        }
        FilesMenu_data.value = {
          hrefHead: `/${filesName}/${tagName}`,
          data: tagData.data,
        };
        showTabs.value = true;
        showFilesMenu.value = true;
      } else {
        // Path: /files/tag/file
        const fileData = getData(tagData.data, fileName);
        if (fileData == null) return;

        UrlBreadcrumb_data.value = [
          {
            name: "首页",
            href: "/",
          },
          {
            name: filesName,
            href: `/${filesName}`,
          },
          {
            name: tagName,
            href: `/${filesName}/${tagName}`,
          },
          {
            name: getFileName(fileName),
            href: `/${filesName}/${tagName}/${fileName}`,
          },
        ];
        ShowFile_data.value = {
          type: fileData.type,
          name: getFileName(fileName),
          url: `https://file.hsyhx.top/video/${filesName}/${tagName}/${fileName}`,
        };
        showShowFile.value = true;
      }
    } else {
      const fileName = decodeURIComponent(path.split("/")[2]);

      if (fileName == "undefined") {
        // Path: /files
        UrlBreadcrumb_data.value = [
          {
            name: "首页",
            href: "/",
          },
          {
            name: filesName,
            href: `/${filesName}`,
          },
        ];
        FilesMenu_data.value = {
          hrefHead: `/${filesName}`,
          data: filesData.data,
        };
        showFilesMenu.value = true;
      } else {
        // Path: /files/file
        const fileData = getData(filesData.data, fileName);
        if (fileData == null) return;

        UrlBreadcrumb_data.value = [
          {
            name: "首页",
            href: "/",
          },
          {
            name: filesName,
            href: `/${filesName}`,
          },
          {
            name: getFileName(fileName),
            href: `/${filesName}/${fileName}`,
          },
        ];
        ShowFile_data.value = {
          type: fileData.type,
          name: getFileName(fileName),
          url: `https://file.hsyhx.top/video/${filesName}/${fileName}`,
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
const UrlBreadcrumb_data = ref([
  {
    name: "首页",
    href: "/",
  },
]);
const TabsDefault_value = ref("t1");
const TabsData_value = ref(["t1", "t2"]);
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
    UrlBreadcrumb,
    FilesMenu,
    ShowFile,
    NCard,
    NTabs,
    NTab,
    NEmpty,
    NButton,
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
      UrlBreadcrumb_data,
      FilesMenu_data,
      ShowFile_data,
      TabsDefault_value,
      TabsData_value,
      TabsUpdate_function(value) {
        // Path: /files/tag
        const path = location.pathname;
        const filesName = decodeURIComponent(path.split("/")[1]);
        const filesData = getData(data, filesName);
        if (filesData == null) return;
        const tagData = getData(filesData.data, value);
        if (tagData == null) return;

        router.push(`/${filesName}/${value}`);
        UrlBreadcrumb_data.value = [
          {
            name: "首页",
            href: "/",
          },
          {
            name: filesName,
            href: `/${filesName}`,
          },
          {
            name: value,
            href: `/${filesName}/${value}`,
          },
        ];
        FilesMenu_data.value = {
          hrefHead: `/${filesName}/${value}`,
          data: tagData.data,
        };
      },
      BackToHome_function(e) {
        e.preventDefault();
        window.location.href = "/";
      },
    };
  },
});
</script>
