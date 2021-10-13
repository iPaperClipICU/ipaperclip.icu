<template>
  <n-back-top :right="100" />
  <n-grid x-gap="1" :cols="6">
    <n-gi></n-gi>
    <n-gi :span="4">
      <Ahead />
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
      <n-divider />
      <router-view></router-view>
      <Afooter />
      <n-divider />
    </n-gi>
    <n-gi></n-gi>
  </n-grid>
</template>

<script>
import Ahead from "./components/header.vue";
import Afooter from "./components/footer.vue";
import { defineComponent, h, ref } from "vue";
import { RouterLink } from "vue-router";
import { NDivider, NMenu, NGrid, NGi, NBackTop } from "naive-ui";

const menuOptions = [
  {
    label: "回形针PaperClip",
    key: "PaperClip",
    // icon: renderIcon(BookIcon),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/回形针PaperClip/回形针事务所",
              },
            },
            { default: () => "回形针事务所" }
          ),
        key: "PaperClipF",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/回形针PaperClip/合作视频",
              },
            },
            { default: () => "合作视频" }
          ),
        key: "PaperClipC",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/回形针PaperClip/回形针Live",
              },
            },
            { default: () => "回形针Live" }
          ),
        key: "PaperClipL",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/回形针PaperClip/Sp",
              },
            },
            { default: () => "Sp(特别节目)" }
          ),
        key: "PaperClipSp",
      },
      {
        type: "group",
        label: "Vol(常规节目)",
        key: "PaperClipVol",
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/回形针PaperClip/Vol.1-50",
                  },
                },
                { default: () => "Vol.1-50" }
              ),
            key: "PaperClipVol50",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/回形针PaperClip/Vol.51-100",
                  },
                },
                { default: () => "Vol.51-100" }
              ),
            key: "PaperClipVol100",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/回形针PaperClip/Vol.101-150",
                  },
                },
                { default: () => "Vol.101-150" }
              ),
            key: "PaperClipVol150",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/回形针PaperClip/Vol.151-177",
                  },
                },
                { default: () => "Vol.151-177" }
              ),
            key: "PaperClipVol177",
          },
        ],
      },
    ],
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/基本操作",
          },
        },
        { default: () => "基本操作" }
      ),
    key: "PlayGround",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/干燥工厂",
          },
        },
        { default: () => "干燥工厂" }
      ),
    key: "Drying",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/灵光灯泡",
          },
        },
        { default: () => "灵光灯泡" }
      ),
    key: "Eurasian",
  },
  {
    label: "原创专辑",
    key: "Music",
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/原创专辑/FAILURES IN TIME 睿智时间",
              },
            },
            { default: () => "FAILURES IN TIME 睿智时间" }
          ),
        key: "MusicF",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/原创专辑/MULTIPLY 正片叠底",
              },
            },
            { default: () => "MULTIPLY 正片叠底" }
          ),
        key: "MusicM",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/原创专辑/Orbit Saturn 土星轨道",
              },
            },
            { default: () => "Orbit Saturn 土星轨道" }
          ),
        key: "MusicO",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/原创专辑/REAL GLOW 真实发光",
              },
            },
            { default: () => "REAL GLOW 真实发光" }
          ),
        key: "MusicR",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/原创专辑/Original Soundtrack 一个人工智能的诞生",
              },
            },
            { default: () => "Original Soundtrack 一个人工智能的诞生" }
          ),
        key: "MusicOS",
      },
    ],
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/演讲",
          },
        },
        { default: () => "演讲" }
      ),
    key: "Speech",
  },
  {
    label: "其他",
    key: "Other",
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/其他/非视频",
              },
            },
            { default: () => "非视频" }
          ),
        key: "OtherNV",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/其他/第三方视频",
              },
            },
            { default: () => "第三方视频" }
          ),
        key: "OtherT",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/其他/媒体报道",
              },
            },
            { default: () => "媒体报道" }
          ),
        key: "OtherM",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/其他/其他原创视频",
              },
            },
            { default: () => "其他原创视频" }
          ),
        key: "OtherVideo",
      },
    ],
  },
  {
    label: "混乱博物馆",
    key: "ChaosMuseum",
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/混乱博物馆/混乱档案室",
              },
            },
            { default: () => "混乱档案室" }
          ),
        key: "ChaosMuseumA",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: "/混乱博物馆/其他",
              },
            },
            { default: () => "其他" }
          ),
        key: "ChaosMuseumOther",
      },
      {
        type: "group",
        label: "Vol(常规节目)",
        key: "ChaosMuseumVol",
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.1-50",
                  },
                },
                { default: () => "Vol.1-50" }
              ),
            key: "ChaosMuseumVol50",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.51-100",
                  },
                },
                { default: () => "Vol.51-100" }
              ),
            key: "ChaosMuseumVol100",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.101-150",
                  },
                },
                { default: () => "Vol.101-150" }
              ),
            key: "ChaosMuseumVol150",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.151-200",
                  },
                },
                { default: () => "Vol.151-200" }
              ),
            key: "ChaosMuseumVol200",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.201-250",
                  },
                },
                { default: () => "Vol.201-250" }
              ),
            key: "ChaosMuseumVol250",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.251-300",
                  },
                },
                { default: () => "Vol.251-300" }
              ),
            key: "ChaosMuseumVol300",
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: "/混乱博物馆/Vol.301-323",
                  },
                },
                { default: () => "Vol.301-323" }
              ),
            key: "ChaosMuseumVol323",
          },
        ],
      },
    ],
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/黑水报告",
          },
        },
        { default: () => "黑水报告" }
      ),
    key: "BlackWater",
  },
];

export default defineComponent({
  name: "App",
  components: {
    Ahead,
    Afooter,
    NDivider,
    NMenu,
    NGrid,
    NGi,
    NBackTop,
  },
  setup() {
    return {
      activeKey: ref(null),
      menuOptions,
    };
  },
});
</script>
