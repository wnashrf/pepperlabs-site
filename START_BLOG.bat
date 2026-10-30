@echo off
title Pepper Labs Blog Server
color 0A

echo.
echo ========================================
echo   Pepper Labs Blog - Dev Server
echo ========================================
echo.
echo Starting PHP server on localhost:8000
echo.
echo Open your browser and visit:
echo   http://localhost:8000/blog/
echo.
echo Press CTRL+C to stop the server
echo.
echo ========================================
echo.

cd /d "%~dp0"
php -S localhost:8000

pause
