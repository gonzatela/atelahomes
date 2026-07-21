const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\navar\\atelahomes-temp';
const dest = 'C:\\Users\\navar\\OneDrive - CUNEF\\Documents\\Web Miren Atela\\Produccion_DonDominio';

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true, force: true });
}
fs.mkdirSync(dest, { recursive: true });

fs.copyFileSync(path.join(src, 'index.html'), path.join(dest, 'index.html'));
fs.copyFileSync(path.join(src, 'styles.css'), path.join(dest, 'styles.css'));
fs.copyFileSync(path.join(src, 'script.js'), path.join(dest, 'script.js'));

fs.cpSync(path.join(src, 'assets'), path.join(dest, 'assets'), { recursive: true });

console.log('Successfully created the clean production folder at: ' + dest);
