const fs = require('fs');

let js = fs.readFileSync('script.js', 'utf8');

// Fix syntax error
js = js.replace(/doesn\\\\'t/g, "doesn't");

// Disable Lenis on mobile
js = js.replace(/const supportsFinePointer = window\.matchMedia\("\(pointer: fine\)"\)\.matches;/, 
`const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  if (window.innerWidth <= 760) return; // Disable Lenis on mobile devices`);

fs.writeFileSync('script.js', js);
console.log('Fixed script.js!');
