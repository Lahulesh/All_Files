---
description: .NET Counters Tool Enhances Functionality with New Instruments via Integrated .NET Meters API.
title: .NET Counter Support for New Instruments via Meters API
featureId: dotnetcountermetersapi
thumbnailImage: ../media/metersapi.png

---

The latest version of the .NET Counters tool introduces expanded functionality with the integration of the .NET Meters API, encompassing new instrument options including "Counter" and "ObservableCounter".

The "Counter" keeps track of a value changing over time, with the caller reporting updates using "Counter<T>.Add". In contrast, the "ObservableCounter" is like the Counter but the caller takes care of keeping track of the total value. Currently .NET Counters tool reports the rate of change in the total.

You can find these metrics in the list of the .NET counter metrics roster, offering enhanced visibility into system performance and resource utilization. Furthermore, we're actively planning to introduce additional instrument options in the future to enhance this capability even further.

![.NET Counter Meters API](../media/DotNetCounter-MetersApi.mp4 ".NET Counter Meters API")

