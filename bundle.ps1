$src = "C:\Users\navar\atelahomes-temp"
$dest = "C:\Users\navar\OneDrive - CUNEF\Documents\Web Miren Atela\Produccion_DonDominio"

Write-Host "Creating production directory..."
if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
New-Item -ItemType Directory -Path $dest | Out-Null

Write-Host "Copying production files..."
Copy-Item "$src\index.html" -Destination $dest
Copy-Item "$src\styles.css" -Destination $dest
Copy-Item "$src\script.js" -Destination $dest
Copy-Item -Recurse "$src\assets" -Destination $dest

Write-Host "Creating ZIP archive for DonDominio..."
Compress-Archive -Path "$dest\*" -DestinationPath "$dest\AtelaHomes_Web.zip" -Force

Write-Host "Done!"
