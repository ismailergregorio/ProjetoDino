import { mapa, ativarHoverLista, addPoites } from "../componentes/map.js";
import { resultadoListaFosseis } from "./resultado-page.js";

export function resutadoLocaisFosseis(infoDino) {
  mapa(infoDino);
  console.log(infoDino.dadosOcorrenciasPBDB.records.length);
  resultadoListaFosseis(infoDino, infoDino.dadosOcorrenciasPBDB.records.length);
  ativarHoverLista();
}

function resultadoListaF(consultas) {
  const html = document.getElementById("lista-locais");

  if (!html) return;

  html.innerHTML = "";

  // Correção: Agora aceita tanto o array bruto quanto o objeto envelopado que você criou
  const resultado = Array.isArray(consultas)
    ? consultas.flatMap((item) => item.records || [])
    : consultas?.records || [];

  // Correção: Alterado de 'locais.forEach' para 'resultado.forEach'
  resultado.forEach((element) => {
    html.innerHTML += `
            <div class="lista-local" data-id="${element.oid}">
                <div class="icone-local">
                    <i data-lucide="map-pin"></i>
                </div>

                <div class="infos-local">
                    <h4>${element.stp || "Não informado"}, ${element.cc2 || ""}</h4>

                    <p>
                        ${element.cny ? element.cny + " County — " : ""}
                        ${element.gsc || "Outcrop"}
                    </p>

                    <p>
                        ${element.eag ?? "?"} - ${element.lag ?? "?"} milhões de anos
                    </p>
                </div>
            </div>
        `;
  });

  const htmlQuantidade = document.getElementById("total-locais");

  if (htmlQuantidade) {
    // Correção: Alterado de 'locais.length' para 'resultado.length'
    htmlQuantidade.textContent = `(${resultado.length})`;
  }

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

export function resultadoLocaisFosseis2(consultas,taxon) {
  console.log(consultas);

  addPoites(consultas,taxon);

  const registros = consultas.flatMap((c) => c.records ?? []);

  const dados = {
    records: registros,
  };

  resultadoListaF(dados);

  ativarHoverLista();
}
