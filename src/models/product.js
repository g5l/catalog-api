module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    reference: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    companyId: {
      type: DataTypes.INTEGER,
      references: 'Companies',
      referencesKey: 'id',
    },
  }, {
    paranoid: true,
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Company);
    Product.hasMany(models.Image, { as: 'image' });
    Product.belongsToMany(models.Order, {
      through: 'OrderItem',
      foreignKey: 'productId',
      otherKey: 'orderId',
    });
    Product.hasMany(models.OrderItem);
  };
  return Product;
};
