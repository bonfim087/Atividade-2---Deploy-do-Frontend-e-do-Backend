import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes03TA"
})

// Listar filmes
app.get("/all-movies", (request, response) => {
    const selectCommand = `
        SELECT
            id,
            titulo AS title,
            genero AS gender,
            duracao AS duration,
            classificacao_etaria AS ageLimit
        FROM filmes_gabriel
    `

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return response.status(500).json({
                message: "Erro ao buscar filmes"
            })
        }

        response.json(data)
    })
})

// Criar filme
app.post("/create-movie", (request, response) => {
    const { title, gender, ageLimit, duration } = request.body

    const insertCommand = `
        INSERT INTO filmes_gabriel
        (titulo, genero, duracao, classificacao_etaria)
        VALUES (?, ?, ?, ?)
    `

    sql.query(
        insertCommand,
        [title, gender, duration, ageLimit],
        (error) => {
            if (error) {
                console.log(error)
                return response.status(500).json({
                    message: "Erro ao criar filme"
                })
            }

            response.status(201).json({
                message: "Filme criado com sucesso!"
            })
        }
    )
})

// Apagar filme
app.delete("/delete-movie/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = `
        DELETE FROM filmes_gabriel
        WHERE id = ?
    `

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({
                message: "Erro ao apagar filme"
            })
        }

        response.json({
            message: "Filme apagado com sucesso!"
        })
    })
})

// Editar filme
app.put("/edit-movie/:id", (request, response) => {
    const { id } = request.params
    const { title, gender, ageLimit, duration } = request.body

    const updateCommand = `
        UPDATE filmes_gabriel
        SET titulo = ?,
            genero = ?,
            duracao = ?,
            classificacao_etaria = ?
        WHERE id = ?
    `

    sql.query(
        updateCommand,
        [title, gender, duration, ageLimit, id],
        (error) => {
            if (error) {
                console.log(error)
                return response.status(500).json({
                    message: "Erro ao alterar filme"
                })
            }

            response.json({
                message: "Filme alterado com sucesso!"
            })
        }
    )
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000!")
})