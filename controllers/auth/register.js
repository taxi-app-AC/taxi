const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const httpResponse = require('../../utils/http/httpResponse');

const userModel = require('../../models/user');

module.exports = async (args, context) => {
console.log(args);
    try {
        let user = new userModel({
            name: args.name,
            phone: args.phone,
            password: args.password,
            active: 1,
            driver: 0,
            view: 0
        });

        let error = user.validateSync();

        if(error) {
            return context.res.status(400).send(httpResponse.getError(null, error.message));
        }

        user.password = bcrypt.hashSync(args.password, 8);

        await user.save(function (err) {
            if (err) {

                // next(err);
            }
        });

        let payload = {
            id: user._id
        };

        let token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: 30 * 86400 // expires in 30 days
            }
        );

        return {
            auth: true,
            token: token,
            username: user.name,
            phone: user.phone
        };

        return context.res.status(201).send(httpResponse.success({
            auth: true,
            token: token,
            username: user.name,
            phone: user.phone
        }));

    }
    catch (e) {
        console.log(e);
        // next(e);
    }
};