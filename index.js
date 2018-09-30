const express = require('express');
const app = express()

const constants = require('./config/constant')
require('./config/db');
const UserController = require('./controllers/UserController');
var AuthController = require('./controllers/AuthController');

app.use('/api/auth', AuthController);

app.use('/', UserController)

app.listen(constants.appPort, () => console.log(`Example app listening on port ${constants.appPort}!`))