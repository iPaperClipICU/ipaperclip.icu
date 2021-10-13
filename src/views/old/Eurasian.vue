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
import AVideo from "../components/AVideo.vue";
import AImage from "../components/AImage.vue";
import AAudio from "../components/AAudio.vue";

const urlTop = "https://file.hsyhx.top/其他/";

const createColumns = () => {
  return [
    {
      type: "expand",
      //   expandable: (_, index) => index !== 99999,
      renderExpand: (rowData) => {
        if (rowData.type_name == "video") {
          return h(AVideo, {
            src: urlTop + rowData.name,
          });
        } else if (rowData.type_name == "image") {
          return h(AImage, {
            src: urlTop + rowData.name,
          });
        } else if (rowData.type_name == "audio") {
          return h(AAudio, {
            src: urlTop + rowData.name,
          });
        }
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

var demodata = [
  {
    key: 0,
    name: "测试视频",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021",
    size: "100 MB",
  },
  {
    key: 1,
    name: "Vol.100解谜.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021",
    size: "100 MB",
  },
  {
    key: 2,
    name: "《一个人工智能的诞生》BGM.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021",
    size: "100 MB",
  },
];

const createData = () => demodata;

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
