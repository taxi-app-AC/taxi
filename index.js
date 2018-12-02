const express = require('express');
const app = express();
const winston = require('winston');
const bodyParser = require('body-parser');
require('dotenv').config();
var helmet = require('helmet');

const constants = require('./config/constant');
const routes = require('./routes');

require('./config/db');
app.use(helmet());

app.use(bodyParser.json());

// routes.init(app);

app.use(routes);


const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

app.use(function logErrors (err, req, res, next) {
    console.error(err.stack);

    logger.error(err.stack);

    res.sendStatus(500);
});

app.listen(process.env.APP_PORT, () => console.log(`Taxi app listening on port ${process.env.APP_PORT}!`))