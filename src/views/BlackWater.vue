<template><n-data-table :columns="columns" :data="data" /></template>
<script>
import { h, defineComponent } from "vue";
import { NDataTable, NButton } from "naive-ui";
import { FileVideoRegular } from "@vicons/fa";
import AVideo from "/src/components/AVideo.vue";
import AImage from "/src/components/AImage.vue";
import AAudio from "/src/components/AAudio.vue";
const urlTop = "https://file.hsyhx.top/黑水报告/";
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
    name: "1240亿美元，盖茨都用哪儿了.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "62.19 MB",
  },
  {
    key: 1,
    name: "Python编程课对孩子有用吗.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "72.05 MB",
  },
  {
    key: 2,
    name: "为什么中国人爱储蓄，美国人不存钱.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "58.31 MB",
  },
  {
    key: 3,
    name: "为什么二氧化碳也能卖钱.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "156.74 MB",
  },
  {
    key: 4,
    name: "为什么全世界长租房大都是川普模式，只有中国是蛋壳模式.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "77.84 MB",
  },
  {
    key: 5,
    name: "为什么外卖骑手被疯狂压榨，交通事故率却比普通人低.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "36.56 MB",
  },
  {
    key: 6,
    name: "产油大国还想联手挣钱？用数学告诉你他们想多了.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "52.92 MB",
  },
  {
    key: 7,
    name: "今天，你已经离不开马云的媒体帝国.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "112.17 MB",
  },
  {
    key: 8,
    name: "你失业还是没失业，到底谁说了算？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "66.27 MB",
  },
  {
    key: 9,
    name: "保健品与中成药广告轰炸国人三十年，这两个东北人立了大功.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "92.36 MB",
  },
  {
    key: 10,
    name: "学什么专业最有钱途.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "79.31 MB",
  },
  {
    key: 11,
    name: "川普筹款破纪录却丢了总统，他花钱的失误在哪.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "94.59 MB",
  },
  {
    key: 12,
    name: "怎么买保险才能不上当？带你攻略保险的最大雷区.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "198.01 MB",
  },
  {
    key: 13,
    name: "想买便宜房？这个办法很多人都不知道.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "61.8 MB",
  },
  {
    key: 14,
    name: "散户暴打华尔街资本？你一定没弄清做空、期权、对冲.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "169.26 MB",
  },
  {
    key: 15,
    name: "无风险赚大钱，还得说蚂蚁金服.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "125.91 MB",
  },
  {
    key: 16,
    name: "没有财务造假，瑞幸也照样完蛋.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "85.74 MB",
  },
  {
    key: 17,
    name: "清北毕业排队考公，进体制真有那么香吗.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "88.12 MB",
  },
  {
    key: 18,
    name: "特朗普祖孙三代是怎么发家的.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "180.1 MB",
  },
  {
    key: 19,
    name: "猪肉还能便宜下来吗？.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "92.09 MB",
  },
  {
    key: 20,
    name: "花59万美元买表情包的人，看懂了价值向二次元转移的趋势.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "85.64 MB",
  },
  {
    key: 21,
    name: "被特朗普封杀的美国抖音是怎样炼成的.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "96.89 MB",
  },
  {
    key: 22,
    name: "还考研？多少做题家吊死在这棵树上.mp4",
    type: <FileVideoRegular />,
    type_name: "video",
    time: "2021.9.29",
    size: "81.12 MB",
  },
];
export default defineComponent({
  components: { NDataTable },
  setup() {
    return { data: createData(), columns: createColumns() };
  },
});
</script>
