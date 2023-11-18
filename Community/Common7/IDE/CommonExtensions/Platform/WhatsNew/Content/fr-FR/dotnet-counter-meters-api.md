---
description: L’outil Compteurs .NET améliore les fonctionnalités avec les nouveaux instruments via l’API .NET Meters intégrée.
title: Prise en charge des compteurs .NET pour les nouveaux instruments via l’API Meters
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

La dernière version de l’outil Compteurs .NET introduit des fonctionnalités étendues avec l’intégration de l’API .NET Meters, englobant de nouvelles options d’instrument, notamment « Counter » et « ObservableCounter ».

Le « Counter » effectue le suivi d’une valeur qui change au fil du temps, avec les mises à jour de création de rapports de l’appelant à l’aide de « Counter<T>.Add ». En revanche, le « ObservableCounter » est semblable au Counter, mais l’appelant s’occupe de suivre la valeur totale. Actuellement, l’outil Compteurs .NET signale le taux de change dans le total.

Vous trouverez ces métriques dans la liste des métriques de Compteurs .NET, offrant une visibilité améliorée des performances système et de l’utilisation des ressources. En outre, nous prévoyons activement d’introduire d’autres options d’instrument à l’avenir afin d’améliorer encore davantage cette capacité.

![API Meters et Compteurs .NET](../media/DotNetCounter-MetersApi.mp4 "API Meters et Compteurs .NET")

