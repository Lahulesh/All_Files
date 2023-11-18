---
description: 使用 Build Insights 集成查看函数生成时间
title: C++ Build Insights 函数视图
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) 现已与 Visual Studio 2022 集成！ 现在可以查看与函数生成相关的其他信息。 新的函数视图将提供函数在编译期间花费的时间以及关联的 ForceInlinee 数量。

![Build Insights 组件](../media/buildinsights-component.png "Build Insights 组件")

若要确保正确启用 Build Insights，请在 Visual Studio 安装程序的“使用 C++ 进行桌面开发”或“使用 C++ 进行游戏开发”工作负载下，仔细检查是否已选中“C++ Build Insights”。

![Build Insights 菜单](../media/buildinsights-menu.png "Build Insights 菜单")

只需点击一下，即可启动 Build Insights .etl 跟踪捕获。 

![Build Insights 示例](../media/buildinsights-functions.png "Build Insights 示例")

编译后，Build Insights 将创建一个诊断报告，供你查看函数生成时间和 ForceInlinee。

我们致力于不断改进 Build Insights。 你今天看到的 Build Insights 的当前集成仅仅是我们为你准备的内容的一部分。 哪些工作流对你很重要？ 请在此[开发者社区票证](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)中告知我们
