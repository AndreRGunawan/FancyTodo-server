'use strict';
const { encryptPassword } = require("../helpers/bcrypt.js")

module.exports = (sequelize, DataTypes) => {
  // const User = sequelize.define('User', {
  //   email: DataTypes.STRING,
  //   password: DataTypes.STRING,
  //   role: DataTypes.STRING
  // }, {});

  class User extends sequelize.Sequelize.Model {}

  User.init({
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'email is being used'
      },
      allowNull: false,
      validate :{
        notNull: {
          args: true,
          msg: "Email must be provided"
        },
        notEmpty: {
          args: true,
          msg: "Email must be provided"
        },
        isEmail : {
          args: true,
          msg: "Provided email must follow email format"
        }
      }
    },
    password: {
      allowNull: false, 
      type: DataTypes.STRING
    },
    role: {
      defaultValue: "user", 
      type: DataTypes.STRING
    }
  }, {
    // Other model options go here
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encryptPassword(user.password)
      }
    },
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });


  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo)
  };
  return User;
};