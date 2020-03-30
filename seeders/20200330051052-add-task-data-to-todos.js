'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [{
      title: "Learn REST API",
      description: "Learn how to create RESTful API with Express and Sequelize",
      status: false,
      due_date: "2020-06-20",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Water the plants",
      description: "Pour some water to the plants near the porch",
      status: false,
      due_date: "2020-06-21",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
