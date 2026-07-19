const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// 1. Change the color variable
css = css.replace(/--olive-mid: #9b9f97;/g, '--olive-mid: #667a69;');

// 2. Change text color for .areas and .homes to var(--paper)
css = css.replace(/\.areas \{\s*padding: clamp\(56px, 9vw, 104px\) max\(21px, calc\(\(100vw - var\(--max\)\) \/ 2\)\);\s*background: var\(--olive-mid\);\s*color: var\(--ink\);\s*\}/, 
`.areas {
  padding: clamp(56px, 9vw, 104px) max(21px, calc((100vw - var(--max)) / 2));
  background: var(--olive-mid);
  color: var(--paper);
}`);

css = css.replace(/\.homes \{\s*padding: clamp\(56px, 9vw, 104px\) max\(21px, calc\(\(100vw - var\(--max\)\) \/ 2\)\);\s*background: var\(--olive-mid\);\s*color: var\(--ink\);\s*\}/, 
`.homes {
  padding: clamp(56px, 9vw, 104px) max(21px, calc((100vw - var(--max)) / 2));
  background: var(--olive-mid);
  color: var(--paper);
}`);

// 3. Update the button colors since --olive-mid is now dark
css = css.replace(/\.button \{\s*min-height: 56px;\s*border-radius: 40px;\s*border: 1px solid var\(--olive-mid\);\s*background: var\(--olive-mid\);\s*color: var\(--ink\);/g, 
`.button {
  min-height: 56px;
  border-radius: 40px;
  border: 1px solid var(--olive-mid);
  background: var(--olive-mid);
  color: var(--paper);`);

// .button.secondary border is --olive-mid, color is --ink
// We probably don't need to change .button.secondary text color, since its background is transparent, so it sits on beige/white backgrounds.
// But .button.secondary:hover has background --olive-mid, so its text should be --paper.
css = css.replace(/\.button\.secondary:hover,\s*\.button\.secondary:focus-visible \{\s*background: var\(--olive-mid\);\s*color: var\(--ink\);\s*border-color: var\(--olive-mid\);\s*\}/, 
`.button.secondary:hover,
.button.secondary:focus-visible {
  background: var(--olive-mid);
  color: var(--paper);
  border-color: var(--olive-mid);
}`);

// 4. Update the text overrides for the dark background sections.
// Since we previously DELETED the overrides block, we need to append them again!
// We need to make sure h2, p, SVGs, etc., in .areas and .homes use var(--paper).

const overrides = `
/* Text overrides for dark olive-mid backgrounds */
.areas .section-label,
.homes .section-label {
  color: rgba(247, 243, 236, 0.7);
}

.areas .section-label::before,
.homes .section-label::before {
  background: rgba(247, 243, 236, 0.7);
}

.areas p, .areas h2, .areas h3,
.homes p, .homes h2, .homes h3,
.homes .table-row span,
.homes .route-link {
  color: var(--paper);
}

.homes .route-link {
  text-decoration-color: rgba(247, 243, 236, 0.4);
}
.homes .route-link:hover,
.homes .route-link:focus-visible {
  text-decoration-color: var(--paper);
}

.homes .table-row span:nth-child(2) {
  color: rgba(247, 243, 236, 0.8);
}

.homes .table-head {
  border-bottom: 1px solid rgba(247, 243, 236, 0.3);
}

.homes .table-row {
  border-bottom: 1px solid rgba(247, 243, 236, 0.2);
}

.areas .area-card:hover {
  border-color: rgba(247, 243, 236, 0.4);
}
`;

css += overrides;

fs.writeFileSync('styles.css', css);
console.log('Colors and text updated!');
