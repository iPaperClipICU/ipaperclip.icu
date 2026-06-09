<template>
  <div v-if="props.data.type === 'video'">
    <media-player :src="playUrl" aspect-ratio="16/9" ref="player" storage="vidstack-config">
      <media-provider></media-provider>
      <media-video-layout :translations="CHS"></media-video-layout>
    </media-player>
  </div>
  <div v-else-if="props.data.type === 'image'">
    <n-grid :cols="36" item-responsive>
      <n-gi span="1 768:5" />
      <n-gi span="34 768:26">
        <img :src="playUrl" loading="lazy" style="width: 100%" />
      </n-gi>
      <n-gi span="1 768:5" />
    </n-grid>
  </div>
  <div v-else-if="props.data.type === 'audio'" style="min-height: 76px">
    <media-player :title="data.name" :src="playUrl" ref="player" storage="vidstack-config">
      <media-provider></media-provider>
      <media-audio-layout :translations="CHS"></media-audio-layout>
    </media-player>
  </div>
</template>

<script setup lang="ts">
import { NGi, NGrid } from 'naive-ui'
import { computed, onBeforeUnmount, onMounted, ref, type PropType } from 'vue'

import type { FileData } from '@/types'
import { usePublicStore } from '@/stores'

import 'vidstack/bundle'
import type { DefaultLayoutTranslations } from 'vidstack'
import type { MediaPlayerElement } from 'vidstack/elements'

const props = defineProps({
  data: {
    type: Object as PropType<FileData>,
    required: true,
  },
})
const publicStore = usePublicStore()

const player = ref<MediaPlayerElement>()
const playUrl = computed(() => `${publicStore.CDNDomain}/${props.data.fileUri}`)

onBeforeUnmount(() => {
  player.value?.destroy()
})

const CHS: DefaultLayoutTranslations = {
  'Caption Styles': '字幕样式',
  'Captions look like this': '字幕效果预览',
  'Closed-Captions Off': '关闭隐藏字幕',
  'Closed-Captions On': '开启隐藏字幕',
  'Display Background': '显示背景',
  'Enter Fullscreen': '进入全屏',
  'Enter PiP': '进入画中画',
  'Exit Fullscreen': '退出全屏',
  'Exit PiP': '退出画中画',
  'Google Cast': '投屏',
  'Keyboard Animations': '键盘动画',
  'Seek Backward': '快退',
  'Seek Forward': '快进',
  'Skip To Live': '跳至直播',
  'Text Background': '文字背景',
  Accessibility: '无障碍',
  AirPlay: 'AirPlay',
  Announcements: '公告',
  Audio: '音频',
  Auto: '自动',
  Boost: '增强',
  Captions: '字幕',
  Chapters: '章节',
  Color: '颜色',
  Connected: '已连接',
  Connecting: '连接中',
  Continue: '继续',
  Default: '默认',
  Disabled: '已禁用',
  Disconnected: '已断开',
  Download: '下载',
  Family: '字体族',
  Font: '字体',
  Fullscreen: '全屏',
  LIVE: '直播',
  Loop: '循环播放',
  Mute: '静音',
  Normal: '正常',
  Off: '关闭',
  Opacity: '不透明度',
  Pause: '暂停',
  PiP: '画中画',
  Play: '播放',
  Playback: '播放',
  Quality: '画质',
  Replay: '重新播放',
  Reset: '重置',
  Seek: '进度',
  Settings: '设置',
  Shadow: '阴影',
  Size: '大小',
  Speed: '速度',
  Text: '文本',
  Track: '字幕轨',
  Unmute: '取消静音',
  Volume: '音量',
}
</script>
