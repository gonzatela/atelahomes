const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Base .button to outline green
css = css.replace(/\.button \{\s*min-height: 56px;\s*border-radius: 40px;\s*border: 1px solid var\(--olive-mid\);\s*background: var\(--olive-mid\);\s*color: var\(--paper\);/g, 
`.button {
  min-height: 56px;
  border-radius: 40px;
  border: 1px solid var(--olive-mid);
  background: transparent;
  color: var(--olive-mid);`);

css = css.replace(/\.button:hover,\s*\.button:focus-visible \{\s*background: var\(--olive\);\s*border-color: var\(--olive\);\s*\}/, 
`.button:hover,
.button:focus-visible {
  background: var(--olive-mid);
  border-color: var(--olive-mid);
  color: var(--paper);
}`);

// 2. Secondary button overrides (no longer needed if base is outline, but we'll adapt it just in case)
css = css.replace(/\.button\.secondary \{\s*background: transparent;\s*color: var\(--ink\);\s*\}/, 
`.button.secondary {
  /* Inherits outline from base */
}`);
css = css.replace(/\.button\.secondary:hover,\s*\.button\.secondary:focus-visible \{\s*background: var\(--olive-mid\);\s*color: var\(--paper\);\s*border-color: var\(--olive-mid\);\s*\}/, 
`.button.secondary:hover,
.button.secondary:focus-visible {
  /* Inherits hover from base */
}`);

// 3. Hero actions
css = css.replace(/\.hero-actions \.button:hover \{\s*background: transparent;\s*color: var\(--paper\);\s*\}/, 
`.hero-actions .button:hover {
  background: var(--olive-mid);
  border-color: var(--olive-mid);
  color: var(--paper);
}`);

// Also add hover for secondary hero button to turn green
css = css.replace(/\.hero-actions \.button\.secondary:hover \{\s*background: var\(--paper\);\s*color: var\(--ink\);\s*\}/, 
`.hero-actions .button.secondary:hover {
  background: var(--olive-mid);
  border-color: var(--olive-mid);
  color: var(--paper);
}`);

// 4. Contact form button
const contactButtonOverride = `
/* Contact form button override for dark background */
.contact .button {
  border-color: rgba(247, 243, 236, 0.4);
  color: var(--paper);
}
.contact .button:hover,
.contact .button:focus-visible {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--olive-dark);
}
`;

css += contactButtonOverride;

fs.writeFileSync('styles.css', css);
console.log('Buttons updated to outline style!');
