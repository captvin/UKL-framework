const Sequelize = require('sequelize')
const db = require('../config/database')

const Member = db.define("member", {
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
    jenis_kelamin: {
        type: Sequelize.ENUM("laki-laki", "perempuan"),
        allowNull: true,
    },
    tlp: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Member