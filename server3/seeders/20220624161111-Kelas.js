'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    const nama = ['XI RPL 1', 'XI RPL 8', 'XI TKJ 1']
    const keahlian = ['RPL', 'RPL', 'TKJ']
    var kelas = []

    for (const key in nama) {
      kelas.push({
        namaKelas: nama[key],
        jurusan: keahlian[key],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Kelas', kelas)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Kelas', null)
  }
};
