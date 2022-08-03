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
    }
  }
  detail.init({
    id_transaksi: DataTypes.INTEGER,
    id_paket: DataTypes.INTEGER,
    qty: DataTypes.DOUBLE,
    keterangan: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};