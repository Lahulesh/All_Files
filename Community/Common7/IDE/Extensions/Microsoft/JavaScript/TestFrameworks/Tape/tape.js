//@ts-check
"use strict";
var EOL = require('os').EOL;
var fs = require('fs');
var path = require('path');

function find_tests(testFileList, discoverResultFile, projectFolder) {
    return new Promise(resolve => {
        var test = findTape(projectFolder);
        if (test === null) {
            return resolve();
        }

        var harness = test.getHarness({ exit: false });
        var tests = harness['_tests'];

        var count = 0;
        var testList = [];
        testFileList.split(';').forEach(function (testFile) {
            var testCases = loadTestCases(testFile);
            if (testCases === null) return; // continue to next testFile

            for (; count < tests.length; count++) {
                var t = tests[count];
                t._skip = true; // don't run tests
                testList.push({
                    name: t.name,
                    suite: '',
                    filepath: testFile,
                    line: 0,
                    column: 0
                });
            }
        });

        var fd = fs.openSync(discoverResultFile, 'w');
        fs.writeSync(fd, JSON.stringify(testList));
        fs.closeSync(fd);

        resolve();
    });
}
module.exports.find_tests = find_tests;

function run_tests(context) {
    return new Promise(resolve => {
        var tape = findTape(context.testCases[0].projectFolder);
        if (tape === null) {
            return resolve();
        }

        // Since the test events don't come in order we store all of them in this array
        // in the 'onFinish' event we loop through them and process anything remaining.
        var testState = [];
        var harness = tape.getHarness({ objectMode: true });

        harness.createStream({ objectMode: true }).on('data', function (evt) {
            var result;

            switch (evt.type) {
                case 'test':
                    result = {
                        fullyQualifiedName: context.getFullyQualifiedName(evt.name),
                        passed: undefined,
                        stdout: '',
                        stderr: ''
                    };

                    testState[evt.id] = result;

                    // Test is starting. Reset the result object. Send a "test start" event.
                    context.post({
                        type: 'test start',
                        fullyQualifiedName: result.fullyQualifiedName
                    });
                    break;
                case 'assert':
                    result = testState[evt.test];
                    if (!result) { break; }

                    // Correlate the success/failure asserts for this test. There may be multiple per test
                    var msg = "Operator: " + evt.operator + ". Expected: " + evt.expected + ". Actual: " + evt.actual + ". evt: " + JSON.stringify(evt) + "\n";
                    if (evt.ok) {
                        result.stdout += msg;
                        result.passed = result.passed === undefined ? true : result.passed;
                    } else {
                        result.stderr += msg + (evt.error.stack || evt.error.message) + "\n";
                        result.passed = false;
                    }
                    break;
                case 'end':
                    result = testState[evt.test];
                    if (!result) { break; }
                    // Test is done. Send a "result" event.
                    context.post({
                        type: 'result',
                        fullyQualifiedName: result.fullyQualifiedName,
                        result
                    });
                    context.clearOutputs();
                    testState[evt.test] = undefined;
                    break;
                default:
                    break;
            }
        });

        loadTestCases(context.testCases[0].testFile);

        // Skip those not selected to run. The rest will start running on the next tick.
        harness['_tests'].forEach(function (test) {
            if (!context.testCases.some(function (ti) { return ti.fullyQualifiedName === context.getFullyQualifiedName(test.name); })) {
                test._skip = true;
            }
        });

        harness.onFinish(function () {
            // loop through items in testState
            for (var i = 0; i < testState.length; i++) {
                if (testState[i]) {
                    var result = testState[i];
                    if (!result.passed) { result.passed = false; }
                    //callback({
                    //    'type': 'result',
                    //    'fullyQualifiedName': result.fullyQualifiedName,
                    //    'result': result
                    //});
                }
            }

            context.post({
                type: 'end'
            });

            return resolve();
        });
    });
}
module.exports.run_tests = run_tests;

function loadTestCases(testFile) {
    try {
        process.chdir(path.dirname(testFile));
        return require(testFile);
    } catch (e) {
        // we would like continue discover other files, so swallow, log and continue;
        logError("Test discovery error:", e, "in", testFile);
        return null;
    }
}

