const multipartMiddleware = require('connect-multiparty')();
const Login = require('../controllers/auth/login');
const Register = require('../controllers/auth/register');
const Me = require('../controllers/auth/me');
const Upload = require('../controllers/auth/registerDriverLicense');
const { validationResult } = require('../middlewares/controller');
const requestValidator = require('../middlewares/requestValidators/auth');
const multer = require('multer');

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

const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/upload',
    Upload
);

router.get('/me',
    Me
);

module.exports = router;