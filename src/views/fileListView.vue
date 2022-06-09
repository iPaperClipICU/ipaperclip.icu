<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
import { defineComponent, ref, h } from "vue";
// import {
//   FileRegular as FileIcon,
//   FileVideoRegular as FileVideoIcon,
//   FileAudioRegular as FileAudioIcon,
//   FileImageRegular as FileImageIcon,
// } from "@vicons/fa";
import { RouterLink } from "vue-router";
import { NMenu } from "naive-ui";
// import data from "@/assets/data.json";

// const renderIcon = (icon) => {
//   return () => h(NIcon, null, { default: () => h(icon) });
// };

// const getFileName = (fileName) => {
//   return fileName
//     .replace(".mp4", "")
//     .replace(".flv", "")
//     .replace(".jpg", "")
//     .replace(".png", "")
//     .replace(".gif", "")
//     .replace(".mp3", "")
//     .replace(".flac", "");
// };

// const init = () => {
//   const path = location.pathname;
//   if (path == "/") {
//     for (var i in data) {
//       const item = data[i];
//       const name = item.name;

//       menuOptions.value.push({
//         label: () =>
//           h(
//             "a",
//             {
//               href: `/${name}`,
//             },
//             { default: () => name }
//           ),
//         icon: renderIcon(FileIcon),
//         key: name,
//       });
//       menuOptions.value.push({
//         key: "divider-" + name,
//         type: "divider",
//         props: {
//           style: {
//             marginLeft: "32px",
//           },
//         },
//       });
//     }
//     menuOptions.value.pop();
//   } else {
//     const filesName = decodeURIComponent(path.split("/")[1]);
//     var tagName = decodeURIComponent(path.split("/")[2]);

//     // eslint-disable-next-line no-redeclare
//     for (var i in data) {
//       const filesData = data[i];

//       if (filesData.name == filesName) {
//         if (tagName == "undefined") {
//           tagName = filesData.data[0].name;
//         }

//         // eslint-disable-next-line no-unused-vars
//         for (var ii in filesData.data) {
//           const tagData = filesData.data[ii];

//           if (tagData.name == tagName) {
//             console.log(filesData, tagData, tagName);

//             // eslint-disable-next-line no-unused-vars
//             for (var iii in tagData.data) {
//               const fileData = tagData.data[iii];
//               const name = fileData.name;
//               var type = fileData.type;

//               if (type == "video") {
//                 type = renderIcon(FileVideoIcon);
//               } else if (type == "audio") {
//                 type = renderIcon(FileAudioIcon);
//               } else if (type == "image") {
//                 type = renderIcon(FileImageIcon);
//               }

//               menuOptions.value.push({
//                 label: () =>
//                   h(
//                     "a",
//                     {
//                       href: `/${filesName}/${tagName}/${name}`,
//                     },
//                     { default: () => getFileName(name) }
//                   ),
//                 icon: type,
//                 key: name,
//               });
//               menuOptions.value.push({
//                 key: "divider-" + name,
//                 type: "divider",
//                 props: {
//                   style: {
//                     marginLeft: "32px",
//                   },
//                 },
//               });
//             }
//             menuOptions.value.pop();
//           }
//         }
//       }
//     }
//   }
// };

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/test",
          },
        },
        { default: () => "test" }
      ),
    key: "test",
  },
];

// const menuOptions = ref([]);
const activeKey = ref("");
export default defineComponent({
  components: { NMenu },
  setup() {
    // init();
    return {
      menuOptions,
      activeKey,
    };
  },
});
</script>
