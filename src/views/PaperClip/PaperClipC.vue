<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/回形针PaperClip/合作视频/";
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
    name: "PaperClip x Polestar 极星 安全气囊如何用炸药救人？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "87.94 MB",
  },
  {
    key: 1,
    name: "PaperClip × dyson 直升机、斯特塔管与吸尘器.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "58.06 MB",
  },
  {
    key: 2,
    name: "PaperClip × OLAY 是什么决定了你的肤色？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "57.41 MB",
  },
  {
    key: 3,
    name: "PaperClip × OPPO 如何成为碰碰车之王？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "52.98 MB",
  },
  {
    key: 4,
    name: "PaperClip × WWF 如何快速消灭全世界的森林？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "105.14 MB",
  },
  {
    key: 5,
    name: "PaperClip × 《年轮2020》 丈量 2020.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "52.42 MB",
  },
  {
    key: 6,
    name: "PaperClip × 东方时空 天问一号：登陆火星.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "65.86 MB",
  },
  {
    key: 7,
    name: "PaperClip × 中央广播电视台 如何下潜海底一万米？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "62.55 MB",
  },
  {
    key: 8,
    name: "PaperClip × 新华社客户端 民法典如何保护你的当代生活？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "65.06 MB",
  },
  {
    key: 9,
    name: "PaperClip × 柔宇科技 你究竟需要怎样的屏幕？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "102.63 MB",
  },
  {
    key: 10,
    name: "PaperClip × 梅赛德斯-奔驰 汽车仪表盘如何帮你好好开车？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "85.05 MB",
  },
  {
    key: 11,
    name: "PaperClip × 沃尔沃 如何造一辆舍己救人的汽车？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "65.48 MB",
  },
  {
    key: 12,
    name: "PaperClip × 沃尔沃 汽车车身如何护你周全？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "64.33 MB",
  },
  {
    key: 13,
    name: "PaperClip × 蔚来 为什么你的电动汽车越来越不值钱.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "53.6 MB",
  },
  {
    key: 14,
    name: "PaperClip × 蔚来 自动驾驶为什么这么难？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "59.89 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
