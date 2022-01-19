# 回形针事务所 018 - 你打电话时究竟发生了什么？

我是孟心一，这里是回形针事务所，今天的客户是中国移动。

他们告诉我们，利用 5G 技术，不仅能实现手机通话质量的提升，并且还实现了视频彩铃等新功能的增强，为普通人展示自己的精彩人生提供了更多可能。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/1.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/1.jpeg?imageMogr2/format/avif)

5G 如何提升通话质量？它又是怎么为语音通话提供更多功能的？

首先要知道，你打电话的时候发生了什么。

很简单，拿起手机，拨通电话，你的语音信号通过基站找到张甲木，你们就能聊一宿。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/2.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/2.gif?imageMogr2/format/avif)

但事实上，打一通电话的过程比想象的复杂很多。

这是 2G 时代的组网架构，核心设备 MSC 移动网络交换中心，连接着不同功能的服务器。

如：用于识别用户号码、业务的位置寄存器；存储用户临时地址、帐户状态和偏好的归属位置寄存器；检查设备合法性的设备识别寄存器和鉴权中心。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/3.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/3.jpeg?imageMogr2/format/avif)

它们共同组成了移动网络的核心网。

拿起手机，拨打电话，核心网会在基站和各个服务器中，互相交换指令信息，这些信息叫做「信令」。

拨通电话，需要完成这样的信令流程：接入交换中心、主叫鉴权加密、分配通道、接入被叫、被叫鉴权加密、业务指配。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/4.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/4.gif?imageMogr2/format/avif)

在完成这样复杂的信令流程后，核心网会为你在 900 MHz 左右的频段内分配一个频宽 0.2 MHz 左右的独立区间来通话，并发送回铃声音，等待张甲木接通。

核心网中，用于承载「信令」部分的连接，叫「控制面」，而到达手机的语音数据和网络数据，都在「用户面」上传递。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/5.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/5.jpeg?imageMogr2/format/avif)

2G 时代，采用的是电路交换网络，也就是说，传递信息必须建立独立的信息通道，专线专用，效率低下。这就使得拨出电话到完成全部信息流程，会有长达 6\~7 秒的时延。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/6.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/6.gif?imageMogr2/format/avif)

接下来，为了充分利用回铃音时间，商家加入了彩铃这一功能。

当位置寄存器发现被叫用户签约了彩铃业务，呼叫就会由 MSC 路由到彩铃业务平台，彩铃业务平台会用一段流行金曲来替代原来的回铃音。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/7.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/7.gif?imageMogr2/format/avif)

但无论语音还是彩铃，都只能以电话刚刚发明就沿用至今的音频格式，传输速率仅为 12.2 kbit/s，基本上毫无听觉体验可言。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/8.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/8.jpeg?imageMogr2/format/avif)

如果想要提升通话质量和减少时延，就需要升级组网。

3G/4G 时代，电路交换网络被替换成了分组交换网络，让数据可以在多个节点暂时存储和转发，节省了占用通道的时间。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/9.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/9.gif?imageMogr2/format/avif)

4G 早期的 LTE 组网，让互联网数据连上了宽带，最直观的感受是：上网变快了。

但 LTE 并不能承载语音数据，打电话时，系统会断开 4G 信号，回落到 2G 网络完成语音通话，等接完电话后再转回 4G 网络。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/10.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/10.jpeg?imageMogr2/format/avif)

毕竟打电话才是手机的基础功能，4G 升级到了 VoLTE 组网，通过一个 IMS（IP 多媒体子系统）来处理信令和数据，将语音也连入了 4G 核心网。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/11.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/11.jpeg?imageMogr2/format/avif)

提升后的带宽可以让语音以 23.85 kbit/s 的传输速率传递，实现高清语音通话。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/12.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/12.jpeg?imageMogr2/format/avif)

而高质量通话体验远远不能发挥 VoLTE 的全部实力。于是，能「被看见」的彩铃悄悄登上了舞台。

和语音彩铃类似，仅仅需要在核心网中串行一个负责彩铃功能的业务网元 AS，就能在主叫用户等待电话接通的时候，在呼叫等待页面看到一段被叫用户精心挑选的 480P 清晰度的视频。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/13.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/13.jpeg?imageMogr2/format/avif)

不过，4G 网络虽然升级了核心网带宽，但实现每个功能依然需要在负责各种功能的专用设备中建立接口，才能传递信令，导致在 IMS 核心网中通话，同样可能存在时延。

到了 5G 时代，通话才有机会真正产生革命性的变化。

首先，5G 核心网摒弃了前代中实现某种功能必须访问相应设备的解决方案，将所有核心网中的专用设备替换成了统一标准的 x86 服务器，这些物理服务器构成了一个巨大的资源池。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/14.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/14.jpeg?imageMogr2/format/avif)

在这个资源池上，只要安装不同的软件，就能灵活地实现「控制面」的各种功能。而「用户面」的部件，就可以直接部署到基站中，与用户连接得更紧密。

这样，在实现集中控制的同时，增大了数据传输的效率，降低了延迟。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/15.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/15.jpeg?imageMogr2/format/avif)

但 5G 时代初期，受制于基站覆盖率低，信号还是会首先通过 VoLTE 基站，再转入 5G 核心网中。

随着基站的增加， 5G 将全面转型成为 Vo-NR 组网。通过 5G NR 基站直接接入核心网后，能提供相比于 4G 几倍甚至几十倍的带宽。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/16.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/16.jpeg?imageMogr2/format/avif)

在「大带宽」的加持下，视频彩铃进化成了 4K 高清的「5G+短视频」。

而控制面的「低延迟」让这个瞬间的实时互动成为可能，中国移动的这项独创技术，甚至可以让你对心仪的内容实时弹幕打 call。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/17.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/17.gif?imageMogr2/format/avif)

5G 技术，提升了移动互联网的体验，更让打电话这件小事本身实现了飞跃。

最重要的是，你拥有了无限种表达的可能性，这种可能性也许是更广阔的沟通，也许仅仅是让你有了一个机会，让属于你的想法和精彩人生「被看见」。

即使你拨出去的电话没人接，也不会感到孤单，毕竟，你还能看到超过一亿移动视频彩铃用户的狂欢。

![Ad/回形针事务所 018 - 你打电话时究竟发生了什么？/18.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20018%20-%20你打电话时究竟发生了什么？/18.gif?imageMogr2/format/avif)
