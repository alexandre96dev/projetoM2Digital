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
m2_equipes.sync({force:true})