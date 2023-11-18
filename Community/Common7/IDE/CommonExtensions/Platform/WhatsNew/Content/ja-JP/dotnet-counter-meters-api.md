---
description: .NET カウンター ツールは、統合された .NET Meters API を介して新しいインストルメントの機能を強化します。
title: Meters API を介した新しいインストルメント向けの .NET カウンターのサポート
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

最新バージョンの .NET カウンター ツールには、.NET Meters API の統合による拡張機能が導入されています。これには、"Counter" や "ObservableCounter" などの新しいインストルメント オプションが含まれています。

"Counter" は時間の経過と共に変化する値を追跡し、呼び出し元が "Counter<T>.Add" を使用して更新を報告します。 一方の "ObservableCounter" は Counter に似ていますが、呼び出し元が合計値の追跡を行います。 現在、.NET カウンター ツールは、合計の変化率を報告します。

.NET カウンター メトリックの一覧でこれらのメトリックを確認できるため、システム パフォーマンスとリソース使用率の可視性が向上します。 この機能をさらに強化するために、将来的に追加のインストルメント オプションを導入することを積極的に計画しています。

![.Net Counter Meters API](../media/DotNetCounter-MetersApi.mp4 ".Net Counter Meters API")

