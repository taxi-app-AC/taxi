const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const winston = require('winston');

require('./config/constant');
require('./config/db');
const routes = require('./routes');
const logger = require('./utils/logger')

app.use(helmet());

app.use(bodyParser.json());

app.use(routes);

app.use(logger.logErrors);

let app_port = process.env.APP_PORT;

if(process.env.NODE_ENV === 'test') {
    console.log('test');
    app_port = process.env.APP_PORT_TEST;
}

app.listen(app_port, () => console.log(`Taxi app listening on port ${app_port}!`));

module.exports = app;