---
description: 您現在可以在物件的 const 指標上使用公用介面執行 const 限定詞至成員函式。
title: 將成員函式設為 Const
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


這項功能建議如果成員函式在邏輯上不應修改物件的狀態，協助防止意外修改、確保 const 正確性，以及增強程式碼安全性，則建議建立成員函式 const。 將滑鼠停留在成員函式上，然後按一下燈泡圖示，即可存取建議，讓成員函式和其他具有相同名稱的函式。

![使成員函式成為 Const 範例](../media/member_function_const_example.png "[使成員函式 Const 範例")

根據預設，此功能會設定為建議，而且您可以根據 [工具] > [選項] > [文字編輯器] > [C/C++ ] > [程式碼樣式] > [Linter] 中的特定需求和喜好設定來自訂其設定。

![設定讓成員函式 Const](../media/member_function_const_setting.png "設定讓成員函式 Const")

如需詳細資訊，請瀏覽[讓成員函式成為 Const 部落格文章](https://aka.ms/MakeMemberFunctionConstBlogPost)。
