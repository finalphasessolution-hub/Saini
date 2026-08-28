@echo off
title Jaspal Singh - Master Monitor & Watchdog
color 0E

echo ========================================================
echo Starting Jaspal Singh Master Monitor...
echo ========================================================

:monitor_loop
cls
echo [%DATE% %TIME%] Checking services...

:: Folder path set karein taaki files turant mil jayein
cd /d "D:\my web site"

:: 1. Check if Express Server (Port 3000) is running
netstat -ano | findstr :3000 >nul
if %errorlevel% neq 0 (
    echo [!] Express Server is down! Launching start.bat...
    start "Jaspal Server" cmd /c "start.bat"
    timeout /t 5 /nobreak >nul
) else (
    echo [+] Express Server is running smoothly.
)

:: 2. Check if SSH/Serveo process is running
tasklist /fi "imagename eq ssh.exe" 2>nul | find /i "ssh.exe" >nul
if %errorlevel% neq 0 (
    echo [!] Serveo Tunnel is down! Launching live.bat...
    start "Jaspal Tunnel" cmd /c "live.bat"
    timeout /t 5 /nobreak >nul
) else (
    echo [+] Serveo Tunnel is active.
)

echo.
echo Waiting 10 seconds before next health check...
timeout /t 10 /nobreak >nul
goto monitor_loop