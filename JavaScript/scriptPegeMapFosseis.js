import { buscarDinossauro, buscarOcorrenciasPBDB } from "./api/api2.js";
import { filtro } from "./componentes/filtros.js";
import { header } from "./componentes/header.js";
import { mapa } from "./componentes/map.js";
import { resultadoListaFosseis } from "./pegeDino/resultado-page.js";

let dados = [];

// Cache das consultas ao PBDB para evitar requisições repetidas
const cachePBDB = new Map();

// ===============================
// Carrega o JSON apenas uma vez
// ===============================
async function carregarDados() {
  try {
    const resposta = await fetch("./Dados/imagens.json");
    if (!resposta.ok) throw new Error("Erro ao carregar imagens.json");
    
    dados = await resposta.json();
    console.log("JSON carregado:", dados.length, "dinossauros");
  } catch (erro) {
    console.error(erro);
  }
}

// ===============================
// Lê os filtros
// ===============================
function obterFiltros() {
  return {
    periodo: document.querySelector('input[name="periodo"]:checked')?.value || "",
    dieta: document.querySelector('input[name="dieta"]:checked')?.value || "",
  };
}

// ===============================
// Filtra o JSON local
// ===============================
function filtrarDinossauros(periodo, dieta) {
  return dados.filter((dino) => {
    const periodoOk = periodo === "" || dino.periodo === periodo;
    const dietaOk = dieta === "" || dino.dieta === dieta;
    return periodoOk && dietaOk;
  });
}

// ===============================
// Busca ocorrências no PBDB usando o cache
// ===============================
async function buscarPBDB(nome) {
  if (cachePBDB.has(nome)) {
    return cachePBDB.get(nome);
  }
  try {
    // Usando a função correta que você importou para o mapa (buscarOcorrenciasPBDB)
    const dadosPBDB = await buscarOcorrenciasPBDB(nome);
    cachePBDB.set(nome, dadosPBDB);
    return dadosPBDB;
  } catch (error) {
    console.error(`Erro ao buscar ${nome} no PBDB:`, error);
    return null;
  }
}

// ===============================
// Evento dos filtros
// ===============================
function iniciarFiltros() {
  document
    .querySelectorAll('input[name="periodo"], input[name="dieta"]')
    .forEach((input) => {
      input.addEventListener("change", async () => {
        const { periodo, dieta } = obterFiltros();
        
        // Filtra e limita aos 50 primeiros para não travar a API
        const resultado = filtrarDinossauros(periodo, dieta).slice(0, 50);
        
        // Cria uma lista de promessas para buscar todos ao mesmo tempo (Mais rápido)
        const promessas = resultado.map(dino => buscarPBDB(dino.nome));
        const ocorrenciasPorDino = await Promise.all(promessas);

        // Junta todas as ocorrências válidas em uma única lista
        // (O PBDB costuma retornar uma lista de registros com lat/lng)
        const todasOcorrencias = ocorrenciasPorDino
          .filter(dados => dados !== null)
          .flat(); // .flat() serve caso a API retorne uma array de coordenadas para cada dino

        console.log("Ocorrências prontas para o mapa:", todasOcorrencias);

        // ==========================================
        // AQUI VOCÊ ATUALIZA O SEU MAPA
        // ==========================================
        // Exemplo 1: Se a sua função 'mapa' aceitar os dados para renderizar:
        console.log(todasOcorrencias)
        mapa(todasOcorrencias); 
        
        // Exemplo 2: Se sua lista de fósseis também precisar atualizar na tela:
        // resultadoListaFosseis(resultado, 50);
      });
    });

  // Dispara o filtro inicial assim que a página carrega
  setTimeout(() => {
    document.querySelector('input[name="periodo"]:checked')?.dispatchEvent(new Event("change"));
  }, 100);
}

// ===============================
// Inicialização
// ===============================
header();
filtro();

// Carrega o mapa inicial vazio ou com um ID de container HTML
// Se sua função mapa precisa do ID da div (ex: "map"), passe como string: mapa("map");
mapa([]); 

await carregarDados();
iniciarFiltros(); // Ative a função para os filtros funcionarem!