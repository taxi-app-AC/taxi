const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');

const constants = require('./config/constant');
require('./config/db');
const routes = require('./routes');
const logger = require('./utils/logger/logger')

app.use(helmet());

app.use(bodyParser.json());

app.use(routes);

app.use(logger.logErrors);

app.listen(process.env.APP_PORT, () => console.log(`Taxi app listening on port ${process.env.APP_PORT}!`))