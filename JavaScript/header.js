export async function header() {
  const container = document.getElementById("naveBar");
  container.innerHTML += `
        <div class="logo">
            <img src="./imagens/icon-dino.png" alt="Logo do DinoPege" width="50" height="50">
            <h1><span>Dino</span>Word</h1>
        </div>
        <nav class="menu">
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="pageCatalogoDino.html">Dinossauros</a></li>
                <li><a href="pageMapFosseis.html">Mapa de Fosseis</a></li>
            </ul>
        </nav>
        <form action="/buscar" method="GET" class="search-form">
            <input type="search" id="pesquisa" name="q" placeholder="Buscar dinossauro...">
            <button type="submit">Buscar</button>
        </form>

        `;
}
