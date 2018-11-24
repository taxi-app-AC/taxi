const Order = require('../controllers/OrderController');
const { check, validationResult } = require('express-validator/check');
const { requestValidator } = require('../middlewares/controller');

var express = require('express');
var router = express.Router();

router.post('/',
    Order.create
);

module.exports = router;