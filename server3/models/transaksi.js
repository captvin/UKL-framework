'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.member, { foreignKey: 'id_member', as: 'member', onDelete: 'SET NULL' })
      this.belongsTo(models.outlet, { foreignKey: 'id_outlet', as: 'outlet', onDelete: 'SET NULL' })
      this.belongsTo(models.user, { foreignKey: 'id_user', as: 'user', onDelete: 'SET NULL' })
      this.belongsTo(models.detail, { foreignKey: 'id_detail', as: 'detail', onDelete: 'RESTRICT' })
    }
  }
  transaksi.init({
    id_outlet: DataTypes.INTEGER,
    id_member: DataTypes.INTEGER,
    id_detail: DataTypes.INTEGER,
    tgl: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    status: DataTypes.ENUM('baru', 'proses', 'selesai', 'diambil'),
    dibayar: DataTypes.ENUM('dibayar', 'belum'),
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};