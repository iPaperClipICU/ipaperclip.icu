<template>
  <n-card hoverable>
    <!-- TODO: 显示搜索结果数 -->
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
      <div v-if="showSearchNum">共找到相关结果 {{ searchNum }} 个</div>
      <div v-if="showFilesMenu == true">
        <FilesMenu :data="FilesMenu_data" />
      </div>
      <!-- Null -->
      <n-empty v-if="showErrorEmpty" description="请输入关键词" />
      <n-empty v-if="showNullEmpty" description="找不到和查询相匹配的结果" />
    </n-card>
  </div>
</template>

<script>
import { h, defineComponent, ref } from "vue";
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
import FilesMenu from "@/components/FilesMenu";
import data from "@/assets/data.json";

const getKeyWord = () => {
  const search = location.search;
  if (search == "") {
    return void 0;
  } else {
    const searchList = search.replace("?", "").split("&");
    for (const i in searchList) {
      if (searchList[i].split("=")[0] == "s") {
        return String(searchList[i].split("=")[1]);
      }
    }
  }
};

const init = () => {
  const KeyWord = getKeyWord();
  if (KeyWord == void 0) {
    // 没有搜索关键字
    showErrorEmpty.value = true;
    return;
  }
  searchValue.value = KeyWord;

  const searchData = {
    search: true,
    data: [],
  };
  const keyword = KeyWord.toLocaleLowerCase();
  for (const i in data.searchData) {
    if (i.toLocaleLowerCase().indexOf(keyword) != -1) {
      if (data.searchData[i].length == 2) {
        // 有Tag
        searchData.data.push({
          name: i,
          hrefHead: `/${data.searchData[i][0]}/${data.searchData[i][1]}`,
          tag: `[${data.searchData[i][0]}/${data.searchData[i][1]}]`,
        });
      } else {
        // 没有Tag
        searchData.data.push({
          name: i,
          hrefHead: `/${data.searchData[i][0]}`,
          tag: `[${data.searchData[i][0]}]`,
        });
      }
    }
  }

  if (searchData.data.length == 0) {
    showNullEmpty.value = true;
  } else {
    FilesMenu_data.value = searchData;
    searchNum.value = searchData.data.length;
    showFilesMenu.value = true;
    showSearchNum.value = true;
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
            "on-select": (key) => {
              location.href = key;
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

const showNullEmpty = ref(false);
const showErrorEmpty = ref(false);
const showFilesMenu = ref(false);
const showSearchNum = ref(false);

const FilesMenu_data = ref({
  hrefHead: "/test",
  search: false,
  data: [
    {
      name: "test",
    },
  ],
});
const searchNum = ref(0);

const CMenu = getCMenu();
const searchValue = ref("");
export default defineComponent({
  components: {
    CMenu,
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
      showNullEmpty,
      showErrorEmpty,
      showFilesMenu,
      showSearchNum,
      FilesMenu_data,
      searchNum,
      searchValue,
      searchButton: (e) => {
        e.preventDefault();
        location.href = `/search?s=${searchValue.value}`;
      },
    };
  },
});
</script>
