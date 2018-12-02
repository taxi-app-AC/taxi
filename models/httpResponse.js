const httpResponseMessages = require('../config/httpResponseMessages');

const data = {};

/**
 * @type {Array}
 * example errors: [{
 *          status: 422,
 *          msg: 'Email or password is incorrect',
 *          detail: http://wwww.taxi.com/api/doc/client
 *      }]
 */
errors = [];

const createResponse = (code) => {

    let res = httpResponseMessages[code];

    res = Object.assign({status: code}, res);

    return res;
}

exports.addError = (code) => {

    let error = createResponse(code);

    errors.push(error);

    return {
        errors: errors
    };
};

exports.getError = (code) => {

    let error  = createResponse(code);

    return {
        errors: [error]
    };
}

exports.getErrors = () => {
    return {
        errors: errors
    };
}

exports.success = (data) => {

    return {
        data: data
    }
}