import { BuscarImagem } from "../api/api2.js";
export let m;
export const marcadores = {};
let camadaMarcadores;

export async function mapa(locais, id = "map") {
  console.log("LLLLLLLLLLLLLLLLLLLLLLLL");
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

  if (m && typeof m.remove === "function") {
    try {
      m.remove();
    } catch (e) {
      console.log("Aviso ao remover mapa antigo:", e);
    }
    m = null;
  }

  m = L.map(id, {
    zoomControl: true,
    worldCopyJump: true,
  }).setView([0, 0], 2);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    minZoom: 1,
    maxZoom: 20,
  }).addTo(m);

  camadaMarcadores = L.layerGroup().addTo(m);

  setTimeout(() => {
    m.invalidateSize();
  }, 50);

  camadaMarcadores.clearLayers();
  for (const prop in marcadores) {
    delete marcadores[prop];
  }

  console.log(`Plotando ${locaisFosseis.length} registros no mapa.`);

  locaisFosseis.forEach(async (local) => {
    const nome = locais.dadosTaxonPBDB.records[0].nam;
    const imagem = await BuscarImagem(nome);

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
    });

    marker.bindPopup(`
    <div class="popup-dino">

    <img
        src="${imagem}"
        alt="${nome}"
        class="popup-img"
    >

    <div class="popup-info">

        <h3>${nome}</h3>

        <div class="popup-item">
            <i data-lucide="map-pin"></i>
            <span>${local.stp || "Local desconhecido"}, ${local.cc2 || ""}</span>
        </div>

        <div class="popup-item">
            <i data-lucide="calendar"></i>
            <span>${local.eag} - ${local.lag} milhões de anos</span>
        </div>

    </div>

</div>
`);

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
  marker.on("popupopen", () => {
    lucide.createIcons();
  });
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

export function addPoites(consultas, taxonLista) {
  camadaMarcadores.clearLayers();

  // Limpa o objeto de referências
  for (const id in marcadores) {
    delete marcadores[id];
  }
  const taxon = taxonLista.flatMap((c) => c.records[0]);
  const registros = consultas.flatMap((c) => c.records);
  taxon.forEach((tax) => {
    console.log(tax);

    registros.forEach(async (local) => {
      const latitude = local.lat;
      const longitude = local.lng ?? local.lon;
      const imagem = await BuscarImagem(tax.nam);

      if (latitude == null || longitude == null) return;

      const marker = L.circleMarker([latitude, longitude], {
        radius: 7,
        fillColor: "#69b51c",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9,
      }).bindPopup(`
    <div class="popup-dino">

    <img
        src="${imagem}"
        alt="${tax.nam}"
        class="popup-img"
    >

    <div class="popup-info">

        <h3>${tax.nam}</h3>

        <div class="popup-item">
            <i data-lucide="map-pin"></i>
            <span>${local.stp || "Local desconhecido"}, ${local.cc2 || ""}</span>
        </div>

        <div class="popup-item">
            <i data-lucide="calendar"></i>
            <span>${latitude} - ${longitude} Ma</span>
        </div>

    </div>

</div>
`);

      camadaMarcadores.addLayer(marker);

      if (local.oid) {
        marcadores[local.oid] = marker;
      }
    });
  });
}
