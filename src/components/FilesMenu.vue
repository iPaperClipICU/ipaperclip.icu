<template>
  <n-menu :options="getMenuOptions(props.data)" />
  <div v-if="showPage">
    <n-pagination
      @update:page="updatePage"
      v-model:page="getPage"
      :page-count="maxPage"
    />
  </div>
</template>

<script>
import { h, ref, defineComponent } from "vue";
import {
  FileRegular as FileIcon,
  FileVideoRegular as FileVideoIcon,
  FileAudioRegular as FileAudioIcon,
  FileImageRegular as FileImageIcon,
} from "@vicons/fa";
import { NIcon, NMenu, NPagination } from "naive-ui";
import CMenu from "@/components/CMenu";
import { getFileInfo } from "@/assets/box.js";

const getPage = () => {
  const search = location.search;
  if (search == "") {
    return 1;
  } else {
    const searchList = search.replace("?", "").split("&");
    for (const i in searchList) {
      if (searchList[i].split("=")[0] == "p") {
        return Number(searchList[i].split("=")[1]);
      }
    }
  }
};

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

// {
//   hrefHead: "",
//   data: [["FileName"], ["FileName"]],
// };
const getMenuOptions = (data) => {
  if (data == undefined) return;
  const hrefHead = data.hrefHead;
  if (data.search) {
    return getMenuOptions_search(data.data);
  }
  const pages = data.data.length != 1;
  data = data.data;

  let menuOptions = [];

  if (pages) {
    showPage.value = true;
    maxPage.value = data.length;
    data = data[getPage() - 1];
  } else {
    data = data[0];
  }
  for (const i in data) {
    const fileName = data[i];
    let fileInfo;
    fileInfo = getFileInfo(fileName);

    const name = fileInfo.name;
    let type;
    switch (fileInfo.type) {
      case "video":
        type = renderIcon(FileVideoIcon);
        break;
      case "audio":
        type = renderIcon(FileAudioIcon);
        break;
      case "image":
        type = renderIcon(FileImageIcon);
        break;
      default:
        type = renderIcon(FileIcon);
    }

    menuOptions.push({
      label: () =>
        h(CMenu, null, {
          default: () =>
            h(
              "a",
              {
                href: `${hrefHead}/${name}`,
              },
              { default: () => name }
            ),
        }),
      icon: type,
      key: name,
    });
    menuOptions.push({
      key: "divider-" + name,
      type: "divider",
      props: {
        style: {
          marginLeft: "32px",
        },
      },
    });
  }

  menuOptions.pop();
  return menuOptions;
};

// {
//   search: true,
//   data: [
//     {
//       name: "test",
//       hrefHead: "/test",
//       tag: "[XXX]",
//     },
//   ],
// };
const getMenuOptions_search = (data) => {
  let menuOptions = [];

  for (const i in data) {
    let fileInfo = getFileInfo(data[i].name);

    const name = fileInfo.name;
    let type;
    switch (fileInfo.type) {
      case "video":
        type = renderIcon(FileVideoIcon);
        break;
      case "audio":
        type = renderIcon(FileAudioIcon);
        break;
      case "image":
        type = renderIcon(FileImageIcon);
        break;
      default:
        type = renderIcon(FileIcon);
    }

    menuOptions.push({
      label: () =>
        h(CMenu, null, {
          default: () =>
            h(
              "a",
              {
                href: `${data[i].hrefHead}/${name}`,
              },
              { default: () => `${data[i].tag} ${name}` }
            ),
        }),
      icon: type,
      key: name,
    });
    menuOptions.push({
      key: "divider-" + name,
      type: "divider",
      props: {
        style: {
          marginLeft: "32px",
        },
      },
    });
  }

  menuOptions.pop();
  return menuOptions;
};

// const menuOptions = [
//   {
//     label: () =>
//       h(CMenu, null, {
//         default: () =>
//           "我们在田野上面找猪 想象中已找到了三只 小鸟在白云上面追逐AAAAAAAAAAAAAAAAAAAAAAAAAA",
//       }),
//     key: "1",
//   },
// ];

const showPage = ref(false);
const maxPage = ref(100);
export default defineComponent({
  components: { NMenu, NPagination },
  props: ["data"],
  setup(props) {
    return {
      showPage,
      maxPage,
      props,
      getMenuOptions,
      getPage: getPage(),
      updatePage(page) {
        location.href = `${location.pathname}?p=${page}`;
      },
    };
  },
});
</script>
