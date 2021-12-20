const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "回形针重症监护室 | ipaperclip.icu",

  head: [
    ["script", { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" }],
    // icons
    ['link', { rel:'apple-touch-icon', sizes:'120x120', href:'/icons/apple-touch-icon.png' }],
    ['link', { rel:'icon', type:'image/png', sizes:'32x32', href:'/icons/favicon-32x32.png' }],
    ['link', { rel:'icon', type:'image/png', sizes:'16x16', href:'/icons/favicon-16x16.png' }],
    ['link', { rel:'mask-icon', href:'/icons/safari-pinned-tab.svg', color:'#5bbad5'}],
    ['link', { rel:'shortcut icon', href:'/icons/favicon.ico'}],
    ['meta', { name:'msapplication-TileColor', content:'#2b5797' }],
    ['meta', { name:'msapplication-config', content:'/icons/browserconfig.xml' }],
  ],

  locales: { "/": { lang: "zh-CN" } },

  themeConfig: {
    logo: "/paperclip.png",
    hostname: "https://ipaperclip.icu",
    repo: "ipaperclip-icu/ipaperclip.icu",
    nav: [ // 顶部导航栏
      { text: "主页", link: "/", icon: "home" },
      { text: "诡辩术", link: "/诡辩术/" },
      {
        text: '视频归档',
        items: [
          { text: "PaperClip", link: '/视频归档/PaperClip/' },
          { text: "原创专辑", link: '/视频归档/原创专辑/' },
          { text: "干燥工厂", link: '/视频归档/干燥工厂/' },
          { text: "基本操作", link: '/视频归档/基本操作/' },
          { text: "灵光灯泡", link: '/视频归档/灵光灯泡/' },
          { text: "混乱博物馆", link: '/视频归档/混乱博物馆/' },
          { text: "黑水报告", link: '/视频归档/黑水报告/' },
          { text: "演讲", link: '/视频归档/演讲/' },
          { text: "其他", link: '/视频归档/其他/' },
        ]
      },
      {
        text: '文字稿',
        items: [
          { text: "Vol(常规视频)", link: '/文字稿/Vol/' },
          { text: "Sp(特别视频)", link: '/文字稿/Sp/' },
          { text: "干燥工厂", link: '/文字稿/Df/' },
          { text: "合作视频", link: '/文字稿/x/' },
          { text: "回形针事务所", link: '/文字稿/Ad/' },
        ]
      },
    ],

    sidebar: [
      "/",
      "/诡辩术",
      {
        title: "视频归档 | 导航",
        children: [
          "/视频归档/",
          "/视频归档/PaperClip/",
          "/视频归档/原创专辑/",
          "/视频归档/干燥工厂/",
          "/视频归档/基本操作/",
          "/视频归档/灵光灯泡/",
          "/视频归档/混乱博物馆/",
          "/视频归档/黑水报告/",
          "/视频归档/演讲/",
          "/视频归档/其他/",
        ]
      },
      {
        title: '文字稿 | 导航',
        children: [
          "/文字稿/",
          "/文字稿/license.md",
          "/文字稿/Vol/",
          "/文字稿/Sp/",
          "/文字稿/Df/",
          "/文字稿/x/",
          "/文字稿/Ad/",
        ]
      }
    ],

    footer: { // 默认页脚
      display: true,
      content: "MIT Licensed | Copyright © 2021-present qiaoshouzi | V4.4.2",
    },

    comment: false, // 关闭评论区
    pageInfo: false, // 关闭页面信息
    editLinks: false, // 关闭编辑
    breadcrumb: false, // 关闭路径导航
    anchorDisplay: false, // 关闭右侧标题列表

    seo: { // SEO 设置
      seo: (PageSeoInfo) => { return {'og:description': 'He, 这里归档了 回形针PaperClip&混乱博物馆 的视频和 回形针PaperClip 的文字稿'} }
    },

    copyright: {
      status: "global",
    },

    git: {
      contributor: false, // 关闭最后编辑时间
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      cachePic: true,
    },
  },
});