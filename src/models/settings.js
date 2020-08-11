module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    catalogUserAuth: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    },
  }, {});
  Settings.associate = (models) => {
    Settings.belongsTo(models.User);
  };
  return Settings;
};
