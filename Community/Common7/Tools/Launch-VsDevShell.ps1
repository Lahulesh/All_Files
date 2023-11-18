<#
.SYNOPSIS Launch Developer PowerShell
.DESCRIPTION
Locates and imports a Developer PowerShell module and calls the Enter-VsDevShell cmdlet. The Developer PowerShell module
is located in one of several ways:
  1) From a path in a Visual Studio installation
  2) From the latest installation of Visual Studio (higher versions first)
  3) From the instance ID of a Visual Studio installation
  4) By selecting a Visual Studio installation from a list

By default, with no parameters, the path to this script is used to locate the Developer PowerShell module. If that fails,
then the latest Visual Studio installation is used. If both methods fail, then the user can select a Visual Studio installation
from a list.
.PARAMETER VsInstallationPath 
A path in a Visual Studio installation. The path is used to locate the Developer PowerShell module.
By default, this is the path to this script.
.PARAMETER Latest
Use the latest Visual Studio installation to locate the Developer PowerShell module.
.PARAMETER List
Display a list of Visual Studio installations to choose from. The choosen installation is used to locate the Developer PowerShell module.
.PARAMETER VsInstanceId
A Visual Studio installation instance ID. The matching installation is used to locate the Developer PowerShell module.
.PARAMETER ExcludePrerelease
Excludes Prerelease versions of Visual Studio from consideration. Applies only to Latest and List.
.PARAMETER VsWherePath
Path to the vswhere utility used to located and identify Visual Studio installations.
By default, the path is the well-known location shared by Visual Studio installations.
#>
[CmdletBinding(DefaultParameterSetName = "Default")]
param (
    [ValidateScript({Test-Path $_})]
    [Parameter(ParameterSetName = "VsInstallationPath")]
    [string]
    $VsInstallationPath = "$($MyInvocation.MyCommand.Definition)",

    [Parameter(ParameterSetName = "Latest")]
    [switch]
    $Latest,

    [Parameter(ParameterSetName = "List")]
    [switch]
    $List,

    [Parameter(ParameterSetName = "List")]
    [object[]]
    $DisplayProperties = @("displayName", "instanceId", "installationVersion", "isPrerelease", "installationName", "installDate"),

    [Parameter(ParameterSetName = "VsInstanceId", Mandatory = $true)]
    [string]
    $VsInstanceId,

    [Parameter(ParameterSetName = "Latest")]
    [Parameter(ParameterSetName = "List")]
    [switch]
    $ExcludePrerelease,

    [Parameter(ParameterSetName = "Default")]
    [Parameter(ParameterSetName = "VsInstallationPath")]
    [Parameter(ParameterSetName = "Latest")]
    [Parameter(ParameterSetName = "List")]
    [Parameter(ParameterSetName = "VsInstanceId")]
    [ValidateSet('x86','amd64','arm','arm64')]
    [string]
    $Arch,

    [Parameter(ParameterSetName = "Default")]
    [Parameter(ParameterSetName = "VsInstallationPath")]
    [Parameter(ParameterSetName = "Latest")]
    [Parameter(ParameterSetName = "List")]
    [Parameter(ParameterSetName = "VsInstanceId")]
    [ValidateSet('x86','amd64')]
    [string]
    $HostArch,

    [Parameter(ParameterSetName = "Default")]
    [Parameter(ParameterSetName = "VsInstallationPath")]
    [Parameter(ParameterSetName = "Latest")]
    [Parameter(ParameterSetName = "List")]
    [Parameter(ParameterSetName = "VsInstanceId")]
    [switch]
    $SkipAutomaticLocation,

    [ValidateScript({Test-Path $_ -PathType 'Leaf'})]
    [Parameter(ParameterSetName = "Default")]
    [Parameter(ParameterSetName = "VsInstallationPath")]
    [Parameter(ParameterSetName = "Latest")]
    [Parameter(ParameterSetName = "List")]
    [Parameter(ParameterSetName = "VsInstanceId")]
    [string]
    $VsWherePath = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
)

