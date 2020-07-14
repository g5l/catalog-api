const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger/logger');
require('dotenv').config();

const app = express();

// eslint-disable-next-line no-underscore-dangle
global.__root = __dirname;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const db = require('./src/models');
const apiAuth = require('./src/auth');
const apiUser = require('./src/routes/user');

apiAuth(app, db);
apiUser(app, db);

const { PORT } = process.env;
app.listen(PORT, () => {
  logger.info('listening on port 3030');
});
