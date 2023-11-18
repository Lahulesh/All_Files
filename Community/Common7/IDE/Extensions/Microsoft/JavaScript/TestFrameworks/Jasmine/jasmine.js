// @ts-check
"use strict";

var EOL = require("os").EOL;
var fs = require("fs");
var path = require("path");

var defaultJasmineOptions = {};

function logError(...args) {
    var errorArgs = Array.prototype.slice.call(arguments);
    errorArgs.unshift("NTVS_ERROR:");
    console.error.apply(console, errorArgs);
}

function getJasmineOptionsPath(projectFolder) {
    return path.join(projectFolder, "test", "jasmine.json");
}

function detectJasmine(projectFolder) {
    try {
        var node_modulesFolder = path.join(projectFolder, "node_modules");
        var options = loadJsonOptions(getJasmineOptionsPath(projectFolder));
        if (options && options.path) {
            node_modulesFolder = path.resolve(projectFolder, options.path);
        }
        return require(path.join(node_modulesFolder, "jasmine"));
    }
    catch (ex) {
        logError('Failed to find Jasmine package. Jasmine must be installed in the project locally.' + EOL +
            'Install Jasmine locally using the npm manager via solution explorer' + EOL +
            'or with ".npm install jasmine --save-dev" via the Node.js interactive window.');
    }
    return null;
}

function loadJsonOptions(optionsPath) {
    if (fs.existsSync(optionsPath)) {
        return require(optionsPath);
    }
}

function loadJasmineOptions(projectFolder) {
    var options = loadJsonOptions(getJasmineOptionsPath(projectFolder));
    if (options && options.configFile) {
        var optionsPath = path.join(projectFolder, "test", options.configFile);
        options = loadJsonOptions(optionsPath);
    }
    return options;
}

function mergeOptions(target, source) {
    for (var opt in source) {
        target[opt] = source[opt];
    }
}

function getJasmineOptions(projectFolder) {
    var jasmineOptions = defaultJasmineOptions;
    try {
        var options = loadJasmineOptions(projectFolder);
        options && mergeOptions(jasmineOptions, options);
        options && console.log("Found jasmine.json file.");
    }
    catch (ex) {
        console.error("Failed to load Jasmine setting, using default settings.", ex);
    }
    console.log("Using Jasmine settings: ", jasmineOptions);
    return jasmineOptions;
}

function applyJasmineOptions(jasmineInstance, options) {
    if (options) {
        jasmineInstance.loadConfig(options);
    }
}

function initializeJasmine(Jasmine, projectFolder) {
    var instance = new Jasmine();
    applyJasmineOptions(instance, getJasmineOptions(projectFolder));
    return instance;
}

/**
 * @param {jasmine.Suite} suite
 * @param {object[]} testList
 * @param {string} testFile
 */
function enumerateSpecs(suite, testList, testFile) {
    suite.children.forEach((child) => {
        if (child instanceof jasmine.Suite) {
            enumerateSpecs(child, testList, testFile);
        } else {
            testList.push({
                name: child.description,
                suite: suite.description === "Jasmine__TopLevel__Suite" ? null : suite.getFullName(),
                filepath: testFile,
                line: 0,
                column: 0
            });
        }
    });
}

/**
 * @param {string} testFileList
 * @param {string} discoverResultFile
 * @param {string} projectFolder
 */
