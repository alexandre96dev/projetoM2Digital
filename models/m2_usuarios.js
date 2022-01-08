'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class m2_usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      m2_usuarios.hasOne(models.m2_equipes)
    }
  };
  m2_usuarios.init({
    idusuario: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    password: DataTypes.STRING,
    login: DataTypes.STRING,
    idequipe: DataTypes.INTEGER,
    ativo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'm2_usuarios',
  });
  return m2_usuarios;
};