---
description: Você pode marcar uma função global como estática no Visual Studio.
title: Tornar funções globais estáticas
featureId: GlobalFunctionStatic
thumbnailImage: ../media/global_function_static_thumbnail.png

---


O Visual Studio agora tem esse recurso que permite marcar facilmente uma função global como estática. Quando você quiser restringir o uso de uma função global à sua localização definida e ela não tiver uma declaração de encaminhamento, você poderá torná-la estática.
Ao passar o mouse sobre uma função global, um prompt aparecerá sugerindo que a função poderia ser convertida em uma função estática. Clicando no ícone da chave de fenda e selecionando a opção "Tornar esta função estática", você pode fazer esse ajuste.

![Exemplo de como tornar uma função global estática](../media/global_function_static_example.mp4 "Exemplo de como tornar uma função global estática")

Por padrão, esse recurso é habilitado como uma sugestão. Você pode personalizar essa configuração navegando até Ferramentas > Opções > Editor de Texto > C/C++ > IntelliSense.

![Configuração para tornar uma função global estática](../media/global_function_static_setting.png "Configuração para tornar uma função global estática")

Para obter mais informações, visite [Postagem no Blog sobre como tornar funções globais estáticas](https://aka.ms/MakeGlobalFunctionStaticBlogPost).
