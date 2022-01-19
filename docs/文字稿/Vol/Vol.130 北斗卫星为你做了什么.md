# Vol.130 北斗卫星为你做了什么

2020 年 6 月 23 日，一枚长三乙运载火箭在西昌卫星发射中心顺利点火、升空。

经过近 26 分钟的飞行、调姿，将位于顶部仪器舱的导航卫星送入预定轨道，成功完成了北斗全球卫星导航系统的星座部署。

![Vol/Vol.130 北斗卫星为你做了什么/1.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/1.jpeg?imageMogr2/format/avif)

这是北斗三号的最后一颗全球组网卫星。7 月 29 日，北斗官方宣布这颗卫星已经完成在轨测试，正式入网工作。

北斗系统究竟意味着什么？覆盖全球的精准定位到底有多难?

利用卫星实现导航定位的技术称为 GNSS（Global Navigation Satellite System）全球卫星导航系统，今天主要有美国的 GPS、俄罗斯的格洛纳斯、欧盟的伽利略，以及中国的北斗。

![Vol/Vol.130 北斗卫星为你做了什么/2.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/2.jpeg?imageMogr2/format/avif)

建设这样一个能覆盖全球的卫星导航系统并不容易。

中国从 1994 年开始，分三步建设北斗卫星导航系统。

在 2000 年发射了两颗卫星，建成北斗一号，为中国用户提供服务；2012 年完成 14 颗卫星发射，建成北斗二号，服务范围扩大至亚太地区；2020 年完成 30 颗卫星发射、组网，全面建成北斗三号，覆盖全球。

![Vol/Vol.130 北斗卫星为你做了什么/3.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/3.gif?imageMogr2/format/avif)

事实上，北斗在 26 年间一共发射了 59 颗卫星，目前除去退役、失效和用于试验的，有 45 颗卫星正常在轨工作，数量要多于其他三个系统。

![Vol/Vol.130 北斗卫星为你做了什么/4.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/4.jpeg?imageMogr2/format/avif)

此外，北斗的星座架构也不同。

GPS、格洛纳斯、伽利略的卫星基本都处在高度约 20000 千米的中圆地球轨道。投影在地球上的是这种波浪状的运行轨迹，卫星分时段覆盖不同的区域，多颗卫星环绕覆盖全球。

![Vol/Vol.130 北斗卫星为你做了什么/5.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/5.jpeg?imageMogr2/format/avif)

而北斗除了在中圆地球轨道有 27 颗卫星，环绕全球外，还有 10 颗在倾斜地球同步轨道，8 字形的轨迹可以增强亚太地区的信号覆盖；还有 8 颗在地球静止轨道，能全时段服务于亚太地区。

![Vol/Vol.130 北斗卫星为你做了什么/6.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/6.gif?imageMogr2/format/avif)

更多的卫星和轨道类型增强了北斗对全球，尤其是东半球的覆盖。

这两张图是北斗和 GPS 现役卫星的运行轨迹。

![Vol/Vol.130 北斗卫星为你做了什么/7.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/7.jpeg?imageMogr2/format/avif)

而这是两者在全球任意地点可见的卫星数目图，颜色越深，当地可见的卫星越多。北斗在东半球大部分区域可见的卫星能达到 14\~16 颗乃至更多，在其他地区也至少能见到 6 颗。

![Vol/Vol.130 北斗卫星为你做了什么/8.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/8.jpeg?imageMogr2/format/avif)

那么这些卫星是如何实现全球定位的呢？

当你在地球上某个位置，拿着一个可以接收卫星信号的设备，比如手机，而天上飞着卫星，此时想要求取你在空间中的坐标 x、y、z，关键是测量卫星跟你之间的距离 S。

首先，通过卫星的星历数据能计算出卫星的坐标 x1、y1、z1，这些是已知的。

![Vol/Vol.130 北斗卫星为你做了什么/9.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/9.gif?imageMogr2/format/avif)

只需要根据勾股定理求立方体的对角线长度，就能用这个式子表示卫星跟你之间的距离 S。

其次，卫星发出的电磁波信号也能测距。已知电磁波传播的速度，光速 c 每秒近 30 万公里（299 792 458 m/s），乘上电磁波从卫星发出到手机接收所耗费的时间 tB-tA， 即为距离。

![Vol/Vol.130 北斗卫星为你做了什么/10.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/10.jpeg?imageMogr2/format/avif)

这个时间和距离的计算实际上要靠测距码。

卫星和手机会同时按相同规则持续生成一段测距码，而卫星会将测距码通过电磁波发送给手机。

但发送过程需要时间，所以手机接收到卫星发来的测距码时，会发现和自己生成的测距码有偏移，即为电磁波传播的时间。

![Vol/Vol.130 北斗卫星为你做了什么/11.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/11.gif?imageMogr2/format/avif)

以北斗的 B1C 信号为例，测距码速率为 1.023 Mbps，单个码片的宽度为速率的倒数，即 0.977517 μs。当偏移了 12 万个码片，即电磁波传播时间约为 0.117 秒，可算出距离约为 35166 公里。

