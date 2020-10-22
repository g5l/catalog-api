const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../auth/middleware/verifyToken');
const FileUpload = require('../utils/FileUpload');
// eslint-disable-next-line no-undef
const config = require(`${__root}/config/auth`);

module.exports = (app, db) => {
  app.get('/catalogUsers', verifyToken, async (req, res) => {
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

    db.CatalogUser.findAll({
      attributes: {
        exclude: ['password'],
      },
      where: { companyId: company.id },
    })
      .then((result) => res.json(result));
  });

  app.get('/catalogUser/:id', (req, res) => {
    const { id } = req.params;

    db.CatalogUser.findOne({
      where: { id },
      attributes: {
        exclude: ['password'],
      },
    })
      .then((result) => res.json(result));
  });

  app.post('/catalogUser', verifyToken, async (req, res) => {
    const {
      name,
      lastname,
      email,
      password,
      companyId,
    } = req.body;
    const { image } = req.files;

    const upload = new FileUpload(image.data);
    const imageUrl = await upload.getUrl();

    const hashedPassword = bcrypt.hashSync(password, 8);

    db.CatalogUser.create({
      name,
      lastname,
      email,
      companyId,
      password: hashedPassword,
      image: imageUrl,
    }).then((result) => res.json(result));
  });

  app.delete('/CatalogUser', verifyToken, async (req, res) => {
    const { id } = req.body;

    db.CatalogUser.destroy({
      where: { id },
    }).then((result) => res.json(result));
  });

  app.get('/dashToken/:token', async (req, res) => {
    const { token } = req.params;

    if (!token) {
      return res.send({ auth: false, message: 'No token provided.' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.send({ auth: false, message: 'Failed to authenticate token.' });
      }

      res.send({ auth: true, user: decoded.id });
    });
  });

  app.post('/dashlogin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Usuário ou senha incorretos');
    }

    const user = await db.CatalogUser.findOne({
      where: { email },
    });

    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 2592000000, // 30 days
    });

    res.status(200).send({ auth: true, token, user });
  });
};
