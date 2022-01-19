# 回形针事务所 024：人工智能如何帮你看病？

我是张甲木，这里是回形针事务所，今天我们要研究英特尔搭配了 AI 加速技术的至强处理器。

在人工智能时代，传统处理器已无法满足企业对人工智能产品快速推理的需求。为了让人工智能的应用更便捷、更快速，英特尔对处理器都做了什么？

![Ad/回形针事务所 024：人工智能如何帮你看病？/1.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/1.jpeg?imageMogr2/format/avif)

2020 年，肺部 CT 等图像，频繁出现在大众视野中。

诊断一位患者，医生就需仔细观察超过 300 幅 CT 影像。往日里，医生或许能慢慢看。但在疫情之下，这太慢了。

![Ad/回形针事务所 024：人工智能如何帮你看病？/2.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/2.jpeg?imageMogr2/format/avif)

如果医生诊疗流程简化为问诊、检查、看报告、判断、给出治疗方案五个环节。一个会看 CT、能快速做判断，且不会疲倦的人工智能，就能在第三环节省大量时间。

![Ad/回形针事务所 024：人工智能如何帮你看病？/3.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/3.jpeg?imageMogr2/format/avif)

人工智能如何辅助医生看病，并分辨出图像中的异样？

讲人工智能之前，先做一个简单测试：在这些图里找到小狗。

![Ad/回形针事务所 024：人工智能如何帮你看病？/4.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/4.jpeg?imageMogr2/format/avif)

很容易，因为你看过太多动物的图像，所以能快速做出判断。就算猛地分不清二哈和阿拉斯加，逼你一直看一直看，一段时间后辨认也不难。

原理很浅显，无非大脑不断看图，提取眼睛、耳朵、整体长相等特征，在脑海中强化，最后分类。

![Ad/回形针事务所 024：人工智能如何帮你看病？/5.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/5.jpeg?imageMogr2/format/avif)

同理，让机器重复一样的过程就行，简单。但机器有个问题——没脑子。

怎么办！只能先给机器搭一个人工神经网络。

大概长这样，像简化后平面化的人脑神经网络。在最左边的输入层输入训练图像，激活中间一层层设好参数的人工神经网络，在最右边输出层输出结果。

![Ad/回形针事务所 024：人工智能如何帮你看病？/6.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/6.jpeg?imageMogr2/format/avif)

注意，这张图人眼看是这样。但对机器，黑白只是灰度值，本质就是一堆数字。所以，机器学习图像的本质是学数值的特征。

![Ad/回形针事务所 024：人工智能如何帮你看病？/7.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/7.gif?imageMogr2/format/avif)

但一个一个学，运算量太大，尤其遇到超高清图片，数值太多了。

所以为了提取特征也减少运算，我们用这样叫「卷积核」的东西，一个区域一个区域地扫，将每个对应的数字相乘，再求和，就提取了区域数值特征。

![Ad/回形针事务所 024：人工智能如何帮你看病？/8.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/8.gif?imageMogr2/format/avif)

数据再经过一个叫「池化」的环节，像这样取区域内最大值，将特征数据量再浓缩、展平、输入全神经网络，这样就能减少运算量。

![Ad/回形针事务所 024：人工智能如何帮你看病？/9.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/9.gif?imageMogr2/format/avif)

因为涉及到卷积运算，所以叫卷积神经网络。卷积核的大小、步调、卷积层的数量等都可预先调节。

机器输出的数值会和对目标结果预设的数值做比对。

如果符合预期，即为成功；如果不符合预期，就会通过一系列运算，反向调节各环节参数，再算一次，不断重复，直到符合预期。这就是机器自主学习的原理。

![Ad/回形针事务所 024：人工智能如何帮你看病？/10.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/10.gif?imageMogr2/format/avif)

同理，准备大量肺部 CT 影像，找专业医生对病灶进行精准标注，然后输入神经网络进行训练，就能得到一个几秒内快速识别肺部 CT 影像的卷积神经网络。

![Ad/回形针事务所 024：人工智能如何帮你看病？/11.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/11.jpeg?imageMogr2/format/avif)

这并非构想，该技术在今年的疫情中已经开始应用。

伴随神经医学、颈椎病症识别、DNA 检测和癌症识别等各种场景应用，人工智能正深度重构整个医疗行业。

