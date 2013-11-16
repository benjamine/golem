@echo off
sh --version >nul 2>&1
IF ERRORLEVEL 1 (
    ECHO unix "sh" not found, you need it to run golem
    ECHO you can get it by installing Git For Windows from http://msysgit.github.io/
    ECHO and choosing "Run Git and included Unix tools from the Windows Command Prompt" during installation
    ECHO.
    sh --version
    exit /b %ERRORLEVEL%
)
sh %~dp0golem %*
