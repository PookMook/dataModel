// testing dynamoDB response rate for find, update, create
const { PerformanceObserver, performance } = require('perf_hooks');
const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries()[0].name, " : ",items.getEntries()[0].duration,"ms");
  //performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });


performance.mark('Init');


const dynamoose = require('dynamoose');
 
performance.mark('Module');


const createDynamooseInstance = () => {
    dynamoose.AWS.config.update({
      accessKeyId: 'env.process.KEY_ID',
      secretAccessKey: 'env.process.KEY',
      region: 'env.process.REGION'
    });
    //dynamoose.local(); // This defaults to "http://localhost:8000"
}

createDynamooseInstance();

performance.mark('Config');

// Create cat model with default options
const Session = dynamoose.model('session', {
  id: Number,
  uuid: String
});
 
performance.mark('Model');

module.exports = {
    hello: () => {
        return 'World'
    },
    foo: () => {
        return 'bar'
    },
    dynamo: async () => {

        // Create a new session object
        const test = new Session({
            id: 666,
            uuid: 'test'
        });
        
        performance.mark('Local');
        
        // Save to DynamoDB
        test.save(); // Returns a promise that resolves when save has completed
        
        performance.mark('Save');

        // Lookup in DynamoDB
        const session = await Session.get(666)

        
        performance.mark('Fetch');
        performance.measure('Module', 'Init', 'Module');
        performance.measure('Config', 'Module', 'Config');
        performance.measure('Model', 'Config', 'Model');
        performance.measure('Local', 'Model', 'Local');
        performance.measure('Save', 'Local', 'Save');
        performance.measure('Fetch', 'Save', 'Fetch');
        return session

    }
}