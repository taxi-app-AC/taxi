const { makeExecutableShcema } = require('graphql-tools');

module.exports = makeExecutableShcema({
    typeDefs: `
        type User {
            id: ID!
            name: String!
            phone: String!
        }
        
        type Query {
            me: User
        }
        
        type Mutation {
            register (name: String!, phone: String!, password: String!): String
            login (phone: String!, password: String!): String
        }
    `
});