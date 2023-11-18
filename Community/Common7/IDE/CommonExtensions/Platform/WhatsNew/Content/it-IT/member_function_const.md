---
description: È ora possibile aggiungere il qualificatore const a una funzione membro, se può essere già eseguita usando l'interfaccia pubblica su un puntatore const all'oggetto.
title: Rendere la funzione membro costante
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


Questa funzionalità suggerisce di creare una funzione membro const se in modo logico non deve modificare lo stato dell'oggetto, contribuendo a evitare modifiche accidentali, garantendo la correttezza della distribuzione e migliorando la sicurezza del codice. Passando il puntatore del mouse sulla funzione membro e facendo clic sull'icona della lampadina, è possibile accedere a un suggerimento per rendere constante la funzione membro e altre funzioni con lo stesso nome.

![Rendere la funzione membro costante - esempio](../media/member_function_const_example.png "[Rendere la funzione membro costante - esempio")

Per impostazione predefinita, questa funzionalità viene impostata come suggerimento ed è possibile personalizzarne l'impostazione in base ai requisiti e alle preferenze specifiche in Strumenti > Opzioni > Editor di testo > C/C++ > Stile codice > Linter.

![Impostazione per rendere la funzione membro costante](../media/member_function_const_setting.png "Impostazione per rendere la funzione membro costante")

Per altre informazioni, visitare [post di blog Rendere la funzione membro costante](https://aka.ms/MakeMemberFunctionConstBlogPost).
