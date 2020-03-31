'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'UserId', Sequelize.INTEGER);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'UserId', {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
