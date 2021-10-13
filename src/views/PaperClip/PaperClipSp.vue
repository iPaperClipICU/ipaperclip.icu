<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/回形针PaperClip/Sp/";
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
    name: "Sp.001 2018 年回形针如何赚钱？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "17.41 MB",
  },
  {
    key: 1,
    name: "Sp.002 我们做了一个真正的当代生活说明书.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "11.81 MB",
  },
  {
    key: 2,
    name: "Sp.003 解谜 PaperClip100：球赛、机票、 脚本和 DDoS 攻击.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "71.77 MB",
  },
  {
    key: 3,
    name: "Sp.004 2019 年回形针赚了多少钱？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "35.35 MB",
  },
  {
    key: 4,
    name: "Sp.005 关于新冠肺炎的一切.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "74.23 MB",
  },
  {
    key: 5,
    name: "Sp.006 幕后故事：回形针是怎么做视频的.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "228.77 MB",
  },
  {
    key: 6,
    name: "Sp.007 工作汇报：最近半年我们都干了什么？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "39.44 MB",
  },
  {
    key: 7,
    name: "Sp.008 和 10 个批评者一块聊天.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "1.04 GB",
  },
  {
    key: 8,
    name: "Sp.008 预告片：和 10 个批评者一块视频聊天 温馨版.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "21.72 MB",
  },
  {
    key: 9,
    name: "Sp.008 预告片：和 10 个批评者一块视频聊天.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "12.11 MB",
  },
  {
    key: 10,
    name: "Sp.009 2020 年回形针赚了多少钱？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "70.35 MB",
  },
  {
    key: 11,
    name: "Sp.010 直面问题：我们为什么又上热搜了？ P2.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "82.31 MB",
  },
  {
    key: 12,
    name: "Sp.010 直面问题：我们为什么又上热搜了？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "40.76 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
