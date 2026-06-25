function ativarMenu() {
  const links = document.querySelectorAll(".nav-link");

  let paginaAtual = window.location.pathname.split("/").pop();

  if (paginaAtual === "") {
    paginaAtual = "index.html";
  }

  links.forEach((link) => {
    if (link.getAttribute("href") === paginaAtual) {
      link.classList.add("active");
    }
  });
}

export async function header() {
  const container = document.getElementById("naveBar");
  
  if (!container) return; 
  container.innerHTML = `
        <div class="logo">
            <img src="./imagens/icon-dino.png" alt="Logo do DinoPege" width="50" height="50">
            <h1><span>Dino</span>World</h1>
        </div>
        <button class="menu-toggle" id="menuToggle">☰</button>
        <nav class="menu" id="menuNav">
            <ul>
                <li><a href="index.html" class="nav-link">Inicio</a></li>
                <li><a href="pageCatalogoDino.html" class="nav-link">Dinossauros</a></li>
                <li><a href="pageMapFosseis.html" class="nav-link">Mapa de Fosseis</a></li>
            </ul>
        </nav>
  `;

  ativarMenu();

  const menuToggle = document.getElementById("menuToggle");
  const menuNav = document.getElementById("menuNav");

  if (menuToggle && menuNav) {
    menuToggle.addEventListener("click", () => {
      menuNav.classList.toggle("open");

      if (menuNav.classList.contains("open")) {
        menuToggle.textContent = "✕";
      } else {
        menuToggle.textContent = "☰";
      }
    });
  }
}