async function find_tests(testFileList, discoverResultFile, projectFolder) {
    var Jasmine = detectJasmine(projectFolder);
    if (!Jasmine) {
        return;
    }
    
    var jasmineInstance = initializeJasmine(Jasmine, projectFolder);
    setSpecFilter(jasmineInstance, _ => false);

    var testList = [];
    for (var testFile of testFileList.split(";")) {
        try {
            jasmineInstance.specDir = "";
            jasmineInstance.specFiles = [];

            // In Jasmine 4.0+ addSpecFiles has been deprecated in favor of addMatchingSpecFiles
            (jasmineInstance.addMatchingSpecFiles || jasmineInstance.addSpecFiles).apply(jasmineInstance, [[testFile]]);
            
            var p = jasmineInstance.loadSpecs();
            if (p instanceof Promise) {
                await p;
            }

            var topSuite = jasmineInstance.env.topSuite();
            // In Jasmine 4.0+ the Suite object is not top level anymore and is instead in the suite_ property
            if (topSuite && topSuite.suite_) {
                topSuite = topSuite.suite_;
            }
            
            enumerateSpecs(topSuite, testList, testFile);
        }
        catch (ex) {
            //we would like continue discover other files, so swallow, log and continue;
            console.error("Test discovery error:", ex, "in", testFile);
        }
    }

    var fd = fs.openSync(discoverResultFile, 'w');
    fs.writeSync(fd, JSON.stringify(testList));
    fs.closeSync(fd);
}

exports.find_tests = find_tests;

function createCustomReporter(context) {
    return {
        specStarted: (specResult) => {
            context.post({
                type: "test start",
                fullyQualifiedName: context.getFullyQualifiedName(specResult.fullName)
            });
        },
        specDone: (specResult) => {
            // TODO: Report the output of the test. Currently is only showing "F" for a regression.
            var type = "result";
            var result = {
                passed: specResult.status === "passed",
                pending: false
            };

            if (specResult.status === "disabled" || specResult.status === "pending") {
                type = "pending";
                result.pending = true;
            }
            context.post({
                type,
                result,
                fullyQualifiedName: context.getFullyQualifiedName(specResult.fullName)
            });
            context.clearOutputs();
        },
        jasmineDone: (suiteInfo) => {
            context.post({
                type: "end"
            });
        }
    };
}

function run_tests(context) {
    return new Promise(resolve => {
        var projectFolder = context.testCases[0].projectFolder;
        var Jasmine = detectJasmine(projectFolder);
        if (!Jasmine) {
            return resolve();
        }
        var testFileList = [];
        var testNameList = {};

        context.testCases.forEach((testCase) => {
            if (testFileList.indexOf(testCase.testFile) < 0) {
                testFileList.push(testCase.testFile);
            }
            testNameList[testCase.fullTitle] = true;
        });
        try {
            var jasmineInstance = initializeJasmine(Jasmine, projectFolder);
            jasmineInstance.configureDefaultReporter({ showColors: false });
            setSpecFilter(jasmineInstance, spec => testNameList.hasOwnProperty(spec.getSpecName(spec)));
            jasmineInstance.addReporter(createCustomReporter(context));
            jasmineInstance.execute(testFileList);
        }
        catch (ex) {
            logError("Execute test error:", ex);
        }

        resolve();
    });
}

function setSpecFilter(jasmineInstance, specFilter) {
    if (jasmineInstance.env.configure) {
        jasmineInstance.env.configure({ specFilter });
    } else {
        jasmineInstance.env.specFilter = specFilter;
    }
}

exports.run_tests = run_tests;

