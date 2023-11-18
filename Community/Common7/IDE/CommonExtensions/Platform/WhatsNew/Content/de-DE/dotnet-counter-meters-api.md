---
description: Das .NET Counters-Tool verbessert die Funktionalität mit neuen Instrumenten über die integrierte .NET Meters-API.
title: .NET Counters-Unterstützung für neue Instrumente über die Meters-API
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

Die neueste Version des .NET Counters-Tools führt erweiterte Funktionen durch die Integration der .NET Meters-API ein, die neue Instrumentoptionen umfasst, einschließlich „Counter“ und „ObservableCounter“.

„Counter“ verfolgt einen Wert, der sich im Laufe der Zeit ändert, wobei der „Aufrufer“ Änderungen mit „Counter<T>.Add“ meldet. Im Gegensatz dazu ist „ObservableCounter“ wie „Counter“, aber der Aufrufer kümmert sich um die Verfolgung des Gesamtwerts. Derzeit meldet das .NET Counters-Tool die Änderungsrate als Gesamtsumme.

Sie finden diese Metriken in der Liste der .NET-Zähler. Durch diese erhalten Sie einen verbesserten Einblick in die Systemleistung und Ressourcenauslastung. Darüber hinaus arbeiten wir daran, in Zukunft zusätzliche Instrumentoptionen einzuführen, um diese Funktion noch weiter zu verbessern.

![Meters-API von .NET Counters](../media/DotNetCounter-MetersApi.mp4 "Meters-API von .NET Counters")

