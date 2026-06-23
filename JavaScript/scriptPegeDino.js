import { header } from "./componentes/header.js";
import { buscarDinossauro } from "./api/api2.js";
import { resultadoSobre,resultadoMap, resultadoListaFosseis } from "./pegeDino/resultado-page.js";
import { banner } from "./pegeDino/banner-page.js";
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

const dados = await carregarDadosPorValor(DADOS_IMAGENS, "nome", nome);
const infoDino = await buscarDinossauro(nome);
console.log(dados);
console.log(infoDino);
header();
banner(infoDino, dados);
resultadoSobre(infoDino, dados);
resultadoListaFosseis(infoDino, dados);
resultadoMap(infoDino, dados);
