import { filtro } from "./filtros.js";
import { header } from "./header.js";
import { buscarDinossauro } from "./api2.js";
import {carregarCards} from "./CardsDino.js"

const DADOS_50MAIS = "./Dados/top50.json";
const DADOS_IMAGENS = "./Dados/imagens.json";

async function carregarJson() {
  const resposta = await fetch(DADOS_50MAIS);

  const dados = await resposta.json();

  return dados;
}

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


carregarDadosPorValor(DADOS_IMAGENS, "nome", "Tyrannosaurus");
carregarJson();

async function gerarRelatorio(nome) {
  const infoDino = await buscarDinossauro(nome);
}

async function obterDadosDosDinossauros() {
  try {
    const resposta = await fetch(DADOS_IMAGENS);
    const dadosLocais = await resposta.json();

    const primeirosQuatro = dadosLocais.slice(0,50);
    const resultadosFinais = [];

    for (const element of primeirosQuatro) {
      const dadosCompletos = await gerarRelatorio(element.nome);
      const jsonBruto = await buscarDinossauro(element.nome);

      if (dadosCompletos) {
        resultadosFinais.push(dadosCompletos);
      }
      const d = await carregarDadosPorValor(
        DADOS_IMAGENS,
        "nome",
        element.nome,
      );
      carregarCards(jsonBruto, d);
    }

    return resultadosFinais;
  } catch (erro) {
    console.error("Erro no fluxo de coleta:", erro);
    return [];
  }
}

header();
filtro();
obterDadosDosDinossauros();
