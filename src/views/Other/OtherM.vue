<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/其他/媒体报道/";
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
    name: "94年男生做科普视频爆红：摄像头如何监控13亿人.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "39.13 MB",
  },
  {
    key: 1,
    name: "专访回形针吴松磊：我希望没有人知道我 - 你好！创作者.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "149.74 MB",
  },
  {
    key: 2,
    name: "回形针制作人吴松磊：如何讲清楚一个有道理的世界.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "21.59 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
