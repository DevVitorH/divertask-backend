// models/task.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // Relacionamento: Uma Tarefa pertence a um Usuário
      Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  
  Task.init({
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    prioridade: {
      type: DataTypes.STRING,
      defaultValue: 'Baixa'
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false // Impede que uma tarefa exista sem dono
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  
  return Task;
};