// SIG // Begin signature block
// SIG // MIInzAYJKoZIhvcNAQcCoIInvTCCJ7kCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // d9ltkO9xmASUYWmjWrOLqD52dafNZUu64hMtFlYWs8Cg
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
// SIG // AYI3AgEVMC8GCSqGSIb3DQEJBDEiBCC+Ub77WRciQSoM
// SIG // 5EPBZ05TxiYPDweNiq4TdmTWYeOAUTBCBgorBgEEAYI3
// SIG // AgEMMTQwMqAUgBIATQBpAGMAcgBvAHMAbwBmAHShGoAY
// SIG // aHR0cDovL3d3dy5taWNyb3NvZnQuY29tMA0GCSqGSIb3
// SIG // DQEBAQUABIIBAH5iUQbUwAQvvb2LyOxZePE3O8xmHf5e
// SIG // B/34vxKppuh1cEQeNqjnivfHvlsGzLkmGLQgh3LSGfpi
// SIG // 1gpUTkSElJyfgP3B7MU5fbniyjskV0SCEt8xhjQjKNlD
// SIG // 5uxNMa3MuYUkdedWurAucOmxjXmmFdS6mRVySfxdtlJZ
// SIG // Xd0ZbNQ6nOq85l+JcxRTwqA6i8T+72neuGZXJMpLrP1x
// SIG // nrm8T6IHSP4qQduMaj1XfD7rQ+42L44j6SwUCV4eseLR
// SIG // BPH0OgRyAfRGgXrA+2tdV9LjGAuXhDqmAic/d2BZd+Mg
// SIG // EEhdLaC7MXuZ9zZbUEygRCXV5tnQjOQ5Thicq1ekQJmL
// SIG // TlyhghcpMIIXJQYKKwYBBAGCNwMDATGCFxUwghcRBgkq
// SIG // hkiG9w0BBwKgghcCMIIW/gIBAzEPMA0GCWCGSAFlAwQC
// SIG // AQUAMIIBWQYLKoZIhvcNAQkQAQSgggFIBIIBRDCCAUAC
// SIG // AQEGCisGAQQBhFkKAwEwMTANBglghkgBZQMEAgEFAAQg
// SIG // K+ffPUu+jqN1qNzQI1i0Ypv82kQUgOhudfddCS6M3P8C
// SIG // BmUK9vF5VxgTMjAyMzEwMDMwOTE3NDAuMzk3WjAEgAIB
// SIG // 9KCB2KSB1TCB0jELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEtMCsG
// SIG // A1UECxMkTWljcm9zb2Z0IElyZWxhbmQgT3BlcmF0aW9u
// SIG // cyBMaW1pdGVkMSYwJAYDVQQLEx1UaGFsZXMgVFNTIEVT
// SIG // TjowODQyLTRCRTYtQzI5QTElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCEXgwggcnMIIF
// SIG // D6ADAgECAhMzAAABsm5AA39uqZSSAAEAAAGyMA0GCSqG
// SIG // SIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xJjAk
// SIG // BgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBDQSAy
// SIG // MDEwMB4XDTIyMDkyMDIwMjIwMVoXDTIzMTIxNDIwMjIw
// SIG // MVowgdIxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNo
// SIG // aW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQK
// SIG // ExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xLTArBgNVBAsT
// SIG // JE1pY3Jvc29mdCBJcmVsYW5kIE9wZXJhdGlvbnMgTGlt
// SIG // aXRlZDEmMCQGA1UECxMdVGhhbGVzIFRTUyBFU046MDg0
// SIG // Mi00QkU2LUMyOUExJTAjBgNVBAMTHE1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
// SIG // AQUAA4ICDwAwggIKAoICAQDKomUyHXv5UOKwvgZpeX/1
// SIG // rqv8Sk8a32xttx6H5kPqmQDeBsju9zxd8vTgH6be0H9o
// SIG // 3JXVjhlAfh8wbsJZWMj938eDGPM77gLgd+xb6MrZzQtg
// SIG // yp1a1ZRzlXBlC/Qp5oQzTANv57JIyH9iKIhvSdKi2K/H
// SIG // brx3UCfS4tj6vYLskm/Zr1C+tKILJQjvYJIehYhA8DK8
// SIG // FK/Fo2uoxaVE58vLYNDdHJwjdsOHypKeamXG1GBWInC0
// SIG // m/+gO6RwrV+sZ46sIZiaIm975CiclcW7hS0YVV8R/eW9
// SIG // Cx3jYYn59476No/v+EFddIxKV1VvogvQbE7Uevcb041O
// SIG // dWYD+wUeGAxFquybMpUjr+QeUx0w10X9fOFEcxYU8m/D
// SIG // mUCmO5qjIe3PCfMNbBDOFw1BdlGTcvNvTVQsxtrX3RF2
// SIG // Wh8RfEZsaUGAccoWcGNa6LbiEvoHzdnqvoZAE94qRp/P
// SIG // ypg8A7cwG537l4wKYHmasIHGCfKQyfsv8VOqLsyc9Qb3
// SIG // uU04oZIgO8ELEHuketGZPXT3Tc8NDCuZ4kc7kGQLeBiP
// SIG // ehYY4ZVFnFGTgpL/yVzPzhrv64EqZWMHZjy883w7V8rs
// SIG // vxglOSOJdPIOoon18qTIKGJJHHjgAM+L8dcdATp2VnyN
// SIG // 30sKjVL6De53E0/jAeFab39UAaaYwQEFLr7ounghtDAl
// SIG // TQIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFJnyJ4Bc2RGZ
// SIG // T5IwzlZbgUgw2mpxMB8GA1UdIwQYMBaAFJ+nFV0AXmJd
// SIG // g/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCGTmh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3Js
// SIG // L01pY3Jvc29mdCUyMFRpbWUtU3RhbXAlMjBQQ0ElMjAy
// SIG // MDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4wXAYIKwYB
// SIG // BQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY2VydHMvTWljcm9zb2Z0JTIwVGltZS1TdGFt
// SIG // cCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwGA1UdEwEB/wQC
// SIG // MAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0P
// SIG // AQH/BAQDAgeAMA0GCSqGSIb3DQEBCwUAA4ICAQDcR7bt
// SIG // xcyGm2g21qrMHSgZQISl0QjfuQkjIr9k2GuItkLliJvv
// SIG // faYsAIQ4QA326qK9c8i4veWOhkJ7yFlIHXgu6C9WbWcn
// SIG // vds2CvhCH8GGZoUvgh+Ip3wM1L7HB2Rd8JayVHz1CAxl
// SIG // T9JQmFbHvZoLrxtHapGOGskDxBzrybm4GWWjnYPzfHSJ
// SIG // 3enxnjnPtA6Bswfi4njmydkNALRLd1zd4l/AqevnWU1/
// SIG // McBPy74UcD6W//pyrITu01br3p8HU8Kgfy0+gjT2hJcB
// SIG // XisSq6kUzzGx3oPovipwS38JoRF7DINrNUF+ySMX70/e
// SIG // pndHojI4jBDtti2zs5izDXdyyDaMAJ0QQCbV/t/3t/dA
// SIG // fbDBjB6fmtVfoYLOtgKKQZdKf9NJYt9AzecBEOSH9+WZ
// SIG // O2/0+qRMeqyVA2ArYu8wm4pIyk2pwZznPfcxjJXo+V/n
// SIG // wv5ORMVAqzrN/1cxkQmbeS71UEnVqqv0DM0xJopuLG8w
// SIG // EivYphJIzbWWcrwtQrFHA9b6BZLZXeJijIxPrgxFdyHX
// SIG // Q/g60ZPeJ1czT0rmV3sH1Tp1x0nqhu8TN1e35dmi+L9T
// SIG // oS9vicDtU8dwdIqztTvamzXSZN+eW57XdUUlSoDNtihQ
// SIG // R56C+ybO6UYQYmiplU0BqDm/o9UGu6vnIsRqOPFYfZN+
// SIG // QQ7CUvwy6FxUjw5eJjCCB3EwggVZoAMCAQICEzMAAAAV
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
// SIG // MCQGA1UECxMdVGhhbGVzIFRTUyBFU046MDg0Mi00QkU2
// SIG // LUMyOUExJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
// SIG // YW1wIFNlcnZpY2WiIwoBATAHBgUrDgMCGgMVAI4SfhHs
// SIG // kkX59igjbI5/XBfQFEk6oIGDMIGApH4wfDELMAkGA1UE
// SIG // BhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNV
// SIG // BAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
// SIG // b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
// SIG // bWUtU3RhbXAgUENBIDIwMTAwDQYJKoZIhvcNAQEFBQAC
// SIG // BQDoxe7qMCIYDzIwMjMxMDAzMDkzNzQ2WhgPMjAyMzEw
// SIG // MDQwOTM3NDZaMHQwOgYKKwYBBAGEWQoEATEsMCowCgIF
// SIG // AOjF7uoCAQAwBwIBAAICCK4wBwIBAAICEhkwCgIFAOjH
// SIG // QGoCAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGE
// SIG // WQoDAqAKMAgCAQACAwehIKEKMAgCAQACAwGGoDANBgkq
// SIG // hkiG9w0BAQUFAAOBgQAW49lTHiPek8Ul5Vqjt4CMhQy/
// SIG // lxkUQn0oLjVe0ljQ53uBkW8aL11NjZkdEa6Ce3h1Klr8
// SIG // 9KHpqSjMxyk8JgGKRkxG72YGNruAvrFBeS+iUN25zW0o
// SIG // P12doxf9Bxd6E5/zAn8VFzvx8/mRg9qmXIe9FD5L10sj
// SIG // IIBVfPIpiL8pCjGCBA0wggQJAgEBMIGTMHwxCzAJBgNV
// SIG // BAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYD
// SIG // VQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQg
// SIG // Q29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBU
// SIG // aW1lLVN0YW1wIFBDQSAyMDEwAhMzAAABsm5AA39uqZSS
// SIG // AAEAAAGyMA0GCWCGSAFlAwQCAQUAoIIBSjAaBgkqhkiG
// SIG // 9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkE
// SIG // MSIEIEH5WY/zOw2Y7I+JIZ3IepTLOiF7rtKK0YuelBtV
// SIG // d7ySMIH6BgsqhkiG9w0BCRACLzGB6jCB5zCB5DCBvQQg
// SIG // U3jOPOfhPreDxFYnlKBSl+z1ci6P587vobSTwhtOPjUw
// SIG // gZgwgYCkfjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMK
// SIG // V2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
// SIG // A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
// SIG // VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAx
// SIG // MAITMwAAAbJuQAN/bqmUkgABAAABsjAiBCCUlDpdCDDw
// SIG // GNM+JLVzw6JjKecfYLUWwbPPZUwR8irMxjANBgkqhkiG
// SIG // 9w0BAQsFAASCAgBEMfQcNlsPZ21ZLVzPlOyg9pUMOWaG
// SIG // 8HPbi/CeAyylKHORRlkMmDfiM92+yH2kmY4suD++XeC/
// SIG // 4uNUXW9cNbX+K7F1KsvpjHNteu5kiHzKjd3sB3d2MrU3
// SIG // X5uv/44g1kmlldJIYRQTVp3UO7mkyHu5t0TbLUDm+X2m
// SIG // UriO95lQ9gjHIa6AtGiClFVyLLFUreuxMpbVw13ZWTlY
// SIG // A001nOKw23tlcwbGHMtYM0d72na5QD7n8ri8EanZLaTp
// SIG // meRpr5hk9Ws0v752FMqjuOzct8hIFPRJDlSPgf4Ytsjv
// SIG // rxLZ80hZ/xK05LTHE9nS9xv9EJE8Z8iYEqtAggdrbIi4
// SIG // 9ivBriXq16y66mGEd7rLL0qS6coMknHkgs75Q6r5YX6X
// SIG // kgEPKO6CRmaoz4tQktmHY3Q5BHRIGzy9Yak0wterpUPC
// SIG // cJ0SmFXTeOAV/7aShCIF2tGqiugAOit1/4L5fCO0IEKc
// SIG // e0BSqCeKGaD7PLVloNWhFbS6zw2D+gWq8JYkv0S9xTQZ
// SIG // 6OTRynRgvUzqzlqTdguvcxW0Wb42IuUnsNfBxwF96mPR
// SIG // TYEg78AcYPV89bJlYyt3/TSCohOl3i+xGv0Rbez0mq8g
// SIG // WKDuk023BKxTo+ShtakAHGO6yRggDTx/mh1dVvfnEoe8
// SIG // 3XTOo+IYLLTTFt//L1GvLB3o8N+BFE0P2JGG7g==
// SIG // End signature block
