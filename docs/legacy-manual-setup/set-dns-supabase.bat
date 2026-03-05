@echo off
setlocal

:: Auto-elevate to Administrator if not already elevated
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Requesting Administrator permission...
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

echo.
echo Setting DNS for Wi-Fi to Cloudflare...
netsh interface ip set dns name="Wi-Fi" static 1.1.1.1
netsh interface ip add dns name="Wi-Fi" 1.0.0.1 index=2

echo.
echo Flushing DNS cache...
ipconfig /flushdns

echo.
echo Renewing Wi-Fi IP...
ipconfig /renew "Wi-Fi"

echo.
echo Current DNS (Wi-Fi):
powershell -NoProfile -Command "Get-DnsClientServerAddress -InterfaceAlias 'Wi-Fi' -AddressFamily IPv4 | Format-Table -AutoSize"

echo.
echo Supabase DNS check:
nslookup pykzlebnrzcdksfyoukz.supabase.co

echo.
echo Done. If resolver is 1.1.1.1 and 1.0.0.1, setup is correct.
pause
endlocal
