async function buscarFilmes() {
    const resposta = await fetch("http://localhost:3000/all-movies");

    const filmes = await resposta.json();

    const sectionFilmes = document.querySelector(".filmes");

    filmes.forEach((filme) => {
        sectionFilmes.innerHTML += `
            <div>
                <h2>${filme.title}</h2>
                <p><strong>Gênero:</strong> ${filme.gender}</p>
                <p><strong>Duração:</strong> ${filme.duration} minutos</p>
                <p><strong>Classificação indicativa:</strong> ${filme.ageLimit > 0 ? filme.ageLimit + " anos" : "Livre"}</p>
            </div>
        `;
    });
}

buscarFilmes();