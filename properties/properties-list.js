const propertyGrid = document.querySelector("[data-property-grid]");
const filterButtons = document.querySelectorAll("[data-filter-status]");
const propertyCount = document.querySelector("[data-property-count]");
const operationLabel = document.querySelector("[data-filter-operation-label]");
const filtersRegion = document.querySelector("[data-property-filters]");
const filterModes = document.querySelector(".property-filter-modes");

const filterState = {
  status: "all"
};

function getFilterCopy(language) {
  return language === "es"
    ? {
        operation: "Tipo de operación",
        filters: "Filtros de propiedades",
        all: "Todas",
        sale: "En venta",
        rent: "En alquiler",
        view: "Ver propiedad",
        empty: "No hay propiedades que coincidan con estos filtros.",
        result: "propiedad",
        results: "propiedades"
      }
    : {
        operation: "Listing type",
        filters: "Property filters",
        all: "All",
        sale: "For sale",
        rent: "For rent",
        view: "View property",
        empty: "No properties match these filters.",
        result: "property",
        results: "properties"
      };
}

function propertyStatus(property, language) {
  if (property.status === "rent") {
    return language === "es" ? "Alquiler" : "For rent";
  }
  return language === "es" ? "Venta" : "For sale";
}

function renderPropertyList() {
  if (!propertyGrid || !window.propertyCatalog) return;

  const language = document.documentElement.lang === "es" ? "es" : "en";
  const copy = getFilterCopy(language);
  const properties = window.propertyCatalog.filter(
    (property) => filterState.status === "all" || property.status === filterState.status
  );

  operationLabel.textContent = copy.operation;
  filtersRegion.setAttribute("aria-label", copy.filters);
  filterModes.setAttribute("aria-label", copy.operation);
  filterButtons.forEach((button) => {
    button.textContent = copy[button.dataset.filterStatus];
    const active = button.dataset.filterStatus === filterState.status;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  propertyCount.textContent = `${properties.length} ${properties.length === 1 ? copy.result : copy.results}`;

  if (!properties.length) {
    propertyGrid.innerHTML = `<p class="property-empty">${copy.empty}</p>`;
    return;
  }

  propertyGrid.innerHTML = properties
    .map(
      (property) => `
        <article class="property-card">
          <a class="property-media" href="./${property.slug}/" aria-label="${copy.view}: ${property.location}">
            <img src="${property.images[0]}" alt="${property.title[language]}" loading="lazy" />
            <span class="property-status">${propertyStatus(property, language)}</span>
          </a>
          <div class="property-copy">
            <p class="property-location">${property.location}</p>
            <h2><a href="./${property.slug}/">${property.title[language]}</a></h2>
            <p class="property-features">${property.facts[language].join(" · ")}</p>
            <div class="property-footer ${property.priceValue == null ? "property-footer-without-price" : ""}">
              ${property.priceValue == null ? "" : `<strong>${property.price[language]}</strong>`}
              <a href="./${property.slug}/">${copy.view} <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterState.status = button.dataset.filterStatus;
    renderPropertyList();
  });
});

const languageObserver = new MutationObserver(renderPropertyList);
languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
renderPropertyList();

