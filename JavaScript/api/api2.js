const PBDB = "https://paleobiodb.org/data1.2";

// 1. Busca os dados brutos na Wikipédia
async function buscarWikipedia(nome) {
    const nomeFormatado = nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
    const urlWiki = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nomeFormatado)}`;

    try {
        const response = await fetch(urlWiki);
        if (!response.ok) return { erro: `Erro Wikipédia: ${response.status}` };
        return await response.json(); // Retorna o JSON puro da Wikipédia
    } catch (error) {
        return { erro: error.message };
    }
}

// 2. Busca os dados taxonômicos puros do PBDB
async function buscarTaxonPBDB(nome) {
    const url = `${PBDB}/taxa/list.json?name=${encodeURIComponent(nome)}&show=attr,size,ecospace`;
    try {
        const response = await fetch(url);
        if (!response.ok) return { erro: `Erro Taxon PBDB: ${response.status}` };
        return await response.json(); // Retorna o JSON completo da API de Taxonomia
    } catch (error) {
        return { erro: error.message };
    }
}

// 3. Busca a lista de ocorrências pura do PBDB
export async function buscarOcorrenciasPBDB(nome) {
    const url = `${PBDB}/occs/list.json?base_name=${encodeURIComponent(nome)}&show=time,coords,loc`;
    try {
        const response = await fetch(url);
        if (!response.ok) return { erro: `Erro Ocorrências PBDB: ${response.status}` };
        return await response.json(); // Retorna o JSON completo da API de Ocorrências
    } catch (error) {
        return { erro: error.message };
    }
}

// FUNÇÃO PRINCIPAL: Agrupa e entrega o JSON consolidado direto das APIs
export async function buscarDinossauro(nome) {
    try {
        const [dadosWiki, dadosTaxon, dadosOcorrencias] = await Promise.all([
            buscarWikipedia(nome),
            buscarTaxonPBDB(nome),
            buscarOcorrenciasPBDB(nome)
        ]);

        // Retorna a composição de dados crus das APIs sem nenhuma filtragem ou mapeamento
        return {
            dadosWikipedia: dadosWiki,
            dadosTaxonPBDB: dadosTaxon,
            dadosOcorrenciasPBDB: dadosOcorrencias
        };

    } catch (error) {
        console.error("Erro ao coletar JSON bruto:", error);
        return null;
    }
}