---
description: Sie können Memberfunktionen jetzt den Qualifizierer „const“ hinzufügen, wenn diese bereits über die öffentliche Schnittstelle an einem konstanten Zeiger auf das Objekt ausgeführt werden kann.
title: Memberfunktionen als konstant kennzeichnen
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


Diese Funktion schlägt vor, eine Mitgliedsfunktion als konstant zu kennzeichnen, wenn sie logischerweise den Zustand des Objekts nicht verändern sollte, um versehentliche Änderungen zu verhindern, die Konstantenkorrektheit zu gewährleisten und die Codesicherheit zu erhöhen. Wenn Sie mit dem Mauszeiger über die Memberfunktion fahren und auf das Glühbirnensymbol klicken, erhalten Sie einen Vorschlag, um die Memberfunktion und andere Funktionen mit demselben Namen als konstant zu kennzeichnen.

![Beispiel für das Kennzeichnen von Memberfunktionen als konstant](../media/member_function_const_example.png "[Beispiel für das Kennzeichnen von Memberfunktionen als konstant")

Dieses Feature ist standardmäßig als Vorschlag festgelegt, und Sie können die Einstellung entsprechend Ihren spezifischen Anforderungen und Einstellungen unter Tools > Optionen > Text-Editor > C/C++ > Codeformatvorlage > Linter anpassen.

![Einstellung für das Kennzeichnen von Memberfunktionen als konstant](../media/member_function_const_setting.png "Einstellung für das Kennzeichnen von Memberfunktionen als konstant")

Weitere Informationen finden Sie im Blogbeitrag [Memberfunktionen als konstant kennzeichnen](https://aka.ms/MakeMemberFunctionConstBlogPost).
