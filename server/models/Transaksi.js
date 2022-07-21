const Sequelize = require('sequelize')
const db = require('../config/database')

const Transaksi = db.define('peminjaman', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_member: {
        type: Sequelize.INTEGER({ length: 11 }),
        allowNull: false
    },
    id_user: {
        type: Sequelize.INTEGER({ length: 11 }),
        allowNull: false
    },
    tgl: {
        type: Sequelize.DATE,
        allowNull: false
    },
    batas_waktu: {
        type: Sequelize.DATE,
        allowNull: false
    },
    tgl_bayar: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("baru", "proses", "selesai", "diambil"),
        allowNull: false
    },
    dibayar: {
        type: Sequelize.ENUM("dibayar", "belum_dibayar"),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Transaksi