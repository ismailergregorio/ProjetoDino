export let m;
export const marcadores = {};

export async function mapa(locais) {
  // Inicializa o mapa
  m = L.map("map", {
    zoomControl: true,
    worldCopyJump: true,
  }).setView([0, 0], 2);

  // Camada do mapa
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    minZoom: 1,
    maxZoom: 20,
  }).addTo(m);

  const locaisFosseis = locais?.dadosOcorrenciasPBDB?.records || [];

  // Adiciona os marcadores
  locaisFosseis.forEach((local) => {
    if (!local.lat || !local.lng) return;

    const marker = L.circleMarker([local.lat, local.lng], {
      radius: 7,
      fillColor: "#69b51c",
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    })
      .bindPopup(`<strong>${local.tna || local.idn || "Dinossauro"}</strong>`)
      .addTo(m);

    marcadores[local.oid] = marker;
  });

  // Centraliza no primeiro local encontrado
  const primeiro = locaisFosseis.find((local) => local.lat && local.lng);

  if (primeiro) {
    m.flyTo([primeiro.lat, primeiro.lng], 5, {
      duration: 1,
    });

    marcadores[primeiro.oid].openPopup();
  }
}

export function ativarHoverLista() {
  document.querySelectorAll(".lista-local").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const marker = marcadores[item.dataset.id];

      if (!marker) return;

      m.flyTo(marker.getLatLng(), 6, {
        duration: 1,
      });

      marker.openPopup();
    });

    item.addEventListener("mouseleave", () => {
      const marker = marcadores[item.dataset.id];

      if (marker) {
        marker.closePopup();
      }
    });
  });
}
