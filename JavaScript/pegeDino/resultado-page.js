import { mapa } from "../componentes/map.js";
export async function resultadoSobre(infoDino, dados) {
  const htmlBaner = document.getElementById("sobre");

  htmlBaner.innerHTML += `
                    <h2>Sobre</h2>
                    <p>${infoDino.dadosWikipedia.extract}</p>
 `;
  lucide.createIcons();
}

export async function resultadoMap(infoDino, dados) {
  mapa(infoDino,"map");
}

export async function resultadoListaFosseis(infoDino, dados) {
  const html = document.getElementById("lista-locais");

  if (!html) return;

  html.innerHTML = "";

  const locais = infoDino.dadosOcorrenciasPBDB.records;

  locais.forEach((element, index) => {
    if (index < 4)
      html.innerHTML += `
         <div class="lista-local">
              <div class="icone-local">
                   <i data-lucide="map-pin"></i>
              </div>
              <div class="infos-local">
                   <h4>${element.stp || "Não informado"}, ${element.cc2}</h4>
                   <p>${element.cny ? element.cny + " County — " : ""}${element.gsc || "outcrop"}</p>
                   <p>${element.eag} - ${element.lag} milhões de anos</p>
              </div>
         </div>`;
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}
