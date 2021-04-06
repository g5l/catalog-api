const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('./middleware/verifyToken');
// eslint-disable-next-line no-undef
const config = require(`${__root}/config/auth`);

module.exports = (app, db) => {
  app.post('/register', async (req, res) => {
    const {
      name, email, password, phone, companySlug,
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const company = await db.Company.findOne({ where: { slug: companySlug } });

    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      companyId: company.id,
    });

    if (!user) return res.status(500).send('There was a problem registering the user.');

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 2592000000, // 30 days
    });

    res.status(200).send({ auth: true, token });
  });

  app.get('/me', verifyToken, async (req, res) => {
    const { userId } = req;

    const user = await db.User.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: db.Company,
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });

    if (!user) return res.status(404).send('No user found.');

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.Company,
    };

    res.status(200).send({ auth: true, user: userData });
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: db.Company,
          required: true,
        },
      ],
    });

    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 2592000000, // 30 days
    });

    res.status(200).send({ auth: true, token, user });
  });

  app.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
  });
};
