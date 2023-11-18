---
description: .NET 카운터 도구는 통합 .NET 미터 API를 통해 새로운 계측으로 기능을 향상합니다.
title: 새로운 계측에 미터 API를 통한 .NET 카운터 지원
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

최신 버전의 .NET 카운터 도구는 "Counter" 및 "ObservableCounter"를 비롯한 새로운 계측 옵션을 포함하는 .NET 미터 API의 통합을 통해 확장된 기능을 도입했습니다.

"Counter"는 시간이 지남에 따라 변경되는 값을 추적하며 호출자는 "Counter<T>.Add"를 사용하여 업데이트를 보고합니다. 반면에 "ObservableCounter"는 Counter와 비슷하지만 호출자는 총 값을 추적합니다. 현재 .NET 카운터 도구는 총 변경률을 보고합니다.

이러한 메트릭은 .NET 카운터 메트릭 명단 목록에서 찾을 수 있으며 시스템 성능 및 리소스 사용률에 대한 향상된 가시성을 제공합니다. 또한 이 기능을 더욱 강화하기 위해 향후 추가 계측 옵션을 적극적으로 도입할 계획입니다.

![.NET 카운터 미터 API](../media/DotNetCounter-MetersApi.mp4 ".NET 카운터 미터 API")

