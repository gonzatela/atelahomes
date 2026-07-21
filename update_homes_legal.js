const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the logos from the table rows
html = html.replace(
  /<span role="cell">\s*<span data-i18n="routeBuyerCopy">Búsqueda, visitas, análisis, negociación y coordinación hasta la firma\.<\/span>\s*<img class="route-legal-logo"[^>]+>\s*<\/span>/,
  '<span role="cell" data-i18n="routeBuyerCopy">Búsqueda, visitas, análisis, negociación y coordinación hasta la firma.</span>'
);
html = html.replace(
  /<span role="cell">\s*<span data-i18n="routeSellerCopy">Valoración, preparación, presentación y seguimiento de compradores\.<\/span>\s*<img class="route-legal-logo"[^>]+>\s*<\/span>/,
  '<span role="cell" data-i18n="routeSellerCopy">Valoración, preparación, presentación y seguimiento de compradores.</span>'
);

// 2. Wrap routes-table and add the legal block
const routesTableStart = '<div class="routes-table" role="table" aria-label="Atela Homes client routes">';
const routesTableEnd = '</div>\n      </section>'; // this is where the section ends

// Find the exact content of routes-table to wrap it.
// Actually, it's safer to just replace the section end and add the start wrapper before routesTableStart.
html = html.replace(
  routesTableStart,
  '<div class="homes-layout">\n          ' + routesTableStart
);

html = html.replace(
  '          </div>\n      </section>',
  `          </div>
          <aside class="homes-legal-block">
            <img class="legal-partner-logo-homes" src="./assets/gluckheim-logo.png" alt="Gluckheim">
            <p data-i18n="homesLegalCopy">Durante la compraventa, proveemos asesoramiento legal especializado de la mano de Gluckheim, para garantizar una operación segura y sin contratiempos.</p>
          </aside>
        </div>
      </section>`
);

fs.writeFileSync('index.html', html);

// 3. Update CSS
let css = fs.readFileSync('styles.css', 'utf8');

const newCSS = `
.homes-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 60px;
  align-items: start;
  margin-top: 40px;
}
.homes-legal-block {
  padding: 32px 24px;
  background: rgba(247, 243, 236, 0.05);
  border: 1px solid rgba(247, 243, 236, 0.15);
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(247, 243, 236, 0.8);
}
.legal-partner-logo-homes {
  width: 140px;
  margin-bottom: 20px;
  filter: grayscale(1) invert(1) brightness(1.5);
}

@media (max-width: 960px) {
  .homes-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
`;

css += newCSS;
fs.writeFileSync('styles.css', css);

console.log('Update complete!');
