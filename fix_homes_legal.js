const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The `</div>\n      </section>` at line 331-332 was missed.
// The routes-table ends with `</div>`. And then the container `homes-layout` should end, then `</section>`.
// Currently the HTML is:
// <div class="homes-layout">
//   <div class="routes-table" ...>
//     ...
//   </div> <!-- ends routes-table -->
// </div> <!-- this is missing! -->
// </section>

// Wait, let's look at the current HTML around the end of .routes-table
const endOfTable = `<span role="cell" data-i18n="routeRelocationCopy">Vivienda, colegios, servicios y apoyo práctico para instalarte.</span>
            <span role="cell"><a href="#contact" class="route-link" data-i18n="routeCta">Empezar mi búsqueda</a></span>
          </div>
        </div>`;

const endWithAside = `<span role="cell" data-i18n="routeRelocationCopy">Vivienda, colegios, servicios y apoyo práctico para instalarte.</span>
            <span role="cell"><a href="#contact" class="route-link" data-i18n="routeCta">Empezar mi búsqueda</a></span>
          </div>
        </div>
        <aside class="homes-legal-block">
          <img class="legal-partner-logo-homes" src="./assets/gluckheim-logo.png" alt="Gluckheim">
          <p data-i18n="homesLegalCopy">Durante la compraventa, proveemos asesoramiento legal especializado de la mano de Gluckheim, para garantizar una operación segura y sin contratiempos.</p>
        </aside>
      </div>`;

html = html.replace(endOfTable, endWithAside);

fs.writeFileSync('index.html', html);
console.log('Fixed aside insertion!');
