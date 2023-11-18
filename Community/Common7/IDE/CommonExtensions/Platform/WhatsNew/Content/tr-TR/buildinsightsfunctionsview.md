---
description: Build Insights Tümleştirmesi ile İşlev Oluşturma Süresini Görüntüleme
title: C++ Build Insights İşlevler Görünümü
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/) artık Visual Studio 2022 ile tümleştirildi! Artık işlev oluşturmayla ilgili ek bilgileri görebilirsiniz. Yeni İşlevler Görünümü, bir işlevin derleme sırasında ne kadar sürdüğünü ve ilişkili ForceInlinees sayısını sağlar.

![Build Insights Bileşeni](../media/buildinsights-component.png "Build Insights Bileşeni")

Build Insights'ın düzgün şekilde etkinleştirildiğinden emin olmak için Visual Studio Yükleyicisi'nde "C++ ile masaüstü geliştirme" veya "C++ ile oyun geliştirme" iş yükleri altında "C++ Build Insights" öğesinin seçili olduğunu bir kez daha denetleyin.

![Build Insights Menüsü](../media/buildinsights-menu.png "Build Insights Menüsü")

Bir tuşa basarak Build Insights .etl izleme yakalamanızı başlatın. 

![Build Insights Örneği](../media/buildinsights-functions.png "Build Insights Örneği")

Derleme sonrasında Build Insights, ForceInlinees'ın yanı sıra işlev oluşturma süresini de görmenizi sağlayan bir tanılama raporu oluşturur.

Build Insights'ı sürekli geliştirmeye kararlıyız. Bugün gördüğünüz Build Insights'ın mevcut tümleştirmesi, sizin için hazırladıklarımızın yalnızca bir parçasını temsil eder. Hangi iş akışları sizin için önemlidir? Lütfen bu [Geliştirici Topluluğu Bileti'nde](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)bize bildirin
