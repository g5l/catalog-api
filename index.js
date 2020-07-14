const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger/logger');
require('dotenv').config()

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('combined'));

const db = require("./src/models");
const apiUser = require("./src/routes/user");
apiUser(app, db);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info('listening on port 3030');
});