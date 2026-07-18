const fs = require('fs');
let css = fs.readFileSync('styles.css', 'utf8');

// 1. .intro (line ~381) - remove bottom padding
css = css.replace(/\.intro \{\s*padding: clamp\(70px, 11vw, 134px\) 0;\s*\}/, 
  '.intro {\n  padding: clamp(70px, 11vw, 132px) 0 0;\n}');

// 2. .figure-gallery (line ~455) - smaller top margin, keep bottom padding
css = css.replace(/padding-bottom: clamp\(70px, 11vw, 130px\);/, 
  'padding: clamp(40px, 6vw, 80px) 0 clamp(70px, 11vw, 132px);');

// 3. .areas (line ~539) - remove top padding
css = css.replace(/\.areas \{\s*padding: clamp\(70px, 11vw, 132px\) 0;/, 
  '.areas {\n  padding: 0 0 clamp(70px, 11vw, 132px);');

// 4. .homes (line ~795) - remove top padding
css = css.replace(/\.homes \{\s*padding: clamp\(70px, 11vw, 132px\) 0;/, 
  '.homes {\n  padding: 0 0 clamp(70px, 11vw, 132px);');

// 5. .trust - keep bottom padding only (currently it's "padding: clamp(...) 0")
// Note: wait, let me just check if trust exists.
css = css.replace(/\.trust \{\s*padding: clamp\(70px, 11vw, 132px\) 0;/, 
  '.trust {\n  padding: 0 0 clamp(70px, 11vw, 132px);');

// 6. Colored sections (.services, .legal-section, .contact)
// Reduce from clamp(70px, ...) to clamp(50px, ...) so they don't look as massive
css = css.replace(/padding: clamp\(70px, 10vw, 128px\) max/g, 
  'padding: clamp(50px, 8vw, 90px) max');
css = css.replace(/padding: clamp\(74px, 11vw, 132px\) max/g, 
  'padding: clamp(50px, 8vw, 90px) max');

fs.writeFileSync('styles.css', css);
console.log('CSS updated');
