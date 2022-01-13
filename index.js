const express = require('express')
const cors = require('cors')
const app = express()
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const equipes = require('./models/m2_equipes.js')
const usuarios = require('./models/m2_usuarios.js');

usuarios.belongsTo(equipes, { foreignKey: 'idequipe' })
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
app.route('/login').post((req, res) => 
    usuarios.findAll({
        include: [
            {
                model: equipes,
                required: true,
                where:{
                    ativo: 1,
                    login: req.body.login,
                    password: req.body.password
                }
                ,
                attributes: ["nome"] // empty array means that no column from ModelB will be returned
            }
        ],
        where: { ativo: 1}
    }).then(function (usuarios) {
        res.json(usuarios);
    })
)

app.route('/usuarios').get((req, res) => 
    usuarios.findAll({
        include: [
            {
                model: equipes,
                required: true,
                where:{
                    ativo: 1
                }
                ,
                attributes: ["nome"] // empty array means that no column from ModelB will be returned
            }
        ],
        where: { ativo: 1}
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
app.route('/usuarios/').put((req, res) => 
    {
        usuarios.update({
            nome: req.body.nome, 
            password: req.body.password,
            login: req.body.login,
            idequipe: req.body.idequipe,
            ativo: req.body.ativo 
        },
        {
            where: {
                id:req.body.usuarioId
            }
        }
        ).then(function () {
            res.json("usuario atualizado")
        }) 
    }
)

app.route('/usuarios').delete((req, res) => 
    {
        console.log(req.body)
        usuarios.update({
            ativo: 0 
        },
        {
            where: {
                id:req.body.id
            }
        }
        ).then(function () {
            res.json("usuario desativado")
        }) 
    }
)

app.route('/equipes').get((req, res) => 
    equipes.findAll({
        where: { ativo: 1}
    }).then(function (equipes) {
        res.json(equipes);
    })
)

app.route('/equipes/').post((req, res) => 
    {
        equipes.create({
            nome: req.body.nome, 
            ativo: req.body.ativo 
        })
        res.json('equipe cadastrada com sucesso !') 
    }
)
app.route('/equipes/').put((req, res) => 
    {
        equipes.update({
            nome: req.body.nome, 
            ativo: req.body.ativo 
        },
        {
            where: {
                id:req.body.equipeId
            }
        }
        ).then(function () {
            res.json("equipe atualizada")
        }) 
    }
)

app.route('/equipes/').delete((req, res) => 
    {
        equipes.update({
            ativo: 0 
        },
        {
            where: {
                id:req.body.equipeId
            }
        }
        ).then(function () {
            res.json("equipe desativada")
        }) 
    }
)