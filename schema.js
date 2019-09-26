const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type RootQuery {
    hello: String!
  }
  type RootMutation {
    foo: String!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)