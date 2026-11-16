@echo off
cd /d "%~dp0"
call npx.cmd --yes live-server --port=5500
pause
