export function filtroPage() {
  const idHtml = document.getElementById("barra-navegacao");

  idHtml.innerHTML = `
        <nav class="mais-dino">
            <a href="#" class="nav-link ativo" data-page="geral">
                <i data-lucide="layout-dashboard"></i>
                <span>Visão Geral</span>
            </a>

            <a href="#" class="nav-link" data-page="locais">
                <i data-lucide="map-pin"></i>
                <span>Locais de Fósseis</span>
            </a>

            <a href="#" class="nav-link" data-page="classificacao">
                <i data-lucide="network"></i>
                <span>Classificação</span>
            </a>

            <a href="#" class="nav-link" data-page="timeline">
                <i data-lucide="clock-3"></i>
                <span>Linha do Tempo</span>
            </a>
        </nav>
    `;

  adicionarEventosMenu();
}

import { state } from "../componentes/states.js";
import { render } from "../scriptPegeDino.js";

function adicionarEventosMenu() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            state.pagina = link.dataset.page;
            render();
        });

    });

}