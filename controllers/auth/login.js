const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httpResponse = require('../../models/httpResponse');

const user = require('../../models/user');

module.exports = (req, res, next) => {

    console.log(req.body);

    user.findOne({ phone: req.body.phone }, function (err, user) {

        if (err)
            next(err);

        if (!user) {
            return res.status(404).send(httpResponse.getError(2));
        }

        try {
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {

                return res.status(401).send(httpResponse.getError(1));
            }

            var token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send(httpResponse.success({
                auth: true,
                token: token
            }));
        }
        catch (e) {
            next(e);
        }

    });
}