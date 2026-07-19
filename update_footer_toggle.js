const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Footer height
css = css.replace(/min-height: clamp\(180px, 31vh, 292px\);/, 'min-height: clamp(100px, 15vh, 160px);');
css = css.replace(/padding: clamp\(54px, 9vw, 94px\) clamp\(22px, 4vw, 64px\) 24px;/, 'padding: clamp(30px, 5vw, 60px) clamp(22px, 4vw, 64px) 24px;');

// Mobile footer padding/height
css = css.replace(/min-height: 148px;\s*padding: 38px 17px 18px;/, 'min-height: 100px;\n    padding: 24px 17px 18px;');


// 2. Language switch
css = css.replace(/\.language-switch \{\s*display: inline-grid;\s*grid-template-columns: repeat\(2, 38px\);\s*gap: 2px;\s*border: 1px solid currentColor;\s*\}/, 
`.language-switch {
  display: inline-grid;
  grid-template-columns: repeat(2, 38px);
  gap: 2px;
  border: 1px solid currentColor;
  border-radius: 40px;
  padding: 2px;
  transition: border-color 180ms ease;
}`);

css = css.replace(/\.language-switch button \{\s*min-height: 28px;/, 
`.language-switch button {
  min-height: 28px;
  border-radius: 40px;`);

// Make scrolled language switch use the new green (--olive-mid)
css = css.replace(/\.site-header\.scrolled \.language-switch button\.active,\s*\.site-header\.menu-active \.language-switch button\.active \{\s*background: var\(--olive-dark\);\s*color: var\(--paper\);\s*\}/, 
`.site-header.scrolled .language-switch button.active,
.site-header.menu-active .language-switch button.active {
  background: var(--olive-mid);
  color: var(--paper);
}`);

// Change border color to --olive-mid when scrolled
// The scrolled header overrides colors. We can just add a specific rule.
const newRule = `
.site-header.scrolled .language-switch,
.site-header.menu-active .language-switch {
  border-color: var(--olive-mid);
}
`;
css += newRule;

fs.writeFileSync('styles.css', css);
console.log('Done!');
