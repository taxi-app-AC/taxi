const express = require('express');
const router = express.Router();
const auth = require('./auth')

function init(app) {

    app.use('/api/auth', auth);
}

module.exports = {
    init: init
};
