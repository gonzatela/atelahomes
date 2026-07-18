const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Add --olive-mid to :root
css = css.replace(/--olive-dark: #3f4a40;/, '--olive-dark: #3f4a40;\n  --olive-mid: #526054;');

// 2. Update .areas
css = css.replace(/\.areas \{\s*padding: 0 0 clamp\(70px, 11vw, 132px\);\s*border-top: 1px solid var\(--line\);\s*\}/, 
  `.areas {
  padding: clamp(70px, 11vw, 132px) max(21px, calc((100vw - var(--max)) / 2));
  background: var(--olive-mid);
  color: var(--paper);
}`);

// Since .areas is now a colored section, it might need to behave like .contact with left/right padding to bleed full width if we don't have a wrapper.
// Wait, .areas has an internal wrapper? No, the HTML is:
// <section class="areas editorial-section" id="areas">
// So it is already max-width centered. If we want the background to be full width, we must remove 'editorial-section' from <section> and add it to an inner div, OR just apply background to an outer wrapper.
// Actually, earlier for .hero I did exactly that!
// For .contact, it doesn't have .editorial-section, it just has padding with calc(). Let's use that pattern!

// 3. Update .homes
css = css.replace(/\.homes \{\s*padding: 0 0 clamp\(70px, 11vw, 132px\);\s*\}/, 
  `.homes {
  padding: clamp(70px, 11vw, 132px) max(21px, calc((100vw - var(--max)) / 2));
  background: var(--olive-mid);
  color: var(--paper);
}`);

// 4. Update section labels and text inside these colored sections
// We'll append some CSS rules at the bottom of the file to handle text colors in --olive-mid sections.
const newRules = `

/* Alternating background section text overrides */
.areas .section-label,
.homes .section-label {
  color: rgba(247, 243, 236, 0.7); /* Light muted */
}

.areas .section-label::before,
.homes .section-label::before {
  background: rgba(247, 243, 236, 0.7);
}

.areas p, .areas h2, .areas h3,
.homes p, .homes h2, .homes h3,
.homes .table-row span {
  color: var(--paper);
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

/* Also ensure links inside these colored sections are readable */
.homes .route-graphic {
  color: var(--paper);
}

.homes .button {
  border-color: var(--paper);
  color: var(--paper);
}
.homes .button:hover {
  background: var(--paper);
  color: var(--ink);
}

/* For .areas we might have links/buttons or area-cards */
.area-card:hover {
  border-color: rgba(247, 243, 236, 0.4);
}
`;

css += newRules;

// Remove mobile padding hacks that removed top padding
css = css.replace(/\.areas,\s*\.homes \{\s*padding: 0 0 44px;\s*\}/, 
  `.areas, .homes { padding: 44px 15px; }`);

fs.writeFileSync('styles.css', css);
console.log('CSS updated successfully!');
