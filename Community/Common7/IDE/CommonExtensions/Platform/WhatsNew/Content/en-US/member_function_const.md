---
description: You can now add the const qualifier to a member function, if it can already be performed using the public interface on a const pointer to the object.
title: Make Member Function Const
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


This feature suggests making a member function const if it logically should not modify the object's state, helping prevent accidental modifications, ensuring const-correctness, and enhancing code safety. 
By hovering over the member function and clicking the light bulb icon, you can access a suggestion to make the member function and other functions with the same name const.

![Make Member Function Const Example](../media/member_function_const_example.png "[Make Member Function Const Example")

By default, this feature is set as a suggestion, and you can customize its setting according to your specific requirements and preferences in Tools > Options > Text Editor > C/C++ > Code Style > Linter.

![Setting For Make Member Function Const](../media/member_function_const_setting.png "Setting For Make Member Function Const")

For more information please visit [Make Member Function Const Blog Post](https://aka.ms/MakeMemberFunctionConstBlogPost).
