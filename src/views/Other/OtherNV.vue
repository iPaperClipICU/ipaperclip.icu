<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileImageRegular, FileAudioRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/其他/非视频/";
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
    name: "2020 干燥工厂全新产品线上发布会预告.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "118.14 KB",
  },
  {
    key: 1,
    name: "2021春节快乐.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "134.19 KB",
  },
  {
    key: 2,
    name: "MULTIPLY 正片叠底.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "50.99 KB",
  },
  {
    key: 3,
    name: "PlayGround 搭建你的神经网络 - 彭寒.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "10.45 MB",
  },
  {
    key: 4,
    name: "Vol.100解谜(2).jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "99.27 KB",
  },
  {
    key: 5,
    name: "Vol.100解谜.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "102.07 KB",
  },
  {
    key: 6,
    name: "《一个人工智能的诞生》BGM.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "2.93 MB",
  },
  {
    key: 7,
    name: "一个人工智能的诞生实体兑换卡.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "276.28 KB",
  },
  {
    key: 8,
    name: "你能给我磕个头吗？.png",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "1.76 MB",
  },
  {
    key: 9,
    name: "入选哔哩哔哩 2020 年百大 UP 主.png",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "371.1 KB",
  },
  {
    key: 10,
    name: "吴松磊微信声明.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "100.78 KB",
  },
  {
    key: 11,
    name: "吴松磊激情读灰度值.mp3",
    type: <FileAudioRegular />,
    type_name: "audio",
    time: "2021.9.29",
    size: "22.79 MB",
  },
  {
    key: 12,
    name: "夏季线上发布会预告.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "56.79 KB",
  },
  {
    key: 13,
    name: "少数派年度推荐.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "20.8 KB",
  },
  {
    key: 14,
    name: "干燥工厂开业.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "50.83 KB",
  },
  {
    key: 15,
    name: "律师声明.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "73.16 KB",
  },
  {
    key: 16,
    name: "成为一名密码朋克实体套装.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "292.15 KB",
  },
  {
    key: 17,
    name: "抽粪车.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "53.97 KB",
  },
  {
    key: 18,
    name: "有点东西.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "83.52 KB",
  },
  {
    key: 19,
    name: "来自《成为一名密码朋克》制作团队的一封信.png",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "415.55 KB",
  },
  {
    key: 20,
    name: "每羊被捕.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "139.48 KB",
  },
  {
    key: 21,
    name: "澳门首家线上赌场上线啦.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "352.05 KB",
  },
  {
    key: 22,
    name: "灵光灯泡.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "17.53 KB",
  },
  {
    key: 23,
    name: "线上发布会延期.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "66.19 KB",
  },
  {
    key: 24,
    name: "肉蛋奶.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "100.55 KB",
  },
  {
    key: 25,
    name: "荣获极客公园「年度创业新星」.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "39.85 KB",
  },
  {
    key: 26,
    name: "论文.jpg",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "214.25 KB",
  },
  {
    key: 27,
    name: "长按二维码 关注回形针.gif",
    type: <FileImageRegular />,
    type_name: "image",
    time: "2021.9.29",
    size: "1.72 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
