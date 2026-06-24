export function filtroPage() {
    const idHtml = document.getElementById("barra-navegacao")
    idHtml.innerHTML += `
                <nav class="mais-dino">
                    <a href="#inicio" class="ativo">
                         <i data-lucide="layout-dashboard"></i>
                         <span>Visão Geral</span>
                    </a>

                    <a href="#locais">
                         <i data-lucide="map-pin"></i>
                         <span>Locais de Fósseis</span>
                    </a>

                    <a href="#classificacao">
                         <i data-lucide="network"></i>
                         <span>Classificação</span>
                    </a>

                    <a href="#linha-tempo">
                         <i data-lucide="clock-3"></i>
                         <span>Linha do Tempo</span>
                    </a>

                    <a href="#referencias">
                         <i data-lucide="file-text"></i>
                         <span>Referências</span>
                    </a>
               </nav>
    `;
}