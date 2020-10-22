module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    logo: DataTypes.STRING,
    primaryColor: DataTypes.STRING,
    secondColor: DataTypes.STRING,
    background: DataTypes.STRING,
    companyId: {
      type: DataTypes.INTEGER,
      references: 'Companies',
      referencesKey: 'id',
    },
  }, {});
  Profile.associate = (models) => {
    Profile.belongsTo(models.Company);
  };
  return Profile;
};
