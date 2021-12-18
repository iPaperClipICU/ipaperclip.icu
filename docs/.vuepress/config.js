module.exports = {
  lang: 'zh-CN',
  title: '回形针重症监护室 | ipaperclip.icu',
  head: [
    // Card
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { property: 'og:title', content: '回形针重症监护室' }],
    ['meta', { property: 'og:url', content: 'https://ipaperclip.icu/' }],
    ['meta', { property: 'og:site_name', content: 'ipaperclip.icu' }],
    ['meta', { property: 'og:description', content: 'He, 这里归档了 回形针PaperClip&混乱博物馆 的视频和 回形针PaperClip 的文字稿' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: 'https://cdn.jsdelivr.net/gh/ipaperclip-icu/static@main/favicon/favicon.png' }],
    // 自定义CSS
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/assets/stylesheets/video.min.css' }]
  ],
  plugins: [
    ['@vuepress/plugin-search', {maxSuggestions: 6}],
  ],

  themeConfig: {
    logo: 'https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/favicon/favicon.png',
    repo: 'ipaperclip-icu/ipaperclip.icu',
    editLink: false,
    lastUpdated: false,
    tip: 'asd',
    // 顶部导航
    navbar: [
      '/诡辩术.md',
      {
        text: '视频归档',
        children: [
          '/视频归档/PaperClip/',
          '/视频归档/原创专辑/',
          '/视频归档/干燥工厂/',
          '/视频归档/基本操作/',
          '/视频归档/灵光灯泡/',
          '/视频归档/混乱博物馆/',
          '/视频归档/黑水报告/',
          '/视频归档/演讲/',
          '/视频归档/其他/'
        ]
      },
      {
        text: '文字稿',
        children: [
          '/文字稿/Vol/',
          '/文字稿/Sp/',
          '/文字稿/Df/',
          '/文字稿/x/',
          '/文字稿/Ad/'
        ]
      },
    ],
    // 左侧导航
    sidebar: [
      '/诡辩术.md',
      {
        text: '视频归档 | 导航',
        children: [
          '/视频归档/',
          '/视频归档/PaperClip/',
          '/视频归档/原创专辑/',
          '/视频归档/干燥工厂/',
          '/视频归档/基本操作/',
          '/视频归档/灵光灯泡/',
          '/视频归档/混乱博物馆/',
          '/视频归档/黑水报告/',
          '/视频归档/演讲/',
          '/视频归档/其他/'
        ]
      },
      {
        text: '文字稿 | 导航',
        children: [
          '/文字稿/',
          '/文字稿/license.md',
          '/文字稿/Vol/',
          '/文字稿/Sp/',
          '/文字稿/Df/',
          '/文字稿/x/',
          '/文字稿/Ad/'
        ]
      }
    ]
  },
}