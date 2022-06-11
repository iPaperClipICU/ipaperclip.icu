<template>
  <n-card v-if="show">
    <n-p>He, 这里是 ipaperclip.icu</n-p>
    <n-h2>网站</n-h2>
    <n-p>
      视频、文字稿归档:
      <n-a href="https://ipaperclip.icu/">ipaperclip.icu</n-a>
    </n-p>
    <n-p>
      R.I.P(归档站导航):
      <n-a href="https://ipaperclip.rip/">ipaperclip.rip</n-a>
    </n-p>
    <n-p>
      视频源备份站:
      <n-a href="https://onedrive.ipaperclip.icu/">onedrive.ipaperclip.icu</n-a>
    </n-p>
    <n-h2>联系我</n-h2>
    <n-p>
      <n-a href="https://t.me/iPaperClipICU">Telegram 通知频道</n-a>
      |
      <n-a href="https://t.me/ipaperclipIcu_Bot">Telegram Bot</n-a>
      |
      <n-a href="https://github.com/iPaperClipICU/ipaperclip.icu/discussions"
        >Github Discussions</n-a
      >
      | <n-a href="mailto:hi@ipaperclip.icu">hi@ipaperclip.icu</n-a>
    </n-p>
    <n-h2>相关链接</n-h2>
    <n-p><n-a href="https://www.paperclip.tk/">回形针视频归档站</n-a></n-p>
    <n-p
      ><n-a href="https://wandering-paperclip.glitch.me/"
        >Wandering PaperClip 流浪回形针</n-a
      ></n-p
    >
    <n-p
      ><n-a href="https://paper-clips.purestream.eu.org/"
        >paper-clips.purestream.eu.org</n-a
      ></n-p
    >
    <n-p><n-a href="https://paperclip.wiki/">paperclip.wiki</n-a></n-p>
    <n-divider />
    <n-p
      ><n-a href="https://t.me/paperclipfans">基本操作非官方频道</n-a>
      |
      <n-a href="https://t.me/paperclipfans">基本操作非官方粉丝群</n-a></n-p
    >
    <n-p
      ><n-a href="https://shop362189133.taobao.com/">干燥工厂</n-a> |
      <n-a href="https://jibencaozuo.com/">基本操作</n-a></n-p
    >
    <!-- <n-h2>R.I.P</n-h2>
    <n-image-group show-toolbar-tooltip>
      <n-space>
        <n-image
          width="300"
          height="168.56"
          src="//file.hsyhx.top/image/RIP/rip2.webp"
          alt="R.I.P: 喜讯"
        />
        <n-image
          width="300"
          height="168.75"
          src="//file.hsyhx.top/image/RIP/rip1.webp"
          alt="R.I.P: 大的没了"
        />
      </n-space>
    </n-image-group> -->
    <n-alert type="info" :show-icon="false">
      <n-p
        >本站点建立之初单纯就是为了站长本人能有个观看回形针PaperClip视频的地方，不管用不用魔法都可以流畅的观看，目前看来已经实现了</n-p
      >
      <n-p
        >至于回形针PaperClip能不能重生，我认为唯一有能力去考虑这个问题的只有吴老师一人，其余人的帮忙均可能变为帮倒忙</n-p
      >
    </n-alert>
  </n-card>
</template>

<script>
import { ref, defineComponent } from "vue";
import {
  NA,
  NP,
  NH2,
  NCard,
  NAlert,
  // NImage,
  // NSpace,
  NDivider,
  // NImageGroup,
} from "naive-ui";

const init = () => {
  if (location.pathname == "/") {
    show.value = true;
  }
};

const show = ref(false);
export default defineComponent({
  components: {
    NA,
    NP,
    NH2,
    NCard,
    NAlert,
    // NImage,
    // NSpace,
    NDivider,
    // NImageGroup,
  },
  setup() {
    init();
    return {
      show,
    };
  },
});
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
