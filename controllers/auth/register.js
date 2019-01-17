const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httpResponse = require('../../utils/http/httpResponse');

const userModel = require('../../models/user');

module.exports = async (req, res, next) => {

    try {
        let user = new userModel({
            name: req.body.name,
            phone: req.body.phone,
            password: req.body.password,
            active: 1,
            driver: 0,
            view: 0
        });

        let error = user.validateSync();

        if(error) {
            return res.status(400).send(httpResponse.getError(null, error.message));
        }

        user.password = bcrypt.hashSync(req.body.password, 8);

        await user.save(function (err) {
            if (err) {

                next(err);
            }
        });

        let payload = {
            id: user._id
        };

        let token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: 30 * 86400 // expires in 30 days
            }
        );

        return res.status(201).send(httpResponse.success({
            auth: true,
            token: token,
            username: user.name,
            phone: user.phone
        }));

    }
    catch (e) {
        next(e);
    }
};