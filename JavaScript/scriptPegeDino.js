import { header } from "./componentes/header.js";
import { buscarDinossauro } from "./api/api2.js";
import {
  resultadoSobre,
  resultadoMap,
  resultadoListaFosseis,
} from "./pegeDino/resultado-page.js";
import { banner } from "./pegeDino/banner-page.js";
import { filtroPage } from "./componentes/filtros-page.js";
import { state } from "./componentes/states.js";
import { resutadoLocaisFosseis } from "./pegeDino/resultadoLocaisFosseis.js";
import { linhaDotempo } from "./pegeDino/resutadoLinhaDotempo.js";

const DADOS_IMAGENS = "./Dados/imagens.json";
const parametros = new URLSearchParams(window.location.search);

const nome = parametros.get("name");

console.log(nome);

async function carregarDadosPorValor(urlArquivo, chave, nomeBuscado) {
  try {
    const resposta = await fetch(urlArquivo);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${resposta.status}`);
    }

    const listaDados = await resposta.json();

    const objetoEncontrado = listaDados.find(
      (item) => item[chave] === nomeBuscado,
    );

    if (objetoEncontrado) {
      return objetoEncontrado;
    } else {
      console.log(
        `Nenhum registro encontrado onde a chave "${chave}" seja "${nomeBuscado}"`,
      );
      return null;
    }
  } catch (erro) {
    console.error("Erro ao carregar o arquivo:", erro);
  }
}

function atualizarMenu() {
  document.querySelectorAll(".mais-dino a").forEach((link) => {
    link.classList.toggle(
      "ativo",
      link.getAttribute("href") === "#" + state.pagina,
    );
  });
}

const dados = await carregarDadosPorValor(DADOS_IMAGENS, "nome", nome);
const infoDino = await buscarDinossauro(nome);

function mostraVisaoGeral() {
  const idHtml = document.getElementById("resultado");
  idHtml.innerHTML = `
                 <div class="sobre resutado-card" id="sobre">
               </div>
               <div class="map resutado-card">
                    <h2>Locais onde fosseis foram encotrados</h2>
                    <div id="map">

                    </div>
               </div>
               <div class="pricipais-foseis resutado-card">
                    <h2>Principais locais</h2>
                    <div id="lista-locais" id="locais">
                    </div>
                    <button class="btn-locais">
                         Ver todos os locais
                         <span id="total-locais">(0)</span>
                    </button>

               </div>
  `;
  resultadoSobre(infoDino, dados);
  resultadoListaFosseis(infoDino, 4);
  resultadoMap(infoDino, dados);
}

function mostraMapa() {
  const idHtml = document.getElementById("resultado");
  idHtml.innerHTML = `
              <div class="map-locais resutado-card">
                    <h2>Locais onde fosseis foram encotrados</h2>
                    <div id="map">

                    </div>
               </div>
               <div class="pricipais-foseis resutado-card">
                    <h2>Principais locais</h2>
                    <div id="lista-locais" id="locais">
                    </div>
                    <button class="btn-locais">
                         Ver todos os locais
                         <span id="total-locais">(0)</span>
                    </button>

               </div>
  `;
  console.log("rrrrrrrrrrrrr");
  resutadoLocaisFosseis(infoDino);
}

function mostrarClassificacao() {
  const idHtml = document.getElementById("resultado");
  idHtml.innerHTML = `
  <div class="clasificacao">
      <h2 class="titulo-secao">
          Classificação Científica
      </h2>

      <div class="grid-classificacao">

          <div class="card-classificacao">
              <span class="titulo">Reino</span>
              <span class="valor" id="reino">Animalia</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Filo</span>
              <span class="valor" id="filo">Chordata</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Classe</span>
              <span class="valor" id="classe">Reptilia</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Clado</span>
              <span class="valor" id="clado">Dinosauria</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Ordem</span>
              <span class="valor" id="ordem">Ornithischia</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Família</span>
              <span class="valor" id="familia">Ceratopsidae</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Gênero</span>
              <span class="valor" id="genero">Triceratops</span>
          </div>

          <div class="card-classificacao">
              <span class="titulo">Espécie</span>
              <span class="valor" id="especie">Triceratops horridus</span>
          </div>

      </div>
    </div>
  `;
}

function mostrarTimeline() {
  const idHtml = document.getElementById("resultado");
  idHtml.innerHTML = `
              <div class="linhaDoTempo resutado-card">
                    <h2>Linha do tempo do dinosalro</h2>
                    <div id="linhaDoTempo">
                    

               </div>
               </div>
  `;
  linhaDotempo(infoDino, dados);
}

export function render() {
  switch (state.pagina) {
    case "geral":
      mostraVisaoGeral();
      console.log("inicio");
      break;

    case "locais":
      mostraMapa();
      console.log("inicio");
      break;

    case "classificacao":
      mostrarClassificacao();
      break;

    case "timeline":
      mostrarTimeline();
      break;

    case "referencias":
      mostrarReferencias();
      break;
  }

  atualizarMenu();
}

import { ativarHoverLista, mapa, marcadores } from "./componentes/map.js";

console.log(dados);
console.log(infoDino);
header();
banner(infoDino, dados);
filtroPage();
render();
