<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileAudioRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/原创专辑/REAL_GLOW_真实发光/";
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
    name: "Cold Everywhere（调度列车） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.73 MB",
  },
  {
    key: 1,
    name: "Depressed（实拍） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "13.1 MB",
  },
  {
    key: 2,
    name: "EndOfWorld（原子弹） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "15.59 MB",
  },
  {
    key: 3,
    name: "FeelLIKETHIS（行道树） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.18 MB",
  },
  {
    key: 4,
    name: "FuManchu（近视眼手术） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "17.04 MB",
  },
  {
    key: 5,
    name: "Get Down（调动列车PART2） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "21.43 MB",
  },
  {
    key: 6,
    name: "Good Vibe（电销机器人） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "19.69 MB",
  },
  {
    key: 7,
    name: "Hustla Flow （三维模型Part2） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "14.14 MB",
  },
  {
    key: 8,
    name: "I got a A !（奔驰） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "19.62 MB",
  },
  {
    key: 9,
    name: "Ice On me（钻石） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "15.46 MB",
  },
  {
    key: 10,
    name: "JAMECA TIME（香蕉） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "18.95 MB",
  },
  {
    key: 11,
    name: "JingYong（快递） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "15.99 MB",
  },
  {
    key: 12,
    name: "LIES ON ME (低焦油香烟骗局) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.84 MB",
  },
  {
    key: 13,
    name: "Lights On（路灯） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "14.24 MB",
  },
  {
    key: 14,
    name: "Mood Rise （手机怎么上网5G） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "19.49 MB",
  },
  {
    key: 15,
    name: "Okay (三维模型) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "20.37 MB",
  },
  {
    key: 16,
    name: "Power（爆破） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "20.68 MB",
  },
  {
    key: 17,
    name: "Race（鸡爪2） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "11.75 MB",
  },
  {
    key: 18,
    name: "Rest in heaven（抗癌药） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "10.89 MB",
  },
  {
    key: 19,
    name: "River (宠物) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.34 MB",
  },
  {
    key: 20,
    name: "Rollin Stone (ATM) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "25.74 MB",
  },
  {
    key: 21,
    name: "Slave Song（暖气） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "25.14 MB",
  },
  {
    key: 22,
    name: "Under control（大数据） - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "16.54 MB",
  },
  {
    key: 23,
    name: "Western Bae（三维模型Part3) - PETO.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "40.12 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
