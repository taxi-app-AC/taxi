const mergeGraphqlSchemas = require('merge-graphql-schemas');
const path = require('path');
const me = require('./me');
const users = require('./user');
const { mergeSchemas } = require('graphql-tools');

// exports.default = mergeTypes([me], { all: true });

module.exports = mergeSchemas({
    schemas: [
        me,
        users
    ],
});

// module.exports = schema;