function GetSetupConfigurations {
    param (
        $whereArgs
    )
    
    $expression = "& `"$VsWherePath`" $whereArgs -format json"
    Invoke-Expression $expression | ConvertFrom-Json
}

function LaunchDevShell {
    param (
        $config
    )

    $basePath = $config.installationPath
    $instanceId = $config.instanceId

    $currModulePath = "$basePath\Common7\Tools\Microsoft.VisualStudio.DevShell.dll"
    # Prior to 16.3 the DevShell module was in a different location
    $prevModulePath = "$basePath\Common7\Tools\vsdevshell\Microsoft.VisualStudio.DevShell.dll"

    $modulePath = if (Test-Path $prevModulePath) { $prevModulePath } else { $currModulePath }

    if (Test-Path $modulePath) {
        Write-Verbose "Found at $modulePath."

        try {
            Import-Module $modulePath
        }
        catch [System.IO.FileLoadException] {
            Write-Verbose "The module has already been imported from a different installation of Visual Studio:"
            (Get-Module Microsoft.VisualStudio.DevShell).Path | Write-Verbose
        }

        $params = @{
            VsInstanceId = $instanceId
        }

        $command = Get-Command Enter-VsDevShell

        if ($SkipAutomaticLocation)
        {
            $params.SkipAutomaticLocation = $true
        }

        # -Arch is only available from 17.1
        if ($Arch -and $command.Parameters.ContainsKey("Arch"))
        {
            $params.Arch = $Arch
        }

        # -HostArch is only available from 17.1
        if ($HostArch -and $command.Parameters.ContainsKey("HostArch"))
        {
            $params.HostArch = $HostArch
        }

        # -ReportNewInstanceType is only available from 16.5
        if ($command.Parameters.ContainsKey("ReportNewInstanceType")) {
            $params.ReportNewInstanceType = "LaunchScript"
        }

        $boundParams = $PSCmdlet.MyInvocation.BoundParameters

        if ($boundParams.ContainsKey("Verbose") -and
            $boundParams["Verbose"].IsPresent)
        {
            Write-Verbose "Enter-VsDevShell Parameters:"
            $params.GetEnumerator() | ForEach-Object{
                $message = '{0} = {1}' -f $_.key, $_.value
                Write-Verbose $message
            }
        }

        Enter-VsDevShell @params
        exit
    }

    throw [System.Management.Automation.ErrorRecord]::new(
        [System.Exception]::new("Required assembly could not be located. This most likely indicates an installation error. Try repairing your Visual Studio installation. Expected location: $modulePath"),
        "DevShellModuleLoad",
        [System.Management.Automation.ErrorCategory]::NotInstalled,
        $config)
}

function VsInstallationPath {
    $setupargs = "-path `"$VsInstallationPath`""

    Write-Verbose "Using path: $VsInstallationPath"
    $config = GetSetupConfigurations($setupargs)
    LaunchDevShell($config)
}

function Latest {
    $setupargs = "-latest"

    if (-not $ExcludePrerelease) {
        $setupargs += " -prerelease"
    }

    $config = GetSetupConfigurations($setupargs)
    LaunchDevShell($config)
}

function VsInstanceId {
    $configs = GetSetupConfigurations("-prerelease -all")
    $config = $configs | Where-Object { $_.instanceId -eq $VsInstanceId }
    if ($config) {
        Write-Verbose "Found Visual Studio installation with InstanceId of '$($config.instanceId)' and InstallationPath '$($config.installationPath)'"
        LaunchDevShell($config)
        exit
    }

    throw [System.Management.Automation.ErrorRecord]::new(
        [System.Exception]::new("Could not find an installation of Visual Studio with InstanceId '$VsInstanceId'."),
        "VsSetupInstance",
        [System.Management.Automation.ErrorCategory]::InvalidArgument,
        $config)
}

function List {
    $setupargs = "-sort"

    if (-not $ExcludePrerelease) {
        $setupargs = " -prerelease"
    }

    $configs = GetSetupConfigurations($setupargs)

    $DisplayProperties = @("#") + $DisplayProperties

    # Add an incrementing select column
    $configs = $configs |
        Sort-Object displayName, installationDate |
        ForEach-Object {$i = 0}{ $i++; $_ | Add-Member -NotePropertyName "#" -NotePropertyValue $i -PassThru }

    Write-Host "The following Visual Studio installations were found:"
    $configs | Format-Table -Property $DisplayProperties

    $selected = Read-Host "Enter '#' of the Visual Studio installation to launch DevShell. <Enter> to quit: "
    if (-not $selected) { exit }

    $config = $configs | Where-Object { $_."#" -eq $selected }

    if ($config) {
        LaunchDevShell($config)
    }
    else {
        "Invalid selection: $selected"
    }
}

function Default{
    Write-Verbose "No parameters passed to script. Trying VsInstallationPath."

    try {
        VsInstallationPath
        exit
    }
    catch {
        Write-Verbose "VsInstallationPath failed. Trying Latest."
    }

    Write-Host "Could not start Developer PowerShell using the script path."
    Write-Host "Attempting to launch from the latest Visual Studio installation."

    try {
        Latest
        exit
    }
    catch {
        Write-Verbose "Latest failed. Defaulting to List."
    }

    Write-Host "Could not start Developer PowerShell from the latest Visual Studio installation."
    Write-Host

    List
}

