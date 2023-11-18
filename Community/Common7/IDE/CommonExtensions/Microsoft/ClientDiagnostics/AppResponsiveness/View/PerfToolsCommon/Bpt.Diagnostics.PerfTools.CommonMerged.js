// 
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/enumHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Enum = void 0;
    class Enum {
        static GetName(enumType, value) {
            var result;
            if (enumType) {
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var enumValue = enumType[enumKey];
                        if (enumValue === value) {
                            result = enumKey;
                            break;
                        }
                    }
                }
            }
            if (!result) {
                result = value.toString();
            }
            return result;
        }
        static Parse(enumType, name, ignoreCase = true) {
            var result;
            if (enumType) {
                if (ignoreCase) {
                    name = name.toLowerCase();
                }
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var compareAginst = enumKey.toString();
                        if (ignoreCase) {
                            compareAginst = compareAginst.toLowerCase();
                        }
                        if (name === compareAginst) {
                            result = enumType[enumKey];
                            break;
                        }
                    }
                }
            }
            return result;
        }
        static GetValues(enumType) {
            var result = [];
            if (enumType) {
                for (var enumKey in enumType) {
                    if (enumType.hasOwnProperty(enumKey)) {
                        var enumValue = enumType[enumKey];
                        if (typeof enumValue === "number") {
                            result.push(enumValue);
                        }
                    }
                }
            }
            return result;
        }
    }
    exports.Enum = Enum;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/eventHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Publisher = void 0;
    /**
     * List of supported events.
     */
    class Publisher {
        /**
         * constructor
         * @param events List of supported events.
         */
        constructor(events) {
            /**
             * List of all registered events.
             */
            this._events = {};
            this._listeners = {};
            if (events && events.length > 0) {
                for (var i = 0; i < events.length; i++) {
                    var type = events[i];
                    if (type) {
                        this._events[type] = type;
                    }
                }
            }
            else {
                throw Error("Events are null or empty.");
            }
        }
        /**
         * Add event Listener
         * @param eventType Event type.
         * @param func Callback function.
         */
        addEventListener(eventType, func) {
            if (eventType && func) {
                var type = this._events[eventType];
                if (type) {
                    var callbacks = this._listeners[type] ? this._listeners[type] : this._listeners[type] = [];
                    callbacks.push(func);
                }
            }
        }
        /**
         * Remove event Listener
         * @param eventType Event type.
         * @param func Callback function.
         */
        removeEventListener(eventType, func) {
            if (eventType && func) {
                var callbacks = this._listeners[eventType];
                if (callbacks) {
                    for (var i = 0; i < callbacks.length; i++) {
                        if (func === callbacks[i]) {
                            callbacks.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }
        /**
         * Invoke event Listener
         * @param args Event argument.
         */
        invokeListener(args) {
            if (args.type) {
                var callbacks = this._listeners[args.type];
                if (callbacks) {
                    for (var i = 0; i < callbacks.length; i++) {
                        var func = callbacks[i];
                        if (func) {
                            func(args);
                        }
                    }
                }
            }
        }
    }
    exports.Publisher = Publisher;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/formattingHelpers", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormattingHelpers = void 0;
    class FormattingHelpers {
        static getDecimalLocaleString(numberToConvert, includeGroupSeparators, signficantDigits) {
            var numberString = Math.abs(numberToConvert).toString();
            // Get any exponent
            var split = numberString.split(/e/i);
            numberString = split[0];
            var exponent = (split.length > 1 ? parseInt(split[1], 10) : 0);
            // Get any decimal place
            split = numberString.split(".");
            numberString = (numberToConvert < 0 ? "-" : "") + split[0];
            // Get whole value
            var right = split.length > 1 ? split[1] : "";
            if (exponent > 0) {
                right = FormattingHelpers.zeroPad(right, exponent, false);
                numberString += right.slice(0, exponent);
                right = right.substr(exponent);
            }
            else if (exponent < 0) {
                exponent = -exponent;
                numberString = FormattingHelpers.zeroPad(numberString, exponent + 1, true);
                right = numberString.slice(-exponent, numberString.length) + right;
                numberString = numberString.slice(0, -exponent);
            }
            // Number format
            var nf = Plugin.Culture.numberFormat;
            if (!nf) {
                nf = { numberDecimalSeparator: ".", numberGroupSizes: [3], numberGroupSeparator: "," };
            }
            if (signficantDigits) {
                right = right.padEnd(signficantDigits, "0");
            }
            if (right.length > 0) {
                right = nf.numberDecimalSeparator + right;
            }
            // Grouping (e.g. 10,000)
            if (includeGroupSeparators === true) {
                var groupSizes = nf.numberGroupSizes, sep = nf.numberGroupSeparator, curSize = groupSizes[0], curGroupIndex = 1, stringIndex = numberString.length - 1, ret = "";
                while (stringIndex >= 0) {
                    if (curSize === 0 || curSize > stringIndex) {
                        if (ret.length > 0) {
                            return numberString.slice(0, stringIndex + 1) + sep + ret + right;
                        }
                        else {
                            return numberString.slice(0, stringIndex + 1) + right;
                        }
                    }
                    if (ret.length > 0) {
                        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1) + sep + ret;
                    }
                    else {
                        ret = numberString.slice(stringIndex - curSize + 1, stringIndex + 1);
                    }
                    stringIndex -= curSize;
                    if (curGroupIndex < groupSizes.length) {
                        curSize = groupSizes[curGroupIndex];
                        curGroupIndex++;
                    }
                }
                return numberString.slice(0, stringIndex + 1) + sep + ret + right;
            }
            else {
                return numberString + right;
            }
        }
        static stripNewLine(text) {
            return text.replace(/[\r?\n]/g, "");
        }
        static zeroPad(stringToPad, newLength, padLeft) {
            var zeros = [];
            for (var i = stringToPad.length; i < newLength; i++) {
                zeros.push("0");
            }
            return (padLeft ? (zeros.join("") + stringToPad) : (stringToPad + zeros.join("")));
        }
    }
    exports.FormattingHelpers = FormattingHelpers;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/hostShell", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LocalHostShell = exports.HostShellProxy = void 0;
    //
    // HostDisplayProxy provides access to the Display which is implemented in the host
    //
    class HostShellProxy {
        constructor() {
            this._hostShellProxy = Plugin.JSONMarshaler.attachToMarshaledObject("Microsoft.VisualStudio.WebClient.Diagnostics.PerformanceToolHost.Package.Extensions.Core.HostShell", {}, true);
        }
        setStatusBarText(text, highlight) {
            return this._hostShellProxy._call("setStatusBarText", text, highlight || false);
        }
    }
    exports.HostShellProxy = HostShellProxy;
    //
    // LocalDisplay implements a local display object without the need to use the host
    //
    class LocalHostShell {
        setStatusBarText(statusText, highlight) {
            return Promise.resolve(null);
        }
    }
    exports.LocalHostShell = LocalHostShell;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenExtractor = exports.AssignmentRegexGroup = exports.HtmlRegexGroup = exports.TokenType = void 0;
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["General"] = 0] = "General";
        TokenType[TokenType["String"] = 1] = "String";
        TokenType[TokenType["Number"] = 2] = "Number";
        TokenType[TokenType["Html"] = 3] = "Html";
        TokenType[TokenType["HtmlTagName"] = 4] = "HtmlTagName";
        TokenType[TokenType["HtmlTagDelimiter"] = 5] = "HtmlTagDelimiter";
        TokenType[TokenType["HtmlAttributeName"] = 6] = "HtmlAttributeName";
        TokenType[TokenType["HtmlAttributeValue"] = 7] = "HtmlAttributeValue";
        TokenType[TokenType["EqualOperator"] = 8] = "EqualOperator";
    })(TokenType = exports.TokenType || (exports.TokenType = {}));
    var HtmlRegexGroup;
    (function (HtmlRegexGroup) {
        HtmlRegexGroup[HtmlRegexGroup["PreHtmlString"] = 1] = "PreHtmlString";
        HtmlRegexGroup[HtmlRegexGroup["StartDelimiter"] = 2] = "StartDelimiter";
        HtmlRegexGroup[HtmlRegexGroup["TagName"] = 3] = "TagName";
        HtmlRegexGroup[HtmlRegexGroup["IdAttribute"] = 4] = "IdAttribute";
        HtmlRegexGroup[HtmlRegexGroup["IdEqualToToken"] = 5] = "IdEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["IdAttributeValue"] = 6] = "IdAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["ClassAttribute"] = 7] = "ClassAttribute";
        HtmlRegexGroup[HtmlRegexGroup["ClassEqualToToken"] = 8] = "ClassEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["ClassAttributeValue"] = 9] = "ClassAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["SrcAttribute"] = 10] = "SrcAttribute";
        HtmlRegexGroup[HtmlRegexGroup["SrcEqualToToken"] = 11] = "SrcEqualToToken";
        HtmlRegexGroup[HtmlRegexGroup["SrcAttributeValue"] = 12] = "SrcAttributeValue";
        HtmlRegexGroup[HtmlRegexGroup["EndDelimiter"] = 13] = "EndDelimiter";
        HtmlRegexGroup[HtmlRegexGroup["PostHtmlString"] = 14] = "PostHtmlString";
    })(HtmlRegexGroup = exports.HtmlRegexGroup || (exports.HtmlRegexGroup = {}));
    var AssignmentRegexGroup;
    (function (AssignmentRegexGroup) {
        AssignmentRegexGroup[AssignmentRegexGroup["LeftHandSide"] = 1] = "LeftHandSide";
        AssignmentRegexGroup[AssignmentRegexGroup["EqualToOperator"] = 2] = "EqualToOperator";
        AssignmentRegexGroup[AssignmentRegexGroup["RightHandSide"] = 3] = "RightHandSide";
        AssignmentRegexGroup[AssignmentRegexGroup["PostString"] = 4] = "PostString";
    })(AssignmentRegexGroup = exports.AssignmentRegexGroup || (exports.AssignmentRegexGroup = {}));
    class TokenExtractor {
        static getHtmlTokens(text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }
            var tokens = TokenExtractor.HTML_REGEX.exec(text);
            if (tokens) {
                // First token - tokens[0] is the entire matched string, skip it.
                if (tokens[HtmlRegexGroup.PreHtmlString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[HtmlRegexGroup.PreHtmlString].toString() });
                }
                if (tokens[HtmlRegexGroup.StartDelimiter]) {
                    tokenTypeMap.push({ type: TokenType.HtmlTagDelimiter, value: tokens[HtmlRegexGroup.StartDelimiter].toString() });
                }
                if (tokens[HtmlRegexGroup.TagName]) {
                    tokenTypeMap.push({ type: TokenType.HtmlTagName, value: tokens[HtmlRegexGroup.TagName].toString() });
                }
                if (tokens[HtmlRegexGroup.IdAttribute]) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeName, value: tokens[HtmlRegexGroup.IdAttribute].toString() });
                }
                if (tokens[HtmlRegexGroup.IdEqualToToken]) {
                    tokenTypeMap.push({ type: TokenType.EqualOperator, value: tokens[HtmlRegexGroup.IdEqualToToken].toString() });
                }
                if (tokens[HtmlRegexGroup.IdAttributeValue] !== undefined) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeValue, value: tokens[HtmlRegexGroup.IdAttributeValue].toString() });
                }
                if (tokens[HtmlRegexGroup.ClassAttribute]) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeName, value: tokens[HtmlRegexGroup.ClassAttribute].toString() });
                }
                if (tokens[HtmlRegexGroup.ClassEqualToToken]) {
                    tokenTypeMap.push({ type: TokenType.EqualOperator, value: tokens[HtmlRegexGroup.ClassEqualToToken].toString() });
                }
                if (tokens[HtmlRegexGroup.ClassAttributeValue] !== undefined) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeValue, value: tokens[HtmlRegexGroup.ClassAttributeValue].toString() });
                }
                if (tokens[HtmlRegexGroup.SrcAttribute]) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeName, value: tokens[HtmlRegexGroup.SrcAttribute].toString() });
                }
                if (tokens[HtmlRegexGroup.SrcEqualToToken]) {
                    tokenTypeMap.push({ type: TokenType.EqualOperator, value: tokens[HtmlRegexGroup.SrcEqualToToken].toString() });
                }
                if (tokens[HtmlRegexGroup.SrcAttributeValue] !== undefined) {
                    tokenTypeMap.push({ type: TokenType.HtmlAttributeValue, value: tokens[HtmlRegexGroup.SrcAttributeValue].toString() });
                }
                if (tokens[HtmlRegexGroup.EndDelimiter]) {
                    tokenTypeMap.push({ type: TokenType.HtmlTagDelimiter, value: tokens[HtmlRegexGroup.EndDelimiter].toString() });
                }
                if (tokens[HtmlRegexGroup.PostHtmlString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[HtmlRegexGroup.PostHtmlString].toString() });
                }
            }
            else {
                // If for some reason regex fails just mark it as general token so that the object doesn't go missing
                tokenTypeMap.push({ type: TokenType.General, value: text });
            }
            return tokenTypeMap;
        }
        static getStringTokens(text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }
            var tokens = TokenExtractor.STRING_REGEX.exec(text);
            if (tokens) {
                if (tokens[AssignmentRegexGroup.LeftHandSide]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.LeftHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.EqualToOperator]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.EqualToOperator].toString() });
                }
                if (tokens[AssignmentRegexGroup.RightHandSide]) {
                    tokenTypeMap.push({ type: TokenType.String, value: tokens[AssignmentRegexGroup.RightHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.PostString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.PostString].toString() });
                }
            }
            else {
                tokenTypeMap.push({ type: TokenType.General, value: text });
            }
            return tokenTypeMap;
        }
        static getNumberTokens(text) {
            var tokenTypeMap = [];
            if (!text) {
                return tokenTypeMap;
            }
            var tokens = TokenExtractor.NUMBER_REGEX.exec(text);
            if (tokens) {
                if (tokens[AssignmentRegexGroup.LeftHandSide]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.LeftHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.EqualToOperator]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.EqualToOperator].toString() });
                }
                if (tokens[AssignmentRegexGroup.RightHandSide]) {
                    tokenTypeMap.push({ type: TokenType.Number, value: tokens[AssignmentRegexGroup.RightHandSide].toString() });
                }
                if (tokens[AssignmentRegexGroup.PostString]) {
                    tokenTypeMap.push({ type: TokenType.General, value: tokens[AssignmentRegexGroup.PostString].toString() });
                }
            }
            else {
                tokenTypeMap.push({ type: TokenType.General, value: text });
            }
            return tokenTypeMap;
        }
        static getCssClass(tokenType) {
            switch (tokenType) {
                case TokenType.String:
                    return "valueStringToken-String";
                case TokenType.Number:
                    return "valueStringToken-Number";
                case TokenType.HtmlTagName:
                    return "perftools-Html-Element-Tag";
                case TokenType.HtmlAttributeName:
                    return "perftools-Html-Attribute";
                case TokenType.HtmlAttributeValue:
                    return "perftools-Html-Value";
                case TokenType.HtmlTagDelimiter:
                    return "perftools-Html-Tag";
                case TokenType.EqualOperator:
                    return "perftools-Html-Operator";
                default:
                    return "";
            }
        }
        static isHtmlExpression(text) {
            return TokenExtractor.GENERAL_HTML_REGEX.test(text);
        }
        static isStringExpression(text) {
            return TokenExtractor.STRING_REGEX.test(text);
        }
    }
    exports.TokenExtractor = TokenExtractor;
    TokenExtractor.GENERAL_HTML_REGEX = /^<.*>/;
    TokenExtractor.HTML_REGEX = /(^.*)?(<)([^\s]+)(?:( id)(=)(\".*?\"))?(?:( class)(=)(\".*?\"))?(?:( src)(=)(\".*?\"))?(>)(.*$)?/;
    TokenExtractor.NUMBER_REGEX = /(.*)?(=)( ?-?\d+(?:.\d+)?)(.*$)?/;
    TokenExtractor.STRING_REGEX = /(^.*?)(=)( ?\".*\")(.*$)?/;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/Notifications", ["require", "exports", "plugin-vs-v2"], function (require, exports, Plugin) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Notifications = void 0;
    class Notifications {
        static get isTestMode() {
            return window["TestMode"];
        }
        static get notifications() {
            if (!Notifications._notifications) {
                Notifications._notifications = new Plugin.EventManager(null);
            }
            return Notifications._notifications;
        }
        static subscribe(type, listener) {
            if (Notifications.isTestMode) {
                Notifications.notifications.addEventListener(type, listener);
            }
        }
        static unsubscribe(type, listener) {
            if (Notifications.isTestMode) {
                Notifications.notifications.removeEventListener(type, listener);
            }
        }
        static subscribeOnce(type, listener) {
            if (Notifications.isTestMode) {
                function onNotify() {
                    Notifications.unsubscribe(type, onNotify);
                    listener.apply(this, arguments);
                }
                Notifications.subscribe(type, onNotify);
            }
        }
        static notify(type, details) {
            if (Notifications.isTestMode) {
                Notifications.notifications.dispatchEvent(type, details);
            }
        }
    }
    exports.Notifications = Notifications;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/SourceInfoTooltip", ["require", "exports", "plugin-vs-v2", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/formattingHelpers"], function (require, exports, Plugin, formattingHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceInfoTooltip = void 0;
    class SourceInfoTooltip {
        constructor(sourceInfo, name, nameLabelResourceId) {
            this._rootContainer = document.createElement("div");
            this._rootContainer.className = "sourceInfoTooltip";
            if (name && nameLabelResourceId) {
                this.addDiv("sourceInfoNameLabel", Plugin.Resources.getString(nameLabelResourceId));
                this.addDiv("sourceInfoName", name);
            }
            this.addDiv("sourceInfoFileLabel", Plugin.Resources.getString("SourceInfoFileLabel"));
            this.addDiv("sourceInfoFile", sourceInfo.source);
            this.addDiv("sourceInfoLineLabel", Plugin.Resources.getString("SourceInfoLineLabel"));
            this.addDiv("sourceInfoLine", formattingHelpers_1.FormattingHelpers.getDecimalLocaleString(sourceInfo.line, /*includeGroupSeparators=*/ true));
            this.addDiv("sourceInfoColumnLabel", Plugin.Resources.getString("SourceInfoColumnLabel"));
            this.addDiv("sourceInfoColumn", formattingHelpers_1.FormattingHelpers.getDecimalLocaleString(sourceInfo.column, /*includeGroupSeparators=*/ true));
        }
        get html() {
            return this._rootContainer.outerHTML;
        }
        addDiv(className, textContent) {
            var div = document.createElement("div");
            div.className = className;
            div.textContent = textContent;
            this._rootContainer.appendChild(div);
        }
    }
    exports.SourceInfoTooltip = SourceInfoTooltip;
});
//
// Copyright (C) Microsoft. All rights reserved.
//s
define("src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/API", ["require", "exports", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/SourceInfoTooltip"], function (require, exports, SourceInfoTooltip_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceInfoTooltip = void 0;
    Object.defineProperty(exports, "SourceInfoTooltip", { enumerable: true, get: function () { return SourceInfoTooltip_1.SourceInfoTooltip; } });
});
//
// Copyright (C) Microsoft. All rights reserved.
//
define("Bpt.Diagnostics.PerfTools.Common", ["require", "exports", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/enumHelper", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/eventHelper", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/formattingHelpers", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/hostShell", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/hostShell", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/TokenExtractor", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/Notifications", "src/edev/ClientDiagnostics/Source/AppResponsiveness/View/bpt.diagnostics.perftools.common/controls/API"], function (require, exports, enumHelper_1, eventHelper_1, formattingHelpers_2, hostShell_1, hostShell_2, TokenExtractor_1, TokenExtractor_2, TokenExtractor_3, TokenExtractor_4, Notifications_1, Controls) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Controls = exports.Notifications = exports.TokenExtractor = exports.AssignmentRegexGroup = exports.HtmlRegexGroup = exports.TokenType = exports.LocalHostShell = exports.HostShellProxy = exports.FormattingHelpers = exports.Publisher = exports.Enum = void 0;
    Object.defineProperty(exports, "Enum", { enumerable: true, get: function () { return enumHelper_1.Enum; } });
    Object.defineProperty(exports, "Publisher", { enumerable: true, get: function () { return eventHelper_1.Publisher; } });
    Object.defineProperty(exports, "FormattingHelpers", { enumerable: true, get: function () { return formattingHelpers_2.FormattingHelpers; } });
    Object.defineProperty(exports, "HostShellProxy", { enumerable: true, get: function () { return hostShell_1.HostShellProxy; } });
    Object.defineProperty(exports, "LocalHostShell", { enumerable: true, get: function () { return hostShell_2.LocalHostShell; } });
    Object.defineProperty(exports, "TokenType", { enumerable: true, get: function () { return TokenExtractor_1.TokenType; } });
    Object.defineProperty(exports, "HtmlRegexGroup", { enumerable: true, get: function () { return TokenExtractor_2.HtmlRegexGroup; } });
    Object.defineProperty(exports, "AssignmentRegexGroup", { enumerable: true, get: function () { return TokenExtractor_3.AssignmentRegexGroup; } });
    Object.defineProperty(exports, "TokenExtractor", { enumerable: true, get: function () { return TokenExtractor_4.TokenExtractor; } });
    Object.defineProperty(exports, "Notifications", { enumerable: true, get: function () { return Notifications_1.Notifications; } });
    exports.Controls = Controls;
});
//
// Copyright (C) Microsoft. All rights reserved.
//
//# sourceMappingURL=Bpt.Diagnostics.PerfTools.CommonMerged.js.map
// SIG // Begin signature block
// SIG // MIIoKAYJKoZIhvcNAQcCoIIoGTCCKBUCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // HRZWwKguevM8ZV4l3BWf/bAa/CDjAcwuOdmy4uwkE4+g
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoKMIIaBgIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCC1tKLK/t2GzSzOem2OxacZzcnHM6pveqPW
// SIG // jvPiHH3CeDBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAC+J/bGE
// SIG // xjNs/VC0c6aacikwCg7KWREXx1D/Ba/lEV0MPUwgsSHA
// SIG // 4a6jNv7av+ypoZ6SWBjWx6wCsi9BRh3zYzGuanD8+T/K
// SIG // TKizPOeyB4/bdGvi3fgskd39QtxrnOWl1svXuxPyqV4Q
// SIG // JFyHWZW4kNvuxggAF5yRIorYqpP/wXws9gDMsU13qLAz
// SIG // SstTXrbNHhhB0jUBhNrRlk4TznhlFtsjz2sX3mEcF78f
// SIG // tuyMxeByBxGUttX2s0+JTFlN+YSMMqQ+JTQlhZUJfiO/
// SIG // Uhif9RF2W9Yxs41zW6kCsIvWXXAe99mR2dpqsUJwvIGQ
// SIG // nqV/00AH0ZmHUspxV2SMYPnzgimhgheUMIIXkAYKKwYB
// SIG // BAGCNwMDATGCF4Awghd8BgkqhkiG9w0BBwKgghdtMIIX
// SIG // aQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQg3jilQSafZpyBHa5A+Bk2
// SIG // CVnATnhbLJAaW+QP+FX1xYwCBmUD12s0GxgTMjAyMzEw
// SIG // MDUxODAxNDUuNDg3WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkE0MDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR6jCCByAwggUIoAMCAQICEzMAAAHWJ2n/ci1WyK4A
// SIG // AQAAAdYwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjM0WhcN
// SIG // MjQwMjAxMTkxMjM0WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OkE0MDAtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAzyzNjpvK+bt33Gwx
// SIG // Dl8nSbW5FuVN+ChWn7QvvEMjaqZTCM0kwtU6BNM3MHkA
// SIG // rzyH6WLcjwd47enz0aa74cApLFMPadDn5mc1jw75LeNA
// SIG // VErbvNd0Ja5aEXaZS89saZNvYyDmePqwWymmZAT2eEeC
// SIG // 10IZJB53tGP2IfOWajDEWjFpATOp1MFeWg4sF6nRPScp
// SIG // dItWlmGwqs8AUXTewk5QCcayeO6L97n/5RYPYZ1UHKkG
// SIG // IEa0RaQzRTDj9IMM+TY+mtuBmZ3BRBkZisCJi/uSlj51
// SIG // YL2nSUkaemaq2FdxZmwZmbbBdIUpVYy0DvJ8XpRle076
// SIG // iCEiLL9m0DIFAVRM/MBxclN/Ot4B4/AQmxKSc5u+Xyyb
// SIG // C9z+upSVDUTewkbHzRGx3V/3eo6KVThcBe6Jpk0I6VN+
// SIG // wP+2EdMCQ07embF1Po/8GJaPW9trdalLYao0bN9qBn9k
// SIG // 0UwqEFi4SXt3ACGEZZWv4BCpW7gw7Bt/dusuBDBxcU47
// SIG // I63GRGw1sIwd8K6ddQ8oNUCnA8i1LNmpwaJb0MCUzdJj
// SIG // DrlzvLQc9tJ4P/l8PuMPlvTzJL1tX2mIuN+VYykWbB38
// SIG // SD4yM2dMH+BYm5lTyR2fmk8RrFST8cnQob7xgn+H3vF3
// SIG // 2GPT+ZW5/UnCnOGnU3eOBgqwZSfyTrKAODrzR2Olvl3C
// SIG // lXCCBlsCAwEAAaOCAUkwggFFMB0GA1UdDgQWBBRhmlQ2
// SIG // O00AYjAioNvo/80U3GLGTjAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // 1L/kYzYncCcUmzJNSL0vC38TTPFWlYacUdUpFvhUWOgC
// SIG // pJ9rNzp9vZxhFZWrW5SL9alUypK1MS2DGdM/kQOppn17
// SIG // ntmO/2AW8zOZFHlIFNstTJm4p+sWnU/Q8xAnhOxOPt5N
// SIG // g5mcblfhixWELKpA23vKMu/twUolNvasmQGE/b0QwCz1
// SIG // AuWcMqD5DXym6o5d1YBU6iLmxEK+ejNGHTFpagqqtMlZ
// SIG // Z/Zj24Rx81xzo2kLLq6IRwn+1U/HLe/aaN+BXfF3LKps
// SIG // oXSgctY3cpJ64pPhd7xJf/dKmqJ+TfCk2aBrThZWiRT5
// SIG // 2dg6kLW9llpH7gKBlqxkgONzMpe/j2G1LK4vzazLwHfW
// SIG // fifRZarDMF0BcQAe7oyYuIT/AR/I+qpJsuLrpVOUkkGu
// SIG // l5BJXGikGEqSXEo5I8kwyDqX+i2QU2hcennqKg2dJVEY
// SIG // YkajvtcqPLlzvPXupIAXgvLdVjeSE6l546HGIA78haab
// SIG // bFA4J0VIiNTP0JfztvfVZLTJCC+9oukHeAQbK492foix
// SIG // Jyj/XqVMKLD9Ztzdr/coV0NR4rrCZetyH1yMnwSWlr0A
// SIG // 4FNyZOHiGUq/9iiI+KbV7ePegkYh04tNdZHMA6XY0CwE
// SIG // Igr6I9absoX8FX9huWcAabSF4rzUW2t+CpA+aKphKBdc
// SIG // kRUPOIg7H/4Isp/1yE+2GP8wggdxMIIFWaADAgECAhMz
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
// SIG // ahC0HVUzWLOhcGbyoYIDTTCCAjUCAQEwgfmhgdGkgc4w
// SIG // gcsxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJTAjBgNVBAsTHE1p
// SIG // Y3Jvc29mdCBBbWVyaWNhIE9wZXJhdGlvbnMxJzAlBgNV
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjpBNDAwLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUA+a9w1UaQBkKP
// SIG // bEy1B3gQvOzaSvqggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOjJ
// SIG // WqswIhgPMjAyMzEwMDUxNTU0MTlaGA8yMDIzMTAwNjE1
// SIG // NTQxOVowdDA6BgorBgEEAYRZCgQBMSwwKjAKAgUA6Mla
// SIG // qwIBADAHAgEAAgIigTAHAgEAAgITizAKAgUA6MqsKwIB
// SIG // ADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZCgMC
// SIG // oAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqGSIb3
// SIG // DQEBCwUAA4IBAQAgN7Sy4hgEKLBgvUCi1Ua/ZHr19e7T
// SIG // Gc1OFlGrhxD4rJ0vMzHW+gD9HvpHJFOTpCf8Uo4OSwa2
// SIG // cSxobw0n+z+TjTmZ6+3jmojl5py1mzB18WHTD3ti6rMs
// SIG // ZijK0/j4o0rpStY2IqrBauMrwtzqqotmWn9iwvMb/f+Z
// SIG // Xl+6DwMh1bPupzkmQbxWhMuteYbCpmVNfhXb95EBLmok
// SIG // EIZIt0P+fUHsMfe89QP4NyWIF2/y8GP93Xn+mQm8ki9f
// SIG // qV6T4a2ViXvKpAPZjHUf5T7gvcUXijU//C/qoTFIU3of
// SIG // 7VFI5joC4DcqPp1o1FPMzFrXkVngqVprN0zYxujzrwXm
// SIG // 1I+vMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMCVVMx
// SIG // EzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1Jl
// SIG // ZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3Jh
// SIG // dGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3Rh
// SIG // bXAgUENBIDIwMTACEzMAAAHWJ2n/ci1WyK4AAQAAAdYw
// SIG // DQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJAzEN
// SIG // BgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQgbbVs
// SIG // AsNUEAjVbY7kTKWGWKRMGWqlU1Ff54rzOeRZmRowgfoG
// SIG // CyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDWy00NV3jT
// SIG // PhAYpzhCTI2XdIzDQ7q/gCvjvD9do+Uk/DCBmDCBgKR+
// SIG // MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5n
// SIG // dG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
// SIG // aWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1p
// SIG // Y3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMzAAAB
// SIG // 1idp/3ItVsiuAAEAAAHWMCIEIOQV+sm/t1lVnwIn+ud5
// SIG // Kx5Vab9Z7DLark/GNITFDWk3MA0GCSqGSIb3DQEBCwUA
// SIG // BIICAHBisBF58nTb9o7pYA8A8YbZW0qySIfsxC0sX2SJ
// SIG // RIp4uKC3p7x0n85t/OOcP5XrDnDpHwpLwti4hIDqwQ+Y
// SIG // IpMwEy1yV8tVTD8iozK33HHSYgYJWxIs8HFQqF2lF0zt
// SIG // ChIYULzvoq7N8lIzAb67uSRmBt9K9afXMYUnH+mj9O4i
// SIG // 1LZip7QYMzh83WzZHUIoD/54SdzYLdNNptZ9alvNrTKJ
// SIG // X6wbAYP5enqEX9/Lex/nXOKnYL/BtIzBsV7KF3KI18ME
// SIG // ifOm5GNN1fyvTtNmZntzoUZXVoXLmMxGqdi0w2CjefP9
// SIG // fOtbA6UaEDWHGcb+vSmhp1ibe4bQamyiyffa9JCS+Zc9
// SIG // W180i6+BXGW9rGXhEj41/6ls1xb06KbDF9WhAKBRw71W
// SIG // cTRPwVFIvUBsELLvkQJESizgHuyxhF1yvQ27y7nnVLib
// SIG // 4lPA/vReXabQ7H8v8a/zJN3wJS3XbsiYkY9iA3li34DU
// SIG // C4HJLAutSmQPbBhjnMjKvi7MnxFCyqFpY/cP+h/0BGUt
// SIG // lsEKk/H++Bnsax4f3mQIoH/Lnk0HBhvxWtlO3Zoj1ssL
// SIG // XBA/PpTiSp3qwGkqpeEe0rNR1+lPawyFjceQHztEmc/B
// SIG // dPcnef2sXYbMoowDbX2PJUmQR2hHiPvutiFW2cI4cgHg
// SIG // ug+MzZi/nETSiHBeAlYCiwm6nslL
// SIG // End signature block
