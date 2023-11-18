---
description: Ahora puede agregar el calificador const a una función miembro, si ya se puede realizar mediante la interfaz pública en un puntero const al objeto.
title: Hacer que una función miembro sea const
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


Esta característica sugiere que una función miembro sea const si lógicamente no debe modificar el estado del objeto, lo que ayuda a evitar modificaciones accidentales, garantizar la corrección de const y mejorar la seguridad del código. Si mantiene el puntero sobre la función miembro y hace clic en el icono de la bombilla, puede acceder a una sugerencia para realizar la función miembro y otras funciones con el mismo nombre const.

![Ejemplo de hacer que una función miembro sea const](../media/member_function_const_example.png "Ejemplo de hacer que una función miembro sea const")

De forma predeterminada, esta característica se establece como sugerencia y puede personalizar su configuración según sus requisitos y preferencias específicos en Herramientas > Opciones > Editor de texto > C/C++ > Estilo de código > Linter.

![Valor para hacer que una función miembro sea const](../media/member_function_const_setting.png "Valor para hacer que una función miembro sea const")

Para obtener más información, visite la [entrada de blog Hacer que una función miembro sea const](https://aka.ms/MakeMemberFunctionConstBlogPost).
