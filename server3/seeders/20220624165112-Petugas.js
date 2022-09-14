'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const petugas = [
      {
        username: 'owner',
        password: 'password',
        namaPetugas: 'Muhammad Hifdzi Maulana',
        level: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'superadmin',
        password: 'password',
        namaPetugas: 'Robertson Abdullah',
        level: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]

    await queryInterface.bulkInsert('Petugas', petugas)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Petugas', null)
  }
};
