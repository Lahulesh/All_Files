---
description: 现可将 const 限定符添加至成员函数，前提是已可在指向对象的 const 指针上的公共接口执行该函数。
title: 将成员函数设为 Const
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


如果成员函数在逻辑上不应修改对象的状态，则此功能建议将该成员函数设为 const，这有助于防止意外修改、确保 const 正确性并增强代码安全性。 通过将鼠标悬停在成员函数上并单击灯泡图标，可访问建议，将成员函数和其他同名函数设为 const。

![将成员函数设为 Const 示例](../media/member_function_const_example.png "[将成员函数设为 Const 示例")

默认情况下，此功能设置为建议，可通过“工具”>“选项”>“文本编辑器”>“C/C++”>“代码样式”>“Linter”，根据特定要求和首选项自定义其设置。

![有关将成员函数设为 Const 的设置](../media/member_function_const_setting.png "有关将成员函数设为 Const 的设置")

有关详细信息，请访问[“将成员函数设为 Const”博客文章](https://aka.ms/MakeMemberFunctionConstBlogPost)。
