const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. Fix the checkmark shape so it's less elongated
css = css.replace(/left: 6px;\s*top: 2px;\s*width: 4px;\s*height: 10px;/g, 
  "left: 6px;\n  top: 3px;\n  width: 4px;\n  height: 8px;");

// 2. Add required asterisks logic
const requiredCSS = `
/* Required fields asterisks */
.contact-form label:has([required]) > span::after,
.contact-form fieldset:has([aria-required="true"]) > legend::after {
  content: " *";
  color: #d9534f;
}
`;
css += requiredCSS;

fs.writeFileSync('styles.css', css);
console.log('Fixed checkbox and added asterisks!');
