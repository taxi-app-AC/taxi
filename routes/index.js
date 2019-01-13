const app = require('express')();
var graphqlHTTP = require('express-graphql');

const expressValidator = require('express-validator');
const authentication = require('../middlewares/authentication') ;
const httpResponse = require('../utils/http/httpResponse');
const schema = require('../graphql/schemas/index');
const Me = require('../controllers/auth/me');
const { getUsers } = require('../controllers/UserController');

app.use(authentication);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type");
    next();
});

var root = {
    me: Me,
    users: getUsers
};

app.use('/graphql', graphqlHTTP((request, response, graphQLParams) => {
        // console.log(request.headers);
        return {
            schema: schema,
            rootValue: root,
            graphiql: true ,
            context: {
                req: request,
                res: response,
                test: 'Example context value'
            }
        }
    }
));

app.use('/api/auth', require('./auth'));
app.use('/api/order', require('./order'));
app.use('/api/user', require('./user'));

// the catch all route
/*app.all('*', (req, res) => {
    console.log('-test-' + req.protocol + '://' + req.get('Host') + req.url);
    // return res.send(200);
    res.status(404).send(httpResponse.getError(6));
});*/

module.exports = app;