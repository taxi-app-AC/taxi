const jwt = require('jsonwebtoken');

const userModel = require('../../models/user');
const httpResponse = require('../../utils/http/httpResponse');

module.exports = async (args, context) => {

    try {
// console.log(parentValues);
// console.log(args);
        console.log('zzz');
        // console.log(parentValues);
// console.log(context.req.headers);
// console.log(context.req.user);
        // console.log(req.protocol + '://' + req.get('Host') + req.url);
        // return res.status(200).send(req.user);
        let user = await userModel.findById(context.req.user.id, '-_id name phone', function (err, user) {
            if (err) {
                // next(err);

            }
            if (!user) {
                return res.status(404).send(httpResponse.getError(4));
            }

            // console.log(user);
            //
            // return user;

            // context.res.status(200).send(user);
        });

        console.log(user);

        return user;

    }
    catch (e) {
        // next(e);
    }
};
