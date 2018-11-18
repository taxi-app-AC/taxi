const express = require('express');
const app = express();
const winston = require('winston');
const fs = require('fs');
const path  = require('path');

const constants = require('./config/constant')
require('./config/db');

// var AuthController = require('./controllers/AuthController');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.use(bodyParser.urlencoded({
    extended: false
}));*/

var z = require('./routes/auth');

app.use('/', z);

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

app.listen(constants.appPort, () => console.log(`Example app listening on port ${constants.appPort}!`))