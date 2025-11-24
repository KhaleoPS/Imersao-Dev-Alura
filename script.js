let cardConteiner = document.querySelector(".card-container");
let dados = [];

// Carrega os dados do JSON uma vez quando a página é carregada
window.addEventListener('load', async () => {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
});

async function iniciarBusca() {
    const campoBusca = document.querySelector("#campo-busca");
    const termoBusca = campoBusca.value.toLowerCase();

    if (termoBusca === "") {
        renderizarCards(dados);
        return;
    }

    const dadosFiltrados = dados.filter(dado => {
        return dado.nome.toLowerCase().includes(termoBusca) ||
               dado.descricao.toLowerCase().includes(termoBusca);
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardConteiner.innerHTML = ""; // Limpa o container antes de renderizar os novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.data_criacao}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>
        `
        cardConteiner.appendChild(article);
    }
}