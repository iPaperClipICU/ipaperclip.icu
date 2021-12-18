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
    // PWA
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // icons
    ['link', { rel:'apple-touch-icon', sizes:'120x120', href:'/icons/apple-touch-icon.png' }],
    ['link', { rel:'icon', type:'image/png', sizes:'32x32', href:'/icons/favicon-32x32.png' }],
    ['link', { rel:'icon', type:'image/png', sizes:'16x16', href:'/icons/favicon-16x16.png' }],
    ['link', { rel:'mask-icon', href:'/icons/safari-pinned-tab.svg', color:'#5bbad5'}],
    ['link', { rel:'shortcut icon', href:'/icons/favicon.ico'}],
    ['meta', { name:'msapplication-TileColor', content:'#2b5797' }],
    ['meta', { name:'msapplication-config', content:'/icons/browserconfig.xml' }],
  ],
  plugins: [
    ['@vuepress/plugin-search', { maxSuggestions: 6 }],
    ['@vuepress/pwa', { skipWaiting: true }],
  ],

  themeConfig: {
    logo: 'https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/favicon/favicon.png',
    repo: 'ipaperclip-icu/ipaperclip.icu',
    editLink: false,
    lastUpdated: false,
    contributors: false,
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