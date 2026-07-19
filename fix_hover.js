const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.button:hover,\s*\.button:focus-visible \{\s*background: var\(--olive\);\s*border-color: var\(--olive\);\s*color: var\(--paper\);\s*\}/, 
`.button:hover,
.button:focus-visible {
  background: var(--olive-mid);
  border-color: var(--olive-mid);
  color: var(--paper);
}`);

fs.writeFileSync('styles.css', css);
console.log('Fixed button hover!');
