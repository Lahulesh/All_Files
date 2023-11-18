---
description: Build Insights を統合して関数の生成時間を表示する
title: C++ Build Insights での関数の表示
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) が Visual Studio 2022 と統合されました。 Visual Studio 2022 17.8 Preview 1 から、関数の生成に関連する追加情報を表示できるようになりました。 新しい関数ビューには、コンパイル中に関数にかかる時間と、関連する ForceInline の数が表示されます。

![Build Insights のコンポーネント](../media/buildinsights-component.png "Build Insights のコンポーネント")

Build Insights が正しく有効になっていることを確かめるには、Visual Studio インストーラーの [C++ によるデスクトップ開発] または [C++ によるゲーム開発] ワークロードで [C++ Build Insights] が選択されていることを再確認します。

![[分析情報の作成] メニュー](../media/buildinsights-menu.png "[分析情報の作成] メニュー")

ボタンをクリックして、Build Insights .etl トレース キャプチャを開始します。 

![Build Insights の例](../media/buildinsights-functions.png "Build Insights の例")

コンパイルが完了すると、Build Insights によって診断レポートが作成され、関数の生成時間と ForceInline を確認できます。

Build Insights の継続的な改善に取り組んでいます。 現在表示されている Build Insights の現在の統合は、Microsoft が保存しているものの断片のみを表しています。 重要なワークフローはどれですか? この [Developer Community チケット](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)でお知らせください
