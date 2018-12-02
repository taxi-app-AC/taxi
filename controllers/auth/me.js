const jwt = require('jsonwebtoken');

const userModel = require('../../models/user');
const httpResponse = require('../../utils/http/httpResponse');

module.exports = async (req, res, next) => {

    try {

        userModel.findById(req.user.id, 'id name phone', function (err, user) {

            if (err) {
                next(err);
            }

            if (!user) {
                return res.status(404).send(httpResponse.getError(4));
            }

            res.status(200).send(user);
        });
    }
    catch (e) {
        next(e);
    }
};
