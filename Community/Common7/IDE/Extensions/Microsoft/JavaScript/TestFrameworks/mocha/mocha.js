// @ts-check
"use strict";
var EOL = require('os').EOL;
var fs = require('fs');
var path = require('path');
// Choose 'tap' rather than 'min' or 'xunit'. The reason is that
// 'min' produces undisplayable text to stdout and stderr under piped/redirect, 
// and 'xunit' does not print the stack trace from the test.
var defaultMochaOptions = { ui: 'tdd', reporter: 'tap', timeout: 2000 };

var find_tests = function (testFileList, discoverResultFile, projectFolder) {
    return new Promise(resolve => {
        var Mocha = detectMocha(projectFolder);
        if (!Mocha) {
            return resolve();
        }

        function getTestList(suite, testFile) {
            if (suite) {
                if (suite.tests && suite.tests.length !== 0) {
                    suite.tests.forEach(function (t, i, testArray) {
                        testList.push({
                            name: t.title,
                            suite: suite.fullTitle(),
                            filepath: testFile,
                            line: 0,
                            column: 0
                        });
                    });
                }

                if (suite.suites) {
                    suite.suites.forEach(function (s, i, suiteArray) {
                        getTestList(s, testFile);
                    });
                }
            }
        }

        var testList = [];
        testFileList.split(';').forEach(function (testFile) {
            var mocha = initializeMocha(Mocha, projectFolder);
            process.chdir(path.dirname(testFile));

            try {
                mocha.addFile(testFile);
                mocha.loadFiles();
                getTestList(mocha.suite, testFile);
            } catch (e) {
                //we would like continue discover other files, so swallow, log and continue;
                console.error("Test discovery error:", e, "in", testFile);
            }
        });

        var fd = fs.openSync(discoverResultFile, 'w');
        fs.writeSync(fd, JSON.stringify(testList));
        fs.closeSync(fd);

        resolve();
    });
};

module.exports.find_tests = find_tests;

var run_tests = function (context) {
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    return new Promise(resolve => {
        var Mocha = detectMocha(context.testCases[0].projectFolder);
        if (!Mocha) {
            return resolve();
        }

        var mocha = initializeMocha(Mocha, context.testCases[0].projectFolder);

        var testGrepString = '^(' + context.testCases.map(function (testCase) {
            return escapeRegExp(testCase.fullTitle);
        }).join('|') + ')$';

        if (testGrepString) {
            mocha.grep(new RegExp(testGrepString));
        }
        mocha.addFile(context.testCases[0].testFile);

        var runner = mocha.run(function (code) {
            process.exitCode = code ? code : 0;
        });

        // See events available at https://github.com/mochajs/mocha/blob/8cae7a34f0b6eafeb16567beb8852b827cc5956b/lib/runner.js#L47-L57
        runner.on('pending', function (test) {
            const fullyQualifiedName = context.getFullyQualifiedName(test.fullTitle());
            context.post({
                type: 'pending',
                fullyQualifiedName,
                result: {
                    fullyQualifiedName,
                    pending: true
                }
            });
            context.clearOutputs();
        });

        runner.on('test', function (test) {
            context.post({
                type: 'test start',
                fullyQualifiedName: context.getFullyQualifiedName(test.fullTitle())
            });
        });

        runner.on('end', function () {
            context.post({
                type: 'end'
            });

            resolve();
        });

        runner.on('pass', function (test) {
            const fullyQualifiedName = context.getFullyQualifiedName(test.fullTitle());

            context.post({
                type: 'result',
                fullyQualifiedName,
                result: {
                    fullyQualifiedName,
                    passed: true
                }
            });
            context.clearOutputs();
        });

        runner.on('fail', function (test, err) {
            const fullyQualifiedName = context.getFullyQualifiedName(test.fullTitle());

            context.post({
                type: 'result',
                fullyQualifiedName,
                result: {
                    fullyQualifiedName,
                    passed: false
                }
            });
            context.clearOutputs();
        });
    });
};

function logError() {
    var errorArgs = Array.prototype.slice.call(arguments);
    errorArgs.unshift("NTVS_ERROR:");
    console.error.apply(console, errorArgs);
}

function detectMocha(projectFolder) {
    try {
        var node_modulesFolder = projectFolder;
        var mochaJsonPath = path.join(node_modulesFolder, 'test', 'mocha.json');
        if (fs.existsSync(mochaJsonPath)) {
            var opt = require(mochaJsonPath);
            if (opt && opt.path) {
                node_modulesFolder = path.resolve(projectFolder, opt.path);
            }
        }

        var mochaPath = path.join(node_modulesFolder, 'node_modules', 'mocha');
        var Mocha = require(mochaPath);
        return Mocha;
    } catch (ex) {
        logError(
            'Failed to find Mocha package.  Mocha must be installed in the project locally.' + EOL +
            'Install Mocha locally using the npm manager via solution explorer' + EOL +
            'or with ".npm install mocha --save-dev" via the Node.js interactive window.');
        return null;
    }
}