![Ad/回形针事务所 024：人工智能如何帮你看病？/12.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/12.jpeg?imageMogr2/format/avif)

当然，应对不同问题有不同的神经网络。但不管搭建训练哪一种，哪怕放一首歌，对计算机都是在处理不同量级的数据。本质上，一堆 1 和 0。

数据量越大，需处理的 1 和 0 的量也越大，处理慢了就会这样，或这样卡屏，甚至崩溃。

![Ad/回形针事务所 024：人工智能如何帮你看病？/13.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/13.gif?imageMogr2/format/avif)

究其根本，处理数据的主要核心，就是处理器。

针对人工智能，现在有 GPU，适用多种深度学习应用；ASIC，可针对特定 AI 应用模型定制化开发；FPGA，可灵活编程、匹配不同 AI 应用等等。性能都不错，但部署和使用的门槛和成本也不低。

![Ad/回形针事务所 024：人工智能如何帮你看病？/14.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/14.gif?imageMogr2/format/avif)

而对大多希望利用 AI 解决业务问题，而非专注 AI 算法创新迭代的公司，通用处理器 CPU 因为方便让企业基于现有 IT 基础设施执行常见 AI 应用，无需导入专用芯片，则是更好的选择。

![Ad/回形针事务所 024：人工智能如何帮你看病？/15.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/15.jpeg?imageMogr2/format/avif)

但想针对性地强化 AI 性能，利用 CPU 可以吗？答案是肯定的，英特尔至强 CPU 就集成了 AI 加速技术。

CPU 完成一次计算大概要经历以下几个阶段：取出指令、指令解码并取出数据、执行指令形成计算结果并进行存取。

![Ad/回形针事务所 024：人工智能如何帮你看病？/16.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/16.jpeg?imageMogr2/format/avif)

海量数据的计算就是 CPU 按照指令不断进行循环操作的过程，所以指令系统直接关系 CPU 性能的发挥。

在传统标量时代，只能执行单指令单数据，以致处理海量数据时极为耗时。但单指令多数据矢量功能的出现，改变了这个困境，最新的 AVX512 指令集将矢量计算性能提至新高度，大大加快数据处理速度。

![Ad/回形针事务所 024：人工智能如何帮你看病？/17.gif](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/17.gif?imageMogr2/format/avif)

而这只是英特尔迈向 AI 领域的基础之一。虽然大多数商业深度学习都在 CPU 上使用32 位浮点精度进行训练和推理工作，精确度更高。

但根据研究，用低精度的数据格式推理不会对准确性有很大影响。

![Ad/回形针事务所 024：人工智能如何帮你看病？/18.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/18.jpeg?imageMogr2/format/avif)

且稍低的精度意味可存放更多数据，增加数据传输效率，带来更快的计算速度。所以英特尔采取精度略低的 INT8 格式以达到更高的运算效率。

![Ad/回形针事务所 024：人工智能如何帮你看病？/19.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/19.jpeg?imageMogr2/format/avif)

再配合 VNNI 指令，将需要三条指令完成的工作压缩为一条，进一步提升推理速度。

![Ad/回形针事务所 024：人工智能如何帮你看病？/20.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/20.jpeg?imageMogr2/format/avif)

如果想要实现效率和精度的双赢，Bfloat16 则是更优选择。只通过一半的比特数就可达到与 FP32 相近的模型精度，且速度可以带来 1.9 倍的提升。

![Ad/回形针事务所 024：人工智能如何帮你看病？/21.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/21.jpeg?imageMogr2/format/avif)

其实，集成了 AI 加速技术的至强 CPU，只是英特尔 AI 全栈解决方案的起点。

英特尔针对 AI 应用还将提供灵活的 FPGA、高性能的 HABANA 芯片、VPU、GPU，以及一个统一的软件开发和优化工具接口，One API 等等。

![Ad/回形针事务所 024：人工智能如何帮你看病？/22.jpeg](https://file.hsyhx.top/iPaperClipICU/web/assets/image/文字稿/Ad/回形针事务所%20024：人工智能如何帮你看病？/22.jpeg?imageMogr2/format/avif)

随着硬件基础的不断提高，人工智能也正不断突破着想象中未来的边界。
