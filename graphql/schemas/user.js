const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            users: [User],
            me: Me
        }
        type Mutation {
            register(name: String!, phone: String!, password: String): Me!
        }
        type User {
            id: ID,
            name: String,
            phone: String,
            active: Int,
            driver: Int,
            view: Int
        }
        type Me {
            name: String,
            phone: String
       }
    `
});