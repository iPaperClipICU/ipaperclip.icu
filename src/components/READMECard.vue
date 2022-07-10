<template>
  <n-card v-if="show" hoverable>
    <n-p>He, 这里是 ipaperclip.icu</n-p>
    <n-h2>网站</n-h2>
    <n-p>
      视频、文字稿归档:
      <n-a href="https://ipaperclip.icu/" target="_blank">ipaperclip.icu</n-a>
    </n-p>
    <n-p>
      R.I.P(归档站导航):
      <n-a href="https://ipaperclip.rip/" target="_blank">ipaperclip.rip</n-a>
    </n-p>
    <n-p>
      视频源备份站:
      <n-a href="https://onedrive.ipaperclip.icu/" target="_blank"
        >onedrive.ipaperclip.icu</n-a
      >
    </n-p>
    <n-h2>联系我</n-h2>
    <n-p>
      <n-a href="https://t.me/iPaperClipICU" target="_blank"
        >Telegram 通知频道</n-a
      >
      |
      <n-a href="https://t.me/iPaperClipICUChatBot" target="_blank"
        >Telegram Bot</n-a
      >
      |
      <n-a
        href="https://github.com/iPaperClipICU/ipaperclip.icu/"
        target="_blank"
        >Github</n-a
      >
      |
      <n-a href="mailto:hi@ipaperclip.icu" target="_blank"
        >hi@ipaperclip.icu</n-a
      >
    </n-p>
    <n-h2>相关链接</n-h2>
    <n-p
      ><n-a href="https://paperclip.eu.org/" target="_blank"
        >回形针视频归档站</n-a
      ></n-p
    >
    <n-p
      ><n-a href="https://wandering-paperclip.glitch.me/" target="_blank"
        >Wandering PaperClip 流浪回形针</n-a
      ></n-p
    >
    <n-p
      ><n-a href="https://paper-clips.purestream.eu.org/" target="_blank"
        >paper-clips.purestream.eu.org</n-a
      ></n-p
    >
    <n-p
      ><n-a href="https://paperclip.wiki/" target="_blank"
        >paperclip.wiki</n-a
      ></n-p
    >
    <n-divider />
    <n-p
      ><n-a href="https://t.me/papercliphub" target="_blank"
        >基本操作非官方频道</n-a
      >
      |
      <n-a href="https://t.me/paperclipfans" target="_blank"
        >基本操作非官方粉丝群</n-a
      ></n-p
    >
    <n-p
      ><n-a href="https://shop362189133.taobao.com/" target="_blank"
        >干燥工厂</n-a
      >
      | <n-a href="https://jibencaozuo.com/" target="_blank">基本操作</n-a></n-p
    >
    <n-h2>R.I.P</n-h2>
    <n-grid :cols="201" item-responsive>
      <n-gi span="100">
        <img
          src="//file.hsyhx.top/image/RIP/rip1.webp"
          alt="rip1"
          style="width: 100%"
        />
      </n-gi>
      <n-gi span="1" />
      <n-gi span="100">
        <img
          src="//file.hsyhx.top/image/RIP/rip2.webp"
          alt="rip2"
          style="width: 100%"
        />
      </n-gi>
    </n-grid>
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
import { NA, NP, NGi, NH2, NCard, NGrid, NAlert, NDivider } from "naive-ui";

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
    NGi,
    NH2,
    NCard,
    NGrid,
    NAlert,
    NDivider,
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
