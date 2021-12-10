
![Vol/Vol.020%20围棋%20AI%20养成指南/1.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/1.gif)

# Vol.020 围棋 AI 养成指南

2017 年 5 月 27 日，由谷歌开发的围棋 AI AlphaGo 以3:0 击败当时世界排名第一的围棋棋手柯洁，随后宣布退役。

![Vol/Vol.020%20围棋%20AI%20养成指南/2.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/2.gif)

虽然 AlphaGo隐退，但它的算法却启发了一大批围棋AI 的开发。而这些 AI 之间的交锋很快成了围棋领域新的焦点。

创立于 2007 年的UEC 杯世界电脑围棋大赛每年都会集结全世界最先进的围棋 AI ，在相当长的一段时间内，冠军都由法国的Crazy Stone 和日本的 Zen 轮流获得。

![Vol/Vol.020%20围棋%20AI%20养成指南/3.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/3.gif)

然而在 2017 年第 10 届比赛中，由腾讯团队开发的围棋 AI “绝艺”首次参赛就打败其他老牌劲旅，夺得冠军，一举展示了新算法的优越性。

围棋AI新算法为什么这么厉害？

通常来说，所有棋类游戏都可以展开成一棵“游戏树”，这棵“游戏树”包含了每一回合的所有可能局面。AI 要想获得胜利，最直接的办法就是“暴力搜索”，列举出所有可能的棋局，再从最终的胜局向前回溯到当前局面，选择获胜概率最大的走法。

![Vol/Vol.020%20围棋%20AI%20养成指南/4.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/4.gif)

但围棋可能的棋局数量是 10 的 170次方，远远超过已知宇宙中所有原子的数量（10 的 80 次方），如果用“暴力搜索”下围棋，还没等人工智能算完，对面的人类棋手就已老去。

所以为了提高下棋速度，首先要提高计算机的运算能力。但即便是2018 年世界上最快的超级计算机 Summit，每秒 20 亿亿次的浮点运算还是很难用“暴力搜索法”应对围棋的巨大变数。

![Vol/Vol.020%20围棋%20AI%20养成指南/5.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/5.gif)

要想在合理的时间内做出决策，必须优化程序的算法。

围棋 AI 算法的核心在于：蒙特卡洛树搜索以及人工神经网络。

蒙特卡洛树搜索的基本原理可以理解为，在“游戏树”中随机选择一条分支，并向下推演，如果这条分支的走法可以获胜，就赋予一定权重，并在下次随机选择时优先选择权重高的分支。当随机推演的次数越来越多，那些接近必胜的走法就会脱颖而出。

![Vol/Vol.020%20围棋%20AI%20养成指南/6.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/6.gif)

而人工神经网络包含策略网络（Policy Net）和价值网络（Value Net）。

通过人类棋谱以及自己左右互搏获取数据，前者可以找出规律并预测对手的下一步；

![Vol/Vol.020%20围棋%20AI%20养成指南/7.png](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/7.png)

后者可以计算出不同决策的获胜概率。

![Vol/Vol.020%20围棋%20AI%20养成指南/8.png](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/8.png)

配合人工神经网络，蒙特卡洛树搜索算法可以优先找到对手最可能走以及获胜概率较大的那些分支，在保证胜率的同时极大缩短了运算时间。

![Vol/Vol.020%20围棋%20AI%20养成指南/9.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/9.gif)

不过，要想开发出实力强劲的AI，只有算法还远远不够，不同的训练方法会让围棋AI 的实力相去甚远。

在这方面，“绝艺”的秘诀之一就是和人类棋手切磋。

2016 年 8 月，“绝艺”开始用野狐扫地僧、刑天、骊龙等马甲在对战平台“腾讯野狐围棋”上与一百多位顶尖棋手对弈上千局。

![Vol/Vol.020%20围棋%20AI%20养成指南/10.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/10.gif)

这些人类棋手的棋风各异，能让“绝艺”暴露其不足而得以不断优化。2016年“绝艺”的胜率还在上下波动，到 2017 年底就已经能稳居90% 以上。

![Vol/Vol.020%20围棋%20AI%20养成指南/11.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/11.gif)

此外，这还让“绝艺”成了圈内的网红。今天，绝艺的每一次在线对局都有超过上千的棋迷观赛。2017 年 8 月，“绝艺”更是发出了自己的第一条微博，开始与网友互动。于棋迷们而言，“绝艺”是天赋异禀的少年棋士，又因其与“野狐”的渊源，也被戏称为机智的“小狐狸”。

与此同时，其他围棋 AI 也走上了网红之路，比如来自比利时的Leela Zero 采用分布式计算，靠志愿者的电脑提供算力，通过开源收获了世界各地棋迷的宠爱。而来自美国的 ELF OpenGo 则致力于搭建人工智能游戏测试平台，让围棋 AI 的算法适配更多类型的游戏。

![Vol/Vol.020%20围棋%20AI%20养成指南/12.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/12.gif)

今天，人工智能已经开始改变人类对围棋的认知， 2018 年4月，“绝艺”成为中国国家围棋队训练专用AI。通过显示人类棋手每一步的胜率和变化图，更精确地判断出局势变化，摒弃了以往人类棋手依靠经验与直觉的笼统评价。

![Vol/Vol.020%20围棋%20AI%20养成指南/13.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/13.gif)

毫无疑问，人工智能的应用拓宽了人类对围棋的认知，而这种认知也将不断提高围棋AI 的实力。

于2018 年 6 月 23日开幕的，腾讯世界人工智能围棋大赛，集结了11 支国际顶尖的围棋 AI 队伍。在两天的预选赛中，各国AI上演了无数精彩对局，而“绝艺”也获得了七战七胜的骄人成绩，携LeeLa Zero、ELF OpenGo、星阵围棋等八位AI选手晋级复赛。

![Vol/Vol.020%20围棋%20AI%20养成指南/14.gif](https://cdn.jsdelivr.net/gh/ipaperclip-icu/static/image/文字稿/Vol/Vol.020%20围棋%20AI%20养成指南/14.gif)

7月9日-21日，每天下午两点和七点，登录腾讯野狐围棋即可围观八强复赛。从复赛中脱颖而出的四强AI，将于7月29日-31日，会师中国棋院展开线下总决赛。
