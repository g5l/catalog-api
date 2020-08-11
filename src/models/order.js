module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    catalogUserId: {
      type: DataTypes.INTEGER,
      references: 'CatalogUsers',
      referencesKey: 'id',
    },
    status: DataTypes.ENUM({
      values: ['received', 'production', 'done', 'canceled'],
    }),
  }, {});
  Order.associate = (models) => {
    Order.belongsToMany(models.Product, {
      through: 'OrderItem',
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
    Order.hasMany(models.OrderItem);
    Order.belongsTo(models.CatalogUser);
  };
  return Order;
};
