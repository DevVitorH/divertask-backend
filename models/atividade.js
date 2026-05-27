module.exports = (sequelize, DataTypes) => {
  const Atividade = sequelize.define('Atividade', {
    atividade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concluida: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  Atividade.associate = (models) => {
    Atividade.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Atividade;
};