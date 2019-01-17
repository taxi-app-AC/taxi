const jwt = require('jsonwebtoken');

const logger = require('../../utils/logger');
const userModel = require('../../models/user');
const httpResponse = require('../../utils/http/httpResponse');

module.exports = async (args, context) => {

    try {

        let user = await userModel.findById(context.req.user.id, '-_id name phone');

        if (!user) {
            return context.res.status(404).send(httpResponse.getError(4));
        }

        return user;

    }
    catch (e) {
        logger.logErrors(e);
    }
};
