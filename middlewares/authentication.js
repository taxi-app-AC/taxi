var jwt = require('express-jwt');

const httpResponse = require('../utils/http/httpResponse');

const userAuthentication = jwt({ secret: process.env.AUTH_SECRET })
    .unless({
        path: [
            '/api/auth/register',
            '/api/auth/login',
            '/api/auth/upload'
        ],
    });

const authErrorHandler = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send(httpResponse.getError(5));
    }
};

module.exports = [
    userAuthentication,
    authErrorHandler
]