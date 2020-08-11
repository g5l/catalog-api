module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    reference: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  }, {
    paranoid: true,
  });
  Product.associate = (models) => {
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
