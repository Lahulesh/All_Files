//
//  Copyright (c) Microsoft Corporation. All rights reserved.
//
'use strict';
GettingStartedDispatchObject.addEventListener("initialize", function (args) {
    var head = document.head;
    var script = document.createElement('script');
    var inlineScript = document.createTextNode(args.Script);
    script.appendChild(inlineScript);
    head.appendChild(script);
    document.body.innerHTML = args.Content;
    var _loop_1 = function (i) {
        var link = document.links[i];
        link.onclick = function () {
            welcomePageUtils.onClick(link.id, link.href);
            return false;
        };
    };
    // on click telemetry handlers
    for (var i = 0; i < document.links.length; i++) {
        _loop_1(i);
    }
    // remove simple page div
    document.getElementById('simple-page').style.display = 'none';
    if (isSharing) {
        document.getElementById('step-share').style.display = 'none';
        document.getElementById('step-joined-Debug').style.display = 'none';
        document.getElementById('step-joined-Edit').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
        document.getElementById('join-uri-copy-button').onclick = function () { return welcomePageUtils.copyLink(); };
    }
    else if (isJoinedAnonymously) {
        document.getElementById('step-share').style.display = 'none';
        document.getElementById('step-invite').style.display = 'none';
        document.getElementById('step-collaborate').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
        document.getElementById('sign-in-button').onclick = function () { return welcomePageUtils.onSignInClick(); };
    }
    else if (isJoined) {
        document.getElementById('step-share').style.display = 'none';
        document.getElementById('step-invite').style.display = 'none';
        document.getElementById('step-collaborate').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
    }
    else if (isShareButtonClickedFirstTimeAnonymously) {
        document.getElementById('join-uri').style.display = 'none';
        document.getElementById('join-uri-copy-button').style.display = 'none';
        document.getElementById('join-uri-box').style.display = 'none';
        document.getElementById('share-with-yourself-link').style.display = 'none';
        document.getElementById('step-joined-Debug').style.display = 'none';
        document.getElementById('step-joined-Edit').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('sign-in-button-before-share').onclick = function () { return welcomePageUtils.onSignInClickBeforeShare(); };
    }
    else {
        document.getElementById('join-uri').style.display = 'none';
        document.getElementById('join-uri-copy-button').style.display = 'none';
        document.getElementById('join-uri-box').style.display = 'none';
        document.getElementById('share-with-yourself-link').style.display = 'none';
        document.getElementById('step-joined-Debug').style.display = 'none';
        document.getElementById('step-joined-Edit').style.display = 'none';
        document.getElementById('step-sign-in').style.display = 'none';
        document.getElementById('step-sign-in-before-share').style.display = 'none';
    }
});
var Message = /** @class */ (function () {
    function Message(type, description, action) {
        if (description === void 0) { description = null; }
        if (action === void 0) { action = null; }
        this.type = type;
        this.description = description;
        this.action = action;
    }
    return Message;
}());
var WelcomePageUtils = /** @class */ (function () {
    function WelcomePageUtils() {
        this.windowExternal = window.external;
    }
    Object.defineProperty(WelcomePageUtils, "Instance", {
        get: function () {
            if (!WelcomePageUtils.singleton) {
                WelcomePageUtils.singleton = new WelcomePageUtils();
            }
            return WelcomePageUtils.singleton;
        },
        enumerable: false,
        configurable: true
    });
    WelcomePageUtils.prototype.copyLink = function () {
        var message = new Message('copyUrl');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.joinYourself = function () {
        var message = new Message('joinYourself');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.onClick = function (text, action) {
        var message = new Message('onClick', text, action);
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.onSignInClick = function () {
        var message = new Message('onSignInClick');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    WelcomePageUtils.prototype.onSignInClickBeforeShare = function () {
        var message = new Message('onSignInClickBeforeShare');
        if (GettingStartedDispatchObject) {
            GettingStartedDispatchObject.RaiseGettingStartedEvent(JSON.stringify(message));
        }
    };
    return WelcomePageUtils;
}());
var welcomePageUtils = WelcomePageUtils.Instance;
// disable right-click
document.oncontextmenu = function () { return false; };
//# sourceMappingURL=gettingStarted.js.map
// SIG // Begin signature block
// SIG // MIInwAYJKoZIhvcNAQcCoIInsTCCJ60CAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // VYgZQ3odJZDfQP4+wcxri7VLgb+VUVIOp2g2vv5pTfOg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghmiMIIZngIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCA/ksCmpPVWDa7gvm4KHjIip802cu+bUv3w
// SIG // 9+xTrmpjbzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAEIacpeV
// SIG // CHjl0W+3J8v8WwVvDdNqFHBwbLQpcycxNG0td2/NxzRd
// SIG // Gr6uXm8JV3lr7ALmdW/lXXIuGtFypFU6IrZVr+cyShzT
// SIG // CkFStKrG7SK1EaM3iZqvwNBg8HH0XveR6M5pJ1FsNaUq
// SIG // HZ7Svisw/PBh/vg/YcVxgkpGSVhLSra6IYqOGUTeLv0r
// SIG // OLDG4YYkrhaG4Xk7sSO4kffr2aLqCH5VKETXjjn2204O
// SIG // ACqEJxB4aykG+cPtW2MxnGNdqqN7+qqXaB6Mvhhqq8WU
// SIG // RliasnzpwCHrO31GHJLSNZIu5ANa/INWbYbJNbacxSgf
// SIG // fW+EO1tL6GrFn1GPm84b8aDRlQChghcsMIIXKAYKKwYB
// SIG // BAGCNwMDATGCFxgwghcUBgkqhkiG9w0BBwKgghcFMIIX
// SIG // AQIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBWQYLKoZIhvcN
// SIG // AQkQAQSgggFIBIIBRDCCAUACAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgv7/cFuTYfdFCXG6YHyYz
// SIG // K/J42lU4x2ucKZjiZuVbGrUCBmTfzk/zixgTMjAyMzA5
// SIG // MjAxNjU5MTAuMTI0WjAEgAIB9KCB2KSB1TCB0jELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjEtMCsGA1UECxMkTWljcm9zb2Z0
// SIG // IElyZWxhbmQgT3BlcmF0aW9ucyBMaW1pdGVkMSYwJAYD
// SIG // VQQLEx1UaGFsZXMgVFNTIEVTTjpEMDgyLTRCRkQtRUVC
// SIG // QTElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaCCEXswggcnMIIFD6ADAgECAhMzAAABuh8/
// SIG // GffBdb18AAEAAAG6MA0GCSqGSIb3DQEBCwUAMHwxCzAJ
// SIG // BgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
// SIG // DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
// SIG // ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29m
// SIG // dCBUaW1lLVN0YW1wIFBDQSAyMDEwMB4XDTIyMDkyMDIw
// SIG // MjIxOVoXDTIzMTIxNDIwMjIxOVowgdIxCzAJBgNVBAYT
// SIG // AlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQH
// SIG // EwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29y
// SIG // cG9yYXRpb24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVs
// SIG // YW5kIE9wZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMd
// SIG // VGhhbGVzIFRTUyBFU046RDA4Mi00QkZELUVFQkExJTAj
// SIG // BgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZp
// SIG // Y2UwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQCIThWDM5I1gBPVFZ1xfYURr9MQUcXPiOR7t4cVRV8i
// SIG // t7t/MbrBG9KS5MI4BrQ7Giy265TMal97RW/9wYBDxAty
// SIG // 9MF++oA/Mx7fsIgVeZquQVqKdvaka4DCSigj3KUJ0o7P
// SIG // Qf+FzBRb66XT4nGQ7+NxS4M/Xx6jKtCyQ8OSQBxg0t9E
// SIG // wmPTheNz+HeOGfZROwmlUtqSTBdy+OdzFwecmCvyg24p
// SIG // YRET9Y8Z9spfrRgkYLiALDBtKHjoV2sPLkhjoUugAkh2
// SIG // /nm4tNN/DBR8qEzYSn/kmKODqUmN8T+PrMAQUyg6GD9c
// SIG // B/gn8RuofX8pgSUD0GWqn5dK4ogy45g7p0LR9Rg+uAIq
// SIG // +ZPSXcIaucC5kll48hVS/iA3zqXYsSen+aPjIROh+Ld9
// SIG // cPqa8oB5ndlB0Oue1BsehTbs8AvkqQB5le+jGWGnOLgI
// SIG // U4Gj+Oz9nnktaHJL8oZfcmvvScz3zJLoN8Xr8xQA1oi0
// SIG // TK9OuhDFe6tyUkQLJwkvRkNPAuBSj20ofDjzN9y54NH3
// SIG // 8QDZxwAF/wxO3B3Me5fY2ldwHJpI+6Koq+BIdruWMcIm
// SIG // kxN+12jLpl9hEtzyeTQWl6u2HSycMkg/lPaZP7ZeHUNb
// SIG // fxHqO7g05YjskJA/CO+MaVQdE99f+uyh35AZBVb8usMn
// SIG // ttVfvSAvLkg/vkYA90cLTdpBPwIDAQABo4IBSTCCAUUw
// SIG // HQYDVR0OBBYEFIpi5vEDHiWtuY/TFnmmyNh0r2TlMB8G
// SIG // A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8G
// SIG // A1UdHwRYMFYwVKBSoFCGTmh0dHA6Ly93d3cubWljcm9z
// SIG // b2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUyMFRp
// SIG // bWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggr
// SIG // BgEFBQcBAQRgMF4wXAYIKwYBBQUHMAKGUGh0dHA6Ly93
// SIG // d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2VydHMvTWlj
// SIG // cm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAo
// SIG // MSkuY3J0MAwGA1UdEwEB/wQCMAAwFgYDVR0lAQH/BAww
// SIG // CgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQDAgeAMA0GCSqG
// SIG // SIb3DQEBCwUAA4ICAQBfyPFOoW2Ybw3J/ep2erZG0hI1
// SIG // z7ymesK6Gl3ILLRIaYGnhMJXi7j1xy8xFrbibmM+HrIZ
// SIG // oV6ha+PZWwHF+Ujef3BLD9MXRWsm+1OT/eCWXdx4xb6V
// SIG // kTaDQYRd0gzNAN/LCNh/oY4Qf1X19V3GYnotUTjwMgh3
// SIG // AYBy8kKxLupp29x4WyHa/IdE2u1hcpRoS0hVusJsyrrD
// SIG // +mjpZpxkmnOTTH5WupUb02B3dvK22woH0ptUYU4KGY/l
// SIG // vA0yrYhDMLmxyd5iDypqPMbSSFlz516ulyoJXay+XMpy
// SIG // zF/9Fl+uTrlmx1eRkxC3X1rxldw2maxz1EP1D99Snqm9
// SIG // sY1Qm99C1cIG4yL2Eu+zdXQEZDfBf/aSdYDuCL2VjMMj
// SIG // JSihRqIztX9cG40lnAP+e7bHPrdm5azFoEjR4Mw69NY2
// SIG // z0rqUY8tx7fWWbOMTdNnol93htveza7QupeHP4M59tHq
// SIG // qKlsf7h1sZk4AdBeaLAbkxznu+w8hANLoQKxpYCj/dY4
// SIG // IYLfzlR6B+uYNEKgrYGft+ppwhIOiDoRaBawnNHyRRlZ
// SIG // m9fte4BHvh0TDO4wZODtOifiKKBayN3tzyYz60Gp6PzM
// SIG // hN4fswLgVhjA0XFJTSgg1O3Rp1rx911sC6wgiHM/txsE
// SIG // VDLC7A3T1tjlb+79XhCYjEiGdj/jOy9tEPGs51ODgDCC
// SIG // B3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUw
// SIG // DQYJKoZIhvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xMjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRp
// SIG // ZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTIxMDkzMDE4
// SIG // MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUA
// SIG // A4ICDwAwggIKAoICAQDk4aZM57RyIQt5osvXJHm9DtWC
// SIG // 0/3unAcH0qlsTnXIyjVX9gF/bErg4r25PhdgM/9cT8dm
// SIG // 95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNE
// SIG // t6aORmsHFPPFdvWGUNzBRMhxXFExN6AKOG6N7dcP2CZT
// SIG // fDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6GnszrYBbfowQ
// SIG // HJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5
// SIG // LFGc6XBpDco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVV
// SIG // mG1oO5pGve2krnopN6zL64NF50ZuyjLVwIYwXE8s4mKy
// SIG // zbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpG
// SIG // dc3EXzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2
// SIG // TPYrbqgSUei/BQOj0XOmTTd0lBw0gg/wEPK3Rxjtp+iZ
// SIG // fD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1q
// SIG // GFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSL
// SIG // W6CmgyFdXzB0kZSU2LlQ+QuJYfM2BjUYhEfb3BvR/bLU
// SIG // HMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PAPBXb
// SIG // GjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQID
// SIG // AQABo4IB3TCCAdkwEgYJKwYBBAGCNxUBBAUCAwEAATAj
// SIG // BgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxGNSnPEP8v
// SIG // BO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1Gely
// SIG // MFwGA1UdIARVMFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYI
// SIG // KwYBBQUHAgEWM2h0dHA6Ly93d3cubWljcm9zb2Z0LmNv
// SIG // bS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNV
// SIG // HSUEDDAKBggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4K
// SIG // AFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/
// SIG // BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2U
// SIG // kFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
// SIG // KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jv
// SIG // b0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwU
// SIG // tj5OR2R4sQaTlz0xM7U518JxNj/aZGx80HU5bbsPMeTC
// SIG // j/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmCVgADsAW+
// SIG // iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhT
// SIG // dSRXud2f8449xvNo32X2pFaq95W2KFUn0CS9QKC/GbYS
// SIG // EhFdPSfgQJY4rPf5KYnDvBewVIVCs/wMnosZiefwC2qB
// SIG // woEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0
// SIG // DLzskYDSPeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxy
// SIG // bxCrdTDFNLB62FD+CljdQDzHVG2dY3RILLFORy3BFARx
// SIG // v2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+k
// SIG // KNxnGSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2
// SIG // tVdUCbFpAUR+fKFhbHP+CrvsQWY9af3LwUFJfn6Tvsv4
// SIG // O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokL
// SIG // jzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTm
// SIG // dHRbatGePu1+oDEzfbzL6Xu/OHBE0ZDxyKs6ijoIYn/Z
// SIG // cGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggLXMIIC
// SIG // QAIBATCCAQChgdikgdUwgdIxCzAJBgNVBAYTAlVTMRMw
// SIG // EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRt
// SIG // b25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
// SIG // b24xLTArBgNVBAsTJE1pY3Jvc29mdCBJcmVsYW5kIE9w
// SIG // ZXJhdGlvbnMgTGltaXRlZDEmMCQGA1UECxMdVGhhbGVz
// SIG // IFRTUyBFU046RDA4Mi00QkZELUVFQkExJTAjBgNVBAMT
// SIG // HE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2WiIwoB
// SIG // ATAHBgUrDgMCGgMVAHajR3tdd4AifO2mSBmuUAVKiMLy
// SIG // oIGDMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTAwDQYJKoZIhvcNAQEFBQACBQDotSJbMCIYDzIwMjMw
// SIG // OTIwMTU0ODQzWhgPMjAyMzA5MjExNTQ4NDNaMHcwPQYK
// SIG // KwYBBAGEWQoEATEvMC0wCgIFAOi1IlsCAQAwCgIBAAIC
// SIG // BlcCAf8wBwIBAAICETswCgIFAOi2c9sCAQAwNgYKKwYB
// SIG // BAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAqAKMAgCAQAC
// SIG // AwehIKEKMAgCAQACAwGGoDANBgkqhkiG9w0BAQUFAAOB
// SIG // gQCDWLZaWX3Hx+OzUggWqJ3OHY+NnTr0l2MVJJT3vrOV
// SIG // czQWFWRAdOGHDDB9glghagAZ/BQikK5WRZCq2eSTEiIo
// SIG // xNm0DvvgWyAG3zcMmROqUVv2dG+V4MMHMU+q+lFYtf45
// SIG // kBQaNjJ+cwTwZRhL+dX+UL1uqyIrtQ5njvHUXLGfATGC
// SIG // BA0wggQJAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwAhMzAAABuh8/GffBdb18AAEAAAG6MA0GCWCG
// SIG // SAFlAwQCAQUAoIIBSjAaBgkqhkiG9w0BCQMxDQYLKoZI
// SIG // hvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIH89kIOQb1qu
// SIG // Mj/MaZvbddrqKWSLLjW4uxm+w8/4C9enMIH6BgsqhkiG
// SIG // 9w0BCRACLzGB6jCB5zCB5DCBvQQgKVW9PDNucPrWBlrJ
// SIG // pRradYMtZz3Kln6oDBd55VmFcwUwgZgwgYCkfjB8MQsw
// SIG // CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQ
// SIG // MA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9z
// SIG // b2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAbofPxn3
// SIG // wXW9fAABAAABujAiBCDcY6H9BsEh54PTXNVVFSvc02Wm
// SIG // WYutdl0yVHsgkFTjPjANBgkqhkiG9w0BAQsFAASCAgAz
// SIG // 6AQwHM16HTx7nQQ8+/EwJDpbK5JPAYERqpHv3sXutywp
// SIG // rZQcjUp+UGJ12X42oXTmavNw4ZjvRJjat2JAjVnfF2Wt
// SIG // uGgignY2tiiETAgk45qR8bp0RFdcigFAn4I8rsOqjn+2
// SIG // /0nRVQfihhdnmMsMsJEjbf7tsowHBGJcyWIsvYptKVoI
// SIG // FcnYiHhUsev+X9MzMKKb6wYDb96bme7o3EGkjnIP5Lyd
// SIG // bKVDKZAz45hRWD5IVy6wVJAV/RmXZc3ZX96Rv+0WaHNS
// SIG // TKHG1PdkM2MHk0LxqSnBcsVEOI4EyCrrZCopWxGrLcLc
// SIG // UOSVuCWKpN8YHgY8ktZCYc/dqvPZdOPV0OnojTIZ4se9
// SIG // gAALrXKkvwPupx43KGrZ0sPop4KcvXyCL5BfjbJQnb/R
// SIG // OlEsVNc79mPMB/71OEgLEBBnBtKuN+6QOvtNQUReCz+B
// SIG // cZ8Ii63NMb/QN9XKwFn/gG/Jib9diQjd8blbDU6xZMgw
// SIG // wKw90e7n2zwXMDwiIlO8BYRGek1WTScueT95WbW9RD6g
// SIG // Guz0MJnuf86CbD5+g6+2YgDZyoBzFnGA0qdbJeB6iKVB
// SIG // O1PvsxGupwBBNYzfKd8p7YASQmjx6Jhd/XAfRvm5nt48
// SIG // 8RIXMwTBNoB3zO+PVJgOy7cBqDA9stnukx7Sd+euFCua
// SIG // jk7Kj0WPxpaIzwvUCta1Ag==
// SIG // End signature block
