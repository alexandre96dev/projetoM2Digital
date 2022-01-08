'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('m2_usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING
      },
      idequipe: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'm2_equipes',
          key: 'id'
        }
      },
      ativo: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('m2_usuarios');
  }
};