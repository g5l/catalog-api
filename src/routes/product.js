const verifyToken = require('../auth/middleware/verifyToken');
const FileUpload = require('../utils/FileUpload');

module.exports = (app, db) => {
  app.get('/products', verifyToken, async (req, res) => {
    const { userId } = req;

    const company = await db.Company.findOne({
      include: [{
        model: db.User,
        where: { id: userId },
      }],
    });

    db.Product.findAll({
      attributes: {
        exclude: ['deletedAt'],
      },
      where: { companyId: company.id },
    })
      .then((result) => res.json(result));
  });

  app.get('/products/:companySlug', async (req, res) => {
    const { companySlug } = req.params;

    const company = await db.Company.findOne({
      where: { slug: companySlug },
    });

    db.Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          model: db.Image,
          as: 'image',
          attributes: ['url'],
        },
      ],
      where: { companyId: company.id },
    })
      .then((result) => res.json(result));
  });

  app.get('/product/:id', verifyToken, async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    const company = await db.Company.findOne({
      include: [{
        model: db.User,
        where: { id: userId },
      }],
    });

    db.Product.findOne({
      where: {
        id,
        companyId: company.id,
      },
      include: [
        {
          model: db.Image,
          as: 'image',
          attributes: ['url'],
        },
      ],
    })
      .then((result) => res.json(result));
  });

  app.post('/product', verifyToken, async (req, res) => {
    const {
      name, reference, price, companyId,
    } = req.body;
    const { image } = req.files;

    const upload = new FileUpload(image.data);
    const buffer = await upload.getUrl();

    const priceFormated = parseFloat(price.replace('.', '').replace(',', '.'));

    db.Product.create({
      name,
      reference,
      price: priceFormated,
      companyId,
      image: [
        { url: buffer },
      ],
    }, {
      include: [
        { model: db.Image, as: 'image' },
      ],
    }).then((result) => res.json(result));
  });

  app.put('/product', verifyToken, async (req, res) => {
    const {
      id, name, reference, price,
    } = req.body;

    if (req.files) {
      const { image } = req.files;
      const upload = new FileUpload(image.data);
      const buffer = await upload.getUrl();

      db.Image.update({
        url: buffer,
      }, {
        where: { id },
      });
    }

    const priceFormated = parseFloat(price.replace('.', '').replace(',', '.'));

    db.Product.update({
      reference,
      name,
      price: priceFormated,
    }, {
      where: { id },
    }).then((result) => res.json(result));
  });

  app.delete('/product', verifyToken, async (req, res) => {
    const { id } = req.body;

    db.Product.destroy({
      where: { id },
    }).then((result) => res.json(result));
  });
};
