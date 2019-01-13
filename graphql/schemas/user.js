const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            users: [User]
        }
        type User {
            id: ID,
            name: String,
            phone: String,
            active: Int,
            driver: Int,
            view: Int
        }
    `
});