export async function carregarCards(dinosApi, dados) {
  const container = document.getElementById("dinosauros-cards");
  const url = dados.imagem;

  const urlImagem = url.match(
    /https:\/\/images\.dinosaurpictures\.org\/.+$/,
  )[0];

  container.innerHTML += `
            <div class="dinosauro" style="background: url('${urlImagem}') center top / 100% no-repeat;">
                <div class="overlay-card">
                    <h3>${dados.nome}</h3>
                    <h4>${dados.dieta.charAt(0).toUpperCase() + dados.dieta.slice(1)}</h4>
                    <p> <i class="icone" data-lucide="calendar"></i>${dados.periodo.charAt(0).toUpperCase() + dados.periodo.slice(1)}</p>
                    <p> <i class="icone" data-lucide="map-pin"></i>América do Norte</p>
                    <p> <i class="icone" data-lucide="ruler"></i>1-2 metros</p>
                    <hr>
                    <button class="buton-vermais"><a href="pageDino.html?name=${dados.nome}">Ver Detalhes</a></button>
                </div>
            </div>

        `;
  lucide.createIcons();
}
