@echo off
REM -----------------------------------------------------------------------------
REM Copyright (c) Microsoft Corporation.  All rights reserved.
REM -----------------------------------------------------------------------------

SETLOCAL

REM Run the command using wsl
echo %systemroot%\System32\wsl.exe %*
%systemroot%\System32\wsl.exe %*
set Result=%ErrorLevel%

REM If there was an error, let the user see the results before we exit
if NOT %Result% == 0 (
    pause
) else (
    if %AlwaysPause% == 1 pause
)

REM Exit with the exit code from wsl
exit /B Result