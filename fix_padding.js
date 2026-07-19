const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Unify desktop padding for legal-section
css = css.replace(/clamp\(70px, 10vw, 128px\)/g, 'clamp(70px, 11vw, 132px)');

// Fix mobile padding for about section
css = css.replace(/\.about \{\s*gap: 24px;\s*padding-bottom: 44px;\s*\}/, 
`.about {
    gap: 24px;
    padding-top: 44px;
    padding-bottom: 44px;
  }`);

fs.writeFileSync('styles.css', css);
console.log('Padding fixed!');
