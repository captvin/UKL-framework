const Sequelize = require('sequelize')
const db = require('../config/database')


const Paket = db.define("paket", {
    id: {
        type: Sequelize.INTEGER({ length: 11 }),
        primaryKey: true,
        autoIncrement: true
    },
    jenis: {
        type: Sequelize.STRING,
        allowNull: false
    },
    harga: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Paket