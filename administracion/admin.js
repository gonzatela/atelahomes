const USER_HASH = "e3259139e5ee59f6f104fddf0b68d0b317b116d05b908710c473303c86b1ef1d";
const PASSWORD_HASH = "283e8fa8ecb9fb237722f106c3a3d4cf0dbb0fe397d18fa22290767a61648402";
const SESSION_KEY = "atela-admin-authenticated";

const loginSection = document.querySelector("[data-admin-login]");
const dashboard = document.querySelector("[data-admin-dashboard]");
const loginForm = document.querySelector("[data-admin-form]");
const loginError = document.querySelector("[data-admin-error]");
const propertyGrid = document.querySelector("[data-admin-grid]");
const propertyCount = document.querySelector("[data-admin-count]");

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function loadProperties() {
  const response = await fetch("./fichas.json", { cache: "no-store" });
  if (!response.ok) throw new Error("No se pudo cargar el catálogo de fichas.");
  const properties = await response.json();
  propertyCount.textContent = `${properties.length} fichas disponibles`;
  propertyGrid.innerHTML = properties.map((property) => `
    <article class="admin-property-card">
      <img src="${property.cover}" alt="${property.name}" loading="lazy" />
      <div>
        <p>${property.operation}</p>
        <h2>${property.name}</h2>
        <span>${property.price}</span>
        <a class="button" href="../assets/admin/fichas/${property.pdf}" download>Descargar PDF</a>
      </div>
    </article>
  `).join("");
}

async function showDashboard() {
  loginSection.hidden = true;
  dashboard.hidden = false;
  try {
    await loadProperties();
  } catch (error) {
    propertyGrid.innerHTML = `<p class="admin-load-error">${error.message}</p>`;
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const [userHash, passwordHash] = await Promise.all([
    sha256(String(formData.get("username") || "")),
    sha256(String(formData.get("password") || ""))
  ]);

  if (userHash !== USER_HASH || passwordHash !== PASSWORD_HASH) {
    loginError.hidden = false;
    loginForm.querySelector("[name='password']").value = "";
    loginForm.querySelector("[name='password']").focus();
    return;
  }

  loginError.hidden = true;
  sessionStorage.setItem(SESSION_KEY, "true");
  await showDashboard();
});

document.querySelector("[data-admin-logout]").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  dashboard.hidden = true;
  loginSection.hidden = false;
  loginForm.reset();
  loginForm.querySelector("[name='username']").focus();
});

if (sessionStorage.getItem(SESSION_KEY) === "true") {
  showDashboard();
}
