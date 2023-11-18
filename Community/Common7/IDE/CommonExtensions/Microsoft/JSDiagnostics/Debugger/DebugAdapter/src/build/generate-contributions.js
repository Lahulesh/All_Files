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

// src/build/generate-contributions.ts
var generate_contributions_exports = {};
__export(generate_contributions_exports, {
  debuggers: () => debuggers
});
module.exports = __toCommonJS(generate_contributions_exports);

// src/common/contributionUtils.ts
var preferredDebugTypes = /* @__PURE__ */ new Map([
  ["pwa-node" /* Node */, "node"],
  ["pwa-chrome" /* Chrome */, "chrome"],
  ["pwa-extensionHost" /* ExtensionHost */, "extensionHost"],
  ["pwa-msedge" /* Edge */, "msedge"]
]);
var debugTypes = {
  ["pwa-extensionHost" /* ExtensionHost */]: null,
  ["node-terminal" /* Terminal */]: null,
  ["pwa-node" /* Node */]: null,
  ["pwa-chrome" /* Chrome */]: null,
  ["pwa-msedge" /* Edge */]: null
};
var commandsObj = {
  ["extension.js-debug.addCustomBreakpoints" /* AddCustomBreakpoints */]: null,
  ["extension.pwa-node-debug.attachNodeProcess" /* AttachProcess */]: null,
  ["extension.js-debug.clearAutoAttachVariables" /* AutoAttachClearVariables */]: null,
  ["extension.js-debug.setAutoAttachVariables" /* AutoAttachSetVariables */]: null,
  ["extension.js-debug.autoAttachToProcess" /* AutoAttachToProcess */]: null,
  ["extension.js-debug.createDebuggerTerminal" /* CreateDebuggerTerminal */]: null,
  ["extension.js-debug.createDiagnostics" /* CreateDiagnostics */]: null,
  ["extension.js-debug.getDiagnosticLogs" /* GetDiagnosticLogs */]: null,
  ["extension.js-debug.debugLink" /* DebugLink */]: null,
  ["extension.js-debug.npmScript" /* DebugNpmScript */]: null,
  ["extension.js-debug.pickNodeProcess" /* PickProcess */]: null,
  ["extension.js-debug.prettyPrint" /* PrettyPrint */]: null,
  ["extension.js-debug.removeAllCustomBreakpoints" /* RemoveAllCustomBreakpoints */]: null,
  ["extension.js-debug.removeCustomBreakpoint" /* RemoveCustomBreakpoint */]: null,
  ["extension.js-debug.revealPage" /* RevealPage */]: null,
  ["extension.js-debug.startProfile" /* StartProfile */]: null,
  ["extension.js-debug.stopProfile" /* StopProfile */]: null,
  ["extension.js-debug.toggleSkippingFile" /* ToggleSkipping */]: null,
  ["extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */]: null,
  ["extension.js-debug.requestCDPProxy" /* RequestCDPProxy */]: null,
  ["extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */]: null,
  ["extension.js-debug.callers.add" /* CallersAdd */]: null,
  ["extension.js-debug.callers.goToCaller" /* CallersGoToCaller */]: null,
  ["extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */]: null,
  ["extension.js-debug.callers.remove" /* CallersRemove */]: null,
  ["extension.js-debug.callers.removeAll" /* CallersRemoveAll */]: null,
  ["extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */]: null,
  ["extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */]: null
};
var allCommands = new Set(Object.keys(commandsObj));
var allDebugTypes = new Set(Object.keys(debugTypes));

// src/common/knownTools.ts
var knownTools = /* @__PURE__ */ new Set([
  //#region test runners
  "mocha",
  "jest",
  "jest-cli",
  "ava",
  "tape",
  "tap",
  //#endregion,
  //#region transpilers
  "ts-node",
  "babel-node"
  //#endregion,
]);
var knownToolToken = "$KNOWN_TOOLS$";
var knownToolGlob = `{${[...knownTools].join(",")}}`;

// src/common/objUtils.ts
function mapValues(obj, generator) {
  const next = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    next[key] = generator(value, key);
  }
  return next;
}
function sortKeys(obj, sortFn) {
  if (!obj || typeof obj !== "object" || obj instanceof Array) {
    return obj;
  }
  const next = {};
  for (const key of Object.keys(obj).sort(sortFn)) {
    next[key] = obj[key];
  }
  return next;
}
function walkObject(obj, visitor) {
  obj = visitor(obj);
  if (obj) {
    if (obj instanceof Array) {
      obj = obj.map((v) => walkObject(v, visitor));
    } else if (typeof obj === "object" && obj) {
      for (const key of Object.keys(obj)) {
        obj[key] = walkObject(obj[key], visitor);
      }
    }
  }
  return obj;
}
var unset = Symbol("unset");
var maxInt32 = 2 ** 31 - 1;

// src/configuration.ts
var AnyLaunchConfiguration = Symbol("AnyLaunchConfiguration");
var baseDefaults = {
  type: "",
  name: "",
  request: "",
  trace: false,
  outputCapture: "console" /* Console */,
  timeout: 1e4,
  timeouts: {},
  showAsyncStacks: true,
  skipFiles: [],
  smartStep: true,
  sourceMaps: true,
  sourceMapRenames: true,
  pauseForSourceMap: true,
  resolveSourceMapLocations: null,
  rootPath: "${workspaceFolder}",
  outFiles: ["${workspaceFolder}/**/*.js", "!**/node_modules/**"],
  sourceMapPathOverrides: defaultSourceMapPathOverrides("${workspaceFolder}"),
  enableContentValidation: true,
  cascadeTerminateToConfigurations: [],
  // Should always be determined upstream;
  __workspaceFolder: "",
  __remoteFilePrefix: void 0,
  __breakOnConditionalError: false,
  customDescriptionGenerator: void 0,
  customPropertiesGenerator: void 0
};
var nodeBaseDefaults = {
  ...baseDefaults,
  cwd: "${workspaceFolder}",
  env: {},
  envFile: null,
  pauseForSourceMap: false,
  sourceMaps: true,
  localRoot: null,
  remoteRoot: null,
  resolveSourceMapLocations: ["**", "!**/node_modules/**"],
  autoAttachChildProcesses: true,
  runtimeSourcemapPausePatterns: [],
  skipFiles: ["<node_internals>/**"]
};
var terminalBaseDefaults = {
  ...nodeBaseDefaults,
  showAsyncStacks: { onceBreakpointResolved: 16 },
  type: "node-terminal" /* Terminal */,
  request: "launch",
  name: "JavaScript Debug Terminal"
};
var delegateDefaults = {
  ...nodeBaseDefaults,
  type: "node-terminal" /* Terminal */,
  request: "attach",
  name: terminalBaseDefaults.name,
  showAsyncStacks: { onceBreakpointResolved: 16 },
  delegateId: -1
};
var extensionHostConfigDefaults = {
  ...nodeBaseDefaults,
  type: "pwa-extensionHost" /* ExtensionHost */,
  name: "Debug Extension",
  request: "launch",
  args: ["--extensionDevelopmentPath=${workspaceFolder}"],
  outFiles: ["${workspaceFolder}/out/**/*.js"],
  resolveSourceMapLocations: ["${workspaceFolder}/**", "!**/node_modules/**"],
  rendererDebugOptions: {},
  runtimeExecutable: "${execPath}",
  autoAttachChildProcesses: false,
  debugWebviews: false,
  debugWebWorkerHost: false,
  __sessionId: ""
};
var nodeLaunchConfigDefaults = {
  ...nodeBaseDefaults,
  type: "pwa-node" /* Node */,
  request: "launch",
  program: "",
  cwd: "${workspaceFolder}",
  stopOnEntry: false,
  console: "internalConsole",
  restart: false,
  args: [],
  runtimeExecutable: "node",
  runtimeVersion: "default",
  runtimeArgs: [],
  profileStartup: false,
  attachSimplePort: null,
  killBehavior: "forceful" /* Forceful */
};
var chromeAttachConfigDefaults = {
  ...baseDefaults,
  type: "pwa-chrome" /* Chrome */,
  request: "attach",
  address: "localhost",
  port: 0,
  disableNetworkCache: true,
  pathMapping: {},
  url: null,
  restart: false,
  urlFilter: "",
  sourceMapPathOverrides: defaultSourceMapPathOverrides("${webRoot}"),
  webRoot: "${workspaceFolder}",
  server: null,
  browserAttachLocation: "workspace",
  targetSelection: "automatic",
  vueComponentPaths: ["${workspaceFolder}/**/*.vue", "!**/node_modules/**"],
  perScriptSourcemaps: "auto"
};
var edgeAttachConfigDefaults = {
  ...chromeAttachConfigDefaults,
  type: "pwa-msedge" /* Edge */,
  useWebView: false
};
var chromeLaunchConfigDefaults = {
  ...chromeAttachConfigDefaults,
  type: "pwa-chrome" /* Chrome */,
  request: "launch",
  cwd: null,
  file: null,
  env: {},
  urlFilter: "*",
  includeDefaultArgs: true,
  includeLaunchArgs: true,
  runtimeArgs: null,
  runtimeExecutable: "*",
  userDataDir: true,
  browserLaunchLocation: "workspace",
  profileStartup: false,
  cleanUp: "wholeBrowser"
};
var edgeLaunchConfigDefaults = {
  ...chromeLaunchConfigDefaults,
  type: "pwa-msedge" /* Edge */,
  useWebView: false
};
var nodeAttachConfigDefaults = {
  ...nodeBaseDefaults,
  type: "pwa-node" /* Node */,
  attachExistingChildren: true,
  address: "localhost",
  port: 9229,
  restart: false,
  request: "attach",
  continueOnAttach: false
};
function defaultSourceMapPathOverrides(webRoot) {
  return {
    "webpack:///./~/*": `${webRoot}/node_modules/*`,
    "webpack:////*": "/*",
    "webpack://@?:*/?:*/*": `${webRoot}/*`,
    "webpack://?:*/*": `${webRoot}/*`,
    "webpack:///([a-z]):/(.+)": "$1:/$2",
    "meteor://\u{1F4BB}app/*": `${webRoot}/*`
  };
}
var breakpointLanguages = [
  "javascript",
  "typescript",
  "typescriptreact",
  "javascriptreact",
  "fsharp",
  "html"
];
var packageName = true ? "js-debug" : "js-debug";
var packagePublisher = true ? "ms-vscode" : "vscode-samples";
var isNightly = packageName.includes("nightly");
var extensionId = `${packagePublisher}.${packageName}`;

// src/build/generate-contributions.ts
var appInsightsKey = "0c6ae279ed8443289764825290e4f9e2-1a736e7c-1324-4338-be46-fc2a58ae4d14-7255";
var forSomeContextKeys = (types, contextKey, andExpr) => [...types].map((d) => `${contextKey} == ${d}` + (andExpr ? ` && ${andExpr}` : "")).join(" || ");
var forAnyDebugType = (contextKey, andExpr) => forSomeContextKeys(allDebugTypes, contextKey, andExpr);
var forBrowserDebugType = (contextKey, andExpr) => forSomeContextKeys(["pwa-chrome" /* Chrome */, "pwa-msedge" /* Edge */], contextKey, andExpr);
var forNodeDebugType = (contextKey, andExpr) => forSomeContextKeys(["pwa-node" /* Node */, "pwa-extensionHost" /* ExtensionHost */, "node"], contextKey, andExpr);
var refString = (str) => `%${str}%`;
var commonLanguages = ["javascript", "typescript", "javascriptreact", "typescriptreact"];
var browserLanguages = [...commonLanguages, "html", "css", "coffeescript", "handlebars", "vue"];
var baseConfigurationAttributes = {
  resolveSourceMapLocations: {
    type: ["array", "null"],
    description: refString("node.resolveSourceMapLocations.description"),
    default: null,
    items: {
      type: "string"
    }
  },
  outFiles: {
    type: ["array"],
    description: refString("outFiles.description"),
    default: [...baseDefaults.outFiles],
    items: {
      type: "string"
    }
  },
  pauseForSourceMap: {
    type: "boolean",
    markdownDescription: refString("node.pauseForSourceMap.description"),
    default: false
  },
  showAsyncStacks: {
    description: refString("node.showAsyncStacks.description"),
    default: true,
    oneOf: [
      {
        type: "boolean"
      },
      {
        type: "object",
        required: ["onAttach"],
        properties: {
          onAttach: {
            type: "number",
            default: 32
          }
        }
      },
      {
        type: "object",
        required: ["onceBreakpointResolved"],
        properties: {
          onceBreakpointResolved: {
            type: "number",
            default: 32
          }
        }
      }
    ]
  },
  skipFiles: {
    type: "array",
    description: refString("browser.skipFiles.description"),
    default: ["<node_internals>/**"]
  },
  smartStep: {
    type: "boolean",
    description: refString("smartStep.description"),
    default: true
  },
  sourceMaps: {
    type: "boolean",
    description: refString("browser.sourceMaps.description"),
    default: true
  },
  sourceMapRenames: {
    type: "boolean",
    default: true,
    description: refString("browser.sourceMapRenames.description")
  },
  sourceMapPathOverrides: {
    type: "object",
    description: refString("node.sourceMapPathOverrides.description"),
    default: {
      "webpack://?:*/*": "${workspaceFolder}/*",
      "webpack:///./~/*": "${workspaceFolder}/node_modules/*",
      "meteor://\u{1F4BB}app/*": "${workspaceFolder}/*"
    }
  },
  timeout: {
    type: "number",
    description: refString("node.timeout.description"),
    default: 1e4
  },
  timeouts: {
    type: "object",
    description: refString("timeouts.generalDescription"),
    default: {},
    properties: {
      sourceMapMinPause: {
        type: "number",
        description: refString("timeouts.sourceMaps.sourceMapMinPause.description"),
        default: 1e3
      },
      sourceMapCumulativePause: {
        type: "number",
        description: refString("timeouts.sourceMaps.sourceMapCumulativePause.description"),
        default: 1e3
      },
      hoverEvaluation: {
        type: "number",
        description: refString("timeouts.hoverEvaluation.description"),
        default: 500
      }
    },
    additionalProperties: false,
    markdownDescription: refString("timeouts.generalDescription.markdown")
  },
  trace: {
    description: refString("trace.description"),
    default: true,
    oneOf: [
      {
        type: "boolean",
        description: refString("trace.boolean.description")
      },
      {
        type: "object",
        additionalProperties: false,
        properties: {
          stdio: {
            type: "boolean",
            description: refString("trace.stdio.description")
          },
          logFile: {
            type: ["string", "null"],
            description: refString("trace.logFile.description")
          }
        }
      }
    ]
  },
  outputCapture: {
    enum: ["console" /* Console */, "std" /* Stdio */],
    markdownDescription: refString("node.launch.outputCapture.description"),
    default: "console" /* Console */
  },
  enableContentValidation: {
    default: true,
    type: "boolean",
    description: refString("enableContentValidation.description")
  },
  customDescriptionGenerator: {
    type: "string",
    default: void 0,
    description: refString("customDescriptionGenerator.description")
  },
  customPropertiesGenerator: {
    type: "string",
    default: void 0,
    deprecated: true,
    description: refString("customPropertiesGenerator.description")
  },
  cascadeTerminateToConfigurations: {
    type: "array",
    items: {
      type: "string",
      uniqueItems: true
    },
    default: [],
    description: refString("base.cascadeTerminateToConfigurations.label")
  }
};
var nodeBaseConfigurationAttributes = {
  ...baseConfigurationAttributes,
  resolveSourceMapLocations: {
    ...baseConfigurationAttributes.resolveSourceMapLocations,
    default: ["${workspaceFolder}/**", "!**/node_modules/**"]
  },
  cwd: {
    type: "string",
    description: refString("node.launch.cwd.description"),
    default: "${workspaceFolder}",
    docDefault: "localRoot || ${workspaceFolder}"
  },
  localRoot: {
    type: ["string", "null"],
    description: refString("node.localRoot.description"),
    default: null
  },
  remoteRoot: {
    type: ["string", "null"],
    description: refString("node.remoteRoot.description"),
    default: null
  },
  autoAttachChildProcesses: {
    type: "boolean",
    description: refString("node.launch.autoAttachChildProcesses.description"),
    default: true
  },
  env: {
    type: "object",
    additionalProperties: {
      type: ["string", "null"]
    },
    markdownDescription: refString("node.launch.env.description"),
    default: {}
  },
  envFile: {
    type: "string",
    description: refString("node.launch.envFile.description"),
    default: "${workspaceFolder}/.env"
  },
  runtimeSourcemapPausePatterns: {
    type: "array",
    items: {
      type: "string"
    },
    markdownDescription: refString("node.launch.runtimeSourcemapPausePatterns"),
    default: []
  },
  nodeVersionHint: {
    type: "number",
    minimum: 8,
    description: refString("node.versionHint.description"),
    default: 12
  }
};
var nodeAttachConfig = {
  type: "pwa-node" /* Node */,
  request: "attach",
  label: refString("node.label"),
  languages: commonLanguages,
  variables: {
    PickProcess: "extension.js-debug.pickNodeProcess" /* PickProcess */
  },
  configurationSnippets: [
    {
      label: refString("node.snippet.attach.label"),
      description: refString("node.snippet.attach.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "attach",
        name: "${1:Attach}",
        port: 9229,
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.remoteattach.label"),
      description: refString("node.snippet.remoteattach.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "attach",
        name: "${1:Attach to Remote}",
        address: "${2:TCP/IP address of process to be debugged}",
        port: 9229,
        localRoot: '^"\\${workspaceFolder}"',
        remoteRoot: "${3:Absolute path to the remote directory containing the program}",
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.attachProcess.label"),
      description: refString("node.snippet.attachProcess.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "attach",
        name: "${1:Attach by Process ID}",
        processId: '^"\\${command:PickProcess}"',
        skipFiles: ["<node_internals>/**"]
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    address: {
      type: "string",
      description: refString("node.address.description"),
      default: "localhost"
    },
    port: {
      type: "number",
      description: refString("node.port.description"),
      default: 9229
    },
    websocketAddress: {
      type: "string",
      description: refString("node.websocket.address.description"),
      default: void 0
    },
    remoteHostHeader: {
      type: "string",
      description: refString("node.remote.host.header.description"),
      default: void 0
    },
    restart: {
      description: refString("node.attach.restart.description"),
      default: true,
      oneOf: [
        {
          type: "boolean"
        },
        {
          type: "object",
          properties: {
            delay: { type: "number", minimum: 0, default: 1e3 },
            maxAttempts: { type: "number", minimum: 0, default: 10 }
          }
        }
      ]
    },
    processId: {
      type: "string",
      description: refString("node.attach.processId.description"),
      default: "${command:PickProcess}"
    },
    attachExistingChildren: {
      type: "boolean",
      description: refString("node.attach.attachExistingChildren.description"),
      default: false
    },
    continueOnAttach: {
      type: "boolean",
      markdownDescription: refString("node.attach.continueOnAttach"),
      default: true
    }
  },
  defaults: nodeAttachConfigDefaults
};
var nodeLaunchConfig = {
  type: "pwa-node" /* Node */,
  request: "launch",
  label: refString("node.label"),
  languages: commonLanguages,
  variables: {
    PickProcess: "extension.js-debug.pickNodeProcess" /* PickProcess */
  },
  configurationSnippets: [
    {
      label: refString("node.snippet.launch.label"),
      description: refString("node.snippet.launch.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "${2:Launch Program}",
        program: '^"\\${workspaceFolder}/${1:app.js}"',
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.npm.label"),
      markdownDescription: refString("node.snippet.npm.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "${1:Launch via NPM}",
        runtimeExecutable: "npm",
        runtimeArgs: ["run-script", "debug"],
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.nodemon.label"),
      description: refString("node.snippet.nodemon.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "nodemon",
        runtimeExecutable: "nodemon",
        program: '^"\\${workspaceFolder}/${1:app.js}"',
        restart: true,
        console: "integratedTerminal",
        internalConsoleOptions: "neverOpen",
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.mocha.label"),
      description: refString("node.snippet.mocha.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Mocha Tests",
        program: '^"\\${workspaceFolder}/node_modules/mocha/bin/_mocha"',
        args: ["-u", "tdd", "--timeout", "999999", "--colors", '^"\\${workspaceFolder}/${1:test}"'],
        internalConsoleOptions: "openOnSessionStart",
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.yo.label"),
      markdownDescription: refString("node.snippet.yo.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Yeoman ${1:generator}",
        program: '^"\\${workspaceFolder}/node_modules/yo/lib/cli.js"',
        args: ["${1:generator}"],
        console: "integratedTerminal",
        internalConsoleOptions: "neverOpen",
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.gulp.label"),
      description: refString("node.snippet.gulp.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Gulp ${1:task}",
        program: '^"\\${workspaceFolder}/node_modules/gulp/bin/gulp.js"',
        args: ["${1:task}"],
        skipFiles: ["<node_internals>/**"]
      }
    },
    {
      label: refString("node.snippet.electron.label"),
      description: refString("node.snippet.electron.description"),
      body: {
        type: "pwa-node" /* Node */,
        request: "launch",
        name: "Electron Main",
        runtimeExecutable: '^"\\${workspaceFolder}/node_modules/.bin/electron"',
        program: '^"\\${workspaceFolder}/main.js"',
        skipFiles: ["<node_internals>/**"]
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    cwd: {
      type: "string",
      description: refString("node.launch.cwd.description"),
      default: "${workspaceFolder}"
    },
    program: {
      type: "string",
      description: refString("node.launch.program.description"),
      default: ""
    },
    stopOnEntry: {
      type: ["boolean", "string"],
      description: refString("node.stopOnEntry.description"),
      default: true
    },
    console: {
      type: "string",
      enum: ["internalConsole", "integratedTerminal", "externalTerminal"],
      enumDescriptions: [
        refString("node.launch.console.internalConsole.description"),
        refString("node.launch.console.integratedTerminal.description"),
        refString("node.launch.console.externalTerminal.description")
      ],
      description: refString("node.launch.console.description"),
      default: "internalConsole"
    },
    args: {
      type: ["array", "string"],
      description: refString("node.launch.args.description"),
      items: {
        type: "string"
      },
      default: []
    },
    restart: {
      description: refString("node.launch.restart.description"),
      ...nodeAttachConfig.configurationAttributes.restart
    },
    runtimeExecutable: {
      type: ["string", "null"],
      markdownDescription: refString("node.launch.runtimeExecutable.description"),
      default: "node"
    },
    runtimeVersion: {
      type: "string",
      markdownDescription: refString("node.launch.runtimeVersion.description"),
      default: "default"
    },
    runtimeArgs: {
      type: "array",
      description: refString("node.launch.runtimeArgs.description"),
      items: {
        type: "string"
      },
      default: []
    },
    profileStartup: {
      type: "boolean",
      description: refString("node.profileStartup.description"),
      default: true
    },
    attachSimplePort: {
      type: "integer",
      description: refString("node.attachSimplePort.description"),
      default: 9229
    },
    killBehavior: {
      type: "string",
      enum: ["forceful" /* Forceful */, "polite" /* Polite */, "none" /* None */],
      default: "forceful" /* Forceful */,
      markdownDescription: refString("node.killBehavior.description")
    }
  },
  defaults: nodeLaunchConfigDefaults
};
var nodeTerminalConfiguration = {
  type: "node-terminal" /* Terminal */,
  request: "launch",
  label: refString("debug.terminal.label"),
  languages: [],
  configurationSnippets: [
    {
      label: refString("debug.terminal.snippet.label"),
      description: refString("debug.terminal.snippet.label"),
      body: {
        type: "node-terminal" /* Terminal */,
        request: "launch",
        name: "Run npm start",
        command: "npm start"
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    command: {
      type: ["string", "null"],
      description: refString("debug.terminal.program.description"),
      default: "npm start"
    }
  },
  defaults: terminalBaseDefaults
};
var chromiumBaseConfigurationAttributes = {
  ...baseConfigurationAttributes,
  disableNetworkCache: {
    type: "boolean",
    description: refString("browser.disableNetworkCache.description"),
    default: true
  },
  pathMapping: {
    type: "object",
    description: refString("browser.pathMapping.description"),
    default: {}
  },
  webRoot: {
    type: "string",
    description: refString("browser.webRoot.description"),
    default: "${workspaceFolder}"
  },
  urlFilter: {
    type: "string",
    description: refString("browser.urlFilter.description"),
    default: ""
  },
  url: {
    type: "string",
    description: refString("browser.url.description"),
    default: "http://localhost:8080"
  },
  inspectUri: {
    type: ["string", "null"],
    description: refString("browser.inspectUri.description"),
    default: null
  },
  vueComponentPaths: {
    type: "array",
    description: refString("browser.vueComponentPaths"),
    default: ["${workspaceFolder}/**/*.vue"]
  },
  server: {
    oneOf: [
      {
        type: "object",
        description: refString("browser.server.description"),
        additionalProperties: false,
        default: { program: "node my-server.js" },
        properties: nodeLaunchConfig.configurationAttributes
      },
      {
        type: "object",
        description: refString("debug.terminal.label"),
        additionalProperties: false,
        default: { program: "npm start" },
        properties: nodeTerminalConfiguration.configurationAttributes
      }
    ]
    // eslint-disable-next-line
  },
  perScriptSourcemaps: {
    type: "string",
    default: "auto",
    enum: ["yes", "no", "auto"],
    description: refString("browser.perScriptSourcemaps.description")
  }
};
var chromiumAttachConfigurationAttributes = {
  ...chromiumBaseConfigurationAttributes,
  address: {
    type: "string",
    description: refString("browser.address.description"),
    default: "localhost"
  },
  port: {
    type: "number",
    description: refString("browser.attach.port.description"),
    default: 9229
  },
  restart: {
    type: "boolean",
    markdownDescription: refString("browser.restart"),
    default: false
  },
  targetSelection: {
    type: "string",
    markdownDescription: refString("browser.targetSelection"),
    enum: ["pick", "automatic"],
    default: "automatic"
  },
  browserAttachLocation: {
    description: refString("browser.browserAttachLocation.description"),
    default: null,
    oneOf: [
      {
        type: "null"
      },
      {
        type: "string",
        enum: ["ui", "workspace"]
      }
    ]
  }
};
var chromeLaunchConfig = {
  type: "pwa-chrome" /* Chrome */,
  request: "launch",
  label: refString("chrome.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("chrome.launch.label"),
      description: refString("chrome.launch.description"),
      body: {
        type: "pwa-chrome" /* Chrome */,
        request: "launch",
        name: "Launch Chrome",
        url: "http://localhost:8080",
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: {
    ...chromiumBaseConfigurationAttributes,
    port: {
      type: "number",
      description: refString("browser.launch.port.description"),
      default: 0
    },
    file: {
      type: "string",
      description: refString("browser.file.description"),
      default: "${workspaceFolder}/index.html"
    },
    userDataDir: {
      type: ["string", "boolean"],
      description: refString("browser.userDataDir.description"),
      default: true
    },
    includeDefaultArgs: {
      type: "boolean",
      description: refString("browser.includeDefaultArgs.description"),
      default: true
    },
    includeLaunchArgs: {
      type: "boolean",
      description: refString("browser.includeLaunchArgs.description"),
      default: true
    },
    runtimeExecutable: {
      type: ["string", "null"],
      description: refString("browser.runtimeExecutable.description"),
      default: "stable"
    },
    runtimeArgs: {
      type: "array",
      description: refString("browser.runtimeArgs.description"),
      items: {
        type: "string"
      },
      default: []
    },
    env: {
      type: "object",
      description: refString("browser.env.description"),
      default: {}
    },
    cwd: {
      type: "string",
      description: refString("browser.cwd.description"),
      default: null
    },
    profileStartup: {
      type: "boolean",
      description: refString("browser.profileStartup.description"),
      default: true
    },
    cleanUp: {
      type: "string",
      enum: ["wholeBrowser", "onlyTab"],
      description: refString("browser.cleanUp.description"),
      default: "wholeBrowser"
    },
    browserLaunchLocation: {
      description: refString("browser.browserLaunchLocation.description"),
      default: null,
      oneOf: [
        {
          type: "null"
        },
        {
          type: "string",
          enum: ["ui", "workspace"]
        }
      ]
    }
  },
  defaults: chromeLaunchConfigDefaults
};
var chromeAttachConfig = {
  type: "pwa-chrome" /* Chrome */,
  request: "attach",
  label: refString("chrome.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("chrome.attach.label"),
      description: refString("chrome.attach.description"),
      body: {
        type: "pwa-chrome" /* Chrome */,
        request: "attach",
        name: "Attach to Chrome",
        port: 9222,
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: chromiumAttachConfigurationAttributes,
  defaults: chromeAttachConfigDefaults
};
var extensionHostConfig = {
  type: "pwa-extensionHost" /* ExtensionHost */,
  request: "launch",
  label: refString("extensionHost.label"),
  languages: commonLanguages,
  required: ["args"],
  configurationSnippets: [
    {
      label: refString("extensionHost.snippet.launch.label"),
      description: refString("extensionHost.snippet.launch.description"),
      body: {
        type: "pwa-extensionHost" /* ExtensionHost */,
        request: "launch",
        name: refString("extensionHost.launch.config.name"),
        args: ['^"--extensionDevelopmentPath=\\${workspaceFolder}"'],
        outFiles: ['^"\\${workspaceFolder}/out/**/*.js"'],
        preLaunchTask: "npm"
      }
    }
  ],
  configurationAttributes: {
    ...nodeBaseConfigurationAttributes,
    args: {
      type: "array",
      description: refString("node.launch.args.description"),
      items: {
        type: "string"
      },
      default: ["--extensionDevelopmentPath=${workspaceFolder}"]
    },
    runtimeExecutable: {
      type: ["string", "null"],
      markdownDescription: refString("extensionHost.launch.runtimeExecutable.description"),
      default: "node"
    },
    debugWebviews: {
      markdownDescription: refString("extensionHost.launch.debugWebviews"),
      default: true,
      type: ["boolean"]
    },
    debugWebWorkerHost: {
      markdownDescription: refString("extensionHost.launch.debugWebWorkerHost"),
      default: true,
      type: ["boolean"]
    },
    rendererDebugOptions: {
      markdownDescription: refString("extensionHost.launch.rendererDebugOptions"),
      type: "object",
      default: {
        webRoot: "${workspaceFolder}"
      },
      properties: chromiumAttachConfigurationAttributes
    }
  },
  defaults: extensionHostConfigDefaults
};
var edgeLaunchConfig = {
  type: "pwa-msedge" /* Edge */,
  request: "launch",
  label: refString("edge.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("edge.launch.label"),
      description: refString("edge.launch.description"),
      body: {
        type: "pwa-msedge" /* Edge */,
        request: "launch",
        name: "Launch Edge",
        url: "http://localhost:8080",
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: {
    ...chromeLaunchConfig.configurationAttributes,
    runtimeExecutable: {
      type: ["string", "null"],
      description: refString("browser.runtimeExecutable.edge.description"),
      default: "stable"
    },
    useWebView: {
      type: "boolean",
      description: refString("edge.useWebView.launch.description"),
      default: false
    },
    address: {
      type: "string",
      description: refString("edge.address.description"),
      default: "localhost"
    },
    port: {
      type: "number",
      description: refString("edge.port.description"),
      default: 9229
    }
  },
  defaults: edgeLaunchConfigDefaults
};
var edgeAttachConfig = {
  type: "pwa-msedge" /* Edge */,
  request: "attach",
  label: refString("edge.label"),
  languages: browserLanguages,
  configurationSnippets: [
    {
      label: refString("edge.attach.label"),
      description: refString("edge.attach.description"),
      body: {
        type: "pwa-msedge" /* Edge */,
        request: "attach",
        name: "Attach to Edge",
        port: 9222,
        webRoot: '^"${2:\\${workspaceFolder\\}}"'
      }
    }
  ],
  configurationAttributes: {
    ...chromiumAttachConfigurationAttributes,
    useWebView: {
      type: "object",
      properties: { pipeName: { type: "string" } },
      description: refString("edge.useWebView.attach.description"),
      default: { pipeName: "MyPipeName" }
    }
  },
  defaults: edgeAttachConfigDefaults
};
var debuggers = [
  nodeAttachConfig,
  nodeLaunchConfig,
  nodeTerminalConfiguration,
  extensionHostConfig,
  chromeLaunchConfig,
  chromeAttachConfig,
  edgeLaunchConfig,
  edgeAttachConfig
];
function buildDebuggers() {
  const output = [];
  const ensureEntryForType = (type, d) => {
    let entry = output.find((o) => o.type === type);
    if (entry) {
      return entry;
    }
    const { request, configurationAttributes, required, defaults, ...rest } = d;
    entry = {
      ...rest,
      type,
      aiKey: appInsightsKey,
      configurationAttributes: {},
      configurationSnippets: [],
      strings: { unverifiedBreakpoints: refString("debug.unverifiedBreakpoints") }
    };
    output.push(entry);
    return entry;
  };
  for (const d of debuggers) {
    const preferred = preferredDebugTypes.get(d.type);
    const primary = ensureEntryForType(d.type, d);
    const entries = [primary];
    if (preferred) {
      const entry = ensureEntryForType(preferred, d);
      delete entry.languages;
      entries.unshift(entry);
      primary.deprecated = `Please use type ${preferred} instead`;
    }
    entries[0].configurationSnippets.push(...d.configurationSnippets);
    if (preferred) {
      for (const snippet of entries[0].configurationSnippets) {
        snippet.body.type = preferred;
      }
    }
    for (const entry of entries) {
      entry.configurationAttributes[d.request] = {
        required: d.required,
        properties: mapValues(
          d.configurationAttributes,
          ({ docDefault: _, ...attrs }) => attrs
        )
      };
    }
  }
  return walkObject(output, sortKeys);
}
var configurationSchema = {
  ["debug.javascript.codelens.npmScripts" /* NpmScriptLens */]: {
    enum: ["top", "all", "never"],
    default: "top",
    description: refString("configuration.npmScriptLensLocation")
  },
  ["debug.javascript.terminalOptions" /* TerminalDebugConfig */]: {
    type: "object",
    description: refString("configuration.terminalOptions"),
    default: {},
    properties: nodeTerminalConfiguration.configurationAttributes
  },
  ["debug.javascript.automaticallyTunnelRemoteServer" /* AutoServerTunnelOpen */]: {
    type: "boolean",
    description: refString("configuration.automaticallyTunnelRemoteServer"),
    default: true
  },
  ["debug.javascript.debugByLinkOptions" /* DebugByLinkOptions */]: {
    default: "on",
    description: refString("configuration.debugByLinkOptions"),
    oneOf: [
      {
        type: "string",
        enum: ["on", "off", "always"]
      },
      {
        type: "object",
        properties: {
          ...chromeLaunchConfig.configurationAttributes,
          enabled: {
            type: "string",
            enum: ["on", "off", "always"]
          }
        }
      }
    ]
  },
  ["debug.javascript.pickAndAttachOptions" /* PickAndAttachDebugOptions */]: {
    type: "object",
    default: {},
    markdownDescription: refString("configuration.pickAndAttachOptions"),
    properties: nodeAttachConfig.configurationAttributes
  },
  ["debug.javascript.autoAttachFilter" /* AutoAttachMode */]: {
    type: "string",
    default: "disabled" /* Disabled */,
    enum: [
      "always" /* Always */,
      "smart" /* Smart */,
      "onlyWithFlag" /* OnlyWithFlag */,
      "disabled" /* Disabled */
    ],
    enumDescriptions: [
      refString("configuration.autoAttachMode.always"),
      refString("configuration.autoAttachMode.smart"),
      refString("configuration.autoAttachMode.explicit"),
      refString("configuration.autoAttachMode.disabled")
    ],
    markdownDescription: refString("configuration.autoAttachMode")
  },
  ["debug.javascript.autoAttachSmartPattern" /* AutoAttachSmartPatterns */]: {
    type: "array",
    items: {
      type: "string"
    },
    default: ["${workspaceFolder}/**", "!**/node_modules/**", `**/${knownToolToken}/**`],
    markdownDescription: refString("configuration.autoAttachSmartPatterns")
  },
  ["debug.javascript.breakOnConditionalError" /* BreakOnConditionalError */]: {
    type: "boolean",
    default: false,
    markdownDescription: refString("configuration.breakOnConditionalError")
  },
  ["debug.javascript.unmapMissingSources" /* UnmapMissingSources */]: {
    type: "boolean",
    default: false,
    description: refString("configuration.unmapMissingSources")
  },
  ["debug.javascript.defaultRuntimeExecutable" /* DefaultRuntimeExecutables */]: {
    type: "object",
    default: {
      ["pwa-node" /* Node */]: "node"
    },
    markdownDescription: refString("configuration.defaultRuntimeExecutables"),
    properties: ["pwa-node" /* Node */, "pwa-chrome" /* Chrome */, "pwa-msedge" /* Edge */].reduce(
      (obj, type) => ({ ...obj, [type]: { type: "string" } }),
      {}
    )
  },
  ["debug.javascript.resourceRequestOptions" /* ResourceRequestOptions */]: {
    type: "object",
    default: {},
    markdownDescription: refString("configuration.resourceRequestOptions")
  }
};
var commands = [
  {
    command: "extension.js-debug.prettyPrint" /* PrettyPrint */,
    title: refString("pretty.print.script"),
    category: "Debug",
    icon: "$(json)"
  },
  {
    command: "extension.js-debug.toggleSkippingFile" /* ToggleSkipping */,
    title: refString("toggle.skipping.this.file"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.addCustomBreakpoints" /* AddCustomBreakpoints */,
    title: refString("add.browser.breakpoint"),
    icon: "$(add)"
  },
  {
    command: "extension.js-debug.removeCustomBreakpoint" /* RemoveCustomBreakpoint */,
    title: refString("remove.browser.breakpoint"),
    icon: "$(remove)"
  },
  {
    command: "extension.js-debug.removeAllCustomBreakpoints" /* RemoveAllCustomBreakpoints */,
    title: refString("remove.browser.breakpoint.all"),
    icon: "$(close-all)"
  },
  {
    command: "extension.pwa-node-debug.attachNodeProcess" /* AttachProcess */,
    title: refString("attach.node.process"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.npmScript" /* DebugNpmScript */,
    title: refString("debug.npm.script"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.createDebuggerTerminal" /* CreateDebuggerTerminal */,
    title: refString("debug.terminal.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.startProfile" /* StartProfile */,
    title: refString("profile.start"),
    category: "Debug",
    icon: "$(record)"
  },
  {
    command: "extension.js-debug.stopProfile" /* StopProfile */,
    title: refString("profile.stop"),
    category: "Debug",
    icon: "resources/dark/stop-profiling.svg"
  },
  {
    command: "extension.js-debug.revealPage" /* RevealPage */,
    title: refString("browser.revealPage"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.debugLink" /* DebugLink */,
    title: refString("debugLink.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.createDiagnostics" /* CreateDiagnostics */,
    title: refString("createDiagnostics.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.getDiagnosticLogs" /* GetDiagnosticLogs */,
    title: refString("getDiagnosticLogs.label"),
    category: "Debug"
  },
  {
    command: "extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */,
    title: refString("startWithStopOnEntry.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */,
    title: refString("openEdgeDevTools.label"),
    icon: "$(inspect)",
    category: "Debug"
  },
  {
    command: "extension.js-debug.callers.add" /* CallersAdd */,
    title: refString("commands.callersAdd.label"),
    category: "Debug"
  },
  {
    command: "extension.js-debug.callers.remove" /* CallersRemove */,
    title: refString("commands.callersRemove.label"),
    icon: "$(close)"
  },
  {
    command: "extension.js-debug.callers.removeAll" /* CallersRemoveAll */,
    title: refString("commands.callersRemoveAll.label"),
    icon: "$(clear-all)"
  },
  {
    command: "extension.js-debug.callers.goToCaller" /* CallersGoToCaller */,
    title: refString("commands.callersGoToCaller.label"),
    icon: "$(call-outgoing)"
  },
  {
    command: "extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */,
    title: refString("commands.callersGoToTarget.label"),
    icon: "$(call-incoming)"
  },
  {
    command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
    title: refString("commands.enableSourceMapStepping.label"),
    icon: "$(compass-dot)"
  },
  {
    command: "extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */,
    title: refString("commands.disableSourceMapStepping.label"),
    icon: "$(compass)"
  }
];
var menus = {
  commandPalette: [
    {
      command: "extension.js-debug.prettyPrint" /* PrettyPrint */,
      title: refString("pretty.print.script"),
      when: forAnyDebugType("debugType", "debugState == stopped")
    },
    {
      command: "extension.js-debug.startProfile" /* StartProfile */,
      title: refString("profile.start"),
      when: forAnyDebugType("debugType", "inDebugMode && !jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      title: refString("profile.stop"),
      when: forAnyDebugType("debugType", "inDebugMode && jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.revealPage" /* RevealPage */,
      when: "false"
    },
    {
      command: "extension.js-debug.debugLink" /* DebugLink */,
      title: refString("debugLink.label"),
      when: "!isWeb"
    },
    {
      command: "extension.js-debug.createDiagnostics" /* CreateDiagnostics */,
      title: refString("createDiagnostics.label"),
      when: forAnyDebugType("debugType", "inDebugMode")
    },
    {
      command: "extension.js-debug.getDiagnosticLogs" /* GetDiagnosticLogs */,
      title: refString("getDiagnosticLogs.label"),
      when: forAnyDebugType("debugType", "inDebugMode")
    },
    {
      command: "extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */,
      title: refString("openEdgeDevTools.label"),
      when: `debugType == ${"pwa-msedge" /* Edge */}`
    },
    {
      command: "extension.js-debug.callers.add" /* CallersAdd */,
      title: refString("commands.callersAdd.paletteLabel"),
      when: forAnyDebugType("debugType", 'debugState == "stopped"')
    },
    {
      command: "extension.js-debug.callers.goToCaller" /* CallersGoToCaller */,
      when: "false"
    },
    {
      command: "extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */,
      when: "false"
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      when: "jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */
    },
    {
      command: "extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */,
      when: `!${"jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */}`
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      when: "jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */
    }
  ],
  "debug/callstack/context": [
    {
      command: "extension.js-debug.revealPage" /* RevealPage */,
      group: "navigation",
      when: forBrowserDebugType("debugType", `callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.toggleSkippingFile" /* ToggleSkipping */,
      group: "navigation",
      when: forAnyDebugType("debugType", `callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.startProfile" /* StartProfile */,
      group: "navigation",
      when: forAnyDebugType("debugType", `!jsDebugIsProfiling && callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      group: "navigation",
      when: forAnyDebugType("debugType", `jsDebugIsProfiling && callStackItemType == 'session'`)
    },
    {
      command: "extension.js-debug.startProfile" /* StartProfile */,
      group: "inline",
      when: forAnyDebugType("debugType", "!jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      group: "inline",
      when: forAnyDebugType("debugType", "jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.callers.add" /* CallersAdd */,
      when: forAnyDebugType("debugType", `callStackItemType == 'stackFrame'`)
    }
  ],
  "debug/toolBar": [
    {
      command: "extension.js-debug.stopProfile" /* StopProfile */,
      when: forAnyDebugType("debugType", "jsDebugIsProfiling")
    },
    {
      command: "extension.js-debug.openEdgeDevTools" /* OpenEdgeDevTools */,
      when: `debugType == ${"pwa-msedge" /* Edge */}`
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      when: "jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */
    }
  ],
  "view/title": [
    {
      command: "extension.js-debug.addCustomBreakpoints" /* AddCustomBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* BrowserBreakpoints */}`
    },
    {
      command: "extension.js-debug.removeAllCustomBreakpoints" /* RemoveAllCustomBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* BrowserBreakpoints */}`
    },
    {
      command: "extension.js-debug.callers.removeAll" /* CallersRemoveAll */,
      group: "navigation",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.disableSourceMapStepping" /* DisableSourceMapStepping */,
      group: "navigation",
      when: forAnyDebugType(
        "debugType",
        `view == workbench.debug.callStackView && !${"jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */}`
      )
    },
    {
      command: "extension.js-debug.enableSourceMapStepping" /* EnableSourceMapStepping */,
      group: "navigation",
      when: forAnyDebugType(
        "debugType",
        `view == workbench.debug.callStackView && ${"jsDebugIsMapSteppingDisabled" /* IsMapSteppingDisabled */}`
      )
    }
  ],
  "view/item/context": [
    {
      command: "extension.js-debug.removeCustomBreakpoint" /* RemoveCustomBreakpoint */,
      when: `view == ${"jsBrowserBreakpoints" /* BrowserBreakpoints */}`,
      group: "inline"
    },
    {
      command: "extension.js-debug.addCustomBreakpoints" /* AddCustomBreakpoints */,
      when: `view == ${"jsBrowserBreakpoints" /* BrowserBreakpoints */}`
    },
    {
      command: "extension.js-debug.removeCustomBreakpoint" /* RemoveCustomBreakpoint */,
      when: `view == ${"jsBrowserBreakpoints" /* BrowserBreakpoints */}`
    },
    {
      command: "extension.js-debug.callers.goToCaller" /* CallersGoToCaller */,
      group: "inline",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.callers.gotToTarget" /* CallersGoToTarget */,
      group: "inline",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    },
    {
      command: "extension.js-debug.callers.remove" /* CallersRemove */,
      group: "inline",
      when: `view == ${"jsExcludedCallers" /* ExcludedCallers */}`
    }
  ],
  "editor/title": [
    {
      command: "extension.js-debug.prettyPrint" /* PrettyPrint */,
      group: "navigation",
      when: `debugState == stopped && resource in ${"jsDebugCanPrettyPrint" /* CanPrettyPrint */}`
    }
  ]
};
var keybindings = [
  {
    command: "extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */,
    key: "F10",
    mac: "F10",
    when: forNodeDebugType("debugConfigurationType", "!inDebugMode")
  },
  {
    command: "extension.node-debug.startWithStopOnEntry" /* StartWithStopOnEntry */,
    key: "F11",
    mac: "F11",
    when: forNodeDebugType(
      "debugConfigurationType",
      "!inDebugMode && activeViewlet == workbench.view.debug"
    )
  }
];
var viewsWelcome = [
  {
    view: "debug",
    contents: refString("debug.terminal.welcomeWithLink"),
    when: forSomeContextKeys(commonLanguages, "debugStartLanguage", "!isWeb")
  },
  {
    view: "debug",
    contents: refString("debug.terminal.welcome"),
    when: forSomeContextKeys(commonLanguages, "debugStartLanguage", "isWeb")
  }
];
var views = {
  debug: [
    {
      id: "jsBrowserBreakpoints" /* BrowserBreakpoints */,
      name: "Browser breakpoints",
      when: forBrowserDebugType("debugType")
    },
    {
      id: "jsExcludedCallers" /* ExcludedCallers */,
      name: "Excluded Callers",
      when: forAnyDebugType("debugType", "jsDebugHasExcludedCallers")
    }
  ]
};
var activationEvents = /* @__PURE__ */ new Set([
  "onDebugDynamicConfigurations",
  "onDebugInitialConfigurations",
  ...[...debuggers.map((dbg) => dbg.type), ...preferredDebugTypes.values()].map(
    (t) => `onDebugResolve:${t}`
  ),
  ...[...allCommands].map((cmd) => `onCommand:${cmd}`)
]);
for (const { command } of commands) {
  activationEvents.delete(`onCommand:${command}`);
}
if (require.main === module) {
  process.stdout.write(
    JSON.stringify({
      capabilities: {
        virtualWorkspaces: false,
        untrustedWorkspaces: {
          supported: "limited",
          description: refString("workspaceTrust.description")
        }
      },
      activationEvents: [...activationEvents],
      contributes: {
        menus,
        breakpoints: breakpointLanguages.map((language) => ({ language })),
        debuggers: buildDebuggers(),
        commands,
        keybindings,
        configuration: {
          title: "JavaScript Debugger",
          properties: configurationSchema
        },
        terminal: {
          profiles: [
            {
              id: "extension.js-debug.debugTerminal",
              title: refString("debug.terminal.label"),
              icon: "$(debug)"
            }
          ]
        },
        views,
        viewsWelcome
      }
    })
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debuggers
});

// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // uiF0qOcqGedp1nFW/aWcZWUZqN7nROKAshZX6KvWooKg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoNMIIaCQIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCCAKaDJXGVBs0OpJOqmwnSTfoi3ClaUZH8O
// SIG // SyU4JJX2fzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAGZ3bWhT
// SIG // 3mZQRXJZO0w86uYUDMSJ9ZO+M/FKdx6G7r6/PWl4wZao
// SIG // Jp03XoUama6UD2b/tvE+bg6CQRfWBWqIKWdXJgTEBn0n
// SIG // Mkqkhj1n2hRIFCQ6X6gliMvBpJtgYId7RAFB84TEg95S
// SIG // GDRk8QSH/i8pUPLacJ4+kAhdD7TomOQy/EnyPJ8P2DiC
// SIG // oX19Nvl1GohD3YVwAV76HL+qZTvDR0GdZ7i2NyxVWHBJ
// SIG // fyFdyukn8MITTDpBmfq8fNXV/hw5rPKqeam7mc6in5N4
// SIG // TqBGMIhrsIq2NmK0swEF/Y0N96mudIzNxMJoN1xecDre
// SIG // aoQJ5EhTrav6QLd5A2xwD+nnt9ChgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgPxs1DTnXBsuLhryjE3jK
// SIG // huWuT8wU+j4bTJ8qHPFzJggCBmUENEKcZRgTMjAyMzA5
// SIG // MjYwOTA3NDcuMTczWjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkYwMDItMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHODxj3RZfnxv8A
// SIG // AQAAAc4wDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjA4WhcN
// SIG // MjQwMjAxMTkxMjA4WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkYwMDItMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAuQpMGdco2Md35yk8
// SIG // P1Z88BhoSjiI6jA0rh3RoPCaCdizdpwVFJAMMYWAEeGU
// SIG // FoPUG48Wfw1qw9sXlMC5yjijQzbYV/b2io/l+QrcYuoq
// SIG // E1VO1AeaEOMBqZFdpJn56dEWBnYbXOfAGqFGRXL4XQZS
// SIG // dshE8LgrhFeqZOCe4IRsprM69B1akfQdjCY1fK3jy/hx
// SIG // iMyG2C65NI1pmikUT7BX8SisN54xYBZUqmgQOElbldBW
// SIG // BP+LdGfVI11Dy6sPog3i1L97Kd4fTOKDSGdtelT5VZX9
// SIG // xThUS5WYPHgnl+MZWgY1omveZ15VzF0FqmiMJIDeE7Ec
// SIG // 8poHlrlczKUTwVpOoDo88cF54yHFqsdZT85yEr/8bZ9R
// SIG // 6QfgiBeUjypAn/JQj4mdRLQdNRcx0Y/mIUViY7EZdYC1
// SIG // tYtBC661lQBawz6yLIQSqM+klAMig+8j8euPUsixgaP7
// SIG // yR8WYDJWIq3JH/XpJaazQ3qLJYa3iGMwCazCfmKFp/Q8
// SIG // ZoP+4Rgv1x/HpY5iagS6shwpnYEvlgK4/OHIkRrJqkWl
// SIG // Af+IRRlJC79RmtrxD7VQclJox3AKaSUdTzpotQE1fRbr
// SIG // DkEMZA9p11kilnygKQ+7RnzWTEb5LnxxcBn+TZzdAIpt
// SIG // JYwYNTuYLONxaJP7kntds0C9IUj/SX/ogi/jT0zwDyTx
// SIG // LG3WGr0CAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQw+whG
// SIG // QKOTDI6ZfhVk7FMp+eKFxTAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // lyAWFv9FFUww2Tv30Nl7LTQuA2RvET265WR8hbee8/1V
// SIG // qj7req7oGshltVHLybsX/ERLYk7Zn+UkOTdqbtJ05eju
// SIG // AbUnCLzPyvKXv8o++8fLur35PEOkgzmaBaSKVZBR98uu
// SIG // 4rH+P0n6DfTNpy2/d6aPzrZTPQHFkyW6rp8wvpJni3MS
// SIG // ZgsS3LIgTCemU70jVkJ4nIDLr+zxdIqfR2I8xVqDavKp
// SIG // 67O4PvmBj11O3qZdSkgU6/VEex5/5DXKgomX9tg4aGT1
// SIG // T+/r2R02Pjl6MaBBDp8wGwJQQrqf8G1zSYrLIivGckSV
// SIG // 0/0eBVZhNtgkr6bvqeTHkZQU+NqZCIYTJal5bHUHU/XF
// SIG // iLYlvMlkaWhNWSNZsvRVvCTPQ7QkLYt2bhh0jab5uEAG
// SIG // P+ta8qyqJeES3+RfkgJeKM1bzPDyjHkXRJqNsDs2SuDB
// SIG // Ow+4h8y3GKebnMNJILMt/en2nM7F3Zy0qJlzAK7LRpB7
// SIG // 7fxd4atnhEkNj4K1/oKXQaPLj1dessJp6QMGKjHWTPsh
// SIG // +gf/+DLFxLt0YOUDqDlnYzVQe0JujDyYPrw1+fV7zJom
// SIG // wM26ZcSMqe0tZMuy/oN4auisZSkPWm1I2KWjhZx7SgxS
// SIG // fr8c53BDFRFdyB0HYwu7q6jgYDu78qXiMI0OvPartjTb
// SIG // iEOnGWYDJ/BL0klkcAxvIIkwggdxMIIFWaADAgECAhMz
// SIG // AAAAFcXna54Cm0mZAAAAAAAVMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMDAeFw0yMTA5MzAxODIyMjVaFw0zMDA5MzAx
// SIG // ODMyMjVaMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNV
// SIG // BAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEw
// SIG // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA
// SIG // 5OGmTOe0ciELeaLL1yR5vQ7VgtP97pwHB9KpbE51yMo1
// SIG // V/YBf2xK4OK9uT4XYDP/XE/HZveVU3Fa4n5KWv64NmeF
// SIG // RiMMtY0Tz3cywBAY6GB9alKDRLemjkZrBxTzxXb1hlDc
// SIG // wUTIcVxRMTegCjhuje3XD9gmU3w5YQJ6xKr9cmmvHaus
// SIG // 9ja+NSZk2pg7uhp7M62AW36MEBydUv626GIl3GoPz130
// SIG // /o5Tz9bshVZN7928jaTjkY+yOSxRnOlwaQ3KNi1wjjHI
// SIG // NSi947SHJMPgyY9+tVSP3PoFVZhtaDuaRr3tpK56KTes
// SIG // y+uDRedGbsoy1cCGMFxPLOJiss254o2I5JasAUq7vnGp
// SIG // F1tnYN74kpEeHT39IM9zfUGaRnXNxF803RKJ1v2lIH1+
// SIG // /NmeRd+2ci/bfV+AutuqfjbsNkz2K26oElHovwUDo9Fz
// SIG // pk03dJQcNIIP8BDyt0cY7afomXw/TNuvXsLz1dhzPUNO
// SIG // wTM5TI4CvEJoLhDqhFFG4tG9ahhaYQFzymeiXtcodgLi
// SIG // Mxhy16cg8ML6EgrXY28MyTZki1ugpoMhXV8wdJGUlNi5
// SIG // UPkLiWHzNgY1GIRH29wb0f2y1BzFa/ZcUlFdEtsluq9Q
// SIG // BXpsxREdcu+N+VLEhReTwDwV2xo3xwgVGD94q0W29R6H
// SIG // XtqPnhZyacaue7e3PmriLq0CAwEAAaOCAd0wggHZMBIG
// SIG // CSsGAQQBgjcVAQQFAgMBAAEwIwYJKwYBBAGCNxUCBBYE
// SIG // FCqnUv5kxJq+gpE8RjUpzxD/LwTuMB0GA1UdDgQWBBSf
// SIG // pxVdAF5iXYP05dJlpxtTNRnpcjBcBgNVHSAEVTBTMFEG
// SIG // DCsGAQQBgjdMg30BATBBMD8GCCsGAQUFBwIBFjNodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3BzL0RvY3Mv
// SIG // UmVwb3NpdG9yeS5odG0wEwYDVR0lBAwwCgYIKwYBBQUH
// SIG // AwgwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
// SIG // VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0j
// SIG // BBgwFoAU1fZWy4/oolxiaNE9lJBb186aGMQwVgYDVR0f
// SIG // BE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0
// SIG // XzIwMTAtMDYtMjMuY3JsMFoGCCsGAQUFBwEBBE4wTDBK
// SIG // BggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNyb3NvZnQu
// SIG // Y29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0w
// SIG // Ni0yMy5jcnQwDQYJKoZIhvcNAQELBQADggIBAJ1Vffwq
// SIG // reEsH2cBMSRb4Z5yS/ypb+pcFLY+TkdkeLEGk5c9MTO1
// SIG // OdfCcTY/2mRsfNB1OW27DzHkwo/7bNGhlBgi7ulmZzpT
// SIG // Td2YurYeeNg2LpypglYAA7AFvonoaeC6Ce5732pvvinL
// SIG // btg/SHUB2RjebYIM9W0jVOR4U3UkV7ndn/OOPcbzaN9l
// SIG // 9qRWqveVtihVJ9AkvUCgvxm2EhIRXT0n4ECWOKz3+SmJ
// SIG // w7wXsFSFQrP8DJ6LGYnn8AtqgcKBGUIZUnWKNsIdw2Fz
// SIG // Lixre24/LAl4FOmRsqlb30mjdAy87JGA0j3mSj5mO0+7
// SIG // hvoyGtmW9I/2kQH2zsZ0/fZMcm8Qq3UwxTSwethQ/gpY
// SIG // 3UA8x1RtnWN0SCyxTkctwRQEcb9k+SS+c23Kjgm9swFX
// SIG // SVRk2XPXfx5bRAGOWhmRaw2fpCjcZxkoJLo4S5pu+yFU
// SIG // a2pFEUep8beuyOiJXk+d0tBMdrVXVAmxaQFEfnyhYWxz
// SIG // /gq77EFmPWn9y8FBSX5+k77L+DvktxW/tM4+pTFRhLy/
// SIG // AsGConsXHRWJjXD+57XQKBqJC4822rpM+Zv/Cuk0+CQ1
// SIG // ZyvgDbjmjJnW4SLq8CdCPSWU5nR0W2rRnj7tfqAxM328
// SIG // y+l7vzhwRNGQ8cirOoo6CGJ/2XBjU02N7oJtpQUQwXEG
// SIG // ahC0HVUzWLOhcGbyoYIDUDCCAjgCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpGMDAyLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUAXY2VGxTQMgpF
// SIG // ROg3VVsos02EB8yggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOi8
// SIG // iicwIhgPMjAyMzA5MjUyMjM3MjdaGA8yMDIzMDkyNjIy
// SIG // MzcyN1owdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6LyK
// SIG // JwIBADAKAgEAAgIYewIB/zAHAgEAAgISvjAKAgUA6L3b
// SIG // pwIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQBXVLrM8w4QXOVmd5VXVIpw9jzp
// SIG // o16e+/ymXxByLPeZycityb3+bMiNBXSroMZ2x5WpbCp0
// SIG // NikoCSmtxn3devdm9loyXX87Y7Yt4CRCakkaa+csDVeF
// SIG // crmacMZevvIJa6YogW/0z3K4kXjlps1GF71fqZ3NPU4E
// SIG // ceG7DQhzZSRP8YPqWz4l/LZO7cAlHx7Jk+WC4+q58gBq
// SIG // 0lhks19g9iZ5C21rUYgzgXbL2gBXfOP5Z3DypvwyfQf2
// SIG // w5jHlVgrEiuUrBjXoRZnGoGdE2d/Sr8Cocov+hthK6wF
// SIG // qAIglVvMLXelU7WaKZzyAcJd3ucbGsolLFPjBCFgwhxd
// SIG // 9L5QnlIyMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHODxj3RZfnxv8AAQAA
// SIG // Ac4wDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // KIOcYm4ovOdc5C+aJ03t0WdxqMrOQZ5vi5oTm00oDRUw
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCAybM9B
// SIG // ei9Fw1JudyUQXzTGbMyrJZSwzImhWdzy/y6sZzCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAABzg8Y90WX58b/AAEAAAHOMCIEIAiJ+abQKgIwCTzf
// SIG // 0L14CX87UDEWKcVpsyFhY2aSzdh2MA0GCSqGSIb3DQEB
// SIG // CwUABIICAITED8HLAgXWGvQ61dJWtBfGZVi+fdSCvBAm
// SIG // 72CahDWtCO+MRwqVP62oixcyzBE/IF1N+OTf04Vw+wTn
// SIG // 6odYmXXs4l60Cm9segAoybD3yvwMwyz2Awtct0g7Sgmi
// SIG // aZ7Lc12vn7u94Sd4Plm5KMFw2WDZ+DzXGNso7VHVvoiB
// SIG // ukHjyLQeIP+gEfBynAmvlPB84zw8YJDJB6dZhQSC7B8D
// SIG // Q56L7wtk+VtowaQQCIg8UhKJPEts7KkobkEbPjrZXqIZ
// SIG // E9wL7j9xo0rU7z4M0S1SUCkDPp3mnUAF8KUjyHmubX6S
// SIG // NSdFUYuJTdcT0BXKiW4V4mRz8IcKXBK2/WcHPB6q37Ld
// SIG // twjp593L9Sphi5IICd6mh8PWqLRiWbRchgM5MmGIW3im
// SIG // JyeO0kxTfvxeaonBiZt6HD86H9UjbwcRucoqMFnstb8L
// SIG // QQFlj+PF2KeU/nGvo3DOdjy5blm6U4SWX9kDVDVoxRZ5
// SIG // dw/liRNM+1GiIEfaIKrtCHGxrdpNcwqdrUZBRnI2eRg9
// SIG // K2L7chJlDen639kgAGGZ56Fgok0LQx33Hz/QedM4Zu6B
// SIG // UBbkmTIpZf2hjuhfUBPf4KUD+P1PfAhrM7eAa5IRlLrX
// SIG // qviNDm6d4NDh8PhV/GkauaHJ4zfp38DswxBPv5MF/hVd
// SIG // JZuaeS5Yxz97fcCrGAParG0U93O/bgNe
// SIG // End signature block
