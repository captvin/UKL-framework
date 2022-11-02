'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      id_paket: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'pakets',
          key: 'id'
        }
      },
      qty: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      total: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      keterangan: {
        allowNull: true,
        type: Sequelize.TEXT
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('details');
  }
};