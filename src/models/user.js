module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    User.hasOne(models.Profile);
    User.hasOne(models.Settings);
  };
  return User;
};
