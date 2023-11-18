---
description: 可以在 Visual Studio 中将全局函数标记为静态。
title: 将全局函数设为静态
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Visual Studio 现在提供可用于轻松将全局函数标记为静态的功能。 如果要将全局函数的使用限制为其定义的位置，并且该函数缺少前向声明，则可以将其设置为静态。
将鼠标悬停在全局函数上时，会出现提示，表明该函数可以转换为静态函数。 要进行此调整，可以单击螺丝刀图标并选择“将此函数设为静态”选项。

![将全局函数设为静态的示例](../media/global_function_static_example.mp4 "[将全局函数设为静态的示例")

默认情况下，此功能作为建议启用。 可以通过导航到“工具”>“选项”>“文本编辑器”>“C/C++”>“IntelliSense”来自定义此设置。

![“将全局函数设为静态”的设置](../media/global_function_static_setting.png "“将全局函数设为静态”的设置")

有关详细信息，请访问[将全局函数设为静态博客文章](https://aka.ms/MakeGlobalFunctionStaticBlogPost)。
