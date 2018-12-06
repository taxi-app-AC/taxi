const Login = require('../controllers/auth/login');
const Register = require('../controllers/auth/register');
const Me = require('../controllers/auth/me');
const Upload = require('../controllers/auth/registerDriverLicense');
const { validationResult } = require('../middlewares/controller');
const requestValidator = require('../middlewares/requestValidators/auth');


var express = require('express');
var router = express.Router();

router.post('/login',
    requestValidator.login,
    validationResult,
    Login
);

router.post('/register',
    requestValidator.register,
    validationResult,
    Register
);

router.post('/upload',
    Upload
);

router.get('/me',
    Me
);

module.exports = router;