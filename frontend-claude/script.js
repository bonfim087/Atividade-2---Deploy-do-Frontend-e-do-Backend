const API_URL = "http://localhost:3000/all-movies"

const secaoFilmes = document.getElementById("filmes")
const estadoCarregando = document.getElementById("estado-carregando")
const estadoErro = document.getElementById("estado-erro")
const estadoVazio = document.getElementById("estado-vazio")

function acenderMarquise() {
    document.querySelectorAll(".bulbs").forEach((fileira) => {
        for (let i = 0; i < 18; i++) {
            const lampada = document.createElement("span")
            lampada.style.setProperty("--i", i)
            fileira.appendChild(lampada)
        }
    })
}

function mostrarEstado(estado) {
    estadoCarregando.classList.toggle("oculto", estado !== "carregando")
    estadoErro.classList.toggle("oculto", estado !== "erro")
    estadoVazio.classList.toggle("oculto", estado !== "vazio")
    secaoFilmes.classList.toggle("oculto", estado !== "pronto")
}

function criarTicket(filme) {
    const classificacao = filme.ageLimit > 0 ? `${filme.ageLimit}+` : "LIVRE"

    const ticket = document.createElement("article")
    ticket.className = "ticket"
    ticket.innerHTML = `
        <div class="ticket-main">
            <h2 class="ticket-title">${filme.title}</h2>
            <div class="ticket-meta">
                <span>Gênero <strong>${filme.gender}</strong></span>
                <span>Duração <strong>${filme.duration} min</strong></span>
            </div>
        </div>
        <div class="ticket-perf" aria-hidden="true"></div>
        <div class="ticket-stub">
            <span class="stamp">${classificacao}</span>
            <div class="barcode" aria-hidden="true"></div>
        </div>
    `
    return ticket
}

async function buscarFilmes() {
    mostrarEstado("carregando")

    try {
        const resposta = await fetch(API_URL)

        if (!resposta.ok) {
            throw new Error(`Erro ao buscar filmes (status ${resposta.status})`)
        }

        const filmes = await resposta.json()

        if (filmes.length === 0) {
            mostrarEstado("vazio")
            return
        }

        secaoFilmes.innerHTML = ""
        filmes.forEach((filme) => secaoFilmes.appendChild(criarTicket(filme)))
        mostrarEstado("pronto")
    } catch (erro) {
        console.error(erro)
        mostrarEstado("erro")
    }
}

acenderMarquise()
document.getElementById("botao-tentar").addEventListener("click", buscarFilmes)

buscarFilmes()
