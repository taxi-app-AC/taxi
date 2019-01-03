const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const winston = require('winston');

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

require('./config/constant');
require('./config/db');
const routes = require('./routes');
const logger = require('./utils/logger')

app.use(helmet());

app.use(bodyParser.json());

var schema = buildSchema(`
  type Query {
    hello: String,
    course(id: Int!): Course
  },
   type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]
var getCourse = function(args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

var root = {
    hello: () => 'Hello world!',
    course: getCourse
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.use(routes);

app.use(logger.logErrors);

let app_port = process.env.APP_PORT;

if(process.env.NODE_ENV === 'test') {
    app_port = process.env.APP_PORT_TEST;
}

app.listen(app_port, () => console.log(`Taxi app listening on port ${app_port}!`));

module.exports = app;