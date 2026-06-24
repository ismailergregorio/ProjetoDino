import { buscarDinossauro } from "./api/api2.js";
import { filtro } from "./componentes/filtros.js";
import { header } from "./componentes/header.js";
import { mapa } from "./componentes/map.js";
import { resultadoListaFosseis } from "./pegeDino/resultado-page.js";
const dados = await buscarDinossauro("Tyrannosaurus");
console.log(dados)
header();
filtro();
mapa();
resultadoListaFosseis(dados, 100);
