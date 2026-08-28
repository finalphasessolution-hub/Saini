@echo off
title Jaspal Singh Platform
color 0A

echo ====================================================
echo Starting Jaspal Singh Enterprise Platform...
echo ====================================================

echo.
echo [1/2] Checking Node modules...
if not exist "node_modules" (
    echo Installing required packages...
    npm install
)

echo.
echo [2/2] Starting Express Server...
start http://localhost:3000
npm start
pause