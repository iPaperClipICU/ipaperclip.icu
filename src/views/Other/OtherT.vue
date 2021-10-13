<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/其他/第三方视频/";
const createColumns = () => {
  return [
    {
      type: "expand",
      renderExpand: (rowData) => {
        if (rowData.type_name == "video") {
          return h(AVideo, { src: urlTop + rowData.name });
        } else if (rowData.type_name == "image") {
          return h(AImage, { src: urlTop + rowData.name });
        } else if (rowData.type_name == "audio") {
          return h(AAudio, { src: urlTop + rowData.name });
        }
      },
    },
    {
      title: "文件名",
      key: "name",
      render(row) {
        return h(
          NButton,
          { text: "" },
          { icon: () => row.type, default: () => row.name }
        );
      },
    },
    { title: "最后更新时间", key: "time" },
    { title: "大小", key: "size" },
  ];
};
const createData = () => [
  {
    key: 0,
    name: "BILIBILI 百大UP主颁奖.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "87.84 MB",
  },
  {
    key: 1,
    name: "【梁如石】关于回形针的视频对线活动，我还有这些话想说.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "272.24 MB",
  },
  {
    key: 2,
    name: "你被固有思维限制住了吗？ - 我是EyeOpener.flv",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "48.76 MB",
  },
  {
    key: 3,
    name: "科学咖啡馆：吴松磊 对话“嫦娥之父”，新选题有了.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "46.8 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
