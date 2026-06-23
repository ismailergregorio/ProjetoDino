export function filtro() {
  const idFiltro = document.getElementById("f");

  idFiltro.innerHTML += `
               <div id="filtros">
                <div class="title">
                    <h2>Principais Dinossauros</h2>
                    <p>Conheça alguns dos dinossauros mais incriveis que ja existiram.</p>
                </div>
                <div class="filtros">

                    <div class="filtro">
                        <select id="periodo">
                            <option>Período</option>
                            <option>Jurássico</option>
                            <option>Cretáceo</option>
                            <option>Triássico</option>
                        </select>
                    </div>

                    <div class="filtro">
                        <select id="dieta">
                            <option>Dieta</option>
                            <option>Carnívoro</option>
                            <option>Herbívoro</option>
                            <option>Onívoro</option>
                        </select>
                    </div>

                    <div class="filtro">
                        <select id="ordem">
                            <option>Ordem</option>
                            <option>Terópodes</option>
                            <option>Saurópodes</option>
                            <option>Ornitópodes</option>
                        </select>
                    </div>

                    <div class="filtro">
                        <select id="continente">
                            <option>Continente</option>
                            <option>América</option>
                            <option>Europa</option>
                            <option>Ásia</option>
                        </select>
                    </div>

                </div>
            </div>
 `;
}
