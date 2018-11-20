var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

var user = require('../models/User');
var config = require('../config/constant');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', function(req, res) {

    let userObj = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
        active: 1
    };

    var User = new user(userObj);

    var error = User.validateSync();

    if(error) {
        return res.status(400).send({
            error: {
                message: error.message
            }
        });
    }

    userObj.password = bcrypt.hashSync(req.body.password, 8);

    user.create(userObj,
        function (err, userr) {
            if (err) {

                return res.status(500).send("There was a problem registering the user.")
            }
            // create a token
            var token = jwt.sign({ id: userr._id }, config.authSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            return res.status(200).send({ auth: true, token: token });
        });
});

router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.authSecret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        user.findById(decoded.id, {password: 0}, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
});

exports.loginRules = () => {

    return [
        check('phone').exists(),
        check('password', 'must be min 5 char').isLength({ min: 5 })
    ];
}

exports.login = (req, res, next) => {

    console.log(req.body);

    user.findOne({ phone: req.body.phone }, function (err, user) {

        if (err)
            next(err);

        if (!user)
            return res.status(404).send('No user found.');

        try {

            var passwordIsValid = bcrypt.compareSynsc(req.body.password, user.password);

            if (!passwordIsValid)
                return res.status(401).send({ auth: false, token: null });

            var token = jwt.sign({ id: user._id }, config.authSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });

        }
        catch (error) {
            // console.log(error.stack);
            next(error);
        }

    });
}
