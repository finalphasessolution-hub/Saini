@echo off
title Jaspal Singh Serveo Auto-Restart Tunnel
color 0B

:start
echo ========================================================
echo Starting Jaspal Singh Custom Serveo Tunnel...
echo ========================================================

:: Yeh command aapka fix custom link banaye rakhegi
ssh -R jaspalsingh:80:localhost:3000 serveo.net

echo.
echo Connection closed! Restarting tunnel in 3 seconds...
timeout /t 3 /nobreak >nul
goto start