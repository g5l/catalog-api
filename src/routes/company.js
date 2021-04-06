const FileUpload = require('../utils/FileUpload');
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

  app.get('/company/:slug', (req, res) => {
    const { slug } = req.params;

    db.Company.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: { slug },
      include: [{
        model: db.Profile,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      }],
    }).then((result) => res.json(result));
  });

  app.post('/company', async (req, res) => {
    const {
      name, logo, background, primaryColor, secondColor,
    } = req.body;

    db.Company.create({
      name,
      Profile: {
        logo,
        background,
        primaryColor,
        secondColor,
      },
    },
    {
      include: [{
        model: db.Profile,
      }],
    }).then((result) => res.json(result));
  });

  app.put('/company', async (req, res) => {
    const {
      id, name, primaryColor, secondColor,
    } = req.body;
    const images = req.files;
    let backgroundUrl = '';
    // let logoUrl = '';

    if (images) {
      const upload = new FileUpload(images.image.data);
      backgroundUrl = await upload.getUrl();
    }

    // if (logo) {
    //   const upload = new FileUpload(logo.data);
    //   logoUrl = await upload.getUrl();
    // }

    db.Company.update({
      name,
    },
    {
      where: { id },
    });

    db.Profile.update({
      // logo: logoUrl,
      background: backgroundUrl,
      primaryColor,
      secondColor,
    },
    {
      where: { companyId: id },
    })
      .then((result) => res.json(result));
  });
};
