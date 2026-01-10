Set backend = CreateObject("WScript.Shell")
backend.Run "cmd /c cd /d ""C:\Users\Mateus Lucas\Desktop\natura-app\backend"" && npm run start", 0, False

Set frontend = CreateObject("WScript.Shell")
frontend.Run "cmd /c cd /d ""C:\Users\Mateus Lucas\Desktop\natura-app\frontend"" && npm run dev", 0, False

' Abrir navegador
Set nav = CreateObject("WScript.Shell")
nav.Run "http://localhost:5173", 0, False
