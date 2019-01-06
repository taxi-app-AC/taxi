const User = require('../models/user');
const httpResponse = require('../utils/http/httpResponse');

exports.getUsers = (req, res) => {

    User.find({}, (err, docs) => {

        if (err) {
            return res.status(400).send(httpResponse.getError(null,err.message));
        }

        res.send(docs);
    });
};

exports.getUser = (req, res) => {

    let id = req.params.id;
    User.findById(id, function (err, docs) {

        if (err) {
            res.status(400).send(httpResponse.getError(null, err.message));
        }

        res.send(docs);
    });
};