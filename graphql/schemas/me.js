const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({typeDefs:`
  type Query {
    me: Me
  }
   type Me {
    name: String,
    phone: String
   }`});
