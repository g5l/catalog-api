module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    productId: {
      type: DataTypes.INTEGER,
      references: 'Products',
      referencesKey: 'id',
    },
    url: DataTypes.STRING,
  }, {
    paranoid: true,
  });
  Image.associate = (models) => {
    Image.belongsTo(models.Product);
  };
  return Image;
};
