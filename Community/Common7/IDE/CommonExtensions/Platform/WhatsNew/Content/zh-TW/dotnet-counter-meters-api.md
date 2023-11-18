---
description: .NET 計數器工具透過整合的 .NET 計量 API，透過新的工具增強功能。
title: 透過計量 API 對新儀器的 .NET 計數器支援
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

最新版的 .NET 計數器工具引進了與 .NET 計量 API 整合的擴充功能，包括新的檢測選項，包括「Counter」和「ObservableCounter」。

「計數器」會持續追蹤隨著時間變更的值，而呼叫端會使用「Counter<T>.Add」。 相反地，「ObservableCounter」就像計數器，但呼叫端會負責追蹤總值。 目前 .NET 計數器工具會報告總計的變更率。

您可以在 .NET 計數器計量名冊清單中找到這些計量，以增強系統效能和資源使用率的可見度。 此外，我們正積極規劃在未來引進額外的儀器選項，以進一步增強這項功能。

![.NET 計數器計量 API](../media/DotNetCounter-MetersApi.mp4 ".NET 計數器計量 API")

