<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/混乱博物馆/混乱档案室/";
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
    name: "混乱档案室01 脑中海啸.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "27.92 MB",
  },
  {
    key: 1,
    name: "混乱档案室02 人类环保迷惑行为大赏.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "95.48 MB",
  },
  {
    key: 2,
    name: "混乱档案室03 空调吹多了会感冒吗.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "77.12 MB",
  },
  {
    key: 3,
    name: "混乱档案室04 你的血管是怎么变蓝的.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "52.97 MB",
  },
  {
    key: 4,
    name: "混乱档案室05 你的皮肤是怎么裂开的.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "63.61 MB",
  },
  {
    key: 5,
    name: "混乱档案室06 如何科学冷冻人肉？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "126.68 MB",
  },
  {
    key: 6,
    name: "混乱档案室07 你在冬天怎么这么困.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "67.62 MB",
  },
  {
    key: 7,
    name: "混乱档案室08 为了大肌肉，男人们操碎了心.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "70.15 MB",
  },
  {
    key: 8,
    name: "混乱档案室09 为什么你需要打HPV疫苗.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "99.26 MB",
  },
  {
    key: 9,
    name: "混乱档案室10 吃水果「上火」究竟为什么.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "78.53 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
