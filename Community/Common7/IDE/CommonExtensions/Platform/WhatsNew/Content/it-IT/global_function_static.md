---
description: È possibile contrassegnare una funzione globale come statica in Visual Studio.
title: Rendere statiche le funzioni globali
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Visual Studio include ora questa funzionalità che consente di contrassegnare facilmente una funzione globale come statica. Quando si desidera limitare l'utilizzo di una funzione globale alla posizione definita e non si dispone di una dichiarazione di inoltro, è possibile renderla statica.
Quando si passa il puntatore su una funzione globale, viene visualizzato un prompt che suggerisce che la funzione potrebbe essere convertita in una funzione statica. Facendo clic sull'icona del cacciavite e selezionando l'opzione "Rendi questa funzione statica", è possibile effettuare questa regolazione.

![Rendere statica la funzione globale - esempio](../media/global_function_static_example.mp4 "[Rendere statica la funzione globale - esempio")

Per impostazione predefinita, questa funzionalità è abilitata come suggerimento. È possibile personalizzare questa impostazione passando a Strumenti > Opzioni > Editor di testo > C/C++ > IntelliSense.

![Impostazione per rendere statica la funzione globale](../media/global_function_static_setting.png "Impostazione per rendere statica la funzione globale")

Per altre informazioni, visitare [post di blog Rendere le funzioni globali statiche](https://aka.ms/MakeGlobalFunctionStaticBlogPost).
