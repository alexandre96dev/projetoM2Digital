const express = require('express')
const cors = require('cors')
const app = express()
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const m2_equipes = require('./models/m2_equipes.js')
const usuarios = require('./models/m2_usuarios.js');


app.listen(5500, () => console.log('Rodando na porta 5500'))



app.use(cors())

app.use(express.json())

// m2_equipes.create({
//     nome: 'teste',
//     ativo: 1
// })
// usuarios.create({
//     nome: "Ana",
//     password: "teste",
//     login: "teste",
//     idequipe: 1,
//     ativo: 1
// })

//console.log(m2_equipes)

app.route('/usuarios').get((req, res) => 
    usuarios.findAll({
        include: [
            {
                model: m2_equipes,
                required: true,
                on: {
                    col1: sequelize.where(sequelize.col("m2_equipe.id"), "=", sequelize.col("m2_usuarios.idequipe")),
                },
                attributes: ["nome"] // empty array means that no column from ModelB will be returned
            }
        ]
    }).then(function (usuarios) {
        res.json(usuarios);
    })
)

app.route('/usuarios/').post((req, res) => 
    {
        usuarios.create({
            nome: req.body.nome, 
            password: req.body.password,
            login: req.body.login,
            idequipe: req.body.idequipe,
            ativo: req.body.ativo 
        })
        res.json('usuario cadastrado com sucesso !') 
    }
)