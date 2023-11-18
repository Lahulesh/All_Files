---
description: .NET 计数器工具通过集成的 .NET 计量 API 使用新检测增强功能。
title: 通过计量 API 提供对新检测的 Dot Net 计数器支持
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

.NET 计数器工具的最新版本引入了与 .NET Meters API 集成的扩展功能，其中整合了“Counter”和“ObservableCounter”等新的检测选项。

“Counter”可跟踪值随时间的变化，调用方使用“Counter<T>.Add”报告更新。 与之相比，“ObservableCounter”类似于计数器，但调用方负责跟踪总值。 目前，.NET 计数器工具报告总计变化率。

你可以在 .NET 计数器指标名单列表上找到这些指标，它们提供对系统性能和资源利用率的增强可见性。 此外，我们正在积极计划在未来引入其他检测选项，来进一步增强此功能。

![Dot Net 计数器计量 API](../media/DotNetCounter-MetersApi.mp4 "Dot Net 计数器计量 API")

