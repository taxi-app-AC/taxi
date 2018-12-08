const { check } = require('express-validator/check');

exports.login =  [
    check('phone', 'Phone is required').exists(),
    check('password', 'must be min 5 char').isLength({ min: 5 })
];

exports.register = [
    check('name', 'Phone is required').exists(),
    check('phone', 'Phone is required').exists(),
    check('password', 'must be min 5 char').isLength({ min: 5 })
];

exports.upload = [
    check('driverImage', 'Driver image is required').exists()
];