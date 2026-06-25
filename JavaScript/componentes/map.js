export let m;
export const marcadores = {};
let camadaMarcadores;

export async function mapa(locais, id = "map") {
  console.log("tttttt");
  console.log(locais);

  let locaisFosseis = [];

  if (Array.isArray(locais)) {
    locaisFosseis = locais;
  } else if (locais?.dadosOcorrenciasPBDB?.records) {
    locaisFosseis = locais.dadosOcorrenciasPBDB.records;
  } else if (locais?.records) {
    locaisFosseis = locais.records;
  }

  if (!Array.isArray(locaisFosseis)) {
    locaisFosseis = [];
  }

  // ==========================================================
  // NOVA CORREÇÃO: Destruição total para evitar o bug cinzento
  // ==========================================================
  
  // 1. Se a variável 'm' já tem um mapa, removemo-lo completamente da memória
  if (m && typeof m.remove === "function") {
    try {
      m.remove(); 
    } catch (e) {
      console.log("Aviso ao remover mapa antigo:", e);
    }
    m = null; // Reseta a variável para forçar a recriação abaixo
  }

  // 2. Cria sempre um mapa do zero associado ao novo elemento atual do HTML
  m = L.map(id, {
    zoomControl: true,
    worldCopyJump: true,
  }).setView([0, 0], 2);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      minZoom: 1,
      maxZoom: 20,
    }
  ).addTo(m);

  camadaMarcadores = L.layerGroup().addTo(m);

  // Forçamos o reajuste logo após a criação por segurança
  setTimeout(() => {
    m.invalidateSize();
  }, 50);

  // ==========================================================

  // O resto do teu código continua exatamente igual daqui para baixo...
  camadaMarcadores.clearLayers();
  for (const prop in marcadores) {
    delete marcadores[prop];
  }

  console.log(`Plotando ${locaisFosseis.length} registros no mapa.`);

  locaisFosseis.forEach((local) => {
    const latitude = local.lat || local.lng ? local.lat : local.lat;
    const longitude = local.lng || local.lon;

    if (!latitude || !longitude) return;

    const marker = L.circleMarker([latitude, longitude], {
      radius: 7,
      fillColor: "#69b51c",
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    })
      .bindPopup(`<strong>${local.tna || local.idn || "Dinossauro"}</strong>`);

    camadaMarcadores.addLayer(marker);

    if (local.oid) {
      marcadores[local.oid] = marker;
    }
  });

  const primeiro = locaisFosseis.find(
    (local) => (local.lat || local.lat) && (local.lng || local.lon),
  );

  if (primeiro) {
    const latPrimeiro = primeiro.lat;
    const lngPrimeiro = primeiro.lng || primeiro.lon;

    m.flyTo([latPrimeiro, lngPrimeiro], 5, {
      duration: 1,
    });

    if (primeiro.oid && marcadores[primeiro.oid]) {
      marcadores[primeiro.oid].openPopup();
    }
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

export function addPoites(consultas) {
  camadaMarcadores.clearLayers();

  // Limpa o objeto de referências
  for (const id in marcadores) {
    delete marcadores[id];
  }
  const registros = consultas.flatMap((c) => c.records);

  registros.forEach((local) => {
    const latitude = local.lat;
    const longitude = local.lng ?? local.lon;

    if (latitude == null || longitude == null) return;

    const marker = L.circleMarker([latitude, longitude], {
      radius: 7,
      fillColor: "#69b51c",
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    }).bindPopup(`<strong>${local.tna || "Dinossauro"}</strong>`);

    camadaMarcadores.addLayer(marker);

    if (local.oid) {
      marcadores[local.oid] = marker;
    }
  });
}
