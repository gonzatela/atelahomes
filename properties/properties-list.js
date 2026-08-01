const propertyGrid = document.querySelector("[data-property-grid]");
const filterButtons = document.querySelectorAll("[data-filter-status]");
const priceRange = document.querySelector("[data-price-filter]");
const priceOutput = document.querySelector("[data-price-output]");
const priceMin = document.querySelector("[data-price-min]");
const priceMax = document.querySelector("[data-price-max]");
const propertyCount = document.querySelector("[data-property-count]");
const operationLabel = document.querySelector("[data-filter-operation-label]");
const priceLabel = document.querySelector("[data-filter-price-label]");
const filtersRegion = document.querySelector("[data-property-filters]");
const filterModes = document.querySelector(".property-filter-modes");

const priceScales = {
  all: { min: 250000, max: 2000000, step: 25000 },
  sale: { min: 250000, max: 2000000, step: 25000 },
  rent: { min: 500, max: 5000, step: 100 }
};

const filterState = {
  status: "all",
  maxPrice: priceScales.all.max
};

function getFilterCopy(language) {
  return language === "es"
    ? {
        operation: "Tipo de operación",
        filters: "Filtros de propiedades",
        all: "Todas",
        sale: "En venta",
        rent: "En alquiler",
        price: "Precio máximo",
        noMaximum: "Sin máximo",
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
        price: "Maximum price",
        noMaximum: "No maximum",
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

function formatFilterPrice(value, language, compact = false) {
  const scale = priceScales[filterState.status];
  const locale = language === "es" ? "es-ES" : "en-GB";

  if (compact && value >= 1000000) {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value / 1000000)} M€`;
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value) + (filterState.status === "rent" ? (language === "es" ? "/mes" : "/month") : "");
}

function updatePriceControl(language) {
  if (!priceRange) return;

  const copy = getFilterCopy(language);
  const scale = priceScales[filterState.status];
  const progress = ((filterState.maxPrice - scale.min) / (scale.max - scale.min)) * 100;

  priceRange.min = scale.min;
  priceRange.max = scale.max;
  priceRange.step = scale.step;
  priceRange.value = filterState.maxPrice;
  priceRange.style.setProperty("--range-progress", `${progress}%`);
  priceRange.setAttribute("aria-valuetext", filterState.maxPrice === scale.max ? copy.noMaximum : formatFilterPrice(filterState.maxPrice, language));

  priceOutput.textContent = filterState.maxPrice === scale.max ? copy.noMaximum : formatFilterPrice(filterState.maxPrice, language);
  priceMin.textContent = formatFilterPrice(scale.min, language, true);
  priceMax.textContent = formatFilterPrice(scale.max, language, true);
}

function renderPropertyList() {
  if (!propertyGrid || !window.propertyCatalog) return;

  const language = document.documentElement.lang === "es" ? "es" : "en";
  const copy = getFilterCopy(language);
  const properties = window.propertyCatalog.filter((property) => {
    const matchesStatus = filterState.status === "all" || property.status === filterState.status;
    const matchesPrice = property.priceValue == null || property.priceValue <= filterState.maxPrice;
    return matchesStatus && matchesPrice;
  });

  operationLabel.textContent = copy.operation;
  priceLabel.textContent = copy.price;
  filtersRegion.setAttribute("aria-label", copy.filters);
  filterModes.setAttribute("aria-label", copy.operation);
  filterButtons.forEach((button) => {
    button.textContent = copy[button.dataset.filterStatus];
    const active = button.dataset.filterStatus === filterState.status;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  updatePriceControl(language);
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
            <div class="property-footer">
              <strong>${property.price[language]}</strong>
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
    filterState.maxPrice = priceScales[filterState.status].max;
    renderPropertyList();
  });
});

priceRange?.addEventListener("input", () => {
  filterState.maxPrice = Number(priceRange.value);
  renderPropertyList();
});

const languageObserver = new MutationObserver(renderPropertyList);
languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
renderPropertyList();
