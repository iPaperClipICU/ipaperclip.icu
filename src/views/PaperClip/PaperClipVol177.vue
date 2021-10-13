<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/回形针PaperClip/Vol/150-177/";
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
    name: "Vol.151 为什么你的皮肤这么干.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "70.43 MB",
  },
  {
    key: 1,
    name: "Vol.152 脂肪去除指南.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "110.89 MB",
  },
  {
    key: 2,
    name: "Vol.153 如何成为双板滑雪高手.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "70.81 MB",
  },
  {
    key: 3,
    name: "Vol.154 手语的秘密.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "151.43 MB",
  },
  {
    key: 4,
    name: "Vol.155 托尼老师如何给你染发.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "76.25 MB",
  },
  {
    key: 5,
    name: "Vol.156 春运抢票之战.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "102.02 MB",
  },
  {
    key: 6,
    name: "Vol.157 一个完美的速冻水饺是怎样炼成的？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "83.94 MB",
  },
  {
    key: 7,
    name: "Vol.158 寻找地球上最冷的冬天.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "126.18 MB",
  },
  {
    key: 8,
    name: "Vol.159 人类脱毛指南.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "120.3 MB",
  },
  {
    key: 9,
    name: "Vol.160 吊威亚如何让你飞檐走壁？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "59.96 MB",
  },
  {
    key: 10,
    name: "Vol.161 挖掘机驾驶指南.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "79.03 MB",
  },
  {
    key: 11,
    name: "Vol.162 赌场为什么稳赚不赔.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "103.65 MB",
  },
  {
    key: 12,
    name: "Vol.163 打呼噜到底有多危险？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "66.49 MB",
  },
  {
    key: 13,
    name: "Vol.164 免税店为什么能让你薅羊毛？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "86.11 MB",
  },
  {
    key: 14,
    name: "Vol.165 电信网络诈骗如何让你倾家荡产？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "74.86 MB",
  },
  {
    key: 15,
    name: "Vol.166 人群踩踏保命指南.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "138.31 MB",
  },
  {
    key: 16,
    name: "Vol.167 可控核聚变如何制造终极能源？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "142.56 MB",
  },
  {
    key: 17,
    name: "Vol.168 夜视仪如何看透黑夜？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "73.29 MB",
  },
  {
    key: 18,
    name: "Vol.169 水族馆养鱼到底有多难？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "101.18 MB",
  },
  {
    key: 19,
    name: "Vol.170 基金经理对你的钱做了什么？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "67.32 MB",
  },
  {
    key: 20,
    name: "Vol.171 F1 赛车如何靠「作弊」夺冠？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "101.17 MB",
  },
  {
    key: 21,
    name: "Vol.172 麻醉医生如何让你活着醒来？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "89.02 MB",
  },
  {
    key: 22,
    name: "Vol.173 肉毒毒素对你的脸做了什么？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "79.54 MB",
  },
  {
    key: 23,
    name: "Vol.174 抓娃娃机如何伤透你的心？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "80.64 MB",
  },
  {
    key: 24,
    name: "Vol.175 血糖监测对糖尿病人到底有多重要？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "75.36 MB",
  },
  {
    key: 25,
    name: "Vol.176 你喝的牛奶从哪来？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "100.52 MB",
  },
  {
    key: 26,
    name: "Vol.177 地震预报为什么这么难？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "132.09 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
