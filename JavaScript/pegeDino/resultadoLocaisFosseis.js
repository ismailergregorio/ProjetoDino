import { mapa ,ativarHoverLista} from "../componentes/map.js";
import { resultadoListaFosseis } from "./resultado-page.js";

export function resutadoLocaisFosseis(infoDino) {
  mapa(infoDino,"map");
  // console.log(infoDino);
  console.log(infoDino.dadosOcorrenciasPBDB.records.length)
  resultadoListaFosseis(infoDino,infoDino.dadosOcorrenciasPBDB.records.length);
  ativarHoverLista();
}
