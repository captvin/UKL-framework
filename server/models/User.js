const Sequelize = require('sequelize')
const db = require('../config/database')

const User = db.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_user: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    tlp: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    alamat: {
        type: Sequelize.STRING,
        allowNull: false,
    },

}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = User