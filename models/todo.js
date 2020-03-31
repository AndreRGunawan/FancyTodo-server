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
            throw new Error ("Title cannot be empty!")
          }
        }
      } 
    },
    description: {
      type:DataTypes.STRING,
      validate: {
        CheckIFNull(description){
          if(!description){
            throw new Error ("Description cannot be empty!")
          }
        }
      }
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    due_date: {
      type:DataTypes.DATE,
      validate: {
        CheckIfDateExpired(date){
          let currentDate = new Date ()
          var insertedDate = new Date(date); 
          //Jika currentDate lebih baru daripada insertedDate, maka...
          if (currentDate.getTime() > insertedDate.getTime()){
            throw new Error ("The date you entered has passed. Please choose a different date!")
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
    // associations can be defined her
    Todo.belongsTo(models.User)
  };
  return Todo;
};