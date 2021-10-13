<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/回形针PaperClip/回形针事务所/";
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
    name: "回形针事务所 001 运动鞋和非牛顿流体.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "42.84 MB",
  },
  {
    key: 1,
    name: "回形针事务所 002 做完 1135 道题，我们看透了科目一.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "41.77 MB",
  },
  {
    key: 2,
    name: "回形针事务所 003 电池是怎么做出来的？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "42.87 MB",
  },
  {
    key: 3,
    name: "回形针事务所 004 固态硬盘到底好在哪？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "40.93 MB",
  },
  {
    key: 4,
    name: "回形针事务所 005 如何设计一个自动进化的知识网络？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "60.15 MB",
  },
  {
    key: 5,
    name: "回形针事务所 006 白噪音如何让你睡个好觉？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "35.92 MB",
  },
  {
    key: 6,
    name: "回形针事务所 007 游戏手机到底好在哪？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "66.58 MB",
  },
  {
    key: 7,
    name: "回形针事务所 008 为什么你的手机充电这么慢？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "33.23 MB",
  },
  {
    key: 8,
    name: "回形针事务所 009 如何造一台终生进化的风力发电机？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "55.89 MB",
  },
  {
    key: 9,
    name: "回形针事务所 010 你真的需要 120Hz 屏幕刷新率吗？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "51.8 MB",
  },
  {
    key: 10,
    name: "回形针事务所 011 回形针如何远程办公？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "35.12 MB",
  },
  {
    key: 11,
    name: "回形针事务所 012 为什么你家的 Wi Fi 这么慢？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "26.93 MB",
  },
  {
    key: 12,
    name: "回形针事务所 013 如何踢出一记漂亮的弧线球？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "59.28 MB",
  },
  {
    key: 13,
    name: "回形针事务所 014 为什么手机需要人工智能？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "46.76 MB",
  },
  {
    key: 14,
    name: "回形针事务所 015 5G 如何改变直播.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "71.26 MB",
  },
  {
    key: 15,
    name: "回形针事务所 016 如何科学地买卖二手书？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "73.47 MB",
  },
  {
    key: 16,
    name: "回形针事务所 017 为什么你的西服总是不合身？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "47.62 MB",
  },
  {
    key: 17,
    name: "回形针事务所 018 你打电话时究竟发生了什么？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "60.45 MB",
  },
  {
    key: 18,
    name: "回形针事务所 019 为什么你的手机总拍不好明暗细节？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "55.51 MB",
  },
  {
    key: 19,
    name: "回形针事务所 020 为什么你家的油烟机这么难用？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "80.99 MB",
  },
  {
    key: 20,
    name: "回形针事务所 021 如何做一件轻暖兼备的保暖内衣？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "63.06 MB",
  },
  {
    key: 21,
    name: "回形针事务所 022 如何身临其境地观看篮球赛.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "58.63 MB",
  },
  {
    key: 22,
    name: "回形针事务所 023 手机导航如何给你指条明路？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "68.85 MB",
  },
  {
    key: 23,
    name: "回形针事务所 024 人工智能如何帮你看病？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "116.15 MB",
  },
  {
    key: 24,
    name: "回形针事务所 025 为什么视频会议总让你很累.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "60.92 MB",
  },
  {
    key: 25,
    name: "回形针事务所 026 如何打造一台懂事的吸尘器？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "120.81 MB",
  },
  {
    key: 26,
    name: "回形针事务所 027 如何饿死你床上的螨虫？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "116.09 MB",
  },
  {
    key: 27,
    name: "回形针事务所 028 戴耳机的你，听力为什么越来越差？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "126.94 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
