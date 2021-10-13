<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/混乱博物馆/Vol.301-323/";
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
    name: "Vol.301 那个人到底在吶喊什么.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "82.5 MB",
  },
  {
    key: 1,
    name: "Vol.302 人可以只吃肉吗.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "99.89 MB",
  },
  {
    key: 2,
    name: "Vol.303 「返老还童药」鉴定指南.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "108.73 MB",
  },
  {
    key: 3,
    name: "Vol.304 怎么还有人觉得登月是假的？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "103.72 MB",
  },
  {
    key: 4,
    name: "Vol.305 石油到底还能用多久.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "138.02 MB",
  },
  {
    key: 5,
    name: "Vol.306 为什么波普艺术有一股鬼畜味儿.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "121.59 MB",
  },
  {
    key: 6,
    name: "Vol.307 什么样的塑料可以种出来.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "89.85 MB",
  },
  {
    key: 7,
    name: "Vol.308 人没有胆会怎样.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "107.24 MB",
  },
  {
    key: 8,
    name: "Vol.309 太阳光子如何抵达你的身边.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "76.07 MB",
  },
  {
    key: 9,
    name: "Vol.310 遗忘能帮你做什么.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "79.52 MB",
  },
  {
    key: 10,
    name: "Vol.311 宇宙飞船设计简史.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "75.91 MB",
  },
  {
    key: 11,
    name: "Vol.312 阴间到底归谁管.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "99.82 MB",
  },
  {
    key: 12,
    name: "Vol.313 你的衣服是怎么进化的.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "121.01 MB",
  },
  {
    key: 13,
    name: "Vol.314 人类祖传发动机设计与维修艺术.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "131.36 MB",
  },
  {
    key: 14,
    name: "Vol.315 穿越到一万年前能吃什么饭.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "97.83 MB",
  },
  {
    key: 15,
    name: "Vol.316 好吃的蟹是什么虾.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "106.09 MB",
  },
  {
    key: 16,
    name: "Vol.317 幽灵军团：从戒灵到女巫.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "165.45 MB",
  },
  {
    key: 17,
    name: "Vol.318 如何成为一条合格的金鱼.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "71.19 MB",
  },
  {
    key: 18,
    name: "Vol.319 鲸粪有什么了不起.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "108.02 MB",
  },
  {
    key: 19,
    name: "Vol.320 车轮进化简史.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "133.26 MB",
  },
  {
    key: 20,
    name: "Vol.321 最昂贵的包装盒.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "88.92 MB",
  },
  {
    key: 21,
    name: "Vol.322 发烧时掉进兔子洞.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "105.54 MB",
  },
  {
    key: 22,
    name: "Vol.323 拉斐尔们究竟对众神做了什么.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "67.72 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
