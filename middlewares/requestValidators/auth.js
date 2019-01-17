const { check, body } = require('express-validator/check');
const httpResponse = require('../../utils/http/httpResponse');

exports.login =  [
    check('phone', 'Phone is required').exists(),
    check('password', 'must be min 5 char').isLength({ min: 5 })
];

exports.register = [
    check('name', 'Name is required').exists(),
    check('phone', 'Phone is required').exists(),
    check('password', 'must be min 5 char').isLength({ min: 5 })
];