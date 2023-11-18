---
description: Afficher le temps de génération de fonction avec l’intégration de Build Insights
title: Vue des fonctions C++ Build Insights
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) est désormais intégré à Visual Studio 2022 ! Vous pouvez maintenant voir des informations supplémentaires relatives à la génération de fonction. La nouvelle vue Functions vous fournira le temps nécessaire à une fonction pour sa compilation, ainsi que le nombre de ForceInlinees associées.

![Composant Build Insights](../media/buildinsights-component.png "Composant Build Insights")

Pour vous assurer que Build Insights est activé correctement, la case à cocher « C++ Build Insights » est sélectionnée dans Visual Studio Installer sous les charges de travail « Développement de bureau avec C++ » ou « Développement de jeux avec C++ » .

![Menu Build Insights](../media/buildinsights-menu.png "Menu Build Insights")

Démarrez votre capture de trace .etl Build Insights en cliquant sur un bouton. 

![Exemple Build Insights](../media/buildinsights-functions.png "Exemple Build Insights")

Après la compilation, Build Insights créera un rapport de diagnostic qui vous permet de voir le temps de génération de fonction ainsi que les ForceInlinees.

Nous nous engageons à améliorer continuellement Build Insights. L’intégration actuelle de Build Insights que vous voyez aujourd’hui ne représente qu’un fragment de ce que nous avons à vous offrir. Quels flux de travail sont importants pour vous ? Veuillez nous le faire savoir dans ce [Ticket Developer Community](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)
