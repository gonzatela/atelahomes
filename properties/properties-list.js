const propertyGrid = document.querySelector("[data-property-grid]");

function propertyStatus(property, language) {
  if (property.status === "rent") {
    return language === "es" ? "Alquiler" : "For rent";
  }
  return language === "es" ? "Venta" : "For sale";
}

function renderPropertyList() {
  if (!propertyGrid || !window.propertyCatalog) return;

  const language = document.documentElement.lang === "es" ? "es" : "en";
  const viewLabel = language === "es" ? "Ver propiedad" : "View property";

  propertyGrid.innerHTML = window.propertyCatalog
    .map(
      (property) => `
        <article class="property-card">
          <a class="property-media" href="./${property.slug}/" aria-label="${viewLabel}: ${property.location}">
            <img src="${property.images[0]}" alt="${property.title[language]}" loading="lazy" />
            <span class="property-status">${propertyStatus(property, language)}</span>
          </a>
          <div class="property-copy">
            <p class="property-location">${property.location}</p>
            <h2><a href="./${property.slug}/">${property.title[language]}</a></h2>
            <p class="property-features">${property.facts[language].join(" · ")}</p>
            <div class="property-footer">
              <strong>${property.price[language]}</strong>
              <a href="./${property.slug}/">${viewLabel} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

const languageObserver = new MutationObserver(renderPropertyList);
languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
renderPropertyList();
