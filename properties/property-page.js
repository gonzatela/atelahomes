const propertySlug = window.location.pathname.split("/").filter(Boolean).at(-1);
const property = window.propertyCatalog?.find((item) => item.slug === propertySlug);

function renderPropertyPage() {
  if (!property) {
    window.location.replace("../");
    return;
  }

  const language = document.documentElement.lang === "es" ? "es" : "en";
  const copy = language === "es"
    ? {
        statusRent: "Alquiler",
        statusSale: "Venta",
        back: "Todas las propiedades",
        gallery: "Galería",
        galleryIntro: "Recorre los espacios y detalles de la propiedad.",
        distribution: "Distribución",
        layoutTitle: "Propuesta de distribución",
        location: "Ubicación",
        locationIntro: "La dirección en contexto",
        galleryDialog: "Galería de la propiedad",
        openImage: "Ampliar imagen",
        closeGallery: "Cerrar galería",
        previousImage: "Imagen anterior",
        nextImage: "Imagen siguiente",
        ctaLabel: "Consulta",
        ctaTitle: "¿Quieres visitar esta propiedad?",
        ctaCopy: "Cuéntanos tus fechas y necesidades. Te responderemos con disponibilidad y próximos pasos.",
        ctaButton: "Solicitar información"
      }
    : {
        statusRent: "For rent",
        statusSale: "For sale",
        back: "All properties",
        gallery: "Gallery",
        galleryIntro: "Explore the property's spaces and details.",
        distribution: "Distribution",
        layoutTitle: "Proposed layout",
        location: "Location",
        locationIntro: "The address in context",
        galleryDialog: "Property gallery",
        openImage: "Enlarge image",
        closeGallery: "Close gallery",
        previousImage: "Previous image",
        nextImage: "Next image",
        ctaLabel: "Enquiry",
        ctaTitle: "Would you like to view this property?",
        ctaCopy: "Tell us your preferred dates and requirements. We will reply with availability and next steps.",
        ctaButton: "Request information"
      };

  document.title = `${property.title[language]} | Atela Homes`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", property.description[language]);
  document.querySelector("[data-property-hero-image]")?.setAttribute("src", property.images[0]);
  document.querySelector("[data-property-hero-image]")?.setAttribute("alt", property.title[language]);
  document.querySelector("[data-property-status]").textContent = property.status === "rent" ? copy.statusRent : copy.statusSale;
  document.querySelector("[data-property-location]").textContent = property.location;
  document.querySelector("[data-property-title]").textContent = property.title[language];
  document.querySelector("[data-property-price]").textContent = property.price[language];
  document.querySelector("[data-property-description]").textContent = property.description[language];
  document.querySelector("[data-property-facts]").innerHTML = property.facts[language]
    .map((fact) => `<li>${fact}</li>`)
    .join("");
  document.querySelector("[data-property-gallery]").innerHTML = property.images
    .slice(1)
    .map((image, index) => `
      <figure>
        <button class="property-gallery-open" type="button" data-gallery-index="${index}" aria-label="${copy.openImage}: ${index + 1}">
          <img src="${image}" alt="${property.title[language]} - ${index + 1}" ${index ? 'loading="lazy"' : ""} />
        </button>
      </figure>
    `)
    .join("");

  updateLightboxCopy(copy);

  const layoutSection = document.querySelector("[data-property-layout-section]");
  layoutSection.hidden = !property.layout;
  if (property.layout) {
    const layoutImage = document.querySelector("[data-property-layout-image]");
    layoutImage.src = property.layout;
    layoutImage.alt = `${copy.layoutTitle} - ${property.location}`;
  }

  const map = document.querySelector("[data-property-map]");
  const mapContainer = map.closest(".property-location-map");
  const hasAreaMap = Boolean(property.areaMapId);
  mapContainer.classList.toggle("is-area-map", hasAreaMap);
  map.src = hasAreaMap
    ? `https://www.google.com/maps/d/u/0/embed?mid=${encodeURIComponent(property.areaMapId)}&ehbc=2E312F&noprof=1`
    : `https://www.google.com/maps?q=${encodeURIComponent(property.mapAreaQuery || property.mapQuery)}&output=embed&z=14`;
  map.title = `${copy.location}: ${property.location}`;

  document.querySelector("[data-property-back]").textContent = `← ${copy.back}`;
  document.querySelector("[data-property-gallery-label]").textContent = copy.gallery;
  document.querySelector("[data-property-gallery-intro]").textContent = copy.galleryIntro;
  document.querySelector("[data-property-distribution-label]").textContent = copy.distribution;
  document.querySelector("[data-property-layout-title]").textContent = copy.layoutTitle;
  document.querySelector("[data-property-location-label]").textContent = copy.location;
  document.querySelector("[data-property-location-intro]").textContent = copy.locationIntro;
  document.querySelector("[data-property-location-title]").textContent = property.location;
  document.querySelector("[data-property-location-copy]").textContent = property.locationDescription[language];
  document.querySelector("[data-property-cta-label]").textContent = copy.ctaLabel;
  document.querySelector("[data-property-cta-title]").textContent = copy.ctaTitle;
  document.querySelector("[data-property-cta-copy]").textContent = copy.ctaCopy;
  document.querySelector("[data-property-cta-button]").textContent = copy.ctaButton;

  const contactLink = document.querySelector("[data-property-cta-button]");
  const subject = language === "es" ? `Consulta sobre ${property.location}` : `Enquiry about ${property.location}`;
  contactLink.href = `mailto:info@atelahomes.com?subject=${encodeURIComponent(subject)}`;
  const locationContactLink = document.querySelector("[data-property-location-button]");
  locationContactLink.textContent = copy.ctaButton;
  locationContactLink.href = contactLink.href;
}

