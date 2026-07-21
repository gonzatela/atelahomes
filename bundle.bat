@echo off
set DEST="C:\Users\navar\OneDrive - CUNEF\Documents\Web Miren Atela\Produccion_DonDominio"
set SRC="C:\Users\navar\atelahomes-temp"

rmdir /S /Q %DEST%
mkdir %DEST%

copy %SRC%\index.html %DEST%\
copy %SRC%\styles.css %DEST%\
copy %SRC%\script.js %DEST%\
xcopy %SRC%\assets %DEST%\assets\ /E /I /H /Y

powershell Compress-Archive -Path "C:\Users\navar\OneDrive - CUNEF\Documents\Web Miren Atela\Produccion_DonDominio\*" -DestinationPath "C:\Users\navar\OneDrive - CUNEF\Documents\Web Miren Atela\AtelaHomes_DonDominio.zip" -Force
echo Done!
