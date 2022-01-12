const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const app = express()
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const equipes = require('./models/m2_equipes.js')
const usuarios = require('./models/m2_usuarios.js');
dotenv.config();
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
usuarios.belongsTo(equipes, { foreignKey: 'idequipe' })




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
var tokenAuth;

app.route('/auth').get((req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    tokenAuth = jwt.sign(data, jwtSecretKey);

    res.json("token de autorização     : " + tokenAuth)
})

app.route('/usuarios').get((req, res) => {
    if (tokenAuth) {
        usuarios.findAll({
            raw:true,
            include:[{
                model: equipes,
                required: true,
                attributes: ['nome'],
            }],
            where: { ativo: 1},
            order:[['id', 'ASC']]
        }).then(function (usuarios) {
            res.json(usuarios);
        })
    }
    else{
        res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
    }   
}
     
)

app.route('/usuarios/').post((req, res) => 
    {
        if (tokenAuth) {
            usuarios.create({
                nome: req.body.nome, 
                password: req.body.password,
                login: req.body.login,
                idequipe: req.body.idequipe,
                ativo: req.body.ativo 
            })
            res.json('usuario cadastrado com sucesso !') 
        }
        else{
            res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
        }
    }
)
app.route('/usuarios/').put((req, res) => 
    {
        if (tokenAuth) {  
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
        else{
            res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
        } 
    }
)

app.route('/usuarios/').delete((req, res) => 
    {
        if (tokenAuth) {
            usuarios.update({
                ativo: 0 
            },
            {
                where: {
                    id:req.body.usuarioId
                }
            }
            ).then(function () {
                res.json("usuario desativado")
            })
        }
        else{
            res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
        } 
    }
)

app.route('/equipes').get((req, res) => 
    {
        if (tokenAuth) {
            equipes.findAll({
                where: { ativo: 1}
            }).then(function (equipes) {
                res.json(equipes);
            })
        }
        else{
            res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
        }
    }
)

app.route('/equipes/').post((req, res) => 
    {
        if (tokenAuth) {
            equipes.create({
                nome: req.body.nome, 
                ativo: req.body.ativo 
            })
            res.json('equipe cadastrada com sucesso !')
        }
        else{
            res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
        } 
    }
)
app.route('/equipes/').put((req, res) => 
    {
        if (tokenAuth) {
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
        else{
            res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
        } 
    }
)

app.route('/equipes/').delete((req, res) => 
    {
        if (tokenAuth) {
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
        else{
          res.json("O token de autorização não foi gerado !!, acesse /auth para ter acesso as funcionalidades do CRUD")
  
        } 
    }
)