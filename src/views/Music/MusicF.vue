<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileAudioRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/原创专辑/FAILURES_IN_TIME_睿智时间/";
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
    name: "BATTLEGROUND (大便) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "21.41 MB",
  },
  {
    key: 1,
    name: "CHILLIN' (围棋AI) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "21.19 MB",
  },
  {
    key: 2,
    name: "CUT OFF (奶粉) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "28.32 MB",
  },
  {
    key: 3,
    name: "DARKVIBE (戒毒) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "13.56 MB",
  },
  {
    key: 4,
    name: "DR!FT (漂移) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "11.31 MB",
  },
  {
    key: 5,
    name: "DRUNK (电动汽车) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "11.36 MB",
  },
  {
    key: 6,
    name: "DSL (双眼皮) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "33.75 MB",
  },
  {
    key: 7,
    name: "H!ghT!me (机票) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "13.22 MB",
  },
  {
    key: 8,
    name: "HIGHTECH (显示器PART1) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "41.95 MB",
  },
  {
    key: 9,
    name: "ILLILL (显示器PART2) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "18.75 MB",
  },
  {
    key: 10,
    name: "ItWon'tEnd (牛排) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "14.31 MB",
  },
  {
    key: 11,
    name: "JAILTIME (监狱) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "16.4 MB",
  },
  {
    key: 12,
    name: "MOTHERLAND (火力发电) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "17.25 MB",
  },
  {
    key: 13,
    name: "NOTHIN‘2LOSE (高速公路) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.61 MB",
  },
  {
    key: 14,
    name: "RIOTinMyMind (手机定位) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "11.91 MB",
  },
  {
    key: 15,
    name: "SLUMPPARTY (违章) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "15.01 MB",
  },
  {
    key: 16,
    name: "SWEETMURDA (护肤品) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "18.69 MB",
  },
  {
    key: 17,
    name: "WENGWENG (引擎) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "8.46 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
