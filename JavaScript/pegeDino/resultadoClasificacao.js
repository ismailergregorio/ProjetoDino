function traduzirDieta(valor) {
  const mapa = {
    herbivore: "Herbívoro",

    carnivore: "Carnívoro",

    omnivore: "Onívoro",
  };

  return mapa[valor] ?? valor ?? "-";
}

function traduzirAmbiente(valor) {
  const mapa = {
    terrestrial: "Terrestre",

    aquatic: "Aquático",

    marine: "Marinho",

    aerial: "Aéreo",
  };

  return mapa[valor] ?? valor ?? "-";
}

function traduzirHabitat(valor) {
  const mapa = {
    "ground dwelling": "Solo",

    arboreal: "Arbóreo",

    fossorial: "Subterrâneo",
  };

  return mapa[valor] ?? valor ?? "-";
}

function traduzirLocomocao(valor) {
  const mapa = {
    "actively mobile": "Ativamente móvel",

    stationary: "Estacionário",
  };

  return mapa[valor] ?? valor ?? "-";
}

function traduzirReproducao(valor) {
  if (!valor) return "-";

  return valor

    .replace("oviparous", "Ovíparo")

    .replace("mobile", "Móvel")

    .replace("dispersal-direct/internal", "Desenvolvimento interno");
}
export function preencherClassificacao(infoDinoS) {
  const dados = infoDinoS.dadosTaxonPBDB.records[0];

  document.getElementById("nome").textContent = dados.nam ?? "-";

  document.getElementById("dieta").textContent = traduzirDieta(dados.jdt);

  document.getElementById("ambiente").textContent = traduzirAmbiente(dados.jev);

  document.getElementById("habitat").textContent = traduzirHabitat(dados.jlh);

  document.getElementById("locomocao").textContent = traduzirLocomocao(
    dados.jmo,
  );

  document.getElementById("reproducao").textContent = traduzirReproducao(
    dados.jre,
  );

  document.getElementById("autor").textContent = dados.att ?? "-";

  document.getElementById("nivel").textContent = dados.rnk ?? "-";
}
