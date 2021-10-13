import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
// <回形针PaperClip>
import PaperClipSp from "../views/PaperClip/PaperClipSp.vue";
import PaperClipVol50 from "../views/PaperClip/PaperClipVol50.vue";
import PaperClipVol100 from "../views/PaperClip/PaperClipVol100.vue";
import PaperClipVol150 from "../views/PaperClip/PaperClipVol150.vue";
import PaperClipVol177 from "../views/PaperClip/PaperClipVol177.vue";
import PaperClipC from "../views/PaperClip/PaperClipC.vue";
import PaperClipF from "../views/PaperClip/PaperClipF.vue";
import PaperClipL from "../views/PaperClip/PaperClipL.vue";
// </ 回形针PaperClip>
import PlayGround from "../views/PlayGround.vue";
import Drying from "../views/Drying.vue";
import Eurasian from "../views/Eurasian.vue";
// <原创专辑>
import MusicF from "../views/Music/MusicF.vue";
import MusicM from "../views/Music/MusicM.vue";
import MusicO from "../views/Music/MusicO.vue";
import MusicR from "../views/Music/MusicR.vue";
import MusicOS from "../views/Music/MusicOS.vue";
// </ 原创专辑>
import Speech from "../views/Speech.vue";
// <其他>
import OtherNV from "../views/Other/OtherNV.vue";
import OtherT from "../views/Other/OtherT.vue";
import OtherM from "../views/Other/OtherM.vue";
import OtherVideo from "../views/Other/OtherVideo.vue";
// </ 其他>
// <混乱博物馆>
import ChaosMuseumVol50 from "../views/ChaosMuseum/ChaosMuseumVol50.vue";
import ChaosMuseumVol100 from "../views/ChaosMuseum/ChaosMuseumVol100.vue";
import ChaosMuseumVol150 from "../views/ChaosMuseum/ChaosMuseumVol150.vue";
import ChaosMuseumVol200 from "../views/ChaosMuseum/ChaosMuseumVol200.vue";
import ChaosMuseumVol250 from "../views/ChaosMuseum/ChaosMuseumVol250.vue";
import ChaosMuseumVol300 from "../views/ChaosMuseum/ChaosMuseumVol300.vue";
import ChaosMuseumVol323 from "../views/ChaosMuseum/ChaosMuseumVol323.vue";
import ChaosMuseumA from "../views/ChaosMuseum/ChaosMuseumA.vue";
import ChaosMuseumOther from "../views/ChaosMuseum/ChaosMuseumOther.vue";
// </ 混乱博物馆>
import BlackWater from "../views/BlackWater.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  // <回形针PaperClip>
  {
    path: "/回形针PaperClip/Sp",
    component: PaperClipSp,
  },
  {
    path: "/回形针PaperClip/Vol.1-50",
    component: PaperClipVol50,
  },
  {
    path: "/回形针PaperClip/Vol.51-100",
    component: PaperClipVol100,
  },
  {
    path: "/回形针PaperClip/Vol.101-150",
    component: PaperClipVol150,
  },
  {
    path: "/回形针PaperClip/Vol.151-177",
    component: PaperClipVol177,
  },
  {
    path: "/回形针PaperClip/合作视频",
    component: PaperClipC,
  },
  {
    path: "/回形针PaperClip/回形针事务所",
    component: PaperClipF,
  },
  {
    path: "/回形针PaperClip/回形针Live",
    component: PaperClipL,
  },
  // </ 回形针PaperClip>
  {
    path: "/基本操作",
    component: PlayGround,
  },
  {
    path: "/干燥工厂",
    component: Drying,
  },
  {
    path: "/灵光灯泡",
    component: Eurasian,
  },
  // <原创专辑>
  {
    path: "/原创专辑/FAILURES IN TIME 睿智时间",
    component: MusicF,
  },
  {
    path: "/原创专辑/MULTIPLY 正片叠底",
    component: MusicM,
  },
  {
    path: "/原创专辑/Orbit Saturn 土星轨道",
    component: MusicO,
  },
  {
    path: "/原创专辑/REAL GLOW 真实发光",
    component: MusicR,
  },
  {
    path: "/原创专辑/Original Soundtrack 一个人工智能的诞生",
    component: MusicOS,
  },
  // </ 原创专辑>
  {
    path: "/演讲",
    component: Speech,
  },
  // <其他>
  {
    path: "/其他/非视频",
    component: OtherNV,
  },
  {
    path: "/其他/第三方视频",
    component: OtherT,
  },
  {
    path: "/其他/媒体报道",
    component: OtherM,
  },
  {
    path: "/其他/其他原创视频",
    component: OtherVideo,
  },
  // </ 其他>
  // <混乱博物馆>
  {
    path: "/混乱博物馆/Vol.1-50",
    component: ChaosMuseumVol50,
  },
  {
    path: "/混乱博物馆/Vol.51-100",
    component: ChaosMuseumVol100,
  },
  {
    path: "/混乱博物馆/Vol.101-150",
    component: ChaosMuseumVol150,
  },
  {
    path: "/混乱博物馆/Vol.151-200",
    component: ChaosMuseumVol200,
  },
  {
    path: "/混乱博物馆/Vol.201-250",
    component: ChaosMuseumVol250,
  },
  {
    path: "/混乱博物馆/Vol.251-300",
    component: ChaosMuseumVol300,
  },
  {
    path: "/混乱博物馆/Vol.301-323",
    component: ChaosMuseumVol323,
  },
  {
    path: "/混乱博物馆/混乱档案室",
    component: ChaosMuseumA,
  },
  {
    path: "/混乱博物馆/其他",
    component: ChaosMuseumOther,
  },
  // </ 混乱博物馆>
  {
    path: "/黑水报告",
    component: BlackWater,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
