---
description: Visualizzare il tempo di generazione delle funzioni con l'integrazione di Build Insights
title: Visualizzazione Funzioni di C++ Build Insights
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) è ora integrato con Visual Studio 2022. È ora possibile visualizzare informazioni aggiuntive relative alla generazione di funzioni. La nuova Visualizzazione Funzioni fornirà il tempo che occorre a una funzione per la compilazione e il numero di ForceInlinees associati.

![Componente Build Insights](../media/buildinsights-component.png "Componente Build Insights")

Per assicurarsi che Build Insights sia abilitato correttamente, controllare "C++ Build Insights" nel programma di installazione di Visual Studio nei carichi di lavoro "Sviluppo di applicazioni desktop con C++" o "Sviluppo di giochi con C++".

![Menu Build Insights](../media/buildinsights-menu.png "Menu Build Insights")

Con un semplice clic su un pulsante, è possibile avviare l'acquisizione di analisi.etl di Build Insights. 

![Esempio di Build Insights](../media/buildinsights-functions.png "Esempio Build Insights")

Dopo la compilazione, Build Insights creerà un report di diagnostica che consente di vedere il tempo di generazione della funzione e ForceInlinees.

Ci impegnamo a migliorare continuamente Build Insights. La corrente integrazione di Build Insights rappresenta solo una piccola parte di ciò che sarà sviluppato per l'utente. Quali flussi di lavoro sono importanti per l'utente? Siamo lieti di ricevere informazioni in questo [Ticket della Developer Community](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)
