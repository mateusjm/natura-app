@echo off
echo Iniciando Backend NestJS...
start cmd /k "cd /d C:\Users\Mateus Lucas\Desktop\natura-app\backend && npm run start"

echo Iniciando Frontend React...
start cmd /k "cd /d C:\Users\Mateus Lucas\Desktop\natura-app\frontend && npm run dev"

echo Abrindo navegador...
start http://localhost:5173

echo Aplicação Natura iniciada!
pause