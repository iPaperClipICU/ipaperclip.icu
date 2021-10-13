<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/混乱博物馆/其他/";
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
    name: "下下期节目预告.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "20.23 MB",
  },
  {
    key: 1,
    name: "中国儿童第一大意外死亡原因，你我可能都没意识到.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "65.38 MB",
  },
  {
    key: 2,
    name: "国庆特辑 刘馆长答读者问 严肃篇.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "33.17 MB",
  },
  {
    key: 3,
    name: "国庆特辑 刘馆长答读者问 无厘头篇.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "25.45 MB",
  },
  {
    key: 4,
    name: "国庆特辑 刘馆长答读者问 脑洞篇.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "37.79 MB",
  },
  {
    key: 5,
    name: "混乱博物馆200期啦.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "19.98 MB",
  },
  {
    key: 6,
    name: "混乱博物馆×蘸酱 虚拟现食 为什么吃螺蛳粉会上癮.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "136.81 MB",
  },
  {
    key: 7,
    name: "特别展出 音乐与动画的妙趣结晶：1964年实验短片《卡农》.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "70.62 MB",
  },
  {
    key: 8,
    name: "赛博养生堂 科学熬夜终极人间指南.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "128.94 MB",
  },
  {
    key: 9,
    name: "阿尔兹海默症到底是什么回事·上集.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "27.65 MB",
  },
  {
    key: 10,
    name: "阿尔兹海默症到底是什么回事·下集.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "41.61 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
