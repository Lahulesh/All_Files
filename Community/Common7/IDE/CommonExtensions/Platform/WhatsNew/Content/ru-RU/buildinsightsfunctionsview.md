---
description: Просмотр времени создания функции с помощью интеграции Build Insights
title: Представление функций C++ Build Insights
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) теперь интегрирована с Visual Studio 2022! Теперь можно просмотреть дополнительные сведения, связанные с созданием функций. Новое представление функций покажет, сколько времени занимает компиляция функции, а также число связанных с ней ForceInlinees.

![Компонент Build Insights](../media/buildinsights-component.png "Компонент Build Insights")

Чтобы проверить правильность включения Build Insights, посмотрите, выбран ли параметр "C++ Build Insights" в Visual Studio Installer в разделе "Разработка настольных компьютеров с помощью C++" или "Разработка игр с C++".

![Меню Build Insights](../media/buildinsights-menu.png "Меню Build Insights")

Запустите запись трассировки Build Insights .etl одним нажатием кнопки. 

![Пример Build Insights](../media/buildinsights-functions.png "Пример Build Insights")

После компиляции Build Insights создаст диагностический отчет, который позволит увидеть время создания функции, а также ForceInlinees.

Мы стремимся непрерывно улучшать Build Insights. Текущая интеграция Build Insights, которую вы видите сегодня, представляет собой лишь часть того, что мы приготовили для вас. Какие рабочие процессы важны для вас? Сообщите нам об этом в [билете сообщества разработчиков](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)
