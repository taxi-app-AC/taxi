const Auth = require('../controllers/AuthController');
const { check, validationResult } = require('express-validator/check');
const { requestValidator } = require('../middlewares/controller');

var express = require('express');
var router = express.Router();

router.post('/login',
    Auth.loginRules(),
    requestValidator,
    Auth.login
);

router.post('/register',
    Auth.register
);

module.exports = router;