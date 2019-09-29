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

// Create cat model with default options
const Session = dynamoose.model('session', {
  id: Number,
  uuid: String
});
 
performance.mark('Model');

// Create a new cat object
const test = new Session({
  id: 666,
  uuid: 'test'
});

performance.mark('Local');
 
// Save to DynamoDB
test.save(); // Returns a promise that resolves when save has completed
 
performance.mark('Save');

// Lookup in DynamoDB
Session.get(666).then((Session) => {
  console.log(`id is : ${Session.uuid}`);
});

performance.mark('Fetch');


performance.measure('Module', 'Init', 'Module');
performance.measure('Model', 'Module', 'Model');
performance.measure('Local', 'Model', 'Local');
performance.measure('Save', 'Local', 'Save');
performance.measure('Fetch', 'Save', 'Fetch');