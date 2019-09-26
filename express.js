const { PerformanceObserver, performance } = require('perf_hooks');
const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].name, " : ",items.getEntries()[0].duration,"ms");
  //performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });


performance.mark('Init');



const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const graphqlHttp = require('express-graphql');
const cors = require('cors')
const Fingerprint = require('express-fingerprint')

performance.mark('Module');


const graphQlSchema = require('./schema');
const graphQlResolvers = require('./resolvers');

performance.mark('Schema-Resolvers');

const app = express();

//Look for environnement variables
const listenPort = process.env.PORT || 3000
const origin = process.env.ALLOW_CORS_FRONTEND || 'http://localhost:3000'

const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200,
  credentials: true,
}

app.use(cors(corsOptions))

app.use(Fingerprint({
  parameters:[
    // Defaults
    Fingerprint.useragent,
    Fingerprint.acceptHeaders,
    Fingerprint.geoip,
  ]
}))
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser());

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

app.listen(listenPort);

performance.mark('listening');

performance.measure('Module', 'Init', 'Module');
performance.measure('Schema-Resolvers', 'Module', 'Schema-Resolvers');
performance.measure('Middlewares', 'Schema-Resolvers', 'Middlewares');
performance.measure('EndpointReady', 'Middlewares', 'EndpointReady');
performance.measure('listening', 'EndpointReady', 'listening');