function findTape(projectFolder) {
    try {
        var tapePath = path.join(projectFolder, 'node_modules', 'tape');
        return require(tapePath);
    } catch (e) {
        logError(
            'Failed to find Tape package.  Tape must be installed in the project locally.' + EOL +
            'Install Tape locally using the npm manager via solution explorer' + EOL +
            'or with ".npm install tape --save-dev" via the Node.js interactive window.');
        return null;
    }
}

function logError() {
    var errorArgs = Array.prototype.slice.call(arguments);
    errorArgs.unshift("NTVS_ERROR:");
    console.error.apply(console, errorArgs);
}

// SIG // Begin signature block
// SIG // MIIoKwYJKoZIhvcNAQcCoIIoHDCCKBgCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // gjp5QqLiFGebVvw1qZ5vDC5UXUyr4654DYT2PXLcKvag
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
// SIG // DQEJBDEiBCBgIROFDFuE4C0vBGzNLbKJjRdPRRITsp72
// SIG // 8xNptksDyTBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAL/D8miv
// SIG // 6QXRU6rksjUS3inPRHGUaTNdQUoA3JFwkcwZcKAxyNaG
// SIG // Ow8k5dIMoIL+4OnJAReZX7DPui8YV6UJI10Z3f4YCudk
// SIG // NwgNOm/v58Ovk/fshvRPfleYQmkrg7C3FGXc998mtRmH
// SIG // CBl8KxRnXZR1jUcnLVIqLVY3BlggBm1wf/ggwBgUstCz
// SIG // UzmJRqMehU5avdJr8Mx1AKfBpeuq/+vME81q5h0TPjzT
// SIG // hS/3L0VKPNMpDiqtHLLjkvx5je8WUC20c9I5x5xpN/4z
// SIG // RheKRK5EKELyEVVr1KvHN0z2+SoyXrsSd62Jwh/Iv5Ya
// SIG // FBkiPMKX8pVKihwxcSuScT1vgzKhgheXMIIXkwYKKwYB
// SIG // BAGCNwMDATGCF4Mwghd/BgkqhkiG9w0BBwKgghdwMIIX
// SIG // bAIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQgGqeSMqLztVAe//sRufKY
// SIG // i/fAnUJrlDC4XiK/2ta2fRgCBmULZVrI8BgTMjAyMzEw
// SIG // MDMwOTE4MTEuODc4WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOjM3MDMtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7TCCByAwggUIoAMCAQICEzMAAAHU5OkDL8CsaawA
// SIG // AQAAAdQwDQYJKoZIhvcNAQELBQAwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTAwHhcNMjMwNTI1MTkxMjI3WhcN
// SIG // MjQwMjAxMTkxMjI3WjCByzELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3Bl
// SIG // cmF0aW9uczEnMCUGA1UECxMeblNoaWVsZCBUU1MgRVNO
// SIG // OjM3MDMtMDVFMC1EOTQ3MSUwIwYDVQQDExxNaWNyb3Nv
// SIG // ZnQgVGltZS1TdGFtcCBTZXJ2aWNlMIICIjANBgkqhkiG
// SIG // 9w0BAQEFAAOCAg8AMIICCgKCAgEAmFPeLZsCJJd+d0ln
// SIG // o9cm1nEgG7vBS8ExLTr8N7lzKWtQ5w1w8G7ZC3PqE/AT
// SIG // bYvLft/E8JLX4KADPTfwTh8k+AqVwdR8J9WGKL7mLo6E
// SIG // FfZJslOg+kLbUyCje32U46DbSISOQgZMEvjJMAsHWjcs
// SIG // kr48D72bsR/ETXDjgfAAQ4SR/r8P43r/httBxNBsGnd9
// SIG // t8eLgOLS5BNHvcmg+8f7NRd5bezYuO6STBjC6mUAiu1A
// SIG // lHlmrlhfcGSDUOOfbUjyHv8SurbS8mB83dw3kUS8UD/+
// SIG // 3O6DyTwxYKWxgdh0SWhNKbkUQ6Igz+yScWK/kwRMYSNr
// SIG // pWVm4C+An1msMG9S7CZhViR26hq+qNIq1uyKg5H9qhGz
// SIG // EU9VlDNeReaAXOS4NfJW97FFu5ET7ysJn2kQZK5opdB/
// SIG // 7b9x2MhOgOPdGRRHD5Onc2ACnwnt7yqUVROHT6AylZwi
// SIG // 1Ey5KtX/6Z7g/2RhydnG7iHq/bpkGLvxc9Qwa3gvAkbN
// SIG // 8yZuPByEt623i1GLvwvd41SCTpaygL/6pmEcpow5qX82
// SIG // b37xgRlGzqcfuKH8KgUy7oQHzuxWc99/DbbIw86t7Ikd
// SIG // HD++KfVLjV9U6c+CmSzPBpc2S43t2h3w95rpazyDIqZ1
// SIG // agZJGNdmtrJbGyJY3t7qvAUq4+9uf8BwreB8l1uFoExj
// SIG // 4s8hMU0CAwEAAaOCAUkwggFFMB0GA1UdDgQWBBQ82ozH
// SIG // cLQGehKAeR3nXLK7tAx2STAfBgNVHSMEGDAWgBSfpxVd
// SIG // AF5iXYP05dJlpxtTNRnpcjBfBgNVHR8EWDBWMFSgUqBQ
// SIG // hk5odHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpb3Bz
// SIG // L2NybC9NaWNyb3NvZnQlMjBUaW1lLVN0YW1wJTIwUENB
// SIG // JTIwMjAxMCgxKS5jcmwwbAYIKwYBBQUHAQEEYDBeMFwG
// SIG // CCsGAQUFBzAChlBodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpb3BzL2NlcnRzL01pY3Jvc29mdCUyMFRpbWUt
// SIG // U3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNydDAMBgNVHRMB
// SIG // Af8EAjAAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMIMA4G
// SIG // A1UdDwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAgEA
// SIG // tMVDz/srcJLXUYWJWfQZOP2y8yzs6vsHAu1QGkUBxkUv
// SIG // iD8lP/Di4laF3KMiiiokUOyvXPdDnTPqi+D4syp0rSww
// SIG // bFk/nbNYWsjZE8J4VXGXgNRBipTWb3ZU7AlMSeQu8qGU
// SIG // JgPtpaZNODxo3BYR9YBkaYc/rXAzSvwrSifj6xLjY+7I
// SIG // JgaKfyRUHGMpoj/76/nbnaykHkrXE1fVtd3JthQ+Rf11
// SIG // jt+04vhuE4NQZFNuUQPrfEQlsvyB7oN662M6lHHVUau1
// SIG // IEZeNGCJEzZ7nKOp8u7xAZlhY3K+0pL6P0FrnjvDQLz9
// SIG // mSn90DH4nZh9cb8cfYfcFVOq7xEPz1CYt6aKWLK0CrqI
// SIG // KYXT6h2eY/TqEPhIwAlH4CZR55/BlWz1t8RqZQpF28hB
// SIG // 4XkDXf2t1/9s6UsBETjnMtWGnkKrn5RopQH9MuNABSql
// SIG // tkNck29fXEVwaUc22VTvkV1AeAOlC9RNV47c6/2/as/V
// SIG // OFDVfMMvGL/9O26d4QBX8QeJp9HPjzvmBb9mLFb2AE1S
// SIG // NpcC/UA0hLfBdEVui3pMT3725JlUkcD+qX+QFH5KqKCm
// SIG // uqX6kwp3aRk+9R8opbXpWjIUVLDVZGiswCa1KBEko+7E
// SIG // z9WRokvSYCPqdwDuX5zIbd5ixzIOvBrM0h+Fst71AyaY
// SIG // 1E2C7Wk1pELc+lKmTze1l4YwggdxMIIFWaADAgECAhMz
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
// SIG // BAsTHm5TaGllbGQgVFNTIEVTTjozNzAzLTA1RTAtRDk0
// SIG // NzElMCMGA1UEAxMcTWljcm9zb2Z0IFRpbWUtU3RhbXAg
// SIG // U2VydmljZaIjCgEBMAcGBSsOAwIaAxUALTNdlo6NscQO
// SIG // bHbswf9x3c2ZokiggYMwgYCkfjB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOjF
// SIG // tcIwIhgPMjAyMzEwMDIyMTMzNTRaGA8yMDIzMTAwMzIx
// SIG // MzM1NFowdzA9BgorBgEEAYRZCgQBMS8wLTAKAgUA6MW1
// SIG // wgIBADAKAgEAAgIyGQIB/zAHAgEAAgITczAKAgUA6McH
// SIG // QgIBADA2BgorBgEEAYRZCgQCMSgwJjAMBgorBgEEAYRZ
// SIG // CgMCoAowCAIBAAIDB6EgoQowCAIBAAIDAYagMA0GCSqG
// SIG // SIb3DQEBCwUAA4IBAQCYf0Qh+yVDadHOINK2QveIGZv/
// SIG // WG5MMzU/e83tj0WQCRgBhzaPe0ts6Lw0CSgvJWgQQJlx
// SIG // E0lrW7w/w0TcYNPo3rz7SQIFIJkmg96Dvv4+Y3N9YBKa
// SIG // 87RwBwyoe2H5chNxrb7IAySTRAAwvW8CKs4ExSUIqQBi
// SIG // de82n2N8LNOH6KtuyzjSzi6vUnAJ4CnLuNKmuZ9m6LCn
// SIG // fMEdjqJ2DyjZM1W/YWyIhtahFCuQtFX3UkwiGIPeiTKM
// SIG // Wv3P92SOvgKOycieIdAmQuD/e4DzpoEGi/EtqlbUL8MO
// SIG // sBimaX+pdNHBnA1sv9VolDDgmHtJ0T4mqtxAKUkcFxcI
// SIG // /Zt6rEWkMYIEDTCCBAkCAQEwgZMwfDELMAkGA1UEBhMC
// SIG // VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcT
// SIG // B1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
// SIG // b3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUt
// SIG // U3RhbXAgUENBIDIwMTACEzMAAAHU5OkDL8CsaawAAQAA
// SIG // AdQwDQYJYIZIAWUDBAIBBQCgggFKMBoGCSqGSIb3DQEJ
// SIG // AzENBgsqhkiG9w0BCRABBDAvBgkqhkiG9w0BCQQxIgQg
// SIG // HPBvNFSTVDHxHQlnELl71auBiym1wEagMv1b7B7idS0w
// SIG // gfoGCyqGSIb3DQEJEAIvMYHqMIHnMIHkMIG9BCDM6of6
// SIG // 2BSlzpc71kucQrT4vWlPnwVJMSK4l6dlkz1iNzCBmDCB
// SIG // gKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMT
// SIG // HU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAyMDEwAhMz
// SIG // AAAB1OTpAy/ArGmsAAEAAAHUMCIEIFExiQ6NDKpHtskf
// SIG // fSL5HQXGqizW6QdbY3YxZhCidLhAMA0GCSqGSIb3DQEB
// SIG // CwUABIICAAKK6ISNc6TI0M14yzC8wm3VWND4ys4VjsLH
// SIG // l3D3K3TB6ahQ9UU6ZnFfrCnENnr6k7LqkoNzbm7iZNoA
// SIG // CM4VG8Z0WEfE3wHHIOOzcZvqPe8/o/W7O+CTH9uh830v
// SIG // DmpjfziL/ACpvUPqgG8zlJXxoUk9RyK1ute+jUNWFlbC
// SIG // M6V2bVA7phPHXEkx9BWv6CW3m6Ne4hQr97y29zAn4uPE
// SIG // yeuaNMr9DJ8naBXcsVvH29Z43xf+6Qx8wXaBFOKtx2z6
// SIG // LCnlZDb6+lNff23ek2GulSUoECL2k1bnuIspJt3NUHUh
// SIG // I5CCTi0lPwctQVGywG01YVOWuXhyVTadvIOdTWygLEbV
// SIG // KeCzRZNVvlrGQwdG6gh9pwhXsFky6jEjTOrwvBiMW1wV
// SIG // YPmsG1HlA2/4G9FM1gDltBhUe3gHt0YkTQcaA7+vPdS4
// SIG // x5pN6sH0E/L0g8dXxmPHVqJ5PwzC8fhGPqY7EOO+MlQ7
// SIG // LsKAj/wgcxVtWMGUDx+3HrOVojroB2LNO0P4ExEY439C
// SIG // DRq/hhCLGh73D080ewnDTJZgAYfRAZViKrsh2eYItf0o
// SIG // I4Mnjy+BT3rCv8QHhAVNk53+Iz+8iylMYl4+FComXf2w
// SIG // fJpn6qrVjWFED/TJLcHrRtFFyLEUOS8o9sV9xp4tzE5x
// SIG // z1Abc23Jp5H51E3Wa6m952bQLu/LBzxJ
// SIG // End signature block
