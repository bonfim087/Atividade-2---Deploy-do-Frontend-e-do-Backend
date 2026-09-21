const API = "https://atividade-2-deploy-do-frontend-e-do-blond.vercel.app"

async function buscarFilmes() {
    const resposta = await fetch(`${API}/all-movies`)

    const filmes = await resposta.json()

    const sectionFilmes = document.querySelector(".filmes")

    sectionFilmes.innerHTML = ""

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.title}</h2>
                <p><strong>Gênero:</strong> ${filme.gender}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p>
                    <strong>Classificação indicativa:</strong>
                    ${filme.ageLimit === "L" ? "Livre" : filme.ageLimit + " anos"}
                </p>

                <button onclick="apagarFilme(${filme.id})">
                    Apagar
                </button>

                <button onclick="editarFilme(${filme.id})">
                    Editar
                </button>
            </div>
        `
    })
}

async function apagarFilme(id) {
    const confirmar = confirm("Deseja realmente apagar este filme?")

    if (!confirmar) {
        return
    }

    const resposta = await fetch(`${API}/delete-movie/${id}`, {
        method: "DELETE"
    })

    const resultado = await resposta.json()

    alert(resultado.message)

    if (resposta.ok) {
        buscarFilmes()
    }
}

function editarFilme(id) {
    window.location.href = `editar.html?id=${id}`
}

buscarFilmes()