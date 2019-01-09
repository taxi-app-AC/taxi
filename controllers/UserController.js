const User = require('../models/user');
const httpResponse = require('../utils/http/httpResponse');

exports.getUsers = (req, res, next) => {

    User.find({}, (err, users) => {

        if (err) next(err);

        if (!users) return res.status(401).send(httpResponse.getError(2));

        res.send(users);
    });
};

exports.getUser = (req, res, next) => {

    let id = req.params.id;
    User.findById(id, function (err, user) {

        if (err) next(err);

        if (!user) return res.status(401).send(httpResponse.getError(2));

        res.send(user);
    });
};

exports.changeActive = async (req, res, next) => {
    let id = req.params.id;
    let active = req.params.active;
    let query = { _id: id };

    await User.findOneAndUpdate(
        query,
        { "active" : active },
        (err, user) => {

            if (err) next(err);

            if (!user) return res.status(401).send(httpResponse.getError(2));
        }
    );

    res.status(200).send(httpResponse.success({
        active: (active == 1) ? true : false
    }))
};