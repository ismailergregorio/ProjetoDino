export let m;
export const marcadores = {};
// Criamos um grupo de camadas para podermos limpar os marcadores antigos facilmente
let camadaMarcadores; 

export async function mapa(locais) {
  // ========================================================
  // SUPORTE ÀS DUAS MANEIRAS DE RECEBER DADOS
  // ========================================================
  let locaisFosseis = [];

  if (Array.isArray(locais)) {
    // Maneira 1: Se já for uma lista direta [ {...}, {...} ]
    locaisFosseis = locais;
  } else if (locais?.dadosOcorrenciasPBDB?.records) {
    // Maneira 2: Se for o objeto envelopado da API
    locaisFosseis = locais.dadosOcorrenciasPBDB.records;
  } else if (locais?.records) {
    // Uma variação comum da API caso venha direto do nó records
    locaisFosseis = locais.records;
  }

  // Garante que é um Array válido
  if (!Array.isArray(locaisFosseis)) {
    locaisFosseis = [];
  }

  // ========================================================
  // INICIALIZAÇÃO ÚNICA DO MAPA (Evita o erro de container já inicializado)
  // ========================================================
  if (!m) {
    m = L.map("map", {
      zoomControl: true,
      worldCopyJump: true,
    }).setView([0, 0], 2);

    // Camada do mapa (Dark Mode do CartoDB)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      minZoom: 1,
      maxZoom: 20,
    }).addTo(m);

    // Cria o grupo onde os marcadores vão ficar hospedados
    camadaMarcadores = L.layerGroup().addTo(m);
  }

  // Limpa os marcadores do filtro anterior no mapa e no objeto de referência
  camadaMarcadores.clearLayers();
  for (const prop in marcadores) {
    delete marcadores[prop];
  }

  // ========================================================
  // ADICIONA OS NOVOS MARCADORES
  // ========================================================
  console.log(`Plotando ${locaisFosseis.length} registros no mapa.`);

  locaisFosseis.forEach((local) => {
    // O PBDB costuma usar 'lat'/'lng' ou 'lat'/'lon'. Ajustado para garantir segurança:
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
      // 'tna' (Taxon Name) ou 'idn' (Identificação) são padrões do PBDB
      .bindPopup(`<strong>${local.tna || local.idn || "Dinossauro"}</strong>`);

    // Adiciona o marcador dentro do nosso grupo gerenciável
    camadaMarcadores.addLayer(marker);

    // Salva a referência usando o ID da ocorrência ('oid') para o efeito de Hover funcionar
    if (local.oid) {
      marcadores[local.oid] = marker;
    }
  });

  // ========================================================
  // REPOSICIONA O MAPA NO PRIMEIRO REGISTRO ENCONTRADO
  // ========================================================
  const primeiro = locaisFosseis.find((local) => (local.lat || local.lat) && (local.lng || local.lon));

  if (primeiro) {
    const latPrimeiro = primeiro.lat;
    const lngPrimeiro = primeiro.lng || primeiro.lon;

    m.flyTo([latPrimeiro, lngPrimeiro], 5, {
      duration: 1,
    });

    // Abre o balãozinho do primeiro se ele possuir um ID mapeado
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