---
description: La herramienta .NET Counters mejora la funcionalidad con nuevos instrumentos a través de Meters API, que está integrada en .NET.
title: Compatibilidad de .NET Counter con nuevos instrumentos mediante Meters API
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

La versión más reciente de la herramienta .NET Counters presenta una funcionalidad ampliada con la integración de Meters API de .NET, que abarca nuevas opciones de instrumento, como "Counter" y "ObservableCounter".

"Counter" realiza un seguimiento de un cambio de valor a lo largo del tiempo y el autor de la llamada informa de las actualizaciones mediante "Counter<T>. Add". Por el contrario, "ObservableCounter" es como Counter, pero el autor de la llamada se encarga de realizar un seguimiento del valor total. Actualmente, la herramienta .NET Counters informa de la tasa de cambio en el total.

Estas métricas se pueden encontrar en la lista de métricas del contador de .NET, lo que ofrece una visibilidad mejorada del rendimiento del sistema y del uso de recursos. Además, estamos planeando activamente introducir opciones de instrumentos adicionales en el futuro para mejorar aún más esta funcionalidad.

![Meters API de .NET Counter](../media/DotNetCounter-MetersApi.mp4 "Meters API de .NET Counter")

