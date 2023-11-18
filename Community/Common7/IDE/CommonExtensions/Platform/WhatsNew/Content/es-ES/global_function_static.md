---
description: Puede marcar una función global como estática en Visual Studio.
title: Hacer que las funciones globales sean estáticas
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


Visual Studio ahora tiene esta característica que permite marcar sin esfuerzo una función global como estática. Si desea restringir el uso de una función global a su ubicación definida y carece de una declaración de reenvío, puede hacer que sea estática.
Al mantener el puntero sobre una función global, aparecerá un mensaje que sugiere que la función se podría convertir en una función estática. Si hace clic en el icono de destornillador y selecciona la opción "Hacer que esta función sea estática", puede realizar este ajuste.

![Ejemplo sobre cómo hacer que una función global sea estática](../media/global_function_static_example.mp4 "[Ejemplo sobre cómo hacer que una función global sea estática")

De manera predeterminada, esta característica está habilitada como sugerencia. Para personalizar esta configuración, vaya a Herramientas > Opciones > Editor de texto > C/C++ > IntelliSense.

![Valor para Convertir la función global en estática](../media/global_function_static_setting.png "Valor para Convertir la función global en estática")

Para obtener más información, visite la [Entrada de blog Hacer que las funciones globales sean estáticas](https://aka.ms/MakeGlobalFunctionStaticBlogPost).
