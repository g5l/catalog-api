module.exports = (sequelize, DataTypes) => {
  const CatalogUser = sequelize.define('CatalogUser', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: 'Users',
      referencesKey: 'id',
    },
  }, {
    paranoid: true,
  });
  CatalogUser.associate = (models) => {
    CatalogUser.belongsTo(models.User);
  };
  return CatalogUser;
};
