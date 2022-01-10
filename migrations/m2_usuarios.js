const Sequelize = require('sequelize');
//CONEXÃO COM O BANCO

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});
const m2_equipes = sequelize.define('m2_equipes',{
  id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ativo: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})
const m2_usuarios = sequelize.define('m2_usuarios',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idequipe: {
    type: Sequelize.STRING,
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

m2_equipes.belongsTo(m2_usuarios)
m2_usuarios.hasOne(m2_equipes)
m2_usuarios.sync({force:true})
