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

// src/build/dapCustom.ts
var dapCustom_exports = {};
__export(dapCustom_exports, {
  default: () => dapCustom_default
});
module.exports = __toCommonJS(dapCustom_exports);
var upperFirst = (x) => x.slice(0, 1).toUpperCase() + x.slice(1);
var makeEvent = (name, description, params) => ({
  [`${upperFirst(name)}Event`]: {
    allOf: [
      { $ref: "#/definitions/Event" },
      {
        type: "object",
        description,
        properties: {
          event: {
            type: "string",
            enum: [name]
          },
          body: {
            type: "object",
            ...params
          }
        },
        required: ["event", "body"]
      }
    ]
  }
});
var makeRequest = (name, description, args = {}, response) => ({
  [`${upperFirst(name)}Request`]: {
    allOf: [
      { $ref: "#/definitions/Request" },
      {
        type: "object",
        description,
        properties: {
          command: {
            type: "string",
            enum: [name]
          },
          arguments: {
            $ref: `#/definitions/${upperFirst(name)}Arguments`
          }
        },
        required: ["command", "arguments"]
      }
    ]
  },
  [`${upperFirst(name)}Arguments`]: {
    type: "object",
    description: `Arguments for '${name}' request.`,
    ...args
  },
  [`${upperFirst(name)}Response`]: {
    allOf: [
      { $ref: "#/definitions/Response" },
      {
        type: "object",
        description: `Response to '${name}' request.`,
        ...response && {
          properties: {
            body: {
              type: "object",
              ...response
            }
          },
          required: ["body"]
        }
      }
    ]
  }
});
var dapCustom = {
  definitions: {
    ...makeRequest("enableCustomBreakpoints", "Enable custom breakpoints.", {
      properties: {
        ids: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Id of breakpoints to enable."
        }
      },
      required: ["ids"]
    }),
    ...makeRequest("disableCustomBreakpoints", "Disable custom breakpoints.", {
      properties: {
        ids: {
          type: "array",
          items: {
            type: "string"
          },
          description: "Id of breakpoints to enable."
        }
      },
      required: ["ids"]
    }),
    ...makeRequest("prettyPrintSource", "Pretty prints source for debugging.", {
      properties: {
        source: {
          $ref: "#/definitions/Source",
          description: "Source to be pretty printed."
        },
        line: {
          type: "integer",
          description: "Line number of currently selected location to reveal after pretty printing. If not present, nothing is revealed."
        },
        column: {
          type: "integer",
          description: "Column number of currently selected location to reveal after pretty printing."
        }
      },
      required: ["source"]
    }),
    ...makeRequest("toggleSkipFileStatus", "Toggle skip status of file.", {
      properties: {
        resource: {
          type: "string",
          description: "Url of file to be skipped."
        },
        sourceReference: {
          type: "number",
          description: "Source reference number of file."
        }
      }
    }),
    ...makeEvent("revealLocationRequested", "A request to reveal a certain location in the UI.", {
      properties: {
        source: {
          $ref: "#/definitions/Source",
          description: "The source to reveal."
        },
        line: {
          type: "integer",
          description: "The line number to reveal."
        },
        column: {
          type: "integer",
          description: "The column number to reveal."
        }
      },
      required: ["source"]
    }),
    ...makeEvent("copyRequested", "A request to copy a certain string to clipboard.", {
      properties: {
        text: {
          type: "string",
          description: "Text to copy."
        }
      },
      required: ["text"]
    }),
    ...makeEvent(
      "longPrediction",
      "An event sent when breakpoint prediction takes a significant amount of time.",
      {}
    ),
    ...makeEvent(
      "launchBrowserInCompanion",
      "Request to launch a browser in the companion extension within the UI.",
      {
        required: ["type", "params", "serverPort", "launchId"],
        properties: {
          type: {
            type: "string",
            enum: ["chrome", "edge"],
            description: "Type of browser to launch"
          },
          launchId: {
            type: "number",
            description: "Incrementing ID to refer to this browser launch request"
          },
          serverPort: {
            type: "number",
            description: "Local port the debug server is listening on"
          },
          path: {
            type: "string",
            description: "Server path to connect to"
          },
          browserArgs: {
            type: "array",
            items: {
              type: "string"
            }
          },
          attach: {
            type: "object",
            required: ["host", "port"],
            properties: {
              host: { type: "string" },
              port: { type: "number" }
            }
          },
          params: {
            type: "object",
            description: "Original launch parameters for the debug session"
          }
        }
      }
    ),
    ...makeEvent("killCompanionBrowser", "Kills a launched browser companion.", {
      required: ["launchId"],
      properties: {
        launchId: {
          type: "number",
          description: "Incrementing ID to refer to this browser launch request"
        }
      }
    }),
    ...makeRequest("startProfile", "Starts taking a profile of the target.", {
      properties: {
        stopAtBreakpoint: {
          type: "array",
          items: {
            type: "number"
          },
          description: "Breakpoints where we should stop once hit."
        },
        type: {
          type: "string",
          description: "Type of profile that should be taken"
        },
        params: {
          type: "object",
          description: "Additional arguments for the type of profiler"
        }
      },
      required: ["file", "type"]
    }),
    ...makeRequest("stopProfile", "Stops a running profile."),
    ...makeEvent("profileStarted", "Fired when a profiling state changes.", {
      required: ["type", "file"],
      properties: {
        type: {
          type: "string",
          description: "Type of running profile"
        },
        file: {
          type: "string",
          description: "Location where the profile is saved."
        }
      }
    }),
    ...makeEvent("profilerStateUpdate", "Fired when a profiling state changes.", {
      required: ["label", "running"],
      properties: {
        label: {
          type: "string",
          description: "Description of the current state"
        },
        running: {
          type: "boolean",
          description: "Set to false if the profile has now ended"
        }
      }
    }),
    ...makeRequest(
      "launchVSCode",
      "Launches a VS Code extension host in debug mode.",
      {
        required: ["args", "env"],
        properties: {
          args: {
            type: "array",
            items: {
              $ref: "#/definitions/LaunchVSCodeArgument"
            }
          },
          env: {
            type: "object"
          },
          debugRenderer: {
            type: "boolean"
          }
        }
      },
      {
        properties: {
          rendererDebugPort: {
            type: "number"
          }
        }
      }
    ),
    LaunchVSCodeArgument: {
      type: "object",
      description: 'This interface represents a single command line argument split into a "prefix" and a "path" half. The optional "prefix" contains arbitrary text and the optional "path" contains a file system path. Concatenating both results in the original command line argument.',
      properties: {
        path: {
          type: "string"
        },
        prefix: {
          type: "string"
        }
      }
    },
    ...makeRequest("launchUnelevated", "Launches a VS Code extension host in debug mode.", {
      properties: {
        process: {
          type: "string"
        },
        args: {
          type: "array",
          items: {
            type: "string"
          }
        }
      }
    }),
    ...makeRequest(
      "remoteFileExists",
      "Check if file exists on remote file system, used in VS.",
      {
        properties: {
          localFilePath: {
            type: "string"
          }
        }
      },
      {
        required: ["doesExists"],
        properties: {
          doesExists: {
            type: "boolean",
            description: "Does the file exist on the remote file system."
          }
        }
      }
    ),
    ...makeRequest(
      "remoteFileExists",
      "Check if file exists on remote file system, used in VS.",
      {
        properties: {
          localFilePath: {
            type: "string"
          }
        }
      },
      {
        required: ["doesExists"],
        properties: {
          doesExists: {
            type: "boolean",
            description: "Does the file exist on the remote file system."
          }
        }
      }
    ),
    ...makeRequest("revealPage", "Focuses the browser page or tab associated with the session."),
    ...makeRequest("startSelfProfile", "Starts profiling the extension itself. Used by VS.", {
      required: ["file"],
      properties: {
        file: {
          description: "File where the profile should be saved",
          type: "string"
        }
      }
    }),
    ...makeRequest("stopSelfProfile", "Stops profiling the extension itself. Used by VS."),
    ...makeRequest(
      "getPerformance",
      "Requests that we get performance information from the runtime.",
      {},
      {
        properties: {
          metrics: {
            type: "object",
            description: "Response to 'GetPerformance' request. A key-value list of runtime-dependent details."
          },
          error: {
            description: "Optional error from the adapter",
            type: "string"
          }
        }
      }
    ),
    ...makeEvent(
      "suggestDisableSourcemap",
      "Fired when requesting a missing source from a sourcemap. UI will offer to disable the sourcemap.",
      {
        properties: {
          source: {
            $ref: "#/definitions/Source",
            description: "Source to be pretty printed."
          }
        },
        required: ["source"]
      }
    ),
    ...makeRequest(
      "disableSourcemap",
      "Disables the sourcemapped source and refreshes the stacktrace if paused.",
      {
        properties: {
          source: {
            $ref: "#/definitions/Source",
            description: "Source to be pretty printed."
          }
        },
        required: ["source"]
      }
    ),
    ...makeRequest(
      "createDiagnostics",
      "Generates diagnostic information for the debug session.",
      {
        properties: {
          fromSuggestion: {
            type: "boolean",
            description: "Whether the tool is opening from a prompt"
          }
        }
      },
      {
        properties: {
          file: {
            type: "string",
            description: "Location of the generated report on disk"
          }
        },
        required: ["file"]
      }
    ),
    ...makeRequest(
      "saveDiagnosticLogs",
      "Saves recent diagnostic logs for the debug session.",
      {
        properties: {
          toFile: {
            type: "string",
            description: "File where logs should be saved"
          }
        },
        required: ["toFile"]
      },
      {}
    ),
    ...makeEvent(
      "suggestDiagnosticTool",
      "Shows a prompt to the user suggesting they use the diagnostic tool if breakpoints don't bind.",
      {}
    ),
    ...makeEvent("openDiagnosticTool", "Opens the diagnostic tool if breakpoints don't bind.", {
      properties: {
        file: {
          type: "string",
          description: "Location of the generated report on disk"
        }
      },
      required: ["file"]
    }),
    ...makeRequest(
      "requestCDPProxy",
      "Request WebSocket connection information on a proxy for this debug sessions CDP connection.",
      void 0,
      {
        required: ["host", "port", "path"],
        properties: {
          host: {
            type: "string",
            description: "Name of the host, on which the CDP proxy is available through a WebSocket."
          },
          port: {
            type: "number",
            description: "Port on the host, under which the CDP proxy is available through a WebSocket."
          },
          path: {
            type: "string",
            description: "Websocket path to connect to."
          }
        }
      }
    ),
    CallerLocation: {
      type: "object",
      required: ["line", "column", "source"],
      properties: {
        line: {
          type: "integer"
        },
        column: {
          type: "integer"
        },
        source: {
          $ref: "#/definitions/Source",
          description: "Source to be pretty printed."
        }
      }
    },
    ExcludedCaller: {
      type: "object",
      required: ["target", "caller"],
      properties: {
        target: {
          $ref: "#/definitions/CallerLocation"
        },
        caller: {
          $ref: "#/definitions/CallerLocation"
        }
      }
    },
    ...makeRequest("setExcludedCallers", "Adds an excluded caller/target pair.", {
      properties: {
        callers: {
          type: "array",
          items: {
            $ref: "#/definitions/ExcludedCaller"
          }
        }
      },
      required: ["callers"]
    }),
    ...makeRequest("setSourceMapStepping", "Configures whether source map stepping is enabled.", {
      properties: {
        enabled: {
          type: "boolean"
        }
      },
      required: ["enabled"]
    }),
    ...makeRequest("setDebuggerProperty", "Sets debugger properties.", {
      properties: {
        params: {
          $ref: "#/definitions/SetDebuggerPropertyParams"
        }
      },
      required: ["params"]
    }),
    SetDebuggerPropertyParams: {
      type: "object",
      description: 'Arguments for "setDebuggerProperty" request. Properties are determined by debugger.'
    },
    ...makeRequest(
      "capabilitiesExtended",
      "The event indicates that one or more capabilities have changed.",
      {
        properties: {
          params: {
            $ref: "#/definitions/CapabilitiesExtended"
          }
        },
        required: ["params"]
      }
    ),
    CapabilitiesExtended: {
      allOf: [
        { $ref: "#/definitions/Capabilities" },
        {
          type: "object",
          description: "Extension of Capabilities defined in public DAP",
          properties: {
            supportsDebuggerProperties: {
              type: "boolean"
            },
            supportsEvaluationOptions: {
              type: "boolean"
            },
            supportsSetSymbolOptions: {
              type: "boolean",
              description: "The debug adapter supports the set symbol options request"
            }
          }
        }
      ]
    },
    ...makeRequest("evaluationOptions", "Used by evaluate and variables.", {
      properties: {
        evaluateParams: {
          $ref: "#/definitions/EvaluateParamsExtended"
        },
        variablesParams: {
          $ref: "#/definitions/VariablesParamsExtended"
        },
        stackTraceParams: {
          $ref: "#/definitions/StackTraceParamsExtended"
        }
      }
    }),
    EvaluationOptions: {
      type: "object",
      description: 'Options passed to expression evaluation commands ("evaluate" and "variables") to control how the evaluation occurs.',
      properties: {
        treatAsStatement: {
          type: "boolean",
          description: "Evaluate the expression as a statement."
        },
        allowImplicitVars: {
          type: "boolean",
          description: "Allow variables to be declared as part of the expression."
        },
        noSideEffects: {
          type: "boolean",
          description: "Evaluate without side effects."
        },
        noFuncEval: {
          type: "boolean",
          description: "Exclude funceval during evaluation."
        },
        noToString: {
          type: "boolean",
          description: "Exclude calling `ToString` during evaluation."
        },
        forceEvaluationNow: {
          type: "boolean",
          description: "Evaluation should take place immediately if possible."
        },
        forceRealFuncEval: {
          type: "boolean",
          description: "Exclude interpretation from evaluation methods."
        },
        runAllThreads: {
          type: "boolean",
          description: "Allow all threads to run during the evaluation."
        },
        rawStructures: {
          type: "boolean",
          description: "The 'raw' view of objects and structions should be shown - visualization improvements should be disabled."
        },
        filterToFavorites: {
          type: "boolean",
          description: "Variables responses containing favorites should be filtered to only those items"
        },
        simpleDisplayString: {
          type: "boolean",
          description: "Auto generated display strings for variables with favorites should not include field names."
        }
      }
    },
    EvaluateParamsExtended: {
      allOf: [
        { $ref: "#/definitions/EvaluateParams" },
        {
          type: "object",
          description: "Extension of EvaluateParams",
          properties: {
            evaluationOptions: {
              $ref: "#/definitions/EvaluationOptions"
            }
          }
        }
      ]
    },
    VariablesParamsExtended: {
      allOf: [
        { $ref: "#/definitions/VariablesParams" },
        {
          type: "object",
          description: "Extension of VariablesParams",
          properties: {
            evaluationOptions: {
              $ref: "#/definitions/EvaluationOptions"
            }
          }
        }
      ]
    },
    StackTraceParamsExtended: {
      allOf: [
        { $ref: "#/definitions/StackTraceParams" },
        {
          type: "object",
          description: "Extension of StackTraceParams",
          properties: {
            noFuncEval: {
              type: "boolean"
            }
          }
        }
      ]
    },
    ...makeRequest("setSymbolOptions", "Sets options for locating symbols."),
    SetSymbolOptionsArguments: {
      type: "object",
      description: 'Arguments for "setSymbolOptions" request. Properties are determined by debugger.'
    }
  }
};
var dapCustom_default = dapCustom;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});

