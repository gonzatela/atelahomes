const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/overflow-wrap: anywhere;/g, 'overflow-wrap: break-word;\n  word-break: normal;');

fs.writeFileSync('styles.css', css);
console.log('Fixed overflow-wrap!');
