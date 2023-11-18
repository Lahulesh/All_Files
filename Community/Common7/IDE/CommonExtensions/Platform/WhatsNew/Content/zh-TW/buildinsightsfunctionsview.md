---
description: 檢視具有 Build Insights 整合的函式產生時間
title: C++ Build Insights 函式檢視
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) 現在已與 Visual Studio 2022 整合！ 您現在可以看到與函式產生相關的其他資訊。 新的函式檢視會為您提供函式在編譯期間所花費的時間長度，以及相關聯的 ForceInlinees 數目。

![Build Insights 元件](../media/buildinsights-component.png "Build Insights 元件")

為了確保正確啟用 Build Insights，請仔細檢查 Visual Studio 安裝程式中「使用 C++ 進行桌面開發」或「使用 C++ 進行遊戲開發」工作負載下所選的「C++ Build Insights」。

![Build Insights 選單](../media/buildinsights-menu.png "Build Insights 選單")

使用按鈕按一下，即可啟動您的 Build Insights .etl 追蹤擷取。 

![Build Insights 範例](../media/buildinsights-functions.png "Build Insights 範例")

編譯完後，Build Insights 會建立一個診斷報告，讓您可以查看函式產生時間以及 ForceInlinees。

我們致力於持續改善 Build Insights。 您今天所見的 Build Insights 目前整合，僅僅是我們為您所準備之廣大功能的其中一小部分。 哪些工作流程對您很重要? 請在此[開發人員社群票證](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)中告訴我們