// SIG // Begin signature block
// SIG // MIIoKQYJKoZIhvcNAQcCoIIoGjCCKBYCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // LWlhBMq28pgI23b0T/24uqUaDb8jk1+kk0Tx3RaGZYeg
// SIG // gg12MIIF9DCCA9ygAwIBAgITMwAAA061PHrBhG/rKwAA
// SIG // AAADTjANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTIzMDMxNjE4NDMyOVoX
// SIG // DTI0MDMxNDE4NDMyOVowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // 3QiojSOiARVrryVJn+lnTiamZiMGLORuwCQ+VG3C+rbA
// SIG // vhATw269+qRRqNW7FKed50chWJ53KDIPBStHfIy5cNJY
// SIG // HsQw6+4InH9szgRVqn7/50i8MyRTT+VtNwxf9daGddq0
// SIG // hahpZvjuOnEY0wxQaTEQmWRnXWZUQY4r28tHiNVYEw9U
// SIG // 7wHXwWEHvNn4ZlkJGEf5VpgCvr1v9fmzu4x2sV0zQsSy
// SIG // AVtOxfDwY1HMBcccn23tphweIdS+FNDn2vh1/2kREO0q
// SIG // mGc+fbFzNskjn72MiI56kjvNDRgWs+Q78yBvPCdPgTYT
// SIG // rto5eg33Ko2ELNR/zzEkCCuhO5Vw10qV8wIDAQABo4IB
// SIG // czCCAW8wHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFJzHO2Z/7pCgbAYlpMHTX7De
// SIG // aXcAMEUGA1UdEQQ+MDykOjA4MR4wHAYDVQQLExVNaWNy
// SIG // b3NvZnQgQ29ycG9yYXRpb24xFjAUBgNVBAUTDTIzMDAx
// SIG // Mis1MDA1MTYwHwYDVR0jBBgwFoAUSG5k5VAF04KqFzc3
// SIG // IrVtqMp1ApUwVAYDVR0fBE0wSzBJoEegRYZDaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9jcmwvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNybDBhBggr
// SIG // BgEFBQcBAQRVMFMwUQYIKwYBBQUHMAKGRWh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // Q29kU2lnUENBMjAxMV8yMDExLTA3LTA4LmNydDAMBgNV
// SIG // HRMBAf8EAjAAMA0GCSqGSIb3DQEBCwUAA4ICAQA9tb/a
// SIG // R6C3QUjZRQI5pJseF8TmQD7FccV2w8kL9fpBg3vV6YAZ
// SIG // 09ZV58eyQ6RTCgcAMiMHSJ5r4SvaRgWt9U8ni96e0drN
// SIG // C/EgATz0SRwBJODR6QV8R45uEyo3swG0qqm4LMtdGOyg
// SIG // KcvvVKymtpBprLgErJPeT1Zub3puzpk7ONr5tASVFPiT
// SIG // 0C4PGP7HY907Uny2GGQGicEwCIIu3Yc5+YWrS6Ow4c/u
// SIG // E/jKxXfui1GtlN86/e0MMw7YcfkT/f0WZ7q+Ip80kLBu
// SIG // QwlSDKQNZdjVhANygHGtLSNpeoUDWLGii9ZHn3Xxwqz8
// SIG // RK8vKJyY8hhr/WCqC7+gDjuzoSRJm0Jc/8ZLGBtjfyUj
// SIG // ifkKmKRkxLmBWFVmop+x3uo4G+NSW6Thig3RP2/ldqv4
// SIG // F1IBXtoHcE6Qg7L4fEjEaKtfwTV3K+4kwFN/FYK/N4lb
// SIG // T2JhYWTlTNFC6f5Ck1aIqyKT9igsU+DnpDnLbfIK2J4S
// SIG // dekDI5jL+aOd4YzRVzsYoJEFmM1DvusOdINBQHhWvObo
// SIG // AggepVxJNtRRQdRXSB6Y0kH/iz/1tjlfx34Qt7kz4Cm0
// SIG // bV6PN02WBLnaKMmfwFbtPLIm2dzJBjiTkSxETcCpthu6
// SIG // KnTr+EI/GdCaxoDM4+OjRSgMZC0qROaB0GD9R7T8dZT3
// SIG // w+4jUmybD+i4lB1x9TCCB3owggVioAMCAQICCmEOkNIA
// SIG // AAAAAAMwDQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290
// SIG // IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDExMB4XDTEx
// SIG // MDcwODIwNTkwOVoXDTI2MDcwODIxMDkwOVowfjELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEoMCYGA1UEAxMfTWljcm9zb2Z0
// SIG // IENvZGUgU2lnbmluZyBQQ0EgMjAxMTCCAiIwDQYJKoZI
// SIG // hvcNAQEBBQADggIPADCCAgoCggIBAKvw+nIQHC6t2G6q
// SIG // ghBNNLrytlghn0IbKmvpWlCquAY4GgRJun/DDB7dN2vG
// SIG // EtgL8DjCmQawyDnVARQxQtOJDXlkh36UYCRsr55JnOlo
// SIG // XtLfm1OyCizDr9mpK656Ca/XllnKYBoF6WZ26DJSJhIv
// SIG // 56sIUM+zRLdd2MQuA3WraPPLbfM6XKEW9Ea64DhkrG5k
// SIG // NXimoGMPLdNAk/jj3gcN1Vx5pUkp5w2+oBN3vpQ97/vj
// SIG // K1oQH01WKKJ6cuASOrdJXtjt7UORg9l7snuGG9k+sYxd
// SIG // 6IlPhBryoS9Z5JA7La4zWMW3Pv4y07MDPbGyr5I4ftKd
// SIG // gCz1TlaRITUlwzluZH9TupwPrRkjhMv0ugOGjfdf8NBS
// SIG // v4yUh7zAIXQlXxgotswnKDglmDlKNs98sZKuHCOnqWbs
// SIG // YR9q4ShJnV+I4iVd0yFLPlLEtVc/JAPw0XpbL9Uj43Bd
// SIG // D1FGd7P4AOG8rAKCX9vAFbO9G9RVS+c5oQ/pI0m8GLhE
// SIG // fEXkwcNyeuBy5yTfv0aZxe/CHFfbg43sTUkwp6uO3+xb
// SIG // n6/83bBm4sGXgXvt1u1L50kppxMopqd9Z4DmimJ4X7Iv
// SIG // hNdXnFy/dygo8e1twyiPLI9AN0/B4YVEicQJTMXUpUMv
// SIG // dJX3bvh4IFgsE11glZo+TzOE2rCIF96eTvSWsLxGoGyY
// SIG // 0uDWiIwLAgMBAAGjggHtMIIB6TAQBgkrBgEEAYI3FQEE
// SIG // AwIBADAdBgNVHQ4EFgQUSG5k5VAF04KqFzc3IrVtqMp1
// SIG // ApUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAUci06AjGQQ7kUBU7h6qfHMdEjiTQwWgYDVR0f
// SIG // BFMwUTBPoE2gS4ZJaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // MjAxMV8yMDExXzAzXzIyLmNybDBeBggrBgEFBQcBAQRS
// SIG // MFAwTgYIKwYBBQUHMAKGQmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0MjAx
// SIG // MV8yMDExXzAzXzIyLmNydDCBnwYDVR0gBIGXMIGUMIGR
// SIG // BgkrBgEEAYI3LgMwgYMwPwYIKwYBBQUHAgEWM2h0dHA6
// SIG // Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvZG9jcy9w
// SIG // cmltYXJ5Y3BzLmh0bTBABggrBgEFBQcCAjA0HjIgHQBM
// SIG // AGUAZwBhAGwAXwBwAG8AbABpAGMAeQBfAHMAdABhAHQA
// SIG // ZQBtAGUAbgB0AC4gHTANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // Z/KGpZjgVHkaLtPYdGcimwuWEeFjkplCln3SeQyQwWVf
// SIG // Liw++MNy0W2D/r4/6ArKO79HqaPzadtjvyI1pZddZYSQ
// SIG // fYtGUFXYDJJ80hpLHPM8QotS0LD9a+M+By4pm+Y9G6XU
// SIG // tR13lDni6WTJRD14eiPzE32mkHSDjfTLJgJGKsKKELuk
// SIG // qQUMm+1o+mgulaAqPyprWEljHwlpblqYluSD9MCP80Yr
// SIG // 3vw70L01724lruWvJ+3Q3fMOr5kol5hNDj0L8giJ1h/D
// SIG // Mhji8MUtzluetEk5CsYKwsatruWy2dsViFFFWDgycSca
// SIG // f7H0J/jeLDogaZiyWYlobm+nt3TDQAUGpgEqKD6CPxNN
// SIG // ZgvAs0314Y9/HG8VfUWnduVAKmWjw11SYobDHWM2l4bf
// SIG // 2vP48hahmifhzaWX0O5dY0HjWwechz4GdwbRBrF1HxS+
// SIG // YWG18NzGGwS+30HHDiju3mUv7Jf2oVyW2ADWoUa9WfOX
// SIG // pQlLSBCZgB/QACnFsZulP0V3HjXG0qKin3p6IvpIlR+r
// SIG // +0cjgPWe+L9rt0uX4ut1eBrs6jeZeRhL/9azI2h15q/6
// SIG // /IvrC4DqaTuv/DDtBEyO3991bWORPdGdVk5Pv4BXIqF4
// SIG // ETIheu9BCrE/+6jMpF3BoYibV3FWTkhFwELJm3ZbCoBI
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoLMIIaBwIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCA6RAGj0tEl8hfvT3EezTNqOQpeXIXfHD1u
// SIG // 3hj+Mkb2JTBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAA+9VhOF
// SIG // citv+4UR+6+3nnRTMut3dq3kKevLfa3FpY6cj7whWywL
// SIG // FAK/asJtuboeKRDj2Nn4a6xeFT2JJeM4WGDfWjKhBRri
// SIG // oNOb3F8lrlk5m7f2cwJhAtL4Z8bpp1uqYzceZZjO3yLg
// SIG // tWKAIlG6fxjSkO1n71fTk45nM+GsLdPCQDWsuqhA/N8T
// SIG // k8JKYIWX+Pv8nSGKjQ4jxt7NvcCyx4cB8nwMX8duk9gs
// SIG // Yt9mKsPtjGecIjL9naXYNPvvPG3MdE2pALY3ZUe4Fstk
// SIG // IAcW0RJlsUmlMhJvD78zsRXdAxznimq/Fmnwuu4xdgz8
// SIG // 8JRFzpbl0G5LnKJgYs+ja0ueqw6hgheVMIIXkQYKKwYB
// SIG // BAGCNwMDATGCF4Ewghd9BgkqhkiG9w0BBwKgghduMIIX
// SIG // agIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUAYLKoZIhvcN
// SIG // AQkQAQSgggE/BIIBOzCCATcCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgixjeQRewtqB0NZltBlm0
// SIG // jFjFBtCkICg8rcV9bOVXkhMCBmUD3nH70xgRMjAyMzA5
// SIG // MjYwOTA3NDcuN1owBIACAfSggdGkgc4wgcsxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJTAjBgNVBAsTHE1pY3Jvc29mdCBB
// SIG // bWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNVBAsTHm5TaGll
// SIG // bGQgVFNTIEVTTjpBOTM1LTAzRTAtRDk0NzElMCMGA1UE
// SIG // AxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCC
// SIG // Ee0wggcgMIIFCKADAgECAhMzAAAB0bJbQChsLtJFAAEA
// SIG // AAHRMA0GCSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwMB4XDTIzMDUyNTE5MTIxOFoXDTI0
// SIG // MDIwMTE5MTIxOFowgcsxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JTAjBgNVBAsTHE1pY3Jvc29mdCBBbWVyaWNhIE9wZXJh
// SIG // dGlvbnMxJzAlBgNVBAsTHm5TaGllbGQgVFNTIEVTTjpB
// SIG // OTM1LTAzRTAtRDk0NzElMCMGA1UEAxMcTWljcm9zb2Z0
// SIG // IFRpbWUtU3RhbXAgU2VydmljZTCCAiIwDQYJKoZIhvcN
// SIG // AQEBBQADggIPADCCAgoCggIBAJlM2jQ54bPZcV3aAuDm
// SIG // dOUGbxc6m7AkiJewxTrWvCrVkoOlrjjdGtIb+kfwbPpc
// SIG // 2cVAoacKo0K2a+gpQsCnCtP+zv97VfSU0UqaPtTtfinT
// SIG // RLS5BtbovBKf/NYdobZznhlewZj4Fh+FYOBsWkJPFHNO
// SIG // dEIbrZuRY+npkdtk+Dge3UJEIAyGE4ZNHzAjgbvDBZnB
// SIG // 0xzpS9RSWrSqX0DEB/ORhGmLa1G8Mcx2Zne/JemqEXC9
// SIG // EbxyAIf9NMKNbmrpo1t2oovcEUM/NS24I2w9cvf8TR1H
// SIG // ZsMyprRo0f6Ih+EYLj+9zC6144wI9QgNVKoMI18ho8MT
// SIG // BhyLV932C7XNXD4cSENkzsRrefEhSvO35F+nlOgwyPhA
// SIG // CYnpRp2b5M9sNujyQUgrvRKGZbzCfx8mT1F5BASlO0g3
// SIG // jd5G/1CZfLdR53zSiw4ET5aR0y9IIWH6qAKwp3NDFAkb
// SIG // rZxN6hTZ6o2EfeimlebJ9VTBux59DMw+1uKcJl3QVSWa
// SIG // Uz90f7g6eKpDJoe+u1jLfCohp9jfN4UhOVUCg/2r28Xh
// SIG // bsodH+4XSa9OkAvk1pMM3WmVBLQx2MySDNkrmC3Co57/
// SIG // etOWoHPHBrthine6s/nJaRPMhIaeE1Yhk7E7JAg7Fl9u
// SIG // IhsAdubczyGPvcpBZwJHklq+CTBSadwUcRJpB/gOuqz7
// SIG // /UvVAgMBAAGjggFJMIIBRTAdBgNVHQ4EFgQUC47xTMXs
// SIG // NwfSaawXhdDHEdC9LaMwHwYDVR0jBBgwFoAUn6cVXQBe
// SIG // Yl2D9OXSZacbUzUZ6XIwXwYDVR0fBFgwVjBUoFKgUIZO
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9j
// SIG // cmwvTWljcm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUy
// SIG // MDIwMTAoMSkuY3JsMGwGCCsGAQUFBwEBBGAwXjBcBggr
// SIG // BgEFBQcwAoZQaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
// SIG // L3BraW9wcy9jZXJ0cy9NaWNyb3NvZnQlMjBUaW1lLVN0
// SIG // YW1wJTIwUENBJTIwMjAxMCgxKS5jcnQwDAYDVR0TAQH/
// SIG // BAIwADAWBgNVHSUBAf8EDDAKBggrBgEFBQcDCDAOBgNV
// SIG // HQ8BAf8EBAMCB4AwDQYJKoZIhvcNAQELBQADggIBAJu7
// SIG // 2tMAdXbiZjSqgbl4ScibPlqQZdO+IHAqnZjnWzbrDygO
// SIG // taiv6bTRHj/cFwOZiVQrw2vH9q5gViJ1l11xSPDjZDFJ
// SIG // K2a/+pacJCL/Y6cffYpUdD6Qw5k8AFBMbVeRydg9Q44Q
// SIG // Sivp//cmzW6PjCMfMThXhq6ZhcECyvgvkpHy8p6zm0XG
// SIG // EyRY0P87tb9FodjAkyMyTFWiwGiTtXbWwkCXFJwRfF8l
// SIG // r7+qSpSvsJmDDdHiMIdGQ+pCExaJtc8xhqv+IXRm4sH0
// SIG // 7z0Mwk2GMr0FJ/qKqBmgy7MhW34QGhPOm//2njBDrGgE
// SIG // Kzb2aSP8QhYV1z7lrfSS4JA5IQ6PTv5Yjb0DiTpAhEHn
// SIG // D54yZnQl5zSxLJ5AHkqPETnWJgyG2UytQpyvTqcGoKxI
// SIG // o9ixIAhMDOCywkP5n9xNLsK7fl8mtaEz01hfbi4DFgsB
// SIG // bSKk21am0h5XpqS5kR4RXoE20zdVOT6YCVXn94L/RjXt
// SIG // pVKMrn+DIOgs2auBXC/lMBoGar/CBFEUeZb1QnfO/wua
// SIG // TqYigDJOmoFu5SMwvKu1qO5KwD+bYOcow7RCLPW/4VJV
// SIG // uozfwn89OWEJNRsU7HSQtPtj/v5nKuKVULPIBh8UiKcM
// SIG // iNaUzzm0N5Txl8kKMUrCrcOxHFXgljXzHDDxNOah3eWS
// SIG // v02oZDngubI9Vz7mJs2uMIIHcTCCBVmgAwIBAgITMwAA
// SIG // ABXF52ueAptJmQAAAAAAFTANBgkqhkiG9w0BAQsFADCB
// SIG // iDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0
// SIG // b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1p
// SIG // Y3Jvc29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWlj
// SIG // cm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
// SIG // IDIwMTAwHhcNMjEwOTMwMTgyMjI1WhcNMzAwOTMwMTgz
// SIG // MjI1WjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDCC
// SIG // AiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAOTh
// SIG // pkzntHIhC3miy9ckeb0O1YLT/e6cBwfSqWxOdcjKNVf2
// SIG // AX9sSuDivbk+F2Az/1xPx2b3lVNxWuJ+Slr+uDZnhUYj
// SIG // DLWNE893MsAQGOhgfWpSg0S3po5GawcU88V29YZQ3MFE
// SIG // yHFcUTE3oAo4bo3t1w/YJlN8OWECesSq/XJprx2rrPY2
// SIG // vjUmZNqYO7oaezOtgFt+jBAcnVL+tuhiJdxqD89d9P6O
// SIG // U8/W7IVWTe/dvI2k45GPsjksUZzpcGkNyjYtcI4xyDUo
// SIG // veO0hyTD4MmPfrVUj9z6BVWYbWg7mka97aSueik3rMvr
// SIG // g0XnRm7KMtXAhjBcTyziYrLNueKNiOSWrAFKu75xqRdb
// SIG // Z2De+JKRHh09/SDPc31BmkZ1zcRfNN0Sidb9pSB9fvzZ
// SIG // nkXftnIv231fgLrbqn427DZM9ituqBJR6L8FA6PRc6ZN
// SIG // N3SUHDSCD/AQ8rdHGO2n6Jl8P0zbr17C89XYcz1DTsEz
// SIG // OUyOArxCaC4Q6oRRRuLRvWoYWmEBc8pnol7XKHYC4jMY
// SIG // ctenIPDC+hIK12NvDMk2ZItboKaDIV1fMHSRlJTYuVD5
// SIG // C4lh8zYGNRiER9vcG9H9stQcxWv2XFJRXRLbJbqvUAV6
// SIG // bMURHXLvjflSxIUXk8A8FdsaN8cIFRg/eKtFtvUeh17a
// SIG // j54WcmnGrnu3tz5q4i6tAgMBAAGjggHdMIIB2TASBgkr
// SIG // BgEEAYI3FQEEBQIDAQABMCMGCSsGAQQBgjcVAgQWBBQq
// SIG // p1L+ZMSavoKRPEY1Kc8Q/y8E7jAdBgNVHQ4EFgQUn6cV
// SIG // XQBeYl2D9OXSZacbUzUZ6XIwXAYDVR0gBFUwUzBRBgwr
// SIG // BgEEAYI3TIN9AQEwQTA/BggrBgEFBQcCARYzaHR0cDov
// SIG // L3d3dy5taWNyb3NvZnQuY29tL3BraW9wcy9Eb2NzL1Jl
// SIG // cG9zaXRvcnkuaHRtMBMGA1UdJQQMMAoGCCsGAQUFBwMI
// SIG // MBkGCSsGAQQBgjcUAgQMHgoAUwB1AGIAQwBBMAsGA1Ud
// SIG // DwQEAwIBhjAPBgNVHRMBAf8EBTADAQH/MB8GA1UdIwQY
// SIG // MBaAFNX2VsuP6KJcYmjRPZSQW9fOmhjEMFYGA1UdHwRP
// SIG // ME0wS6BJoEeGRWh0dHA6Ly9jcmwubWljcm9zb2Z0LmNv
// SIG // bS9wa2kvY3JsL3Byb2R1Y3RzL01pY1Jvb0NlckF1dF8y
// SIG // MDEwLTA2LTIzLmNybDBaBggrBgEFBQcBAQROMEwwSgYI
// SIG // KwYBBQUHMAKGPmh0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2kvY2VydHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYt
// SIG // MjMuY3J0MA0GCSqGSIb3DQEBCwUAA4ICAQCdVX38Kq3h
// SIG // LB9nATEkW+Geckv8qW/qXBS2Pk5HZHixBpOXPTEztTnX
// SIG // wnE2P9pkbHzQdTltuw8x5MKP+2zRoZQYIu7pZmc6U03d
// SIG // mLq2HnjYNi6cqYJWAAOwBb6J6Gngugnue99qb74py27Y
// SIG // P0h1AdkY3m2CDPVtI1TkeFN1JFe53Z/zjj3G82jfZfak
// SIG // Vqr3lbYoVSfQJL1AoL8ZthISEV09J+BAljis9/kpicO8
// SIG // F7BUhUKz/AyeixmJ5/ALaoHCgRlCGVJ1ijbCHcNhcy4s
// SIG // a3tuPywJeBTpkbKpW99Jo3QMvOyRgNI95ko+ZjtPu4b6
// SIG // MhrZlvSP9pEB9s7GdP32THJvEKt1MMU0sHrYUP4KWN1A
// SIG // PMdUbZ1jdEgssU5HLcEUBHG/ZPkkvnNtyo4JvbMBV0lU
// SIG // ZNlz138eW0QBjloZkWsNn6Qo3GcZKCS6OEuabvshVGtq
// SIG // RRFHqfG3rsjoiV5PndLQTHa1V1QJsWkBRH58oWFsc/4K
// SIG // u+xBZj1p/cvBQUl+fpO+y/g75LcVv7TOPqUxUYS8vwLB
// SIG // gqJ7Fx0ViY1w/ue10CgaiQuPNtq6TPmb/wrpNPgkNWcr
// SIG // 4A245oyZ1uEi6vAnQj0llOZ0dFtq0Z4+7X6gMTN9vMvp
// SIG // e784cETRkPHIqzqKOghif9lwY1NNje6CbaUFEMFxBmoQ
// SIG // tB1VM1izoXBm8qGCA1AwggI4AgEBMIH5oYHRpIHOMIHL
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNy
// SIG // b3NvZnQgQW1lcmljYSBPcGVyYXRpb25zMScwJQYDVQQL
// SIG // Ex5uU2hpZWxkIFRTUyBFU046QTkzNS0wM0UwLUQ5NDcx
// SIG // JTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNl
// SIG // cnZpY2WiIwoBATAHBgUrDgMCGgMVAEcljYW/4aEtC1EN
// SIG // Ha8jMFpK//ssoIGDMIGApH4wfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTAwDQYJKoZIhvcNAQELBQACBQDovNyf
// SIG // MCIYDzIwMjMwOTI2MDQyOTE5WhgPMjAyMzA5MjcwNDI5
// SIG // MTlaMHcwPQYKKwYBBAGEWQoEATEvMC0wCgIFAOi83J8C
// SIG // AQAwCgIBAAICC6UCAf8wBwIBAAICE7wwCgIFAOi+Lh8C
// SIG // AQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoD
// SIG // AqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkqhkiG
// SIG // 9w0BAQsFAAOCAQEAe0moUu+aktMm6GzYMkEVHmFjM/Ul
// SIG // oGqFjv8IdUyiJFxqwrNZJh3Nhv7xeJlGG4X8Y1aoI1Vw
// SIG // 2odCLxXfpA4vsxGltvwpIfkGZ8zJYxcUiLGypZkj05YO
// SIG // 0Om8yD3fvEcz+ZvyjdEMAV81/w8IZ6kdpYC4Xw2z9b1z
// SIG // i/b/WmnPDnn901r+Mabu0/UlELqVSmhvzLBVGzaPPsgJ
// SIG // gJVRIrKG6VF3GMN7M1Sd+sBXFBfDwNXEGWU2ozXKHbEk
// SIG // qMkyMm3y6yu+XsRrwFZh6GNeAcaxke2csOnPCnVSHU1M
// SIG // mkx9SlnIhc6viI8ajQBQPLV5Rgc80Cp16PpuW3WEW+1F
// SIG // xSm12TGCBA0wggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVT
// SIG // MRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdS
// SIG // ZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9y
// SIG // YXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFBDQSAyMDEwAhMzAAAB0bJbQChsLtJFAAEAAAHR
// SIG // MA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMx
// SIG // DQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEILSH
// SIG // oBybbvKKNbwe/zlSHY4ZuIonUtREXTQxNTHgqTr6MIH6
// SIG // BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQgzLxheQIA
// SIG // u/ntzmxGGs9O5vWrhPAnqhUDfqTwiIj8BwwwgZgwgYCk
// SIG // fjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAA
// SIG // AdGyW0AobC7SRQABAAAB0TAiBCAAEoBeMjqADngyGUZO
// SIG // uxShHs8eByKu1dF457Cl4YIgszANBgkqhkiG9w0BAQsF
// SIG // AASCAgAnBK3bgCfBuHKEVsghnq5+c8PbfXXHFhqZeoms
// SIG // GTW3IvdH6feJPpZa3BMKPB9ABVPng3oWa0jIdr2n2YIj
// SIG // EZ2T8w4YvVUDzmc4Q5MqsWA0RcBmuYopT/du68dIMAok
// SIG // wHZyAcIEz02emZuqlkbKjLxLIsXlkgvbJFrn3tG08D1T
// SIG // cH8mgOCTw9yXCnvmNJ3kGYv9uyma1M1LUnCHrHUZYl9X
// SIG // EnfMoGsKJOSBvrzPLiyI3Lofx3gSFay4sp9dSHb8qMbM
// SIG // m6gLoVijGK8sB9UFvzVO1JtWx+SsmotKH2STBEvKVxdH
// SIG // l6iYgXAnW25SQT2FtlKW9mKNgaZ5pyzOEl3/pEbIlF5r
// SIG // N0c5UDYGF4P0X8qQScqrvWN65RkRzMsG7Bt9qZGh0Gdu
// SIG // JbWrkTCxUvHWsfvPgC4HdZH8qW8eltegywoj+Ei8NJuY
// SIG // NRngx6VgHA0W/a9y0BTZSGHeStg3Q3LGrk3AwtWyvQfF
// SIG // LCIP3H7L8ZV0fGH+wHw1+0oYH7PIzuHIPrzDOjthSAOt
// SIG // vMJm6lE4B0P0IG8Nr4NgO2gYG6jq39IsgTNjmUA4ZTN/
// SIG // 6Ag1JcEK8HrjnZKUpvNtQltquK74u1tIGrY++TKPHO6a
// SIG // DBOLbj8nUrADQea+MOQQDI9NEvciiJYRn5MHS9aMpmz2
// SIG // OAl5XKGu/vwZEkfdBACKWucCGT845w==
// SIG // End signature block
