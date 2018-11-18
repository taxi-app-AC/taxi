const Auth = require('../controllers/AuthController');

var express = require('express');
var router = express.Router();
// module.exports = app => {
    router.route('/login').post(Auth.login);
// };
module.exports = router;