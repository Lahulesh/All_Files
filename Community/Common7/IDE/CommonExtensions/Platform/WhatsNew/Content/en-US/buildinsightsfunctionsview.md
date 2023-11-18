---
description: View Function Generation Time with Build Insights Integration
title: C++ Build Insights Functions View
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) is now integrated with Visual Studio 2022! You can now see additional information relating to function generation. The new Functions View will provide you with how long a function takes during compilation as well as the number of ForceInlinees associated.

![Build Insights Component](../media/buildinsights-component.png "Build Insights Component")

To ensure Build Insights is enabled properly, double check "C++ Build Insights" is selected in the Visual Studio Installer under "Desktop development with C++" or "Game development with C++" workloads.

![Build Insights Menu](../media/buildinsights-menu.png "Build Insights Menu")

Start your Build Insights .etl trace capture with the click of a button. 

![Build Insights Example](../media/buildinsights-functions.png "Build Insights Example")

After compilation, Build Insights will create a diagnostic report that allows you to see function generation time as well as ForceInlinees.

We are committed to continually improve Build Insights. The current integration of Build Insights you see today represents only a fragment of what we have in store for you. Which workflows are important to you? Please let us know in this [Developer Community Ticket](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)
