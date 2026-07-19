const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.about \{\s*display: grid;\s*grid-template-columns: minmax\(280px, 0\.54fr\) minmax\(0, 1fr\);\s*gap: clamp\(30px, 7vw, 96px\);\s*align-items: center;\s*padding-bottom: clamp\(70px, 11vw, 132px\);\s*\}/, 
`.about {
  display: grid;
  grid-template-columns: minmax(280px, 0.54fr) minmax(0, 1fr);
  gap: clamp(30px, 7vw, 96px);
  align-items: center;
  padding-top: clamp(70px, 11vw, 132px);
  padding-bottom: clamp(70px, 11vw, 132px);
}`);

fs.writeFileSync('styles.css', css);
console.log('CSS padded!');
