export function filtro(titulo,sub) {
  const idFiltro = document.getElementById("f");

  idFiltro.innerHTML += `
               <div id="filtros">
                <div class="title">
                    <h2>${titulo}</h2>
                    <p>${sub}</p>
                </div>
                </div>
            </div>
 `;
}
