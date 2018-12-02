const httpResponseMessages = require('./httpResponseMessages');

const data = {};

/**
 * @type {Array}
 * example errors: [{
 *          status: 422,
 *          msg: 'Email or password is incorrect',
 *          detail: http://wwww.taxi.com/api/doc/client
 *      }]
 */
let errors = [];

const createResponse = (code = null, msg = '') => {

    if(code) {
        let res = httpResponseMessages[code];

        res = Object.assign({status: code}, res);

        return res;
    }
    else if(msg) {

        return {msg};
    }
}

exports.addError = (code) => {

    let error = createResponse(code);

    errors.push(error);

    return {
        errors: errors
    };
};

exports.getError = (code, msg) => {

    let error  = createResponse(code, msg);

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