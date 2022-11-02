'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        as: 'transaksi',
        foreignKey: 'id_detail',
        onDelete: 'NO ACTION'
      })
    }
  }
  detail.init({
    id_paket: DataTypes.INTEGER,
    qty: DataTypes.DOUBLE,
    total: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};