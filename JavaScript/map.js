// Cria o mapa
const mapa = L.map("map", {
    zoomControl: true,
    worldCopyJump: true
}).setView([35, -98], 2);

// Camada do mapa
L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        maxZoom: 20
    }
).addTo(mapa);

// Lista de locais
const locais = [
    {
        nome: "Tyrannosaurus",
        lat: 46.7,
        lng: -105.3
    },
    {
        nome: "Triceratops",
        lat: 44.2,
        lng: -103.4
    },
    {
        nome: "Velociraptor",
        lat: 43.5,
        lng: 104.2
    }
];

// Adiciona os marcadores
locais.forEach(local => {

    L.circleMarker([local.lat, local.lng], {
        radius: 7,
        fillColor: "#69b51c",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
    })
    .bindPopup(`<strong>${local.nome}</strong>`)
    .addTo(mapa);

});