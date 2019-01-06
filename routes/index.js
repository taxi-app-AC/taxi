const app = require('express')();

const expressValidator = require('express-validator');
const authentication = require('../middlewares/authentication') ;
const httpResponse = require('../utils/http/httpResponse');

app.use(authentication);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
    next();
});

app.use('/api/auth', require('./auth'));
app.use('/api/order', require('./order'));
app.use('/api/user', require('./user'));

// the catch all route
app.all('*', (req, res) => {
    console.log('-test-' + req.protocol + '://' + req.get('Host') + req.url);
    // return res.send(200);
    res.status(404).send(httpResponse.getError(6));
});

module.exports = app;