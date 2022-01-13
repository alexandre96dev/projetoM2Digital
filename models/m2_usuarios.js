const Sequelize = require('sequelize');

//CONEXÃO COM O BANCO
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const m2_equipes = require('./m2_equipes')
const m2_usuarios = sequelize.define('m2_usuarios',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  login: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  idequipe: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: m2_equipes,
      key: 'id',
    },
  },
  ativo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = m2_usuarios