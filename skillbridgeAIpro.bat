@echo off
title SkillBridgeAIPro Yerel Sunucu
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js bulunamadi. Once https://nodejs.org adresinden Node.js 20 LTS kurun.
  pause
  exit /b 1
)
echo SkillBridgeAIPro hazirlaniyor...
node scripts\build-worker.mjs
if errorlevel 1 (
  echo Derleme basarisiz oldu.
  pause
  exit /b 1
)
start "" http://localhost:8787
node scripts\local-server.mjs
pause
