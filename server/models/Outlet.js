const Sequelize = require('sequelize')
const db = require('../config/database')

const Outlet = db.define("outlet", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: Sequelize.STRING,
        allowNull: false
    },
    alamat: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Outlet