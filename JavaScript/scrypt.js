import { buscarDinossauro } from "./api/api2.js";
import { carregarCards } from "./CardsDino.js";
import { filtro } from "./componentes/filtros.js";
import { footer } from "./componentes/footer.js";
import { header } from "./componentes/header.js";

const DADOS_50MAIS = "./Dados/top50.json";
const DADOS_IMAGENS = "./Dados/imagens.json";

async function carregarJson() {
  const resposta = await fetch(DADOS_50MAIS);

  const dados = await resposta.json();

  return dados;
}

// Alteramos o primeiro parâmetro para 'urlArquivo' para evitar conflito de nomes
async function carregarDadosPorValor(urlArquivo, chave, nomeBuscado) {
  try {
    // 1. Faz o fetch usando o caminho do arquivo passado no argumento
    const resposta = await fetch(urlArquivo);

    if (!resposta.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${resposta.status}`);
    }

    // 2. Transforma a resposta no array de dados
    const listaDados = await resposta.json();

    // 3. Busca o objeto de forma dinâmica usando colchetes []
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
// Chamando a função corretamente com o mesmo nome que foi declarada:
carregarDadosPorValor(DADOS_IMAGENS, "nome", "Tyrannosaurus");
carregarJson();

async function gerarRelatorio(nome) {
  // Busca os dados estruturados de forma controlada
  const infoDino = await buscarDinossauro(nome);
}

async function obterDadosDosDinossauros() {
  try {
    const resposta = await fetch(DADOS_50MAIS);
    const dadosLocais = await resposta.json();

    const primeirosQuatro = dadosLocais.slice(0, 5);
    const resultadosFinais = [];

    for (const element of primeirosQuatro) {
      const dadosCompletos = await gerarRelatorio(element.nome);
      const jsonBruto = await buscarDinossauro(element.nome);
      console.log(jsonBruto);

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
footer();
filtro("Principais Dinossauros","Conheça alguns dos dinossauros mais incriveis que ja existiram.");
obterDadosDosDinossauros();
