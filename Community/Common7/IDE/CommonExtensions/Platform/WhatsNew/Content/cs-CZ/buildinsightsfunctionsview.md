---
description: Zobrazení času generování funkcí s integrací Build Insights
title: Zobrazení funkcí přehledů sestavení jazyka C++
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) je teď integrovaný se sadou Visual Studio 2022! Teď uvidíte další informace týkající se generování funkcí. Nové zobrazení funkcí vám poskytne, jak dlouho trvá funkce během kompilace, a také počet přidružených ForceInlinees.

![Komponenta Build Insights](../media/buildinsights-component.png "Komponenta Build Insights")

Abyste měli jistotu, že je build Insights správně povolený, přesvědčte se, že je „C++ Build Insights“ vybrané v instalačním programu pro Visual Studio v části „Vývoj desktopových aplikací pomocí jazyka C++“ nebo „Vývoj her pomocí jazyka C++“.

![Nabídka Build Insights](../media/buildinsights-menu.png "Nabídka Build Insights")

Kliknutím na tlačítko spusťte záznam trasování v Build Insights .etl. 

![Příklad Build Insights](../media/buildinsights-functions.png "Příklad Build Insights")

Po kompilaci vytvoří Build Insights diagnostickou sestavu, která umožňuje zobrazit čas generování funkcí i ForceInlinees.

Zavázali jsme se neustále vylepšovat Build Insights. Současná integrace Build Insights, kterou dnes vidíte, představuje pouze zlomek toho, co pro vás chystáme. Které pracovní postupy jsou pro vás důležité? Dejte nám prosím vědět v tomto [lístku Developer Community](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)
