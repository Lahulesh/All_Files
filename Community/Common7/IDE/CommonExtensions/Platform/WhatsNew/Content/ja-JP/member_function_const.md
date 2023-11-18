---
description: オブジェクトへの const ポインターのパブリック インターフェイスを使用して既に実行できる場合は、メンバー関数に const 修飾子を追加できるようになりました。
title: メンバー関数を const にする
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


この機能は、オブジェクトの状態を論理的に変更すべきでない場合にメンバー関数 const にすることを提案するものです。これは、偶発的な変更を防ぐのに役立ち、これにより、const の正確性が確保され、コードの安全性が高まります。 メンバー関数の上にマウス ポインターを置き、電球アイコンをクリックすると、提案にアクセスして、メンバー関数と同じ名前の const を持つ他の関数を作成できます。

![メンバー関数を const にする例](../media/member_function_const_example.png "[メンバー関数を const にする例")

既定では、この機能は提案として設定され、[ツール] > [オプション] > [テキスト エディター] > [C/C++] > [コード スタイル] > [リンター] で特定の要件と基本設定に従って、その設定をカスタマイズできます。

![メンバー関数を const にするための設定](../media/member_function_const_setting.png "メンバー関数を const にするための設定")

詳細については、[メンバー関数を const にすることに関するブログ記事](https://aka.ms/MakeMemberFunctionConstBlogPost)を参照してください。
