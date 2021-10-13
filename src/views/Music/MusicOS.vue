<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileAudioRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop =
  "https://file.hsyhx.top/原创专辑/基本操作_一个人工智能的诞生_Original_Soundtrack/";
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
    name: "01_ Grand Opening（欢迎光临） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "5.21 MB",
  },
  {
    key: 1,
    name: "02_ 3_7（识别数字） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.41 MB",
  },
  {
    key: 2,
    name: "03_ Tails（鳄鱼与蛇） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "9.39 MB",
  },
  {
    key: 3,
    name: "04_ Welcome, welcome（序幕） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "2.33 MB",
  },
  {
    key: 4,
    name: "05_ Buff（加一层） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "9.92 MB",
  },
  {
    key: 5,
    name: "06_ Rainbow（一点点矩阵） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "10.79 MB",
  },
  {
    key: 6,
    name: "07_ Climb（下山） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "6.54 MB",
  },
  {
    key: 7,
    name: "08_ WahWahB（梯度下降） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "13.6 MB",
  },
  {
    key: 8,
    name: "09_ SUANYISUAN（算一算） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "6.85 MB",
  },
  {
    key: 9,
    name: "10_ High Fifty-Nine（一点点微积分） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "13.16 MB",
  },
  {
    key: 10,
    name: "11_ Softly（终点） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "5.17 MB",
  },
  {
    key: 11,
    name: "12_ Vintage TV（小电视） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "3.39 MB",
  },
  {
    key: 12,
    name: "13_ PlayGround（搭建你的神经网络） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "10.49 MB",
  },
  {
    key: 13,
    name: "14_ Lone Light（未使用曲） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "5.91 MB",
  },
  {
    key: 14,
    name: "15_ Closure（尾声） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "3.47 MB",
  },
  {
    key: 15,
    name: "Back to Chaos（理解语言） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "14.45 MB",
  },
  {
    key: 16,
    name: "Back to Moon（识别图像） - 回形针PaperClip.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "15.38 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
