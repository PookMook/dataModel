const express = require('express');
const graphqlHttp = require('express-graphql');

const graphQlSchema = require('./shared/schema');
const graphQlResolvers = require('./shared/resolvers');

const app = express();


app.use(
    '/',
    graphqlHttp((req,res) => ({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
      context: {req,res}
    }))
);

app.listen(80);