function initializeMocha(Mocha, projectFolder) {
    var mocha = new Mocha();
    applyMochaOptions(mocha, getMochaOptions(projectFolder));
    return mocha;
}

function applyMochaOptions(mocha, options) {
    if (options) {
        for (var opt in options) {
            var mochaOpt = mocha[opt];
            var optValue = options[opt];

            if (typeof mochaOpt === 'function') {
                try {
                    mochaOpt.call(mocha, optValue);
                } catch (e) {
                    console.log("Could not set mocha option '" + opt + "' with value '" + optValue + "' due to error:", e);
                }
            }
        }
    }
}

function getMochaOptions(projectFolder) {
    var mochaOptions = defaultMochaOptions;
    try {
        var optionsPath = path.join(projectFolder, 'test', 'mocha.json');
        var options = require(optionsPath) || {};
        for (var opt in options) {
            mochaOptions[opt] = options[opt];
        }
        console.log("Found mocha.json file. Using Mocha settings: ", mochaOptions);
    } catch (ex) {
        console.log("Using default Mocha settings");
    }

    // set timeout to 10 minutes, because the default of 2 sec is too short for debugging scenarios
    if (typeof v8debug === 'object') {
        mochaOptions['timeout'] = 600000;
    }

    return mochaOptions;
}

