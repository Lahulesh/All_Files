---
description: Wyświetlanie czasu generowania funkcji za pomocą integracji zestawu narzędzi Build Insights
title: Widok funkcji zestawu narzędzi Build Insights C++
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

Zestaw narzędzi [Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) jest teraz zintegrowany z programem Visual Studio 2022! Teraz można wyświetlić dodatkowe informacje dotyczące generowania funkcji. Nowy widok funkcji zapewnia informacje, ile czasu zajmuje funkcja podczas kompilacji oraz informacje o liczbie skojarzonych elementów ForceInlinees.

![Składnik zestawu narzędzi Build Insights](../media/buildinsights-component.png "Składnik zestawu narzędzi Build Insights")

Aby upewnić się, że zestaw narzędzi Build Insights jest poprawnie włączony, zaznacz dwukrotnie opcję „C++ Build Insights” (Zestaw narzędzi Build Insights języka C++) w instalatorze programu Visual Studio w ramach obciążenia „Programowanie komputerowe w języku C++” lub „Programowanie gier w języku C++”.

![Menu funkcji Szczegółowe informacje o kompilowaniu](../media/buildinsights-menu.png "Menu funkcji Szczegółowych informacji o kompilowaniu")

Uruchom przechwytywanie śladu funkcji Szczegółowe informacje o kompilowaniu .etl jednym kliknięciem przycisku. 

![Przykład funkcji Szczegółowe informacje o kompilowaniu](../media/buildinsights-functions.png "Przykład funkcji Szczegółowych informacji o kompilowaniu")

Po kompilacji zestaw narzędzi Build Insights utworzy raport diagnostyczny, który umożliwia wyświetlenie czasu generowania funkcji, a także makr forceinline.

Jesteśmy zobowiązani do ciągłego udoskonalania Szczegółowych informacji o kompilowaniu. Bieżąca integracja usługi Szczegółowych informacji o kompilowaniu, którą widzisz dzisiaj, reprezentuje tylko fragment tego, co mamy dla Ciebie w zanadrzu. Które przepływy pracy są dla Ciebie ważne? Daj nam znać w tej sekcji[Bilet społeczności deweloperów](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)
