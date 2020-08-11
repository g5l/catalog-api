module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    logo: DataTypes.STRING,
    primaryColor: DataTypes.STRING,
    secondColor: DataTypes.STRING,
    background: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    },
  }, {});
  Profile.associate = (models) => {
    Profile.belongsTo(models.User);
  };
  return Profile;
};
