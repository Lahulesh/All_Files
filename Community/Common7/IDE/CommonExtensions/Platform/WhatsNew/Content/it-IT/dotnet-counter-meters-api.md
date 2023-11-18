---
description: Lo strumento Contatori .NET migliora la funzionalità con i nuovi strumenti tramite l'API Meters integrata.
title: Supporto .NET Counters per nuovi strumenti tramite l'API Meters
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

La versione più recente dello strumento Contatori .NET introduce funzionalità espanse con l'integrazione dell'API .NET Meters, che include nuove opzioni dello strumento, tra cui "Counter" e "ObservableCounter".

Il "Contatore" tiene traccia di un valore che cambia nel tempo, con gli aggiornamenti dei report del chiamante usando "Counter<T>. Add". Al contrario, "ObservableCounter" è come il contatore, ma il chiamante si occupa di tenere traccia del valore totale. Al momento, lo strumento Contatori .NET segnala la frequenza di modifica nel totale.

È possibile trovare queste metriche nell'elenco delle metriche dei contatori .NET, offrendo una maggiore visibilità sulle prestazioni del sistema e sull'utilizzo delle risorse. Inoltre, stiamo pianificando di introdurre opzioni aggiuntive per strumenti in futuro per migliorare ulteriormente questa funzionalità.

![API .NET Counter Meters](../media/DotNetCounter-MetersApi.mp4 "API .NET Counter Meters")

