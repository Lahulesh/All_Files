---
description: Vous pouvez marquer une fonction globale comme statique dans Visual Studio.
title: Rendre les fonctions globales statiques
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Visual Studio dispose désormais de cette fonctionnalité qui vous permet de marquer facilement une fonction globale comme statique. Lorsque vous souhaitez limiter l’utilisation d’une fonction globale à son emplacement défini et qu’elle ne dispose pas d’une déclaration de transfert, vous pouvez la rendre statique.
Lorsque vous pointez sur une fonction globale, une invite s’affiche indiquant que la fonction peut être convertie en fonction statique. En cliquant sur l’icône de tournevis et en sélectionnant l’option « Rendre cette fonction statique », vous pouvez effectuer cet ajustement.

![Exemple de déclaration d’une fonction globale comme statique](../media/global_function_static_example.mp4 "[Exemple de déclaration d’une fonction globale comme statique")

Par défaut, cette fonctionnalité est activée comme suggestion. Vous pouvez personnaliser ce paramètre en accédant à Outils > Options > Éditeur de texte > C/C++ > IntelliSense.

![Paramètre pour rendre une fonction globale statique](../media/global_function_static_setting.png "Paramètre pour rendre une fonction globale statique")

Pour plus d’informations, consultez [le billet de blog Rendre les fonctions globales statiques](https://aka.ms/MakeGlobalFunctionStaticBlogPost).
