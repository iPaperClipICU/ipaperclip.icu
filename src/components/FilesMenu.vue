<template>
  <n-menu :options="getMenuOptions(props.data)" />
</template>

<script>
import { defineComponent, h } from "vue";
import {
  FileRegular as FileIcon,
  FileVideoRegular as FileVideoIcon,
  FileAudioRegular as FileAudioIcon,
  FileImageRegular as FileImageIcon,
} from "@vicons/fa";
import { NIcon, NMenu } from "naive-ui";
import CMenu from "@/components/CMenu";
import { getFileInfo } from "@/assets/box.js";

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
};

// {
//   hrefHead: "",
//   data: [
//     {
//       name: "",
//     },
//   ],
// };
const getMenuOptions = (data) => {
  if (data == undefined) return;
  const hrefHead = data.hrefHead;
  if (data.search) {
    return getMenuOptions_search(data.data);
  }
  data = data.data;

  var menuOptions = [];

  for (const i in data) {
    var fileInfo;
    if (data[0].name == undefined) {
      // 文件列表
      fileInfo = getFileInfo(data[i]);
    } else {
      // 首页
      fileInfo = getFileInfo(data[i].name);
    }

    const name = fileInfo.name;
    var type;
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
  var menuOptions = [];

  for (const i in data) {
    var fileInfo = getFileInfo(data[i].name);

    const name = fileInfo.name;
    var type;
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

export default defineComponent({
  components: { NMenu },
  props: ["data"],
  setup(props) {
    return {
      props,
      getMenuOptions,
    };
  },
});
</script>