知道距离，就可以得到这个等式，其中三个未知量 x、y、z 仍然无法求解。但只要有 3 颗卫星，就能列出 3 个等式构成方程组，进而求出你的坐标 x、y、z。

![Vol/Vol.130 北斗卫星为你做了什么/12.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/12.jpeg?imageMogr2/format/avif)

看起来似乎轻松又简单，然而，得到这样的坐标根本不准。

因为里面任何参数哪怕再小的误差都会让定位大幅偏移，比如电磁波传播的时间，只要 0.000 001 秒的误差，计算距离就会变化 300 米。

为了减小这个误差，我们首先得考虑在卫星上的钟准不准。

![Vol/Vol.130 北斗卫星为你做了什么/13.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/13.jpeg?imageMogr2/format/avif)

今天北斗卫星上搭载的原子钟，精度可达 300 万年只差一秒，但在太空中运行，它却会遭遇相对论效应。

简单来说，根据狭义相对论，卫星相对地面快速运动，那么从地面观测卫星上的时间会变慢。

![Vol/Vol.130 北斗卫星为你做了什么/14.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/14.gif?imageMogr2/format/avif)

而根据广义相对论，卫星相比地面离地心更远，拥有的引力势能绝对值也更小，时间又会比地面更快。

两者对卫星上时钟的综合影响就是比地面上的钟走得更快，其变化量可以用这个公式表示。

![Vol/Vol.130 北斗卫星为你做了什么/15.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/15.jpeg?imageMogr2/format/avif)

那么如何才能消去这个变化量呢？

公式的前半部分可以通过地心引力常数 μ、光速 c 等数值计算得出。假设卫星在距离地心 36 000 公里的圆轨道运行，那么卫星上的时间会比地面每秒快上 0.000 000 000 51 秒左右。

消除这部分的变化量可以在卫星发射之前就按一定倍数先调低卫星上原子钟的频率，让它走得更慢。

![Vol/Vol.130 北斗卫星为你做了什么/16.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/16.jpeg?imageMogr2/format/avif)

但卫星实际运行的轨道其实是椭圆，由相对论效应引发的变化会有周期性变化，主要是公式的后半部分。

当然，这也可以通过轨道偏心率、长半轴、偏近点角等参数计算得出数值实时修正。

![Vol/Vol.130 北斗卫星为你做了什么/17.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/17.jpeg?imageMogr2/format/avif)

但这还不够，原子钟在无人维护情况下本身运行时仍有误差，卫星坐标在计算时也有误差，电磁波在大气中传播时受电离层、对流层影响速度也会变化。

不过别担心，今天已经有各种各样的数学模型可以计算出这些误差的数值。

![Vol/Vol.130 北斗卫星为你做了什么/18.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/18.jpeg?imageMogr2/format/avif)

然而，还有个麻烦的误差，就是地面接收机的时间误差。像手机这类设备会因为各种各样的原因出现误差，且误差大小很难直接计算修正。

别慌！

我们可以把这个误差也设为一个未知量，引入第 4 颗卫星，得到四个等式就能求出接收机的时间误差和坐标这四个未知量，进而更精确地确定你的位置。

![Vol/Vol.130 北斗卫星为你做了什么/19.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/19.jpeg?imageMogr2/format/avif)

当然，北斗实现精准定位的技术远远不止这些。今天，北斗可以做到在全球的定位精度优于 10 米，在亚太地区的定位精度优于 5 米。

![Vol/Vol.130 北斗卫星为你做了什么/20.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/20.jpeg?imageMogr2/format/avif)

且通过基于大量地面基准站的地基增强、星基增强等方式，更能实现分米级、厘米级乃至后处理毫米级的高精度定位。

这种技术实力的应用在当代生活中已经随处可见。从大坝监测、电力通信、精准农业，到公交车、共享单车、手机，你都可以看到北斗的身影。

![Vol/Vol.130 北斗卫星为你做了什么/21.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/21.jpeg?imageMogr2/format/avif)

而在这个利用卫星实现全球定位的过程中，凝结了无数科学家、工程师对于误差的锱铢必较。

![Vol/Vol.130 北斗卫星为你做了什么/22.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/22.jpeg?imageMogr2/format/avif)

所以当你再仰望苍穹时，别忘了北斗除了有七星之外，还有 45 颗卫星漂浮在数万公里的高空，让你得知自己身在何处，又去往何方。

![Vol/Vol.130 北斗卫星为你做了什么/23.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Vol/Vol.130%20北斗卫星为你做了什么/23.gif?imageMogr2/format/avif)

> [!TIP|style:callout|label:该文件编辑日志]
>
> - AUG 30, 2020. By [Zhao-Robert](https://github.com/Zhao-Robert)  
> `add Vol.130`
> - SEP 19, 2021. By [Just-Prog](https://github.com/Just-Prog)  
> `图片链修复`
