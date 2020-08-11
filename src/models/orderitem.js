module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    note: DataTypes.STRING,
    amount: DataTypes.INTEGER,
  }, {});
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Product);
    OrderItem.belongsTo(models.Order);
  };
  return OrderItem;
};
