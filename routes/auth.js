const Auth = require('../controllers/AuthController');
const Login = require('../controllers/auth/login');
const { validationResult } = require('../middlewares/controller');
const Validator = require('../middlewares/requestValidators/auth');


var express = require('express');
var router = express.Router();

router.post('/login',
    Validator.login,
    validationResult,
    Login
);

router.post('/register',
    Auth.register
);

module.exports = router;