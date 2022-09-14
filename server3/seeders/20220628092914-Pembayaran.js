'use strict';

const faker = require('faker/locale/id_ID')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const pembayaran = [...Array(45)].map((value, index) => (
      {
        idPetugas: faker.mersenne.rand(1, 3),
        idSpp: 1,
        idSiswa: index + 1,
        tanggalBayar: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ))
    await queryInterface.bulkInsert('Pembayaran', pembayaran)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Pembayaran', null)
  }
};
