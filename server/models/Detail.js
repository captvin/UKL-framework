const Sequelize = require('sequelize')
const db = require('../config/database')

const Detail = db.define("detail_transaksi", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_paket: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Detail