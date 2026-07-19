const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/fallback\.style\.borderRadius = '8px';/g, 
  "fallback.style.borderRadius = '8px';\n    fallback.style.color = 'var(--paper)';");

fs.writeFileSync('script.js', js);
console.log('Fixed fallback text color!');
