'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.outlet, { foreignKey: "id_outlet", as: "outlet", onDelete: 'CASCADE' });
      this.hasMany(models.transaksi, {
        foreignKey: "id_user",
        as: "transaksi",
      });
    }
  }
  user.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    id_outlet: DataTypes.INTEGER,
    role: DataTypes.ENUM('admin', 'kasir', 'owner')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};