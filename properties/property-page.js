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
    .map((image, index) => `<figure><img src="${image}" alt="${property.title[language]} - ${index + 1}" ${index ? 'loading="lazy"' : ""} /></figure>`)
    .join("");

  document.querySelector("[data-property-back]").textContent = `← ${copy.back}`;
  document.querySelector("[data-property-gallery-label]").textContent = copy.gallery;
  document.querySelector("[data-property-gallery-intro]").textContent = copy.galleryIntro;
  document.querySelector("[data-property-cta-label]").textContent = copy.ctaLabel;
  document.querySelector("[data-property-cta-title]").textContent = copy.ctaTitle;
  document.querySelector("[data-property-cta-copy]").textContent = copy.ctaCopy;
  document.querySelector("[data-property-cta-button]").textContent = copy.ctaButton;

  const contactLink = document.querySelector("[data-property-cta-button]");
  const subject = language === "es" ? `Consulta sobre ${property.location}` : `Enquiry about ${property.location}`;
  contactLink.href = `mailto:info@atelahomes.com?subject=${encodeURIComponent(subject)}`;
}

const propertyLanguageObserver = new MutationObserver(renderPropertyPage);
propertyLanguageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
renderPropertyPage();
