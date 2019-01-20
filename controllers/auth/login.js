const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httpResponse = require('../../utils/http/httpResponse');

const User = require('../../models/user');

module.exports = async (args, context) => {

    try {
        const user =  await User.findOne({ phone: args.phone }, function (err, user) {

            // if (err) next(err);

            if (!user) {

                return context.res.status(401).send(httpResponse.getError(1));
            }

        });

        let passwordIsValid = bcrypt.compareSync(args.password, user.password);

        if (!passwordIsValid) {

            return context.res.status(401).send(httpResponse.getError(1));
        }

        let token = await jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
            expiresIn: 30 * 86400 // expires in 30 days
        });

        context.res.status(200).send(httpResponse.success({
            auth: true,
            token: token
        }));

    }
    catch (e) {
        next(e);
    }
};