# 回形针事务所 025：为什么视频会议总让你很累

当代企业办公，视频会议已经成为最重要的工具之一。然而，你经常会碰到这样的情况。

同样是开会，为什么面对面时就能有来有回，流畅干脆，换做视频时就不但让人疲劳，而且产出很少？

![Ad/回形针事务所 025：为什么视频会议总让你很累/1.png](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/1.png?imageMogr2/format/avif)

这是因为在视频会议中，人与人之间存在谈话时延。A 发出的声音并不能立刻进入 B 的耳朵，中间存在一定的延迟。反应到会议里，就是 A 感觉到在自己说完话后， B 要经过一段很长的沉默才能回复他的话。

![Ad/回形针事务所 025：为什么视频会议总让你很累/2.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/2.gif?imageMogr2/format/avif)

较高的谈话时延会让两个人处于完全不同的节奏中。作为与会者，你经常需要猜测下面是不是该轮到自己。如果猜测失误贸然说话，就会发生开头那样的混乱。

![Ad/回形针事务所 025：为什么视频会议总让你很累/3.png](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/3.png?imageMogr2/format/avif)

虽然时延会影响视频会议的效率，但要消灭它并不容易。这是因为数据编码、传输、缓存、解码都需要时间，大约是 100\~400 ms。

![Ad/回形针事务所 025：为什么视频会议总让你很累/4.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/4.gif?imageMogr2/format/avif)

音视频质量越高，对数据包的到达率要求就越高。对此，视频点播平台的做法是在数据包到达本地后缓存 1\~2 秒再播，但开会显然没法等，1 秒都不行。

![Ad/回形针事务所 025：为什么视频会议总让你很累/5.png](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/5.png?imageMogr2/format/avif)

为了解决这个问题，腾讯会议采用了基于 QoE 优化的视频时延和冗余量控制技术，在各种网络下会动态权衡质量和时延，最低甚至可以把时延降低到 80 ms。

![Ad/回形针事务所 025：为什么视频会议总让你很累/6.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/6.jpeg?imageMogr2/format/avif)

想做到这一点，首先就要让音、视频数据变得更为智能。在处理视频数据时，腾讯会议就采用了分层编码技术。

这个技术会将所有的帧分成权重不同的三层。当它识别到你的网络情况较差时，分层编码技术只会发送权重最大的帧。即使网络卡，你的音视频也不会卡。

![Ad/回形针事务所 025：为什么视频会议总让你很累/7.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/7.gif?imageMogr2/format/avif)

但混乱的谈话节奏，还不是视频会议最累人的地方。一旦遇上网络问题，你就得不停地猜测别人在说什么。

A 说的每一个字，到了 B 的耳朵里很可能只剩下声母或者韵母，而且听上去闷闷的，不够明亮。

![Ad/回形针事务所 025：为什么视频会议总让你很累/8.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/8.gif?imageMogr2/format/avif)

因此，A 需要花费大量的脑力，结合上下文来猜出对方到底在说些什么。一场会议下来，他等于做了好几套高考英语听力。

这是因为数据包在传输中碰上了网络阻塞的情况，引发延时抖动或者是丢包，导致数据传输不完整。丢弃的包累积起来，就会造成语音听不清楚，甚至卡顿。

![Ad/回形针事务所 025：为什么视频会议总让你很累/9.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/9.jpeg?imageMogr2/format/avif)

为了解决这个问题，腾讯会议提除了上下文分析的丢包补偿方案（cPLC），提升了弱网场景下语音通话的流畅度。

这个方案，可以基于相邻时间的数据包的相关性，将丢掉的语音包还原出来，让你不需要花上许多时间才能明白对方到底在说什么，让沟通更加顺畅。

![Ad/回形针事务所 025：为什么视频会议总让你很累/10.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/10.jpeg?imageMogr2/format/avif)

而声音闷的原因，则是因为计算机在传输过程中压缩或者截去了人声的高频信息。这一现象在使用固定电话、手机加入视频会议时更加明显。

![Ad/回形针事务所 025：为什么视频会议总让你很累/11.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/11.jpeg?imageMogr2/format/avif)

对此，腾讯会议引入了业界领先的超宽带语音技术，提供优异的高清通话体验。同时也引入音频超分技术，可以根据低频的信息进行预测、补偿出语音中的高频，让语音变得更加明亮，声音音质变得更加丰满。

![Ad/回形针事务所 025：为什么视频会议总让你很累/12.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/12.jpeg?imageMogr2/format/avif)

又或者，你会经常在视频会议中听到各种奇怪的声音。

传统的降噪技术，只能消除一些平稳、有规律的环境噪音。对于手机振动、汽车鸣笛这种突发情况处理不佳。

![Ad/回形针事务所 025：为什么视频会议总让你很累/13.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/13.jpeg?imageMogr2/format/avif)

而腾讯会议采用的声学场景识别技术，不仅对火车、咖啡厅、道路等复杂通话场景进行了采样和优化，给出最适度的降噪，还能通过机器学习识别生活中的各种突发噪声，做到真正的安静开会。

![Ad/回形针事务所 025：为什么视频会议总让你很累/14.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/14.jpeg?imageMogr2/format/avif)

而这，还只是腾讯会议众多功能的冰山一角。

目前，腾讯会议已经有云会议、会议室连接器、腾讯会议 Rooms、API & SDK 等多款产品，支持个人版、商业版、企业版，充分满足不同协作场景下的开会需求，让人与人、人与会议室、会议室与会议室的连接的变得更容易。

![Ad/回形针事务所 025：为什么视频会议总让你很累/15.png](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20025：为什么视频会议总让你很累/15.png?imageMogr2/format/avif)

而这些产品将让每个人在视频会议重拾讨论和协作的快乐，不再疲惫，迸发出更多灵感火花。
