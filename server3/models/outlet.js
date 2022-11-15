'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi, {
        foreignKey: "id_outlet",
        as: "transaksi",
      });
      this.hasMany(models.user, {
        as: 'user',
        foreignKey: 'id_outlet',
      });
    }
  }
  outlet.init({
    name: DataTypes.STRING,
    alamat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'outlet',
  });
  return outlet;
};