---
description: Funkcję globalną można oznaczyć jako statyczną w programie Visual Studio.
title: Ustawianie funkcji globalnych jako statyczne
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Program Visual Studio ma teraz tę funkcję, która umożliwia bezproblemowe oznaczanie funkcji globalnej jako statycznej. Jeśli chcesz ograniczyć użycie funkcji globalnej do jej zdefiniowanej lokalizacji i nie ma deklaracji przesyłania dalej, możesz ustawić ją jako statyczną.
Po umieszczeniu wskaźnika myszy na funkcji globalnej zostanie wyświetlony monit sugerujący, że funkcja może zostać przekonwertowana na funkcję statyczną. Klikając ikonę śrubokręta i wybierając opcję „Make this function static” (Ustaw tę funkcję statyczną), możesz wprowadzić tę korektę.

![Przykład ustawienia funkcji globalnej jako statycznej](../media/global_function_static_example.mp4 "[Przykład ustawienia funkcji globalnej jako statycznej")

Domyślnie ta funkcja jest włączona jako sugestia. To ustawienie można dostosować, przechodząc do pozycji Narzędzia > Opcje > Edytor tekstu > C/C++ > IntelliSense.

![Ustawienie dla ustawiania funkcji globalnej jako statycznej](../media/global_function_static_setting.png "Ustawienie dla ustawienia funkcji globalnej jako statycznej")

Aby uzyskać więcej informacji, odwiedź [wpis na blogu Ustawianie globalnych funkcji jako statycznych](https://aka.ms/MakeGlobalFunctionStaticBlogPost).
