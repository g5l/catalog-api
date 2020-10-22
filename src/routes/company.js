const verifyToken = require('../auth/middleware/verifyToken');

module.exports = (app, db) => {
  app.get('/myCompany', verifyToken, (req, res) => {
    const { userId } = req;

    db.Company.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [{
        model: db.User,
        where: { id: userId },
      }],
    }).then((result) => res.json(result));
  });

  app.post('/company', async (req, res) => {
    const { name, logo } = req.body;

    db.Company.create({
      name,
      logo,
    }).then((result) => res.json(result));
  });
};
