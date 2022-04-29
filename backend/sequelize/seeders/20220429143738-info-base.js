'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Inventarios',[{
      codigo: 'ART00001',
      nombre: 'Articulo 1',
      descripcion: 'Descripcion',
      cantidad: 10000,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      codigo: 'ART00002',
      nombre: 'Articulo 2',
      descripcion: 'Descripcion',
      cantidad: 10000,
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      codigo: 'ART00003',
      nombre: 'Articulo 3',
      descripcion: 'Descripcion',
      cantidad: 10000,
      createdAt : new Date(),
      updatedAt : new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Inventarios', null, {})
  }
};
