---
description: Build Insights 통합을 사용하여 함수 생성 시간 보기
title: C++ Build Insights 함수 보기
featureId: CppBuildInsights
thumbnailImage: ../media/buildinsights-functions.png

---

[Build Insights](https://devblogs.microsoft.com/cppblog/introducing-c-build-insights/)가 이제 Visual Studio 2022와 통합되었습니다! 이제 함수 생성과 관련된 추가 정보를 볼 수 있습니다. 새로운 함수 뷰에서 컴파일 중에 함수 실행되는 데 걸리는 시간과 연결된 ForceInlinees 수를 확인할 수 있습니다.

![Build Insights 구성 요소](../media/buildinsights-component.png "Build Insights 구성 요소")

Build Insights를 올바르게 사용하도록 설정하려면 Visual Studio 설치 관리자에서 "C++를 사용한 데스크톱 개발" 또는 "C++를 사용한 게임 개발" 워크로드의 "C++ Build Insights"가 선택되었는지 다시 확인합니다.

![Build Insights 메뉴](../media/buildinsights-menu.png "Build Insights 메뉴")

단추를 클릭하여 Build Insights .etl 추적 캡처를 시작합니다. 

![Build Insights 예제](../media/buildinsights-functions.png "Build Insights 예제")

컴파일 후 Build Insights는 ForceInlinees 뿐만 아니라 함수 생성 시간을 볼 수 있는 진단 보고서를 만듭니다.

Build Insights를 지속적으로 개선하기 위해 최선을 다하고 있습니다. 현재 표시되는 Build Insights의 현재 통합은 Microsoft가 저장한 항목의 조각만을 나타냅니다. 중요한 워크플로는 무엇인가요? 이 [Developer Community 티켓](https://developercommunity.visualstudio.com/t/Have-full-integration-of-Build-Insights/810960)에서 알려주세요.
