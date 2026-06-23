export async function mapa(locais) {
  // 1. Inicializa o mapa primeiro (assim ele sempre renderiza, independente dos dados)
  const mapa = L.map("map", {
    zoomControl: true,
    worldCopyJump: true,
  }).setView([0, 0], 2);

  // 2. Adiciona a camada visual escura do CARTO
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    minZoom: 1,
    maxZoom: 20,
  }).addTo(mapa);

  // 3. Validação segura: extrai os records se eles existirem, senão cria uma array vazia []
  const locaisFosseis = locais?.dadosOcorrenciasPBDB?.records || [];

  // 4. Se a lista não estiver vazia, adiciona os marcadores
  if (locaisFosseis.length > 0) {
    locaisFosseis.forEach((local) => {
      // Verifica se o registro possui coordenadas válidas antes de plotar
      if (local.lat && local.lng) {
        L.circleMarker([local.lat, local.lng], {
          radius: 7,
          fillColor: "#69b51c",
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        })
          // Corrigido para carregar a propriedade correta de identificação do dinossauro (ex: tna ou idn da API)
          .bindPopup(
            `<strong>${local.tna || local.idn || "Dinossauro"}</strong>`,
          )
          .addTo(mapa);
      }
    });
  }
}