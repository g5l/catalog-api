const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger/logger');
require('dotenv').config();

const app = express();

// eslint-disable-next-line no-underscore-dangle
global.__root = __dirname;

app.use(fileUpload({
  createParentPath: true,
}));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const db = require('./src/models');
const apiAuth = require('./src/auth');
const apiCatalogUser = require('./src/routes/catalogUser');
const apiProduct = require('./src/routes/product');
const apiOrder = require('./src/routes/order');
const apiCompany = require('./src/routes/company');

apiAuth(app, db);
apiCatalogUser(app, db);
apiProduct(app, db);
apiOrder(app, db);
apiCompany(app, db);

const { PORT } = process.env;
app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
