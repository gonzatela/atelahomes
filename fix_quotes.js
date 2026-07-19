const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/fallback\.innerHTML \= currentLang \=\=\= 'es'[\s\S]*?info\@atelahomes\.com<\/b>\.';/, 
`fallback.innerHTML = currentLang === 'es' 
    ? "Si tu aplicación de correo no se abre automáticamente, <a href='" + mailtoLink + "' style='text-decoration:underline; font-weight:560;'>haz clic aquí</a> o escribe a <b>info@atelahomes.com</b>."
    : "If your mail app doesn't open automatically, <a href='" + mailtoLink + "' style='text-decoration:underline; font-weight:560;'>click here</a> or email <b>info@atelahomes.com</b>.";`);

fs.writeFileSync('script.js', js);
console.log('Fixed quotes!');
