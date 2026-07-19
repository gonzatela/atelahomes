const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

// Desktop paddings
css = css.replace(/clamp\(70px, 11vw, 134px\)/g, 'clamp(56px, 9vw, 104px)');
css = css.replace(/clamp\(70px, 11vw, 132px\)/g, 'clamp(56px, 9vw, 104px)');
css = css.replace(/clamp\(74px, 11vw, 132px\)/g, 'clamp(56px, 9vw, 104px)');
css = css.replace(/clamp\(70px, 11vw, 130px\)/g, 'clamp(56px, 9vw, 104px)');

// Mobile paddings (44px)
// We only want to replace padding: 44px ..., padding-top: 44px, padding-bottom: 44px
css = css.replace(/padding: 44px/g, 'padding: 36px');
css = css.replace(/padding-top: 44px/g, 'padding-top: 36px');
css = css.replace(/padding-bottom: 44px/g, 'padding-bottom: 36px');

fs.writeFileSync('styles.css', css);
console.log('Paddings reduced!');
