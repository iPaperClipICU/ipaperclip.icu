<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileAudioRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/原创专辑/Orbit_Saturn_土星轨道/";
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
    name: "Flying Meat（飞翔的肉） - 彭寒.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "8.73 MB",
  },
  {
    key: 1,
    name: "High Five（五高高） - 彭寒.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "4.79 MB",
  },
  {
    key: 2,
    name: "Into The Hole（进洞洞） - 彭寒.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "9.81 MB",
  },
  {
    key: 3,
    name: "Night Train（夜班车） - 彭寒.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "12.34 MB",
  },
  {
    key: 4,
    name: "Orbit Chaos（混乱轨道） - 彭寒.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "9.39 MB",
  },
  {
    key: 5,
    name: "Orbit Our Past（我们的轨道） - 彭寒.flac",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "13.87 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
