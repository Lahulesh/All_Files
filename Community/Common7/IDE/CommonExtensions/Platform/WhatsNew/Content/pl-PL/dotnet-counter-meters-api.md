---
description: Narzędzie .NET Counters zwiększa funkcjonalność przy użyciu nowych instrumentów za pośrednictwem zintegrowanego interfejsu API mierników platformy .NET.
title: Obsługa usługi Dot Net Counter dla nowych instrumentów za pośrednictwem interfejsu API mierników
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

Najnowsza wersja narzędzia .NET Counters wprowadza rozszerzoną funkcjonalność z integracją interfejsu API mierników platformy .NET, obejmującą nowe opcje instrumentacji, w tym „Counter” i „ObservableCounter”.

Opcja „Counter” śledzi zmianę wartości w czasie z aktualizacjami raportowanymi przez rozmówcę przy użyciu polecenia „Counter<T>.Add”. Natomiast opcja „ObservableCounter” jest zbliżona do opcji Counter, ale rozmówca jest odpowiedzialny za śledzenie łącznej wartości. Obecnie narzędzie Liczniki platformy .NET raportuje współczynnik zmian jako sumę.

Te metryki można znaleźć na liście metryk liczników platformy .NET, oferujące zwiększony wgląd w wydajność systemu i wykorzystanie zasobów. Ponadto aktywnie planujemy wprowadzenie dodatkowych opcji instrumentacji w przyszłości, aby jeszcze bardziej zwiększyć tę możliwość.

![Interfejs API mierników dla liczników Dot Net Counter](../media/DotNetCounter-MetersApi.mp4 "Interfejs API mierników dla liczników Dot Net Counter")

