function ativarMenu() {

    const links = document.querySelectorAll(".nav-link");

    let paginaAtual = window.location.pathname.split("/").pop();

    if (paginaAtual === "") {
        paginaAtual = "index.html";
    }

    links.forEach(link => {
        if (link.getAttribute("href") === paginaAtual) {
            link.classList.add("active");
        }
    });

}

export async function header() {
    const container = document.getElementById("naveBar");
    container.innerHTML += `
        <div class="logo">
            <img src="./imagens/icon-dino.png" alt="Logo do DinoPege" width="50" height="50">
            <h1><span>Dino</span>Word</h1>
        </div>
        <nav class="menu">
            <ul>
                <li><a href="index.html" class="nav-link">Inicio</a></li>
                <li><a href="pageCatalogoDino.html" class="nav-link">Dinossauros</a></li>
                <li><a href="pageMapFosseis.html" class="nav-link">Mapa de Fosseis</a></li>
            </ul>
        </nav>
        <form action="/buscar" method="GET" class="search-form">
            <input type="search" id="pesquisa" name="q" placeholder="Buscar dinossauro...">
            <button type="submit">Buscar</button>
        </form>

        `;
    ativarMenu();
}