'use strict';
module.exports = (sequelize, DataTypes) => {
  // const todo = sequelize.define('todo', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   status: DataTypes.BOOLEAN,
  //   due_date: DataTypes.DATE
  // }, {});

  class Todo extends sequelize.Sequelize.Model {}

  Todo.init({
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      validate: {
        CheckIfNull(title){
          if(!title){
            throw new Error ("Title tidak boleh kosong!")
          }
        }
      } 
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type:DataTypes.DATE,
      validate: {
        CheckIfDateExpired(date){
          let currentDate = new Date ()
          if(date < currentDate){
            throw new Error ("Title tidak boleh kosong!")
          }
        }
      }
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Todo' // We need to choose the model name
  });

  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};