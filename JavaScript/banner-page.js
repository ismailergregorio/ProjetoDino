export async function banner(infoDino,dados) {
  const htmlBaner = document.getElementById("inicio");

  htmlBaner.innerHTML += `
 <div class="banner">
    <div class="conteudo-b">
     <div class="overlay">
      <h2>${dados.nome}</h2>
      <p>${infoDino.dadosWikipedia.titles.normalized}</p>
     </div>

     <div class="conteiner-infos-dados">
      <div class="dados-dino">
       <div class="infos">
        <div class="icon">
         <img src="./imagens/icons-pegada.png" alt="Icone de Dinossauro" width="30" height="30">
        </div>
        <div class="dados">
         <h3>+1.200</h3>
         <p>Especies</p>
        </div>

       </div>
       <div class="infos">
        <div class="icon">
         <img src="./imagens/icons-pegada.png" alt="Icone de Dinossauro" width="30" height="30">
        </div>
        <div class="dados">
         <h3>+1.200</h3>
         <p>Especies</p>
        </div>
       </div>
       <div class="infos">
        <div class="icon">
         <img src="./imagens/icons-pegada.png" alt="Icone de Dinossauro" width="30" height="30">
        </div>
        <div class="dados">
         <h3>+1.200</h3>
         <p>Especies</p>
        </div>

       </div>
       <div class="infos">
        <div class="icon">
         <img src="./imagens/icons-pegada.png" alt="Icone de Dinossauro" width="30" height="30">
        </div>
        <div class="dados">
         <h3>+1.200</h3>
         <p>Especies</p>
        </div>
       </div>
       <div class="infos">
        <div class="icon">
         <img src="./imagens/icons-pegada.png" alt="Icone de Dinossauro" width="30" height="30">
        </div>
        <div class="dados">
         <h3>+1.200</h3>
         <p>Especies</p>
        </div>

       </div>
       <div class="infos">
        <div class="icon">
         <img src="./imagens/icons-pegada.png" alt="Icone de Dinossauro" width="30" height="30">
        </div>
        <div class="dados">
         <h3>+1.200</h3>
         <p>Especies</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
 `;
}
