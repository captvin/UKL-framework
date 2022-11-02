'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_outlet: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'outlets',
          key: 'id'
        }
      },
      id_detail: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'details',
          key: 'id'
        }
      },
      id_member: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'members',
          key: 'id'
        }
      },
      tgl: {
        allowNull: false,
        type: Sequelize.DATE
      },
      batas_waktu: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tgl_bayar: {
        allowNull: true,
        type: Sequelize.DATE
      },
      
      status: {
        allowNull: false,
        type: Sequelize.ENUM('baru', 'proses', 'selesai', 'diambil')
      },
      dibayar: {
        allowNull: false,
        type: Sequelize.ENUM('dibayar', 'belum')
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
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
    await queryInterface.dropTable('transaksis');
  }
};