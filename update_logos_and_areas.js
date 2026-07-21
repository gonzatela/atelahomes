const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const oldAreas = `<article>
              <span>1</span>
              <h3 data-i18n="areaOneTitle">Costa y segunda residencia</h3>
              <p data-i18n="areaOneCopy">Propiedades con exterior, privacidad y acceso sencillo a servicios.</p>
            </article>
            <article>
              <span>2</span>
              <h3 data-i18n="areaTwoTitle">Centro urbano</h3>
              <p data-i18n="areaTwoCopy">Barrios conectados para clientes que priorizan movilidad y vida diaria.</p>
            </article>
            <article>
              <span>3</span>
              <h3 data-i18n="areaThreeTitle">Entorno familiar</h3>
              <p data-i18n="areaThreeCopy">Zonas tranquilas con colegios, comunidad y espacio para instalarse.</p>
            </article>`;

const newAreas = `<article>
              <span>1</span>
              <h3 data-i18n="areaTwoTitle">Centro urbano</h3>
              <p data-i18n="areaTwoCopy">Barrios conectados para clientes que priorizan movilidad y vida diaria.</p>
            </article>
            <article>
              <span>2</span>
              <h3 data-i18n="areaThreeTitle">Entorno familiar</h3>
              <p data-i18n="areaThreeCopy">Zonas tranquilas con colegios, comunidad y espacio para instalarse.</p>
            </article>
            <article>
              <span>3</span>
              <h3 data-i18n="areaOneTitle">Costa y segunda residencia</h3>
              <p data-i18n="areaOneCopy">Propiedades con exterior, privacidad y acceso sencillo a servicios.</p>
            </article>`;

html = html.replace(oldAreas, newAreas);

// Add logo to "Quiero comprar una vivienda" row
html = html.replace(
  '<span role="cell" data-i18n="routeBuyerCopy">Búsqueda, visitas, análisis, negociación y coordinación hasta la firma.</span>',
  `<span role="cell">
              <span data-i18n="routeBuyerCopy">Búsqueda, visitas, análisis, negociación y coordinación hasta la firma.</span>
              <img class="route-legal-logo" src="./assets/gluckheim-logo.png" alt="Gluckheim" />
            </span>`
);

// Add logo to "Quiero vender mi propiedad" row
html = html.replace(
  '<span role="cell" data-i18n="routeSellerCopy">Valoración, preparación, presentación y seguimiento de compradores.</span>',
  `<span role="cell">
              <span data-i18n="routeSellerCopy">Valoración, preparación, presentación y seguimiento de compradores.</span>
              <img class="route-legal-logo" src="./assets/gluckheim-logo.png" alt="Gluckheim" />
            </span>`
);

fs.writeFileSync('index.html', html);

// 2. Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');

css = css.replace(/\.legal-partner-logo \{\s*width: 100%;\s*height: auto;\s*filter: grayscale\(0\.15\) contrast\(1\.05\);\s*\}/, 
`.legal-partner-logo {
  width: 100%;
  height: auto;
  filter: grayscale(1) contrast(1.2);
}

.route-legal-logo {
  display: block;
  height: 22px;
  margin-top: 14px;
  filter: grayscale(1) contrast(1.2);
  opacity: 0.85;
}`);

fs.writeFileSync('styles.css', css);

console.log('Update complete!');
