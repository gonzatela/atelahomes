const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// Replace standard button
css = css.replace(/\.button \{\s*min-height: 56px;[\s\S]*?color 180ms ease;\s*\}/, 
`.button {
  min-height: 56px;
  border-radius: 40px;
  border: 1px solid var(--olive-mid);
  background: var(--olive-mid);
  color: var(--ink);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 560;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
}`);

// Replace button:hover
css = css.replace(/\.button:hover,\s*\.button:focus-visible \{\s*background: var\(--olive\);\s*color: var\(--ink\);\s*\}/, 
`.button:hover,
.button:focus-visible {
  background: var(--olive);
  border-color: var(--olive);
  color: var(--paper);
}`);

// Replace button.secondary
css = css.replace(/\.button\.secondary \{\s*background: transparent;\s*color: var\(--paper\);\s*\}/, 
`.button.secondary {
  background: transparent;
  color: var(--ink);
  border-color: var(--olive-mid);
}`);

// Replace button.secondary:hover
css = css.replace(/\.button\.secondary:hover,\s*\.button\.secondary:focus-visible \{\s*background: rgba\(247, 243, 236, 0\.1\);\s*color: var\(--paper\);\s*border-color: var\(--paper\);\s*\}/, 
`.button.secondary:hover,
.button.secondary:focus-visible {
  background: var(--olive-mid);
  color: var(--ink);
  border-color: var(--olive-mid);
}`);

// Add overrides for .homes .button
css += `
.homes .button {
  background: var(--paper);
  border-color: var(--paper);
  color: var(--ink);
}
.homes .button:hover,
.homes .button:focus-visible {
  background: transparent;
  border-color: var(--ink);
  color: var(--ink);
}
`;

fs.writeFileSync('styles.css', css);
console.log("CSS updated!");
