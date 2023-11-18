---
description: Visual Studio で、グローバル関数を静的としてマーク付けできます。
title: グローバル関数を静的にする
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Visual Studio にこの機能が追加され、グローバル関数を簡単に静的としてマーク付けできます。 グローバル関数の使用を定義済みの場所に制限する必要があり、グローバル関数に前方宣言がない場合は、それを静的にすることができます。
グローバル関数にカーソルを合わせると、プロンプトが表示され、その関数を静的関数に変換できることを示します。 ドライバー アイコンをクリックし、[Make this function static] (この関数を静的にする) オプションを選択すると、この調整を行うことができます。

![グローバル関数を静的にする例](../media/global_function_static_example.mp4 "グローバル関数を静的にする例")

既定では、この機能は提案として有効になっています。 この設定をカスタマイズするには、[ツール] > [オプション] > [テキスト エディター] > [C/C++] > [IntelliSense] に移動します。

![グローバル関数を静的にするための設定](../media/global_function_static_setting.png "グローバル関数を静的にするための設定")

詳細については、[グローバル関数を静的にすることに関するブログ記事](https://aka.ms/MakeGlobalFunctionStaticBlogPost)を参照してください。
