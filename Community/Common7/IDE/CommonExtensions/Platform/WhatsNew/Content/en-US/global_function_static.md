---
description: You can mark a global function as static in Visual Studio.
title: Make Global Functions Static
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Visual Studio now has this feature that enables you to effortlessly mark a global function as static. When you want to restrict the usage of a global function to its defined location and it lacks a forward declaration, you can make it static.
Upon hovering over a global function, a prompt will appear suggesting that the function could be converted to a static function. By clicking the screwdriver icon and selecting the "Make this function static" option, you can make this adjustment.

![Make global function static Example](../media/global_function_static_example.mp4 "[Make global function static Example")

By default, this feature is enabled as a suggestion. You can customize this setting by navigating to Tools > Options > Text Editor > C/C++ > IntelliSense.

![Setting For Make global function static](../media/global_function_static_setting.png "Setting For Make global function static")

For more information please visit [Make Global Functions Static Blog Post](https://aka.ms/MakeGlobalFunctionStaticBlogPost).
