module.exports = (sequelize, DataTypes) => {
  const CatalogUser = sequelize.define('CatalogUser', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    companyId: {
      type: DataTypes.INTEGER,
      references: 'Companies',
      referencesKey: 'id',
    },
  }, {
    paranoid: true,
  });
  CatalogUser.associate = (models) => {
    CatalogUser.belongsTo(models.Company);
  };
  return CatalogUser;
};
