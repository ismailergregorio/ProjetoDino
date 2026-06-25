import { buscarOcorrenciasPBDB, buscarTaxonPBDB } from "./api/api2.js";
import { filtro } from "./componentes/filtros.js";
import { footer } from "./componentes/footer.js";
import { header } from "./componentes/header.js";
import { addPoites, mapa } from "./componentes/map.js";
import { resultadoLocaisFosseis2 } from "./pegeDino/resultadoLocaisFosseis.js";

async function caregadaDadosJson() {
  try {
    const response = await fetch("./Dados/imagens.json");

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error("Erro na busca dos dados JSON:", error);
  }
}

const imagens = await caregadaDadosJson();
console.log(imagens);

async function verificarFiltros() {
  const periodo = document.querySelector('input[name="periodo"]:checked').value;
  const dieta = document.querySelector('input[name="dieta"]:checked').value;

  const dadosFiltrados = imagens.filter(
    (item) =>
      (periodo === "" || item.periodo === periodo) &&
      (dieta === "" || item.dieta === dieta),
  );

  console.clear();
  console.log(dadosFiltrados);
  const somente50 = dadosFiltrados.slice(0, 10);

  const consultas = await Promise.all(
    somente50.map((d) => buscarOcorrenciasPBDB(d.nome)),
  );

  const consultasDados = await Promise.all(
    somente50.map((d) => buscarTaxonPBDB(d.nome)),
  );
  console.log("Ocorencisa")
  console.log(consultas);

  console.log("Taxon")
  console.log(consultasDados);

  resultadoLocaisFosseis2(consultas,consultasDados);
}

header();
footer();
filtro("Mapa de Ocorencias De Fosseis", "Selecione o Periodo e Dieta");
verificarFiltros();

document.querySelectorAll('input[type="radio"]').forEach((radio) => {
  radio.addEventListener("change", verificarFiltros);
});
mapa();
