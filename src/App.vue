<template>
  <n-config-provider :locale="zhCN" :theme="darkTheme">
    <n-dialog-provider>
      <n-loading-bar-provider>
        <div style="text-align: center; padding-top: 15px">
          <n-h1>
            <a style="color: #ffffffe6; text-decoration: none" href="/">
              iPaperClipICU
            </a>
          </n-h1>
        </div>
        <n-grid
          :x-gap="12"
          :cols="12"
          item-responsive
          style="padding-top: 20px"
        >
          <n-gi span="1 1330:3" />
          <n-gi span="10 1330:6">
            <router-view />
            <div style="padding-top: 15px">
              <n-card>
                <p>He, 这里是 ipaperclip.icu</p>
                <n-h2>网站</n-h2>
                <n-p>
                  视频、文字稿归档:
                  <n-a href="https://ipaperclip.icu/">ipaperclip.icu</n-a>
                </n-p>
                <n-p>
                  R.I.P(归档站导航):
                  <n-a href="https://ipaperclip.rip/">ipaperclip.rip</n-a>
                </n-p>
                <n-h2>联系我</n-h2>
                <n-p>
                  <n-a href="https://t.me/iPaperClipICU">Telegram 通知频道</n-a>
                  |
                  <n-a href="https://t.me/ipaperclipIcu_Bot">Telegram Bot</n-a>
                  |
                  <n-a
                    href="https://github.com/iPaperClipICU/ipaperclip.icu/discussions"
                    >Github Discussions</n-a
                  >
                  | <n-a href="mailto:hi@ipaperclip.icu">hi@ipaperclip.icu</n-a>
                </n-p>
                <n-h2>相关链接</n-h2>
                <n-p
                  ><n-a href="https://www.paperclip.tk/"
                    >回形针视频归档站</n-a
                  ></n-p
                >
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
                <n-p
                  >文字稿:
                  <n-a href="https://paperclip.wiki/">paperclip.wiki</n-a> |
                  <n-a href="https://paperclipfans.justprog.tk/"
                    >paperclipfans.justprog.tk</n-a
                  ></n-p
                >
                <n-divider />
                <n-p
                  ><n-a href="https://t.me/paperclipfans"
                    >基本操作非官方频道</n-a
                  >
                  |
                  <n-a href="https://t.me/paperclipfans"
                    >基本操作非官方粉丝群</n-a
                  ></n-p
                >
                <n-p
                  ><n-a href="https://shop362189133.taobao.com/">干燥工厂</n-a>
                  | <n-a href="https://jibencaozuo.com/">基本操作</n-a></n-p
                >
                <n-h2>R.I.P</n-h2>
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
                </n-image-group>
              </n-card>
            </div>
          </n-gi>
          <n-gi span="1 1330:3" />
        </n-grid>
      </n-loading-bar-provider>
    </n-dialog-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
  NImageGroup,
  NImage,
  NSpace,
  NLoadingBarProvider,
  NDialogProvider,
  NConfigProvider,
  NGlobalStyle,
  NDivider,
  NGrid,
  NCard,
  NGi,
  NH1,
  NH2,
  NP,
  NA,
} from "naive-ui";
import { darkTheme, zhCN } from "naive-ui";

const mailLoginShow = ref(true);
export default defineComponent({
  components: {
    NImageGroup,
    NImage,
    NSpace,
    NLoadingBarProvider,
    NDialogProvider,
    NConfigProvider,
    NGlobalStyle,
    NDivider,
    NGrid,
    NCard,
    NGi,
    NH1,
    NH2,
    NP,
    NA,
  },
  setup() {
    return {
      zhCN,
      darkTheme,
      mailLoginShow,
    };
  },
});
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
