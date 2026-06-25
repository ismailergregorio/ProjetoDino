export async function footer() {
  const container = document.getElementById("footer");

  if (!container) return;
  container.innerHTML = `
    <div class="footer-container">

        <!-- Sobre -->
        <div class="footer-info">
            <h3>Dino Explorer</h3>

            <p>
                Plataforma dedicada à exploração do mundo dos dinossauros,
                reunindo informações científicas, mapas interativos e dados
                paleontológicos provenientes de diversas bases de dados.
            </p>
        </div>

        <!-- Fontes -->
        <div class="footer-links">
            <h4>Fontes de Dados</h4>

            <a href="https://paleobiodb.org/" target="_blank">
                PaleoBioDB (PBDB)
            </a>

            <a href="https://en.wikipedia.org/" target="_blank">
                Wikipedia
            </a>

            <a href="https://dinosaurpictures.org/" target="_blank">
                Dinosaur Pictures
            </a>
        </div>

        <!-- Bibliotecas -->
        <div class="footer-tech">
            <h4>Tecnologias</h4>

            <div class="tech-item">
                <i data-lucide="chart-column"></i>
                <span>Highcharts.js</span>
            </div>

            <div class="tech-item">
                <i data-lucide="map"></i>
                <span>Leaflet.js</span>
            </div>

            <div class="tech-item">
                <i data-lucide="icons"></i>
                <span>Lucide Icons</span>
            </div>

            <div class="tech-item">
                <i data-lucide="database"></i>
                <span>PaleoBioDB API</span>
            </div>

            <div class="tech-item">
                <i data-lucide="globe"></i>
                <span>Wikipedia REST API</span>
            </div>
        </div>

        <!-- Desenvolvedor -->
        <div class="footer-dev">

            <h4>Desenvolvedor</h4>

            <p><strong>Junior Gregório</strong></p>

            <p>Desenvolvedor Full Stack</p>

            <div class="social">

                <a href="#">
                    <i data-lucide="github"></i>
                </a>

                <a href="#">
                    <i data-lucide="linkedin"></i>
                </a>

                <a href="#">
                    <i data-lucide="mail"></i>
                </a>

            </div>

        </div>

    </div>

    <div class="footer-copy">
        © 2026 <strong>Dino Explorer</strong> • Desenvolvido por
        <strong>Junior Gregório</strong>.
    </div>
  `;
  lucide.createIcons();
}