module.exports.run_tests = run_tests;
// SIG // Begin signature block
// SIG // MIIoKgYJKoZIhvcNAQcCoIIoGzCCKBcCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // +t7HlAUsJCRV31OHF0Fw80Msm15+G4PjnqeVDhBjqDOg
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
// SIG // a/15n8G9bW1qyVJzEw16UM0xghoMMIIaCAIBATCBlTB+
// SIG // MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3Rv
// SIG // bjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWlj
// SIG // cm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNy
// SIG // b3NvZnQgQ29kZSBTaWduaW5nIFBDQSAyMDExAhMzAAAD
// SIG // TrU8esGEb+srAAAAAANOMA0GCWCGSAFlAwQCAQUAoIGu
// SIG // MBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEEMBwGCisG
// SIG // AQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMC8GCSqGSIb3
// SIG // DQEJBDEiBCCl2oSVCJtRe/O/1sutiTxZ0D7OXF0FnCFn
// SIG // o5Ajta/IwzBCBgorBgEEAYI3AgEMMTQwMqAUgBIATQBp
// SIG // AGMAcgBvAHMAbwBmAHShGoAYaHR0cDovL3d3dy5taWNy
// SIG // b3NvZnQuY29tMA0GCSqGSIb3DQEBAQUABIIBAEmagB98
// SIG // vxRYxhMdKxnyuy0+YLCKA6c9rlr1vo0HWvGzRBly7PmC
// SIG // hoTKQkpe3jRB5vfN++PbwY+4t8tlDlMRI7FudxBgAsyB
// SIG // gA02cYQGiPcHgcLGqhNKPgnVFHILBQpac/XJEYufqC8F
// SIG // PNJjAH1EJds7D6xD41t2+SysDSiy5asrSHrU1OVKurip
// SIG // b5MRLkWeggQJuUOfSibjXr7ENMvpEwZrfebU+B/5NmHy
// SIG // L3CM4PWPEVIpEBord+FUoKGmrkPaATNQsMD8s0IMYcLN
// SIG // vrNXEb4FrfV0I8Je/hctUg7aLuXRMz9JwNiqJ1guNc1O
// SIG // O9wZdRD+9g+nGddXkCdfxfkMEluhgheWMIIXkgYKKwYB
// SIG // BAGCNwMDATGCF4Iwghd+BgkqhkiG9w0BBwKgghdvMIIX
// SIG // awIBAzEPMA0GCWCGSAFlAwQCAQUAMIIBUgYLKoZIhvcN
// SIG // AQkQAQSgggFBBIIBPTCCATkCAQEGCisGAQQBhFkKAwEw
// SIG // MTANBglghkgBZQMEAgEFAAQg641gOB4AUr+wOZt/ry0l
// SIG // ovMOYePM2w0HItmFhULSIZQCBmUD1yueORgTMjAyMzEw
// SIG // MDMwOTE4MTEuNDI0WjAEgAIB9KCB0aSBzjCByzELMAkG
// SIG // A1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAO
// SIG // BgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29m
// SIG // dCBDb3Jwb3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0
// SIG // IEFtZXJpY2EgT3BlcmF0aW9uczEnMCUGA1UECxMeblNo
// SIG // aWVsZCBUU1MgRVNOOkE0MDAtMDVFMC1EOTQ3MSUwIwYD
// SIG // VQQDExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNl
// SIG // oIIR7DCCByAwggUIoAMCAQICEzMAAAHWJ2n/ci1WyK4A
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
// SIG // ahC0HVUzWLOhcGbyoYIDTzCCAjcCAQEwgfmhgdGkgc4w
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
// SIG // dGFtcCBQQ0EgMjAxMDANBgkqhkiG9w0BAQsFAAIFAOjG
// SIG // DuwwIhgPMjAyMzEwMDMwMzU0MjBaGA8yMDIzMTAwNDAz
// SIG // NTQyMFowdjA8BgorBgEEAYRZCgQBMS4wLDAKAgUA6MYO
// SIG // 7AIBADAJAgEAAgENAgH/MAcCAQACAhNDMAoCBQDox2Bs
// SIG // AgEAMDYGCisGAQQBhFkKBAIxKDAmMAwGCisGAQQBhFkK
// SIG // AwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
// SIG // hvcNAQELBQADggEBAAe/PPmHe7TJFusjHbPu1EkOdPyB
// SIG // zrByJJWnDj+kbwncDc6+82PxIzQKKcqb23zzzw/BapSE
// SIG // BlzZLP2E0lQzMvp2HAwhq3Le2yTu7g8XAD0Q8CntAI9b
// SIG // 9Gemwe+4b+87a07EW6JR5ct7a8A0QpQOHjpdvHjIksLj
// SIG // t1roJSwscuKYwk8hkYQkg38VxYpImOIk5aiyRqrMZG70
// SIG // m2rzMLyRYtVVG4S0sXe9rW01djN+sbzKrCiM0aUgIaSH
// SIG // XKua+v//oY+8n/ctttHyZx/wN69RDMxRoKbEZLA8NkPY
// SIG // SXwwOYqUeTl1lIgyNVersXrgJL8V1btvD3gTa4p1FlkT
// SIG // ZrcTuEoxggQNMIIECQIBATCBkzB8MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQgVGltZS1T
// SIG // dGFtcCBQQ0EgMjAxMAITMwAAAdYnaf9yLVbIrgABAAAB
// SIG // 1jANBglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkD
// SIG // MQ0GCyqGSIb3DQEJEAEEMC8GCSqGSIb3DQEJBDEiBCCi
// SIG // Jnmvdb3jeBCb8YUlJ7b9t85OSZ1XH9jnWYq9PeBrCjCB
// SIG // +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EINbLTQ1X
// SIG // eNM+EBinOEJMjZd0jMNDur+AK+O8P12j5ST8MIGYMIGA
// SIG // pH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
// SIG // bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoT
// SIG // FU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMd
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIwMTACEzMA
// SIG // AAHWJ2n/ci1WyK4AAQAAAdYwIgQg8MSn5SProGPbb3xe
// SIG // AmXsVp4Id51hZ6QOIN2ZPQVag5gwDQYJKoZIhvcNAQEL
// SIG // BQAEggIACTF9slUKa4aN7+dGYdHNZTkhf1orKENQfeyZ
// SIG // w8UMpaDg85vZBdUWRPyh2lqINfcNWQ6lF8+gNJxWnWqW
// SIG // eaYOgo68gnxwAy6V/esd2Zfnm7vPkwO46JAIM1DWMqlC
// SIG // stpt4F+PpNuwEVjKgXLfkWnfCdPGJbvfwNhcXqkYHrpI
// SIG // yTmqrTY7ctp5P92bs6g5tKCLCk8GsDiPUqV/D6yd7UeR
// SIG // QOMpF/tn/LRKnOsTaLc2C/ensZzMttYrvb1Lpu/dpo6S
// SIG // NHmroFh8BtwRaOg1f49ORqcGCwQN1Pc50sbH0NmwaFoY
// SIG // qv8t7ZN1OZEfjKtJUggv5jFN3C9gat+szMMoqXleb3RV
// SIG // BByLq5BWcLNWesyx2r9bAYndOCUbdYGF38m+x1CCSyN3
// SIG // BReFb+B7FjBI/bFjLWkQaLbm3HxfMxZdz9DNAlDsGqmU
// SIG // lKGYCERKTXwQXdmGdOFBUX5DtVycXpOZuCMtabITVX3N
// SIG // ZBVbcc59R+eBwgXpzSZwPqinkk7gb0wbM1B0kmoejzEq
// SIG // 2VI1co18PyAVZu+i18Rt1MXR7dp9CiNWugMYW3bKlGJN
// SIG // mlUWsBiqwdZ+0tFCNwCqQZ0cjuUXZv8dZFYTp6OY+68b
// SIG // 9cSQ50lveGPSKvpEZeBybf42lGEOfmESW2W8ZyiH0JPi
// SIG // VIL7typ5ZzuJwEOES3bXXkwJt0WS+E0=
// SIG // End signature block
