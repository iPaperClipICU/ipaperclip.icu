<template>
  <n-data-table :columns="columns" :data="data" />
</template>

<script>
import { h, defineComponent } from "vue";
import { NDataTable } from "naive-ui";
import HVideo from "../components/AVideo.vue";

const createColumns = () => {
  return [
    {
      type: "expand",
      //   expandable: (_, index) => index !== 99999,
      renderExpand: (rowData) => {
        return h(HVideo, {
          src: "https://file.hsyhx.top/" + rowData.name,
        });
      },
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Age",
      key: "age",
    },
  ];
};

const createData = () => [
  {
    key: 0,
    name: "video.mp4",
    age: 32,
  },
  {
    key: 1,
    name: "video_1.mp4",
    age: 42,
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
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
