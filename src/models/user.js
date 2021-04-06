module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    companyId: {
      type: DataTypes.INTEGER,
      references: 'Companies',
      referencesKey: 'id',
    },
  }, {});
  User.associate = (models) => {
    User.belongsTo(models.Company);
  };
  return User;
};
