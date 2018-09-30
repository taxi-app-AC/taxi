var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var user = require('../models/User');
var config = require('../config/constant');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use('/', (req, res, next) => {

    console.log(req.body);

    res.send(500);

    next();
})

router.post('/register', function(req, res) {

    var User = new user({
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
    });

    var error = User.validateSync();


    res.send(error);

    /*var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            name : req.body.name,
            phone : req.body.phone,
            password : hashedPassword,
            active: 1
        },
        function (err, user) {
            if (err) {

                console.log(err);

                if(err.ValidationError) {
                    return res.status(400).send(err.ValidationError);
                }
                else {
                    return res.status(500).send("There was a problem registering the user.")
                }
            }
            // create a token
            var token = jwt.sign({ id: user._id }, config.authSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
        });*/
});

module.exports = router;