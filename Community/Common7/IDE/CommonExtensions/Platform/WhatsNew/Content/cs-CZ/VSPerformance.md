---
description: Kromě jiných vylepšení byly vylepšeny také vazby zarážek pro soubory PDB systému Windows a byl zvýšen výkon technologie IntelliSense pro projekty Unreal Engine v jazyce C++.
title: Vylepšení výkonu
featureId: eventhandlerleaks
thumbnailImage: ../media/F5Debugger.png

---


**Vylepšení výkonu vazeb zarážek pro soubory PDB systému Windows**

Výrazně jsme zlepšili výkon při použití funkce F5 pro nativní i spravované aplikace pro systém Windows. Toto zlepšení úzce souvisí s počtem souborů obsahujících zarážky.  Díky tomu se teď projekty Unreal Editoru při použití funkce F5 načítají o 20 % rychleji.

![Vylepšení výkonu vazeb zarážek](../media/F5Debugger.png "Vylepšení výkonu vazeb zarážek")


**Vylepšení optimalizace C++ Unreal Engine – IntelliSense**

Projekty Unreal Engine v C++ nabízejí rychlejší technologii IntelliSense a barevné zvýrazňování, což umožňuje rychlejší a efektivnější vývoj. 


![Vylepšení technologie IntelliSense](../media/17.8Intellisense.png "Vylepšená technologie IntelliSense")



**Vylepšení komunikace pomocné rutiny značek v nástrojích Razor/Blazor**

V nástrojích Razor a Blazor jsme zvýšili efektivitu komunikace mezi procesy, abychom zjistili, jaké pomocné rutiny značek existují pro obsah zákazníka v nástroji Razor.   V řešeních využívajících Razor a Blazor by mělo dojít k výrazné úspoře paměti, lepší odezvě a zvýšení výkonu při psaní.
