<template>
  <n-card hoverable>
    <n-p>👋 He, 这里是 ipaperclip.icu</n-p>
    <n-h2>关于文字稿</n-h2>
    <n-p
      >来源:
      <n-a href="https://github.com/ipaperclip/paperclipfans" target="_blank"
        >ipaperclip/paperclipfans</n-a
      >
      和
      <n-a href="https://github.com/Just-Prog/paperclipfans" target="_blank"
        >Just-Prog/paperclipfans</n-a
      ></n-p
    >
    <n-p
      >如果您希望对文字稿进行修改, 请前往上述两个仓库, 当我们注意到上游仓库更新时,
      我们将会同步更新</n-p
    >
    <n-h2>相关链接</n-h2>
    <n-p>
      <n-a href="https://jibencaozuo.com/" target="_blank">基本操作</n-a>
    </n-p>
    <n-p>
      <n-text delete>
        <n-a href="https://shop362189133.taobao.com/" target="_blank"> 干燥工厂 </n-a>
      </n-text>
      <span style="width: 5px; display: inline-block" />由于和仓库的合同到期, 淘宝店铺已经关闭
    </n-p>
    <n-h2>友情链接</n-h2>
    <n-p>
      <n-a href="https://t.me/papercliphub" target="_blank"> 基本操作非官方频道 </n-a>
      |
      <n-a href="https://t.me/paperclipfans" target="_blank"> 基本操作非官方粉丝群 </n-a>
    </n-p>
    <n-h2>其他归档站</n-h2>
    <n-p>
      <n-a href="https://paperclip.eu.org/">回形针视频归档站</n-a>
    </n-p>
    <n-p>
      <n-a href="https://wandering-paperclip.glitch.me/"> Wandering PaperClip 流浪回形针 </n-a>
    </n-p>
    <n-p>
      <n-a href="https://paper-clips.purestream.eu.org/"> paper-clips.purestream.eu.org </n-a>
    </n-p>
    <n-p>
      <n-a href="https://paperclip.wiki/">paperclip.wiki</n-a>
    </n-p>
    <n-h2>R.I.P</n-h2>
    <n-grid cols="1 345:2" :x-gap="5" :y-gap="5" item-responsive style="min-height: 90px">
      <n-gi span="1">
        <img src="//r2.ipaperclip.icu/rip1.webp" alt="rip1" loading="lazy" style="width: 100%" />
      </n-gi>
      <n-gi span="1">
        <img src="//r2.ipaperclip.icu/rip2.webp" alt="rip2" loading="lazy" style="width: 100%" />
      </n-gi>
    </n-grid>
    <!-- <n-alert type="info" :show-icon="false">
      <n-p>
        本站点建立之初单纯就是为了站长本人能有个观看回形针PaperClip视频的地方，不管用不用魔法都可以流畅的观看，目前看来已经实现了
      </n-p>
      <n-p>
        至于回形针PaperClip能不能重生，我认为唯一有能力去考虑这个问题的只有吴老师一人，其余人的帮忙均可能变为帮倒忙
      </n-p>
    </n-alert> -->
  </n-card>
</template>

<script setup lang="ts">
import { NA, NP, NH2, NCard, NText, NGrid, NGi } from "naive-ui";
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
