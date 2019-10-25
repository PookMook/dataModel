const { buildSchema } = require('graphql');


module.exports = buildSchema(`
type Entity {
  id: ID!
  name: String!
  authors:[Author]!
  versions: [Version!]!
}

type Version{
  id:ID!
  text: String!
  entity: Entity!
}

type Author{
  id:ID!
  name: String!
  entities: [Entity!]!
}

type RootQuery {
  authors: [Author!]!
  entities: [Entity!]!
  versions: [Version!]!
}

schema {
  query: RootQuery
}
`)