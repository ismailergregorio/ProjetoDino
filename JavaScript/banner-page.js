export async function banner(infoDino, dados) {
  const htmlBaner = document.getElementById("inicio");

  htmlBaner.innerHTML += `
  <div id="inicio" style="background-image: url('${dados.imagem}');"
  >
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
        <i data-lucide="calendar" class="icone"></i>
      </div>
      <div class="dados">
        <p>Período</p>
        <h3>${dados.periodo || "Cretáceo Superior"}</h3>
      </div>
    </div>

    <div class="infos">
      <div class="icon">
        <i data-lucide="clock" class="icone"></i>
      </div>
      <div class="dados">
        <p>Anbiente</p>
        <h3>${infoDino.dadosTaxonPBDB.records[0].jev || "Maastrichtiano"}</h3>
      </div>
    </div>

    <div class="infos">
      <div class="icon">
        <i data-lucide="leaf" class="icone"></i>
      </div>
      <div class="dados">
        <p>Dieta</p>
        <h3>${infoDino.dadosTaxonPBDB.records[0].jdt}</h3>
      </div>
    </div>

    <div class="infos">
      <div class="icon">
        <i data-lucide="ruler" class="icone"></i>
      </div>
      <div class="dados">
        <p>Comprimento</p>
        <h3>${infoDino.dadosTaxonPBDB.records[0].comprimento || "1.8 - 2.0 m"}</h3>
      </div>
    </div>

    <div class="infos">
      <div class="icon">
        <i data-lucide="weight" class="icone"></i>
      </div>
      <div class="dados">
        <p>Peso</p>
        <h3>${infoDino.dadosTaxonPBDB.records[0].peso || "15 - 20 kg"}</h3>
      </div>
    </div>

    <div class="infos">
      <div class="icon">
        <i data-lucide="map-pin" class="icone"></i>
      </div>
      <div class="dados">
        <p>Descoberto em</p>
        <h3>${infoDino.dadosTaxonPBDB.records[0].att}</h3>
      </div>
    </div>

  </div>
</div>
      </div>
     </div>
    </div>
   </div>
   </div>
 `;
  lucide.createIcons();
}
