'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
        User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });    
    }
  }
  
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user' 
    },
    fotoPerfil: {
      type: DataTypes.TEXT('long'), 
      allowNull: true  
    }
  }, 
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });
  
  return User;
};