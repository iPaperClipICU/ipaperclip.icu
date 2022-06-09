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

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) });
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

// {
//   hrefHead: "",
//   data: [
//     {
//       name: "",
//       type: "",
//     },
//   ],
// };
const getMenuOptions = (data) => {
  if (data == undefined) return;
  const hrefHead = data.hrefHead;
  data = data.data;

  var menuOptions = [];

  for (const i in data) {
    const fileData = data[i];
    const name = fileData.name;
    var type = fileData.type;

    if (type == "video") {
      type = renderIcon(FileVideoIcon);
    } else if (type == "audio") {
      type = renderIcon(FileAudioIcon);
    } else if (type == "image") {
      type = renderIcon(FileImageIcon);
    } else if (type == "files") {
      type = renderIcon(FileIcon);
    }

    menuOptions.push({
      label: () =>
        h(
          "a",
          {
            href: `${hrefHead}/${name}`,
          },
          { default: () => getFileName(name) }
        ),
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
//       h(
//         RouterLink,
//         {
//           to: {
//             path: "/test",
//           },
//         },
//         { default: () => "test" }
//       ),
//     key: "test",
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
