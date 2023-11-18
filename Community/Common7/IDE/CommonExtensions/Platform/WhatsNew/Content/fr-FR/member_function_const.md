---
description: Vous pouvez maintenant ajouter le qualificateur const à une fonction membre si elle peut déjà être effectuée à l’aide de l’interface publique sur un pointeur const vers l’objet.
title: Rendre une fonction membre const
featureId: MemberFunctionConst
thumbnailImage: ../media/member_function_const_thumbnail.png

---


Cette fonctionnalité suggère de rendre une fonction membre const si elle ne doit pas modifier logiquement l’état de l’objet, ce qui permet d’empêcher les modifications accidentelles, de garantir la const-correctness et d’améliorer la sécurité du code. En survolant la fonction membre et en cliquant sur l’icône d’ampoule, vous pouvez accéder à une suggestion pour rendre const la fonction membre et d’autres fonctions portant le même nom.

![Rendre une fonction membre const - Example](../media/member_function_const_example.png "[Rendre une fonction membre const - Example")

Par défaut, cette fonctionnalité est définie comme suggestion et vous pouvez personnaliser ses paramètres en fonction de vos exigences et préférences spécifiques dans Outils > Options > Éditeur de texte > C/C++ > Style de code > Linter.

![Paramétrage pour rendre une fonction membre const](../media/member_function_const_setting.png "Paramétrage pour rendre une fonction membre const")

Pour plus d’informations, veuillez consulter le [billet de blog Rendre les fonctions membre const](https://aka.ms/MakeMemberFunctionConstBlogPost).