if ($PSCmdlet.ParameterSetName) {
    & (Get-ChildItem "Function:$($PSCmdlet.ParameterSetName)")
    exit
}
# SIG # Begin signature block
# MIIoKgYJKoZIhvcNAQcCoIIoGzCCKBcCAQExDzANBglghkgBZQMEAgEFADB5Bgor
# BgEEAYI3AgEEoGswaTA0BgorBgEEAYI3AgEeMCYCAwEAAAQQH8w7YFlLCE63JNLG
# KX7zUQIBAAIBAAIBAAIBAAIBADAxMA0GCWCGSAFlAwQCAQUABCB7cpavZzVzbDmR
# tFRSbdabKCMPm0+YAH01FA8nFbex/KCCDXYwggX0MIID3KADAgECAhMzAAADTrU8
# esGEb+srAAAAAANOMA0GCSqGSIb3DQEBCwUAMH4xCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNpZ25p
# bmcgUENBIDIwMTEwHhcNMjMwMzE2MTg0MzI5WhcNMjQwMzE0MTg0MzI5WjB0MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMR4wHAYDVQQDExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
# AQDdCKiNI6IBFWuvJUmf6WdOJqZmIwYs5G7AJD5UbcL6tsC+EBPDbr36pFGo1bsU
# p53nRyFYnncoMg8FK0d8jLlw0lgexDDr7gicf2zOBFWqfv/nSLwzJFNP5W03DF/1
# 1oZ12rSFqGlm+O46cRjTDFBpMRCZZGddZlRBjivby0eI1VgTD1TvAdfBYQe82fhm
# WQkYR/lWmAK+vW/1+bO7jHaxXTNCxLIBW07F8PBjUcwFxxyfbe2mHB4h1L4U0Ofa
# +HX/aREQ7SqYZz59sXM2ySOfvYyIjnqSO80NGBaz5DvzIG88J0+BNhOu2jl6Dfcq
# jYQs1H/PMSQIK6E7lXDXSpXzAgMBAAGjggFzMIIBbzAfBgNVHSUEGDAWBgorBgEE
# AYI3TAgBBggrBgEFBQcDAzAdBgNVHQ4EFgQUnMc7Zn/ukKBsBiWkwdNfsN5pdwAw
# RQYDVR0RBD4wPKQ6MDgxHjAcBgNVBAsTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEW
# MBQGA1UEBRMNMjMwMDEyKzUwMDUxNjAfBgNVHSMEGDAWgBRIbmTlUAXTgqoXNzci
# tW2oynUClTBUBgNVHR8ETTBLMEmgR6BFhkNodHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpb3BzL2NybC9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDctMDguY3JsMGEG
# CCsGAQUFBwEBBFUwUzBRBggrBgEFBQcwAoZFaHR0cDovL3d3dy5taWNyb3NvZnQu
# Y29tL3BraW9wcy9jZXJ0cy9NaWNDb2RTaWdQQ0EyMDExXzIwMTEtMDctMDguY3J0
# MAwGA1UdEwEB/wQCMAAwDQYJKoZIhvcNAQELBQADggIBAD21v9pHoLdBSNlFAjmk
# mx4XxOZAPsVxxXbDyQv1+kGDe9XpgBnT1lXnx7JDpFMKBwAyIwdInmvhK9pGBa31
# TyeL3p7R2s0L8SABPPRJHAEk4NHpBXxHjm4TKjezAbSqqbgsy10Y7KApy+9UrKa2
# kGmsuASsk95PVm5vem7OmTs42vm0BJUU+JPQLg8Y/sdj3TtSfLYYZAaJwTAIgi7d
# hzn5hatLo7Dhz+4T+MrFd+6LUa2U3zr97QwzDthx+RP9/RZnur4inzSQsG5DCVIM
# pA1l2NWEA3KAca0tI2l6hQNYsaKL1kefdfHCrPxEry8onJjyGGv9YKoLv6AOO7Oh
# JEmbQlz/xksYG2N/JSOJ+QqYpGTEuYFYVWain7He6jgb41JbpOGKDdE/b+V2q/gX
# UgFe2gdwTpCDsvh8SMRoq1/BNXcr7iTAU38Vgr83iVtPYmFhZOVM0ULp/kKTVoir
# IpP2KCxT4OekOctt8grYnhJ16QMjmMv5o53hjNFXOxigkQWYzUO+6w50g0FAeFa8
# 5ugCCB6lXEk21FFB1FdIHpjSQf+LP/W2OV/HfhC3uTPgKbRtXo83TZYEudooyZ/A
# Vu08sibZ3MkGOJORLERNwKm2G7oqdOv4Qj8Z0JrGgMzj46NFKAxkLSpE5oHQYP1H
# tPx1lPfD7iNSbJsP6LiUHXH1MIIHejCCBWKgAwIBAgIKYQ6Q0gAAAAAAAzANBgkq
# hkiG9w0BAQsFADCBiDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
# EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
# bjEyMDAGA1UEAxMpTWljcm9zb2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5
# IDIwMTEwHhcNMTEwNzA4MjA1OTA5WhcNMjYwNzA4MjEwOTA5WjB+MQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQg
# Q29kZSBTaWduaW5nIFBDQSAyMDExMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIIC
# CgKCAgEAq/D6chAcLq3YbqqCEE00uvK2WCGfQhsqa+laUKq4BjgaBEm6f8MMHt03
# a8YS2AvwOMKZBrDIOdUBFDFC04kNeWSHfpRgJGyvnkmc6Whe0t+bU7IKLMOv2akr
# rnoJr9eWWcpgGgXpZnboMlImEi/nqwhQz7NEt13YxC4Ddato88tt8zpcoRb0Rrrg
# OGSsbmQ1eKagYw8t00CT+OPeBw3VXHmlSSnnDb6gE3e+lD3v++MrWhAfTVYoonpy
# 4BI6t0le2O3tQ5GD2Xuye4Yb2T6xjF3oiU+EGvKhL1nkkDstrjNYxbc+/jLTswM9
# sbKvkjh+0p2ALPVOVpEhNSXDOW5kf1O6nA+tGSOEy/S6A4aN91/w0FK/jJSHvMAh
# dCVfGCi2zCcoOCWYOUo2z3yxkq4cI6epZuxhH2rhKEmdX4jiJV3TIUs+UsS1Vz8k
# A/DRelsv1SPjcF0PUUZ3s/gA4bysAoJf28AVs70b1FVL5zmhD+kjSbwYuER8ReTB
# w3J64HLnJN+/RpnF78IcV9uDjexNSTCnq47f7Fufr/zdsGbiwZeBe+3W7UvnSSmn
# Eyimp31ngOaKYnhfsi+E11ecXL93KCjx7W3DKI8sj0A3T8HhhUSJxAlMxdSlQy90
# lfdu+HggWCwTXWCVmj5PM4TasIgX3p5O9JawvEagbJjS4NaIjAsCAwEAAaOCAe0w
# ggHpMBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBRIbmTlUAXTgqoXNzcitW2o
# ynUClTAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYD
# VR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBRyLToCMZBDuRQFTuHqp8cx0SOJNDBa
# BgNVHR8EUzBRME+gTaBLhklodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20vcGtpL2Ny
# bC9wcm9kdWN0cy9NaWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3JsMF4GCCsG
# AQUFBwEBBFIwUDBOBggrBgEFBQcwAoZCaHR0cDovL3d3dy5taWNyb3NvZnQuY29t
# L3BraS9jZXJ0cy9NaWNSb29DZXJBdXQyMDExXzIwMTFfMDNfMjIuY3J0MIGfBgNV
# HSAEgZcwgZQwgZEGCSsGAQQBgjcuAzCBgzA/BggrBgEFBQcCARYzaHR0cDovL3d3
# dy5taWNyb3NvZnQuY29tL3BraW9wcy9kb2NzL3ByaW1hcnljcHMuaHRtMEAGCCsG
# AQUFBwICMDQeMiAdAEwAZQBnAGEAbABfAHAAbwBsAGkAYwB5AF8AcwB0AGEAdABl
# AG0AZQBuAHQALiAdMA0GCSqGSIb3DQEBCwUAA4ICAQBn8oalmOBUeRou09h0ZyKb
# C5YR4WOSmUKWfdJ5DJDBZV8uLD74w3LRbYP+vj/oCso7v0epo/Np22O/IjWll11l
# hJB9i0ZQVdgMknzSGksc8zxCi1LQsP1r4z4HLimb5j0bpdS1HXeUOeLpZMlEPXh6
# I/MTfaaQdION9MsmAkYqwooQu6SpBQyb7Wj6aC6VoCo/KmtYSWMfCWluWpiW5IP0
# wI/zRive/DvQvTXvbiWu5a8n7dDd8w6vmSiXmE0OPQvyCInWH8MyGOLwxS3OW560
# STkKxgrCxq2u5bLZ2xWIUUVYODJxJxp/sfQn+N4sOiBpmLJZiWhub6e3dMNABQam
# ASooPoI/E01mC8CzTfXhj38cbxV9Rad25UAqZaPDXVJihsMdYzaXht/a8/jyFqGa
# J+HNpZfQ7l1jQeNbB5yHPgZ3BtEGsXUfFL5hYbXw3MYbBL7fQccOKO7eZS/sl/ah
# XJbYANahRr1Z85elCUtIEJmAH9AAKcWxm6U/RXceNcbSoqKfenoi+kiVH6v7RyOA
# 9Z74v2u3S5fi63V4GuzqN5l5GEv/1rMjaHXmr/r8i+sLgOppO6/8MO0ETI7f33Vt
# Y5E90Z1WTk+/gFcioXgRMiF670EKsT/7qMykXcGhiJtXcVZOSEXAQsmbdlsKgEhr
# /Xmfwb1tbWrJUnMTDXpQzTGCGgowghoGAgEBMIGVMH4xCzAJBgNVBAYTAlVTMRMw
# EQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVN
# aWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNVBAMTH01pY3Jvc29mdCBDb2RlIFNp
# Z25pbmcgUENBIDIwMTECEzMAAANOtTx6wYRv6ysAAAAAA04wDQYJYIZIAWUDBAIB
# BQCgga4wGQYJKoZIhvcNAQkDMQwGCisGAQQBgjcCAQQwHAYKKwYBBAGCNwIBCzEO
# MAwGCisGAQQBgjcCARUwLwYJKoZIhvcNAQkEMSIEIHPsZ8DbaAp3m9TPusm7vlos
# rwBn+o+wW7H47SQLjRp5MEIGCisGAQQBgjcCAQwxNDAyoBSAEgBNAGkAYwByAG8A
# cwBvAGYAdKEagBhodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20wDQYJKoZIhvcNAQEB
# BQAEggEAVZPmNFKR8aUSxzmoAQXQ/Bi5uUX6Y+61fQ6ag1Xbu08I4pftkj42DjA3
# fT8SbYZZ90JUxIB6pB7ZKGskXW72ubyejjILgkoJcb+P2EIYXlkjXMk5xZv0FCO6
# Bm6G89cfU00Uve/q4XT2aHdvNGRroRtun/i/m0sGI3ho8sIz6X9ewHjYePf4VG82
# Hly9/26Go90BP2OPklYDhMM2hpZ7SE4iy+NLOVjT4fx8GrJUu1bW2ZZ10F1s+fC8
# IV3ELp3PjsXspSnWE5CNsLJZNN/0q1dxzowlONpMZoywd/v3vk5NScDF9dvVH4c2
# JYcsfriDwoKiK5akNlXm3XaxPa9DL6GCF5QwgheQBgorBgEEAYI3AwMBMYIXgDCC
# F3wGCSqGSIb3DQEHAqCCF20wghdpAgEDMQ8wDQYJYIZIAWUDBAIBBQAwggFSBgsq
# hkiG9w0BCRABBKCCAUEEggE9MIIBOQIBAQYKKwYBBAGEWQoDATAxMA0GCWCGSAFl
# AwQCAQUABCCRal4NPUZyqFZL0Dls0zFFIod9JJeA+KhRWTEJWhKGqgIGZQPksnc/
# GBMyMDIzMDkyNzIzNDM0Ny41MzJaMASAAgH0oIHRpIHOMIHLMQswCQYDVQQGEwJV
# UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
# ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQgQW1l
# cmljYSBPcGVyYXRpb25zMScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046OTIwMC0w
# NUUwLUQ5NDcxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2Wg
# ghHqMIIHIDCCBQigAwIBAgITMwAAAc9SNr5xS81IygABAAABzzANBgkqhkiG9w0B
# AQsFADB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UE
# BxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYD
# VQQDEx1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDAeFw0yMzA1MjUxOTEy
# MTFaFw0yNDAyMDExOTEyMTFaMIHLMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
# aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENv
# cnBvcmF0aW9uMSUwIwYDVQQLExxNaWNyb3NvZnQgQW1lcmljYSBPcGVyYXRpb25z
# MScwJQYDVQQLEx5uU2hpZWxkIFRTUyBFU046OTIwMC0wNUUwLUQ5NDcxJTAjBgNV
# BAMTHE1pY3Jvc29mdCBUaW1lLVN0YW1wIFNlcnZpY2UwggIiMA0GCSqGSIb3DQEB
# AQUAA4ICDwAwggIKAoICAQC4Pct+15TYyrUje553lzBQodgmd5Bz7WuH8SdHpAoW
# z+01TrHExBSuaMKnxvVMsyYtas5h6aopUGAS5WKVLZAvUtH62TKmAE0JK+i1hafi
# CSXLZPcRexxeRkOqeZefLBzXp0nudMOXUUab333Ss8LkoK4l3LYxm1Ebsr3b2OTo
# 2ebsAoNJ4kSxmVuPM7C+RDhGtVKR/EmHsQ9GcwGmluu54bqiVFd0oAFBbw4txTU1
# mruIGWP/i+sgiNqvdV/wah/QcrKiGlpWiOr9a5aGrJaPSQD2xgEDdPbrSflYxsRM
# dZCJI8vzvOv6BluPcPPGGVLEaU7OszdYjK5f4Z5Su/lPK1eST5PC4RFsVcOiS4L0
# sI4IFZywIdDJHoKgdqWRp6Q5vEDk8kvZz6HWFnYLOlHuqMEYvQLr6OgooYU9z0A5
# cMLHEIHYV1xiaBzx2ERiRY9MUPWohh+TpZWEUZlUm/q9anXVRN0ujejm6OsUVFDs
# sIMszRNCqEotJGwtHHm5xrCKuJkFr8GfwNelFl+XDoHXrQYL9zY7Np+frsTXQpKR
# NnmI1ashcn5EC+wxUt/EZIskWzewEft0/+/0g3+8YtMkUdaQE5+8e7C8UMiXOHkM
# K25jNNQqLCedlJwFIf9ir9SpMc72NR+1j6Uebiz/ZPV74do3jdVvq7DiPFlTb92U
# KwIDAQABo4IBSTCCAUUwHQYDVR0OBBYEFDaeKPtp0eTSVdG+gZc5BDkabTg4MB8G
# A1UdIwQYMBaAFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMF8GA1UdHwRYMFYwVKBSoFCG
# Tmh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY3JsL01pY3Jvc29mdCUy
# MFRpbWUtU3RhbXAlMjBQQ0ElMjAyMDEwKDEpLmNybDBsBggrBgEFBQcBAQRgMF4w
# XAYIKwYBBQUHMAKGUGh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9wa2lvcHMvY2Vy
# dHMvTWljcm9zb2Z0JTIwVGltZS1TdGFtcCUyMFBDQSUyMDIwMTAoMSkuY3J0MAwG
# A1UdEwEB/wQCMAAwFgYDVR0lAQH/BAwwCgYIKwYBBQUHAwgwDgYDVR0PAQH/BAQD
# AgeAMA0GCSqGSIb3DQEBCwUAA4ICAQBQgm4pnA0xkd/9uKXJMzdMYyxUfUm/ZusU
# Ba32MEZXQuMGp20pSuX2VW9/tpTMo5bkaJdBVoUyd2DbDsNb1kjr/36ntT0jvL3A
# oWStAFhZBypmpPbx+BPK49ZlejlM4d5epX668tRRGfFip9Til9yKRfXBrXnM/q64
# IinN7zXEQ3FFQhdJMzt8ibXClO7eFA+1HiwZPWysYWPb/ZOFobPEMvXie+GmEbTK
# bhE5tze6RrA9aejjP+v1ouFoD5bMj5Qg+wfZXqe+hfYKpMd8QOnQyez+Nlj1ityn
# OZWfwHVR7dVwV0yLSlPT+yHIO8g+3fWiAwpoO17bDcntSZ7YOBljXrIgad4W4gX+
# 4tp1eBsc6XWIITPBNzxQDZZRxD4rXzOB6XRlEVJdYZQ8gbXOirg/dNvS2GxcR50Q
# dOXDAumdEHaGNHb6y2InJadCPp2iT5QLC4MnzR+YZno1b8mWpCdOdRs9g21QbbrI
# 06iLk9KD61nx7K5ReSucuS5Z9nbkIBaLUxDesFhr1wmd1ynf0HQ51Swryh7YI7TX
# T0jr81mbvvI9xtoqjFvIhNBsICdCfTR91ylJTH8WtUlpDhEgSqWt3gzNLPTSvXAx
# XTpIM583sZdd+/2YGADMeWmt8PuMce6GsIcLCOF2NiYZ10SXHZS5HRrLrChuzedD
# RisWpIu5uTCCB3EwggVZoAMCAQICEzMAAAAVxedrngKbSZkAAAAAABUwDQYJKoZI
# hvcNAQELBQAwgYgxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9uMRAw
# DgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
# MjAwBgNVBAMTKU1pY3Jvc29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAy
# MDEwMB4XDTIxMDkzMDE4MjIyNVoXDTMwMDkzMDE4MzIyNVowfDELMAkGA1UEBhMC
# VVMxEzARBgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNV
# BAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRp
# bWUtU3RhbXAgUENBIDIwMTAwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
# AQDk4aZM57RyIQt5osvXJHm9DtWC0/3unAcH0qlsTnXIyjVX9gF/bErg4r25Phdg
# M/9cT8dm95VTcVrifkpa/rg2Z4VGIwy1jRPPdzLAEBjoYH1qUoNEt6aORmsHFPPF
# dvWGUNzBRMhxXFExN6AKOG6N7dcP2CZTfDlhAnrEqv1yaa8dq6z2Nr41JmTamDu6
# GnszrYBbfowQHJ1S/rboYiXcag/PXfT+jlPP1uyFVk3v3byNpOORj7I5LFGc6XBp
# Dco2LXCOMcg1KL3jtIckw+DJj361VI/c+gVVmG1oO5pGve2krnopN6zL64NF50Zu
# yjLVwIYwXE8s4mKyzbnijYjklqwBSru+cakXW2dg3viSkR4dPf0gz3N9QZpGdc3E
# XzTdEonW/aUgfX782Z5F37ZyL9t9X4C626p+Nuw2TPYrbqgSUei/BQOj0XOmTTd0
# lBw0gg/wEPK3Rxjtp+iZfD9M269ewvPV2HM9Q07BMzlMjgK8QmguEOqEUUbi0b1q
# GFphAXPKZ6Je1yh2AuIzGHLXpyDwwvoSCtdjbwzJNmSLW6CmgyFdXzB0kZSU2LlQ
# +QuJYfM2BjUYhEfb3BvR/bLUHMVr9lxSUV0S2yW6r1AFemzFER1y7435UsSFF5PA
# PBXbGjfHCBUYP3irRbb1Hode2o+eFnJpxq57t7c+auIurQIDAQABo4IB3TCCAdkw
# EgYJKwYBBAGCNxUBBAUCAwEAATAjBgkrBgEEAYI3FQIEFgQUKqdS/mTEmr6CkTxG
# NSnPEP8vBO4wHQYDVR0OBBYEFJ+nFV0AXmJdg/Tl0mWnG1M1GelyMFwGA1UdIARV
# MFMwUQYMKwYBBAGCN0yDfQEBMEEwPwYIKwYBBQUHAgEWM2h0dHA6Ly93d3cubWlj
# cm9zb2Z0LmNvbS9wa2lvcHMvRG9jcy9SZXBvc2l0b3J5Lmh0bTATBgNVHSUEDDAK
# BggrBgEFBQcDCDAZBgkrBgEEAYI3FAIEDB4KAFMAdQBiAEMAQTALBgNVHQ8EBAMC
# AYYwDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2UkFvX
# zpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5jb20v
# cGtpL2NybC9wcm9kdWN0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
# KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
# b20vcGtpL2NlcnRzL01pY1Jvb0NlckF1dF8yMDEwLTA2LTIzLmNydDANBgkqhkiG
# 9w0BAQsFAAOCAgEAnVV9/Cqt4SwfZwExJFvhnnJL/Klv6lwUtj5OR2R4sQaTlz0x
# M7U518JxNj/aZGx80HU5bbsPMeTCj/ts0aGUGCLu6WZnOlNN3Zi6th542DYunKmC
# VgADsAW+iehp4LoJ7nvfam++Kctu2D9IdQHZGN5tggz1bSNU5HhTdSRXud2f8449
# xvNo32X2pFaq95W2KFUn0CS9QKC/GbYSEhFdPSfgQJY4rPf5KYnDvBewVIVCs/wM
# nosZiefwC2qBwoEZQhlSdYo2wh3DYXMuLGt7bj8sCXgU6ZGyqVvfSaN0DLzskYDS
# PeZKPmY7T7uG+jIa2Zb0j/aRAfbOxnT99kxybxCrdTDFNLB62FD+CljdQDzHVG2d
# Y3RILLFORy3BFARxv2T5JL5zbcqOCb2zAVdJVGTZc9d/HltEAY5aGZFrDZ+kKNxn
# GSgkujhLmm77IVRrakURR6nxt67I6IleT53S0Ex2tVdUCbFpAUR+fKFhbHP+Crvs
# QWY9af3LwUFJfn6Tvsv4O+S3Fb+0zj6lMVGEvL8CwYKiexcdFYmNcP7ntdAoGokL
# jzbaukz5m/8K6TT4JDVnK+ANuOaMmdbhIurwJ0I9JZTmdHRbatGePu1+oDEzfbzL
# 6Xu/OHBE0ZDxyKs6ijoIYn/ZcGNTTY3ugm2lBRDBcQZqELQdVTNYs6FwZvKhggNN
# MIICNQIBATCB+aGB0aSBzjCByzELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hp
# bmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jw
# b3JhdGlvbjElMCMGA1UECxMcTWljcm9zb2Z0IEFtZXJpY2EgT3BlcmF0aW9uczEn
# MCUGA1UECxMeblNoaWVsZCBUU1MgRVNOOjkyMDAtMDVFMC1EOTQ3MSUwIwYDVQQD
# ExxNaWNyb3NvZnQgVGltZS1TdGFtcCBTZXJ2aWNloiMKAQEwBwYFKw4DAhoDFQDq
# 8xzVXwLguauAQj1rrJ4/TyEMm6CBgzCBgKR+MHwxCzAJBgNVBAYTAlVTMRMwEQYD
# VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNy
# b3NvZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1w
# IFBDQSAyMDEwMA0GCSqGSIb3DQEBCwUAAgUA6L7dUTAiGA8yMDIzMDkyNzE2NTY0
# OVoYDzIwMjMwOTI4MTY1NjQ5WjB0MDoGCisGAQQBhFkKBAExLDAqMAoCBQDovt1R
# AgEAMAcCAQACAh0rMAcCAQACAhPDMAoCBQDowC7RAgEAMDYGCisGAQQBhFkKBAIx
# KDAmMAwGCisGAQQBhFkKAwKgCjAIAgEAAgMHoSChCjAIAgEAAgMBhqAwDQYJKoZI
# hvcNAQELBQADggEBACaCMGxHPTM1E3Oz540WV4bAuCQg72axX3Fw9UnlzB7we60d
# Z01YRkDhhZRBCLSyKqFNc8vJYKYD1dddgU5P6kPf1KsVQ2xFAvFwxF+gYXkRMyf4
# vbXKW/qzUNrmds8gsRUidHf0qL+zNw87uAFDb69Fb/8w/5FrtlimyS2lxlQZk209
# rrgweHlAhDQDZWmSmfxsYmzg7nrZPRIp56pml1KodZVsRNJiXvsooF/NggqiW/Qm
# KIBfc7l4jkwCq9NrmWt1CXZJdvCpWTxqC7FUG84JjYbgbYRR3HOofNOMkmayOpko
# 5W5pEdkkPcM0bmIwFYe/RSKx68RuzB7kiUZwFVsxggQNMIIECQIBATCBkzB8MQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNy
# b3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAc9SNr5xS81IygABAAABzzAN
# BglghkgBZQMEAgEFAKCCAUowGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEEMC8G
# CSqGSIb3DQEJBDEiBCBy9m4WqG6rHmH2yzdFiYQJY2cK0GHMwAgLBFzFvzkafjCB
# +gYLKoZIhvcNAQkQAi8xgeowgecwgeQwgb0EILPpsLqeNS4NuYXE2VJlMuvQeWVA
# 80ZDFhpOPjSzhPa/MIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
# c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
# b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
# MTACEzMAAAHPUja+cUvNSMoAAQAAAc8wIgQgYBJa5WuSIiNKKblAL50oJh2sbU//
# /Po2bAsr11ISYRswDQYJKoZIhvcNAQELBQAEggIATzdqK7hqXuboLUjuRzGQLesO
# qM1HmIiCwhU+BwVHXv2xSP8fWk3Ypj0x1E9ap20xVxPpRkVUG+jtG6+yYxaAWatj
# v5JfKA37+V+yCSe+G1cjhSFsGe/ylJ4LPhUWZrG/jRWy8TF2LuHMeNIzAf39posS
# XVrGFsOaOUHo8lev81w/wUsvJJ3ICJB28+F78+N7zvNO2oqP0dx6d6iGWnzUVj+b
# D3TRLegvWnMnnQ5nb5KMiDEuy8Bp+EsCkYwayiSRDlX0RoapNLS5ROVyXZIWDDFs
# +bfoHE5VBBshWWl3IJi9k9kV2wvEmM4yTYNXuYKr2kw3ohJyiiFSPFsLpkp4H5G1
# 6P3fww2nJgn1qCCWbTNoA+GhHnATx/U9q33JwesIZC7UJgdhHmgOsasztg922S+j
# CZOyDzEwlIlsCP4HQl+FqggHnQsW+1HzRXuRMW+CmiZjBf8cBSJQHh15kl6SkNO4
# sT2R0ro23LKQ076Oon5K1RGzncG8sb7YZPQxJW7DbP7MmbkwZRFUicQkUNSMaI9Y
# kK9TOFlNbEkwz/X404hC1bwEHHPCsivLNO9jNGHgzfbU1F+2CePcstKQ3rzOLin9
# iAH0elKM+bmnUSQfr+I7ZYuJs/wsQHK6bUsyCCGrCimjCOyGSkj8taXTJhKaN9bG
# PKXummydHbirtivj3LY=
# SIG # End signature block
