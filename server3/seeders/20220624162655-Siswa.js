'use strict';

const faker = require('faker/locale/id_ID')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const siswa = [...Array(45)].map(item => (
      {
        nama: faker.name.findName(),
        alamat: faker.address.cityName(),
        telepon: faker.phone.phoneNumber(),
        idKelas: faker.mersenne.rand(1, 4),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ))
    await queryInterface.bulkInsert('Siswa', siswa)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Siswa', null)
  }
};
