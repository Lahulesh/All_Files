---
description: Teraz można dodać kwalifikator const do funkcji składowej, jeśli można go już wykonać przy użyciu interfejsu publicznego we wskaźniku const do obiektu.
title: Make Member Function Const
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


Ta funkcja sugeruje ustawienie funkcji składowej jako const, jeśli logicznie nie powinna modyfikować stanu obiektu, pomagając zapobiegać przypadkowym modyfikacjom, zapewnić poprawność niezmienności i zwiększyć bezpieczeństwo kodu. Po umieszczeniu wskaźnika myszy na funkcji składowej i kliknięciu ikony żarówki możesz uzyskać dostęp do sugestii, aby ustawić funkcję składową i inne funkcje z tą samą nazwą const.

![Przykład opcji Make Member Function Const](../media/member_function_const_example.png "[Make Member Function Const — przykład")

Domyślnie ta funkcja jest ustawiana jako sugestia i można dostosować jej ustawienie zgodnie z określonymi wymaganiami i preferencjami w obszarze Narzędzia > Opcje > Edytor tekstu > C/C++ > Styl kodu > Linter.

![Ustawienie opcji Make Member Function Const](../media/member_function_const_setting.png "Ustawienie dla opcji Make Member Function Const")

Aby uzyskać więcej informacji, odwiedź [wpis na blogu Make Member Function Const](https://aka.ms/MakeMemberFunctionConstBlogPost).
