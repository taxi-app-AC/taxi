const Auth = require('../controllers/AuthController');
const { check, validationResult } = require('express-validator/check');

var express = require('express');
var router = express.Router();
// module.exports = app => {
    router.post('/login',  [
        check('phone').exists(),
            // password must be at least 5 chars long
            // check('password').isLength({ min: 5 }),
            check('password', 'must be min 5 char').isLength({ min: 5 })

    ] ,Auth.login);
// };
module.exports = router;