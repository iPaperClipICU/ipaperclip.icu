<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import {
  FileVideoRegular,
  FileImageRegular,
  FileAudioRegular,
} from "@vicons/fa";
import HVideo from "../components/AVideo.vue";

const createColumns = () => {
  return [
    {
      type: "expand",
      //   expandable: (_, index) => index !== 99999,
      renderExpand: (rowData) => {
        return h(HVideo, {
          src: "https://file.hsyhx.top/基本操作/" + rowData.name,
        });
      },
    },
    {
      title: "文件名",
      key: "name",
      render(row) {
        return h(
          NButton,
          {
            // disabled: "",
            text: "",
          },
          {
            icon: () => row.type,
            default: () => row.name,
          }
        );
      },
    },
    {
      title: "最后更新时间",
      key: "time",
    },
    {
      title: "大小",
      key: "size",
    },
  ];
};

const createData = () => [
  {
    key: 0,
    name: "测试视频",
    type: <FileVideoRegular />,
    time: "2021",
    size: "100 MB",
  },
  {
    key: 1,
    name: "测试图片",
    type: <FileImageRegular />,
    time: "2021",
    size: "100 MB",
  },
  {
    key: 2,
    name: "测试音频",
    type: <FileAudioRegular />,
    time: "2021",
    size: "100 MB",
  },
];

export default defineComponent({
  components: {
    NDataTable,
  },
  setup() {
    return {
      data: createData(),
      columns: createColumns(),
    };
  },
});
</script>
