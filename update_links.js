const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<a href="#contact" class="button" data-i18n="routeCta">/g, '<a href="#contact" class="route-link" data-i18n="routeCta">');
fs.writeFileSync('index.html', html);

// 2. Update CSS
let css = fs.readFileSync('styles.css', 'utf8');

// Remove the old .homes .button overrides
css = css.replace(/\.homes \.button \{[\s\S]*?color: var\(--ink\);\s*\}/, '');

// Append .route-link styles
const newStyles = `
.route-link {
  font-weight: 560;
  text-decoration: underline;
  text-decoration-color: rgba(21, 26, 22, 0.3);
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  transition: text-decoration-color 160ms ease;
  white-space: nowrap;
}
.route-link:hover,
.route-link:focus-visible {
  text-decoration-color: var(--ink);
}
`;
css += newStyles;

fs.writeFileSync('styles.css', css);
console.log('Links updated!');