let lightboxIndex = 0;
let lightboxTrigger = null;

const lightbox = document.createElement("div");
lightbox.className = "property-lightbox";
lightbox.hidden = true;
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.innerHTML = `
  <div class="property-lightbox-toolbar">
    <span data-lightbox-counter></span>
    <button type="button" class="property-lightbox-close" data-lightbox-close>×</button>
  </div>
  <button type="button" class="property-lightbox-nav property-lightbox-prev" data-lightbox-prev>‹</button>
  <figure class="property-lightbox-figure">
    <img data-lightbox-image alt="" />
  </figure>
  <button type="button" class="property-lightbox-nav property-lightbox-next" data-lightbox-next>›</button>
`;
document.body.append(lightbox);

function updateLightboxCopy(copy) {
  lightbox.setAttribute("aria-label", copy.galleryDialog);
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const previousButton = lightbox.querySelector("[data-lightbox-prev]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  closeButton.setAttribute("aria-label", copy.closeGallery);
  closeButton.title = copy.closeGallery;
  previousButton.setAttribute("aria-label", copy.previousImage);
  previousButton.title = copy.previousImage;
  nextButton.setAttribute("aria-label", copy.nextImage);
  nextButton.title = copy.nextImage;
}

function updateLightboxImage() {
  const galleryItems = [...document.querySelectorAll("[data-gallery-index]")];
  lightboxIndex = (lightboxIndex + galleryItems.length) % galleryItems.length;
  const thumbnail = galleryItems[lightboxIndex].querySelector("img");
  const image = lightbox.querySelector("[data-lightbox-image]");
  image.src = thumbnail.currentSrc || thumbnail.src;
  image.alt = thumbnail.alt;
  lightbox.querySelector("[data-lightbox-counter]").textContent = `${lightboxIndex + 1} / ${galleryItems.length}`;
}

function openLightbox(trigger) {
  const galleryItems = [...document.querySelectorAll("[data-gallery-index]")];
  lightboxIndex = galleryItems.indexOf(trigger);
  lightboxTrigger = trigger;
  updateLightboxImage();
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  document.documentElement.classList.add("lightbox-open");
  lightbox.querySelector("[data-lightbox-close]").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  document.documentElement.classList.remove("lightbox-open");
  lightboxTrigger?.focus();
  lightboxTrigger = null;
}

document.querySelector("[data-property-gallery]").addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-gallery-index]");
  if (!trigger) return;
  openLightbox(trigger);
});

lightbox.querySelector("[data-lightbox-close]").addEventListener("click", closeLightbox);
lightbox.querySelector("[data-lightbox-prev]").addEventListener("click", () => {
  lightboxIndex -= 1;
  updateLightboxImage();
});
lightbox.querySelector("[data-lightbox-next]").addEventListener("click", () => {
  lightboxIndex += 1;
  updateLightboxImage();
});
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") {
    lightboxIndex -= 1;
    updateLightboxImage();
  }
  if (event.key === "ArrowRight") {
    lightboxIndex += 1;
    updateLightboxImage();
  }
});

const propertyLanguageObserver = new MutationObserver(renderPropertyPage);
propertyLanguageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
renderPropertyPage();
