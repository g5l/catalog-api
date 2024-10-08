const verifyToken = require('../auth/middleware/verifyToken');

module.exports = (app, db) => {
  app.get('/orders', verifyToken, async (req, res) => {
    const { userId } = req;

    const company = await db.Company.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [{
        model: db.User,
        where: { id: userId },
      }],
    });

    db.Order.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.OrderItem,
          include: [{
            model: db.Product,
            include: [
              { model: db.Image, as: 'image' },
            ],
          }],
        },
        {
          model: db.CatalogUser,
          where: { companyId: company.id },
        },
      ],
    }).then((result) => res.json(result));
  });

  app.get('/order/:id', (req, res) => {
    const { id } = req.params;

    db.Order.findOne({
      where: { id },
      include: [
        {
          model: db.OrderItem,
          include: [{
            model: db.Product,
            include: [
              { model: db.Image, as: 'image' },
            ],
          }],
        },
        {
          model: db.CatalogUser,
        },
      ],
    }).then((result) => res.json(result));
  });

  app.post('/changeStatus', verifyToken, (req, res) => {
    const { id: orderId, status } = req.body;

    db.Order.update({
      status,
    }, {
      where: { id: orderId },
    }).then((result) => res.json(result));
  });

  app.post('/finishOrder', (req, res) => {
    const { user, products } = req.body;

    db.Order.create({
      catalogUserId: user.id,
    }).then((result) => {
      const { id: orderId } = result;

      products.forEach((product) => {
        db.OrderItem.create({
          orderId,
          productId: product.id,
          note: product.note,
          amount: product.amount,
        });
      });

      res.json({ message: 'ok' });
    });
  });
};
