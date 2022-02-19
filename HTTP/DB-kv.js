const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://Rithvik:nitwarangal%403@22yards.nby6f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'myFirstDatabaset';

async function main() {
  // Use connect method to connect to the server
  // await client.connect();
  console.log('Connected successfully to server');
  
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
  console.log("Hii")


module.exports =client;


db = client.db(dbName);




