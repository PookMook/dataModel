const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type Session {
  id: Number!
  uuid: String!
}

type RootQuery {
    hello: String!
    dynamo: Session!
  }
  type RootMutation {
    foo: String!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)