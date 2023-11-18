"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/build/nodeCustom.ts
var nodeCustom_exports = {};
__export(nodeCustom_exports, {
  default: () => nodeCustom_default
});
module.exports = __toCommonJS(nodeCustom_exports);
var nodeCustom_default = {
  version: {
    major: "1",
    minor: "0"
  },
  domains: [
    {
      domain: "NodeTracing",
      experimental: true,
      types: [
        {
          id: "TraceConfig",
          type: "object",
          properties: [
            {
              name: "recordMode",
              description: "Controls how the trace buffer stores data.",
              optional: true,
              type: "string",
              enum: ["recordUntilFull", "recordContinuously", "recordAsMuchAsPossible"]
            },
            {
              name: "includedCategories",
              description: "Included category filters.",
              type: "array",
              items: {
                type: "string"
              }
            }
          ]
        }
      ],
      commands: [
        {
          name: "getCategories",
          description: "Gets supported tracing categories.",
          returns: [
            {
              name: "categories",
              description: "A list of supported tracing categories.",
              type: "array",
              items: {
                type: "string"
              }
            }
          ]
        },
        {
          name: "start",
          description: "Start trace events collection.",
          parameters: [
            {
              name: "traceConfig",
              $ref: "TraceConfig"
            }
          ]
        },
        {
          name: "stop",
          description: "Stop trace events collection. Remaining collected events will be sent as a sequence of\ndataCollected events followed by tracingComplete event."
        }
      ],
      events: [
        {
          name: "dataCollected",
          description: "Contains an bucket of collected trace events.",
          parameters: [
            {
              name: "value",
              type: "array",
              items: {
                type: "object"
              }
            }
          ]
        },
        {
          name: "tracingComplete",
          description: "Signals that tracing is stopped and there is no trace buffers pending flush, all data were\ndelivered via dataCollected events."
        }
      ]
    },
    {
      domain: "NodeWorker",
      description: "Support for sending messages to Node worker Inspector instances.",
      experimental: true,
      types: [
        {
          id: "WorkerID",
          type: "string"
        },
        {
          id: "SessionID",
          description: "Unique identifier of attached debugging session.",
          type: "string"
        },
        {
          id: "WorkerInfo",
          type: "object",
          properties: [
            {
              name: "workerId",
              $ref: "WorkerID"
            },
            {
              name: "type",
              type: "string"
            },
            {
              name: "title",
              type: "string"
            },
            {
              name: "url",
              type: "string"
            }
          ]
        }
      ],
      commands: [
        {
          name: "sendMessageToWorker",
          description: "Sends protocol message over session with given id.",
          parameters: [
            {
              name: "message",
              type: "string"
            },
            {
              name: "sessionId",
              description: "Identifier of the session.",
              $ref: "SessionID"
            }
          ]
        },
        {
          name: "enable",
          description: "Instructs the inspector to attach to running workers. Will also attach to new workers\nas they start",
          parameters: [
            {
              name: "waitForDebuggerOnStart",
              description: "Whether to new workers should be paused until the frontend sends `Runtime.runIfWaitingForDebugger`\nmessage to run them.",
              type: "boolean"
            }
          ]
        },
        {
          name: "disable",
          description: "Detaches from all running workers and disables attaching to new workers as they are started."
        },
        {
          name: "detach",
          description: "Detached from the worker with given sessionId.",
          parameters: [
            {
              name: "sessionId",
              $ref: "SessionID"
            }
          ]
        }
      ],
      events: [
        {
          name: "attachedToWorker",
          description: "Issued when attached to a worker.",
          parameters: [
            {
              name: "sessionId",
              description: "Identifier assigned to the session used to send/receive messages.",
              $ref: "SessionID"
            },
            {
              name: "workerInfo",
              $ref: "WorkerInfo"
            },
            {
              name: "waitingForDebugger",
              type: "boolean"
            }
          ]
        },
        {
          name: "detachedFromWorker",
          description: "Issued when detached from the worker.",
          parameters: [
            {
              name: "sessionId",
              description: "Detached session identifier.",
              $ref: "SessionID"
            }
          ]
        },
        {
          name: "receivedMessageFromWorker",
          description: "Notifies about a new protocol message received from the session\n(session ID is provided in attachedToWorker notification).",
          parameters: [
            {
              name: "sessionId",
              description: "Identifier of a session which sends a message.",
              $ref: "SessionID"
            },
            {
              name: "message",
              type: "string"
            }
          ]
        }
      ]
    },
    {
      domain: "NodeRuntime",
      description: "Support for inspecting node process state.",
      experimental: true,
      commands: [
        {
          name: "notifyWhenWaitingForDisconnect",
          description: "Enable the `NodeRuntime.waitingForDisconnect`.",
          parameters: [
            {
              name: "enabled",
              type: "boolean"
            }
          ]
        }
      ],
      events: [
        {
          name: "waitingForDisconnect",
          description: "This event is fired instead of `Runtime.executionContextDestroyed` when\nenabled.\nIt is fired when the Node process finished all code execution and is\nwaiting for all frontends to disconnect."
        }
      ]
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

// SIG // Begin signature block
// SIG // MIInzAYJKoZIhvcNAQcCoIInvTCCJ7kCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // qJKUGcZx+G95cxqO97umq9mktzAsLsXThBAMnaUXE9Sg
// SIG // gg2FMIIGAzCCA+ugAwIBAgITMwAAA01OkaYaKLB4jwAA
// SIG // AAADTTANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMDMxNjE4NDMyOFoX
// SIG // DTI0MDMxNDE4NDMyOFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 1Cj3ChlWunG6BkFNNzjW1CspeFqR+kNl6PXD90YV0zmu
// SIG // gukx5bXdkX545VEBvjMKMvd4hphihDBf48jtl3YsDD+N
// SIG // u4/dAvzzGP3eb2N9bMfrnbW4n+xgie4ydby83Y9vM1eK
// SIG // 9BRhushL/rVDXpUyLBZpkm9BVIibVOK+bHwk4b4PHSPx
// SIG // fR4esTGaFbYvpG1ZWvoZRvG3+LNNFU8OLgGYYxkxQmBU
// SIG // crSid/5rXoNqp8LxwzoFe0EnVeXVnXdPsc3LhtKoHd6A
// SIG // ggIx/GZo5qMJB1HuHVJm3GX17IFpTn3OgxuyUvg3iWpN
// SIG // Q72m2pmKh4NQFHmdPrJKZMKysF0xcAUZbQIDAQABo4IB
// SIG // gjCCAX4wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFCHdiJoNkqdOVOlyNOI5Ytiq
// SIG // IS/vMFQGA1UdEQRNMEukSTBHMS0wKwYDVQQLEyRNaWNy
// SIG // b3NvZnQgSXJlbGFuZCBPcGVyYXRpb25zIExpbWl0ZWQx
// SIG // FjAUBgNVBAUTDTIzMDAxMis1MDA1MTcwHwYDVR0jBBgw
// SIG // FoAUSG5k5VAF04KqFzc3IrVtqMp1ApUwVAYDVR0fBE0w
// SIG // SzBJoEegRYZDaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jcmwvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNybDBhBggrBgEFBQcBAQRVMFMwUQYIKwYB
// SIG // BQUHMAKGRWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljQ29kU2lnUENBMjAxMV8yMDEx
// SIG // LTA3LTA4LmNydDAMBgNVHRMBAf8EAjAAMA0GCSqGSIb3
// SIG // DQEBCwUAA4ICAQAjBE/Frsy6w8Hsbk1GXvb9sa1vFhlD
// SIG // 0UFZsidW/wcymAWeWlOEL4eS82XvYzhMQ2FJSm/2O95a
// SIG // iCH1HBDv+lt2/u7dT/ZvTNcT62b+XH50goLqKDw6uK0H
// SIG // v4gnTQ8B0+l2FusnrcUyTDqOLVA20ktGIma+zGm9sJI4
// SIG // DRWtI0RYXkvXWk0taCf8+WzZRop8atr/Gs0j/xnB/7fH
// SIG // k6x0H3Gsd1mzxC6BhyG68q0lGjgqYbJwjVKlDeRWxDJW
// SIG // reTLmPeKxjCZ6tSBHekvJ4CugvBPUlqRhDtzQ2tDZQFY
// SIG // qK6RnyNDWCG3cp8jgfOOmlgIzX4E4SHHc3VhbwJf+pLV
// SIG // lyxE5/Lv5WEMlhprpd8s/sNOqbiDw/aeCj4lgZAnrCgx
// SIG // 71y609wWy2fHSqkjlfA7cyxQH3PagLDYhvBKGrYZbiQb
// SIG // G8hW6Xm2nSpRKxYnQF/ChLrJPIbR6okpDccnWpi/7Sn8
// SIG // d1f7wwKEBOfcrL+K96RPs3cnzGoq75BTTcO3D59ZBxnM
// SIG // MPXRUmNkMAMYTM5qDNBvjPmLwZwbucI38TazEYpUW8TO
// SIG // go/YShYdGE8G2ujO857Rx6V93fp2m4xZv05zEUTjoCFy
// SIG // c2G8yimjtoNZFnshtkLbyEdeO85a20A+F9dAG60YPQqc
// SIG // Fu8WMcsHs4/ojQHPkJhc0feHcyZBD1EgiT7ExTCCB3ow
// SIG // ggVioAMCAQICCmEOkNIAAAAAAAMwDQYJKoZIhvcNAQEL
// SIG // BQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMT
// SIG // KU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhv
// SIG // cml0eSAyMDExMB4XDTExMDcwODIwNTkwOVoXDTI2MDcw
// SIG // ODIxMDkwOVowfjELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEoMCYG
// SIG // A1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQQ0Eg
// SIG // MjAxMTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoC
// SIG // ggIBAKvw+nIQHC6t2G6qghBNNLrytlghn0IbKmvpWlCq
// SIG // uAY4GgRJun/DDB7dN2vGEtgL8DjCmQawyDnVARQxQtOJ
// SIG // DXlkh36UYCRsr55JnOloXtLfm1OyCizDr9mpK656Ca/X
// SIG // llnKYBoF6WZ26DJSJhIv56sIUM+zRLdd2MQuA3WraPPL
// SIG // bfM6XKEW9Ea64DhkrG5kNXimoGMPLdNAk/jj3gcN1Vx5
// SIG // pUkp5w2+oBN3vpQ97/vjK1oQH01WKKJ6cuASOrdJXtjt
// SIG // 7UORg9l7snuGG9k+sYxd6IlPhBryoS9Z5JA7La4zWMW3
// SIG // Pv4y07MDPbGyr5I4ftKdgCz1TlaRITUlwzluZH9TupwP
// SIG // rRkjhMv0ugOGjfdf8NBSv4yUh7zAIXQlXxgotswnKDgl
// SIG // mDlKNs98sZKuHCOnqWbsYR9q4ShJnV+I4iVd0yFLPlLE
// SIG // tVc/JAPw0XpbL9Uj43BdD1FGd7P4AOG8rAKCX9vAFbO9
// SIG // G9RVS+c5oQ/pI0m8GLhEfEXkwcNyeuBy5yTfv0aZxe/C
// SIG // HFfbg43sTUkwp6uO3+xbn6/83bBm4sGXgXvt1u1L50kp
// SIG // pxMopqd9Z4DmimJ4X7IvhNdXnFy/dygo8e1twyiPLI9A
// SIG // N0/B4YVEicQJTMXUpUMvdJX3bvh4IFgsE11glZo+TzOE
// SIG // 2rCIF96eTvSWsLxGoGyY0uDWiIwLAgMBAAGjggHtMIIB
// SIG // 6TAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQUSG5k
// SIG // 5VAF04KqFzc3IrVtqMp1ApUwGQYJKwYBBAGCNxQCBAwe
// SIG // CgBTAHUAYgBDAEEwCwYDVR0PBAQDAgGGMA8GA1UdEwEB
// SIG // /wQFMAMBAf8wHwYDVR0jBBgwFoAUci06AjGQQ7kUBU7h
// SIG // 6qfHMdEjiTQwWgYDVR0fBFMwUTBPoE2gS4ZJaHR0cDov
// SIG // L2NybC5taWNyb3NvZnQuY29tL3BraS9jcmwvcHJvZHVj
// SIG // dHMvTWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNy
// SIG // bDBeBggrBgEFBQcBAQRSMFAwTgYIKwYBBQUHMAKGQmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2kvY2VydHMv
// SIG // TWljUm9vQ2VyQXV0MjAxMV8yMDExXzAzXzIyLmNydDCB
// SIG // nwYDVR0gBIGXMIGUMIGRBgkrBgEEAYI3LgMwgYMwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvZG9jcy9wcmltYXJ5Y3BzLmh0bTBABggr
// SIG // BgEFBQcCAjA0HjIgHQBMAGUAZwBhAGwAXwBwAG8AbABp
// SIG // AGMAeQBfAHMAdABhAHQAZQBtAGUAbgB0AC4gHTANBgkq
// SIG // hkiG9w0BAQsFAAOCAgEAZ/KGpZjgVHkaLtPYdGcimwuW
// SIG // EeFjkplCln3SeQyQwWVfLiw++MNy0W2D/r4/6ArKO79H
// SIG // qaPzadtjvyI1pZddZYSQfYtGUFXYDJJ80hpLHPM8QotS
// SIG // 0LD9a+M+By4pm+Y9G6XUtR13lDni6WTJRD14eiPzE32m
// SIG // kHSDjfTLJgJGKsKKELukqQUMm+1o+mgulaAqPyprWElj
// SIG // HwlpblqYluSD9MCP80Yr3vw70L01724lruWvJ+3Q3fMO
// SIG // r5kol5hNDj0L8giJ1h/DMhji8MUtzluetEk5CsYKwsat
// SIG // ruWy2dsViFFFWDgycScaf7H0J/jeLDogaZiyWYlobm+n
// SIG // t3TDQAUGpgEqKD6CPxNNZgvAs0314Y9/HG8VfUWnduVA
// SIG // KmWjw11SYobDHWM2l4bf2vP48hahmifhzaWX0O5dY0Hj
// SIG // Wwechz4GdwbRBrF1HxS+YWG18NzGGwS+30HHDiju3mUv
// SIG // 7Jf2oVyW2ADWoUa9WfOXpQlLSBCZgB/QACnFsZulP0V3
// SIG // HjXG0qKin3p6IvpIlR+r+0cjgPWe+L9rt0uX4ut1eBrs
// SIG // 6jeZeRhL/9azI2h15q/6/IvrC4DqaTuv/DDtBEyO3991
// SIG // bWORPdGdVk5Pv4BXIqF4ETIheu9BCrE/+6jMpF3BoYib
// SIG // V3FWTkhFwELJm3ZbCoBIa/15n8G9bW1qyVJzEw16UM0x
// SIG // ghmfMIIZmwIBATCBlTB+MQswCQYDVQQGEwJVUzETMBEG
// SIG // A1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
// SIG // ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBTaWduaW5n
// SIG // IFBDQSAyMDExAhMzAAADTU6RphoosHiPAAAAAANNMA0G
// SIG // CWCGSAFlAwQCAQUAoIGuMBkGCSqGSIb3DQEJAzEMBgor
// SIG // BgEEAYI3AgEEMBwGCisGAQQBgjcCAQsxDjAMBgorBgEE
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCA28yBcWjhiSAxi
// SIG // b1sh7teF4iUkqm0c5H3QYbOfBL5GLzBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBADWhwkf8EsZngUwykRzIIcRh8ABBFD0W
// SIG // ZrR4eIJgLggOmtmxfYgKHesNbtbL0VSpAaPI0AHYgGfh
// SIG // NtOvp7NKJtCHWrvOeqszcufHOv3OzB9ymnOJ3jRyTKGv
// SIG // DYR9AXJ1Ppyyxos+pDWXdhrGr/BqpyJJ8Q6QYwR0tXOM
// SIG // ftj0tk1WRczTChe2ZeGHmaTXIiV22mYTaLqz8rrW7dYM
// SIG // lnO+40X8hy5rlNyhmKc00tgSPysFsVBmJzMNjS01SwwA
// SIG // OXQ38G9sZsAVmcJqwO8D3XYD/2hCsV1IIxIQAZYjpBCJ
// SIG // UtvDzS3lEc9GS9FGezHSYWRS6KRQr3Lwc4T8tFr76E/s
// SIG // fQahghcpMIIXJQYKKwYBBAGCNwMDATGCFxUwghcRBgkq
// SIG // hkiG9w0BBwKgghcCMIIW/gIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBWQYLKoZIhvcNAQkQAQSgggFIBIIBRDCCAUAC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // 6SVxvFZ3kzn8WJxES/GX4si4rZMHtMlSxBohEDXw9dIC
// SIG // BmULWRe2kBgTMjAyMzA5MjYwOTA3NDguMTY1WjAEgAIB
// SIG // 9KCB2KSB1TCB0jELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsG
// SIG // A1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9u
// SIG // cyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVT
// SIG // Tjo4NkRGLTRCQkMtOTMzNTElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEXgwggcnMIIF
// SIG // D6ADAgECAhMzAAABtyEnGgeiKoZGAAEAAAG3MA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTIyMDkyMDIwMjIxNFoXDTIzMTIxNDIwMjIx
// SIG // NFowgdIxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046ODZE
// SIG // Ri00QkJDLTkzMzUxJTAjBgNVBAMTHE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQDH/c9XUDQTZEwatxyXJcqY
// SIG // 0HCSJQwIKb7MOLxyXtOp+d9kShpHJ9Fe6euTngNcDqDv
// SIG // vDbKKZ4z6VWfPuLP0YXTAjDT0CV6FnZFjqf96biBLNX8
// SIG // zwYEya3Zs3clGM6wJaCAmMe9toJnaWzX9z9MuWdoETuP
// SIG // LFiGMmHjSWHIfmXyc16qr7r6uxvDZvCDEIvGWsr8fuXU
// SIG // hgTOVWBwcQhI1xfRDekMOwOtEml4yo6I0qVJqWjOBZlX
// SIG // nPfOTzXUofITnj9rS+/NUgWp/dg09fbXzR7/R9BQJhNh
// SIG // xkcIsx5Cf/5gGXUtLOm4v1MDzJLAImuW6ZyAwTqGmHVp
// SIG // FdJVRuazdPpbUc/c45Wh/boXRkyflojSjq+5kZ5c2EAO
// SIG // d37UkiQarBKU8wr+3Ou933b5bcd8uPD3q+r3OlEeXuJE
// SIG // mbB9eNSIcYZkUdkphGm7mCjk3Tu0P75bwH0MbhJyfdzS
// SIG // +C2FdSFsPDvsTTuoJY6waQjnzjk0IFiRfjOvyD8rmK3L
// SIG // +/S7u5XOu0vlPTBLtnaINDLiSKGAjIrlWl0ufhZjiYsn
// SIG // 4gmZtFSbCee9MvZP7REHumkEfTMQ1tadhdx1nm6JV4/b
// SIG // Lu866xJTZRwBL6RYXIKDJ4spTU4k2cy8FI+0x/N4J7oM
// SIG // NRQhFVYeVPZcDTDy9SBrs/91PkU/cGQgSWCKxST3epPF
// SIG // LQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFLPyOT4MNCQF
// SIG // YQ3WAdsjyCPJeLTsMB8GA1UdIwQYMBaAFJ+nFV0AXmJd
// SIG // g/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCGTmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3Js
// SIG // L01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAy
// SIG // MDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4wXAYIKwYB
// SIG // BQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVGltZS1TdGFt
// SIG // cCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwGA1UdEwEB/wQC
// SIG // MAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0P
// SIG // AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQANnWTM
// SIG // m4VcUl02ycxYLzYjAlefwMp+VLsyVOPeWA7XHn6JXdHo
// SIG // UfUARgYR5gDLddFmAh89lkFMjN5kA+CLB3xC9SRMIBvb
// SIG // Rqu9bnJ/XZJywRw99Cb20EYSCnLxUp70QgqVaYpTPBf2
// SIG // GllwvVYm0nn/z1NhlgPtc7OuFRcSah3rsvCqq0MnxdtE
// SIG // gp3fM0WZeGGAXI4fRtBo4SR1DwGBMdK/I0lo8otqNlgB
// SIG // w+gqaQbZMJ2Un+wOvAy+DsMAaZhQd/r7m44DcGiAkvn5
// SIG // Blb0Zz9mYJpX52gGrPDMe4oCanIqqtEOgJ/tKx49ZMYr
// SIG // DXSIk8xZbuRsNnoV6S65efZL7JjjVQCR4Z3acd5/9K++
// SIG // kx/t1jUvVE/Y28UJBPrdrYYn+jCuZKxTJ5ASAgkfw1XF
// SIG // dasPbIOrDBKNMFkl5UGF73EFgOuXlc0pKLMpYSJSGWSy
// SIG // 9xh2Q9S0LQI6dgORewtyMODbewu2gwn6RcaJt2bpUZxS
// SIG // aJZTx297p4/YQPcb0Yip1jADKUuDGQKIleDtvc1imXVM
// SIG // 8oKe4A+FoyitdeSgidKLxHH/dgJ8DAFzJzbNaNCwrM4P
// SIG // rg5okGbOXke483Ss1Xxdc+23w2DTwCb5uaUkHW8t8CDr
// SIG // Df7LWIzPhJGj7VM6/DsjMKxvo6RTG7AeHHzerbyHhra7
// SIG // ZJTCRbZxevAnGWeSADCCB3EwggVZoAMCAQICEzMAAAAV
// SIG // xedrngKbSZkAAAAAABUwDQYJKoZIhvcNAQELBQAwgYgx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jv
// SIG // c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAy
// SIG // MDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIy
// SIG // NVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTAwggIi
// SIG // MA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDk4aZM
// SIG // 57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/
// SIG // bErg4r25PhdgM/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1
// SIG // jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPFdvWGUNzBRMhx
// SIG // XFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41
// SIG // JmTamDu6GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP
// SIG // 1uyFVk3v3byNpOORj7I5LFGc6XBpDco2LXCOMcg1KL3j
// SIG // tIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF
// SIG // 50ZuyjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg
// SIG // 3viSkR4dPf0gz3N9QZpGdc3EXzTdEonW/aUgfX782Z5F
// SIG // 37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0
// SIG // lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlM
// SIG // jgK8QmguEOqEUUbi0b1qGFphAXPKZ6Je1yh2AuIzGHLX
// SIG // pyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ+QuJ
// SIG // YfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzF
// SIG // ER1y7435UsSFF5PAPBXbGjfHCBUYP3irRbb1Hode2o+e
// SIG // FnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkwEgYJKwYB
// SIG // BAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS
// SIG // /mTEmr6CkTxGNSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0A
// SIG // XmJdg/Tl0mWnG1M1GelyMFwGA1UdIARVMFMwUQYMKwYB
// SIG // BAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBv
// SIG // c2l0b3J5Lmh0bTATBgNVHSUEDDAKBggrBgEFBQcDCDAZ
// SIG // BgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8E
// SIG // BAMCAYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAW
// SIG // gBTV9lbLj+iiXGJo0T2UkFvXzpoYxDBWBgNVHR8ETzBN
// SIG // MEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAx
// SIG // MC0wNi0yMy5jcmwwWgYIKwYBBQUHAQEETjBMMEoGCCsG
// SIG // AQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIz
// SIG // LmNydDANBgkqhkiG9w0BAQsFAAOCAgEAnVV9/Cqt4Swf
// SIG // ZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0xM7U518Jx
// SIG // Nj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6
// SIG // th542DYunKmCVgADsAW+iehp4LoJ7nvfam++Kctu2D9I
// SIG // dQHZGN5tggz1bSNU5HhTdSRXud2f8449xvNo32X2pFaq
// SIG // 95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBew
// SIG // VIVCs/wMnosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7
// SIG // bj8sCXgU6ZGyqVvfSaN0DLzskYDSPeZKPmY7T7uG+jIa
// SIG // 2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzH
// SIG // VG2dY3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZ
// SIG // c9d/HltEAY5aGZFrDZ+kKNxnGSgkujhLmm77IVRrakUR
// SIG // R6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+Crvs
// SIG // QWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKi
// SIG // excdFYmNcP7ntdAoGokLjzbaukz5m/8K6TT4JDVnK+AN
// SIG // uOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL6Xu/
// SIG // OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQd
// SIG // VTNYs6FwZvKhggLUMIICPQIBATCCAQChgdikgdUwgdIx
// SIG // CzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
// SIG // MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsTJE1pY3Jv
// SIG // c29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGltaXRlZDEm
// SIG // MCQGA1UECxMdVGhhbGVzIFRTUyBFU046ODZERi00QkJD
// SIG // LTkzMzUxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVAMhnQRjD
// SIG // mzg5bBgWZklF9qFoH6nGoIGDMIGApH4wfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQAC
// SIG // BQDovRdiMCIYDzIwMjMwOTI2MTY0MDAyWhgPMjAyMzA5
// SIG // MjcxNjQwMDJaMHQwOgYKKwYBBAGEWQoEATEsMCowCgIF
// SIG // AOi9F2ICAQAwBwIBAAICGiwwBwIBAAICFRMwCgIFAOi+
// SIG // aOICAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGE
// SIG // WQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkq
// SIG // hkiG9w0BAQUFAAOBgQA8KrAtrSsFfoavgKE3vc+aGnIA
// SIG // NM6X6Nb0ayaaSTXgSR5BxLPHi6lPQbVX/zJgavBuLX8Z
// SIG // V1HsI97GfDzEpLYZgfdXBWwxdi2O65LOc+TOM8QK2dXr
// SIG // 91kksBdlvPHw58p6U/bOqCpv5fjpPaZm6PhfBjA8POs6
// SIG // cjrQvD/PEN2rmDGCBA0wggQJAgEBMIGTMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwAhMzAAABtyEnGgeiKoZG
// SIG // AAEAAAG3MA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG
// SIG // 9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkE
// SIG // MSIEIL3Ilh6UzvTraSP/ys3Tr7DCtnRjkzLida59cRpN
// SIG // +LbzMIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQg
// SIG // bCd407Ie2i/ITXomBi+f/CAZ/M1H6+/0O65DPInNcEEw
// SIG // gZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MAITMwAAAbchJxoHoiqGRgABAAABtzAiBCDOIWjAMGld
// SIG // bEpP1fSJoyk1ePrTXVUXVrWTdVAajV2mkDANBgkqhkiG
// SIG // 9w0BAQsFAASCAgCYNMW0uiT2M20afP6oJ1b2upWBCU6Z
// SIG // pAVHnfbMHTC6VmnpHjcSmxeUkn4akse/2kKqArwIafbj
// SIG // rHgm+QdO75RI05TWKMtjTBr8/Okg84hcGwSQSGrVaNm7
// SIG // IsZNZ8Rn4STMsRdlm97np8EPD7cum9bvtFXynkHCWvzv
// SIG // iw4TdQP+VgPdeXYROSahQdh+/1nAOpEBUthInn6Zv0K5
// SIG // hEqYNpFRxQ78tty/VJzRwbORIzsPZ5p2trMUthJUGup5
// SIG // jKu7ApbN9VmDVddiR3LFS70EAxXR8KzEYD24Vn8OEa/8
// SIG // Y0+bIiytBzL54/Z5sjWS1rOhODNZq81YebhukzZGQhKl
// SIG // ukPALwL3hi5o1FlUYwHAkbRTF361x8yyp79qV5pQJJ4R
// SIG // C43foOt0wh51y9a9supwcPtEk5NF41wxavCl3diAFqyt
// SIG // ktZzvxLISyh5QkWiYum777FZwsCBC9QgNyFVQbIlt/f7
// SIG // bk+k4TicrkyIlzagT4d6N0YNBwy23IwE3un8pPWvqaGb
// SIG // Y5uutadM9A4/OnJWzsPv5UlPIUoQ0AshQtx4Jo0cGBY1
// SIG // GTZu3J6N1PnWV6TzVvZUnPe4eD7GsZK/ePmaQ8vnA5BW
// SIG // oZnPyiaYOn/EsMbiiCtf7Q6vuoU2Cggs0sXLiKRioKVE
// SIG // +vrZtrJHb5x0UhMc9y1b6s0JGJU7aVYkorYMwA==
// SIG // End signature block
