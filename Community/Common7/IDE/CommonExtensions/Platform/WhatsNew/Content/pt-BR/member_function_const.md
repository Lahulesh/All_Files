---
description: Agora você pode adicionar o qualificador "const" a uma função membro, se ela já puder ser executada usando a interface pública em um ponteiro "const" do objeto.
title: Criar uma função membro constante
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


Esse recurso sugere criar uma função membro constante se, logicamente, ela não deve modificar o estado do objeto, ajudando a evitar modificações acidentais, garantindo a correção da constante e aprimorando a segurança do código. Ao passar o mouse sobre a função membro e clicar no ícone de lâmpada, você pode acessar uma sugestão para criar a função membro e outras funções com o mesmo nome "const".

![Exemplo de criação de uma função membro constante](../media/member_function_const_example.png "[Exemplo de criação de uma função membro constante")

Por padrão, esse recurso é definido como uma sugestão e você pode personalizar as configurações de acordo com seus requisitos e preferências em Ferramentas > Opções > Editor de Texto > C/C++ > Estilo do Código > Linter.

![Configuração da criação de uma função membro constante](../media/member_function_const_setting.png "Configuração da criação de uma função membro constante")

Para obter mais informações, visite [Postagem no Blog sobre a criação de uma função membro constante](https://aka.ms/MakeMemberFunctionConstBlogPost).
