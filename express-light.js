const { PerformanceObserver, performance } = require('perf_hooks');
const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].name, " : ",items.getEntries()[0].duration,"ms");
  //performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });


performance.mark('Init');



const express = require('express');
const graphqlHttp = require('express-graphql');

performance.mark('Module');


const graphQlSchema = require('./shared/schema');
const graphQlResolvers = require('./shared/resolvers');

performance.mark('Schema-Resolvers');

const app = express();

performance.mark('Middlewares');

app.use(
    '/',
    graphqlHttp((req,res) => ({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true,
      context: {req,res}
    }))
);

performance.mark('EndpointReady');

app.listen(80);

performance.mark('listening');

performance.measure('Module', 'Init', 'Module');
performance.measure('Schema-Resolvers', 'Module', 'Schema-Resolvers');
performance.measure('Middlewares', 'Schema-Resolvers', 'Middlewares');
performance.measure('EndpointReady', 'Middlewares', 'EndpointReady');
performance.measure('listening', 'EndpointReady', 'listening');