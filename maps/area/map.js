const params = new URLSearchParams(window.location.search);
const areaKey = params.get("area") || "goya";
const language = params.get("lang") === "es" ? "es" : "en";
const area = window.atelaMapAreas[areaKey] || window.atelaMapAreas.goya;

document.documentElement.lang = language;
document.title = `${area.label[language]} | Atela Homes`;
document.querySelector("#map").setAttribute(
  "aria-label",
  language === "es" ? `Mapa de ${area.label.es}` : `Map of ${area.label.en}`
);

const map = L.map("map", {
  attributionControl: true,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: true
});

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(map);

const boundary = L.geoJSON(area.geojson, {
  interactive: false,
  style: {
    color: "#4e514d",
    fillColor: "#77746d",
    fillOpacity: 0.6,
    lineCap: "square",
    lineJoin: "miter",
    opacity: 0.95,
    weight: 2
  }
}).addTo(map);

map.fitBounds(boundary.getBounds(), {
  animate: false,
  maxZoom: 15,
  padding: [28, 28]
});

L.control.scale({ imperial: false, maxWidth: 110, position: "bottomleft" }).addTo(map);

